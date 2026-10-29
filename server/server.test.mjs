import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, test } from "node:test";
import { gunzipSync } from "node:zlib";
import { createApp } from "./app.mjs";
import {
  CommunityStore,
  RateLimiter,
  StatusChecker,
  normalizeName,
  normalizeTunnelUrl,
  probeTunnel,
} from "./communities.mjs";
import { loadStaticFiles } from "./static.mjs";

const temporary = await mkdtemp(path.join(tmpdir(), "kucc-server-test-"));
after(() => rm(temporary, { recursive: true, force: true }));

describe("입력 정리", () => {
  test("이름의 공백과 보이지 않는 문자를 정리한다", () => {
    assert.deepEqual(normalizeName("  해커톤​   팀원\n모집 "), {
      name: "해커톤 팀원 모집",
      key: "해커톤 팀원 모집",
    });
    assert.equal(normalizeName("KUCC Board").key, "kucc board");
  });

  test("빈 이름과 30자를 넘는 이름을 거절한다", () => {
    assert.throws(() => normalizeName("   "), { code: "invalid_name" });
    assert.throws(() => normalizeName(42), { code: "invalid_name" });
    assert.equal(normalizeName("가".repeat(30)).name.length, 30);
    assert.throws(() => normalizeName("가".repeat(31)), { code: "invalid_name" });
  });

  test("trycloudflare 주소를 https 원점으로 맞춘다", () => {
    assert.equal(
      normalizeTunnelUrl("Quiet-River-12.trycloudflare.com/posts?x=1"),
      "https://quiet-river-12.trycloudflare.com",
    );
    assert.equal(
      normalizeTunnelUrl(" https://abc.trycloudflare.com/ "),
      "https://abc.trycloudflare.com",
    );
  });

  test("다른 주소와 위험한 형식을 거절한다", () => {
    for (const value of [
      "http://abc.trycloudflare.com",
      "https://trycloudflare.com",
      "https://a.b.trycloudflare.com",
      "https://abc.trycloudflare.com.evil.example",
      "https://user:pw@abc.trycloudflare.com",
      "https://abc.trycloudflare.com:8443",
      "javascript:alert(1)",
      "https://localhost:3000",
      "",
      null,
    ]) {
      assert.throws(() => normalizeTunnelUrl(value), { code: "invalid_url" }, String(value));
    }
  });
});

describe("커뮤니티 저장소", () => {
  test("같은 이름은 덮어쓰고, 같은 주소는 새 이름으로 바꾼다", async () => {
    let clock = 1_000_000;
    const file = path.join(temporary, "store-a", "communities.json");
    const store = new CommunityStore({ file, now: () => clock });
    await store.load();
    assert.equal((await store.upsert("맛집 게시판", "a.trycloudflare.com")).replaced, false);
    clock += 1000;
    assert.equal((await store.upsert("맛집  게시판", "b.trycloudflare.com")).replaced, true);
    clock += 1000;
    await store.upsert("팀원 모집", "c.trycloudflare.com");
    clock += 1000;
    assert.equal((await store.upsert("팀원 모집 v2", "c.trycloudflare.com")).replaced, true);
    assert.deepEqual(
      store.list().map((entry) => [entry.name, entry.url]),
      [
        ["팀원 모집 v2", "https://c.trycloudflare.com"],
        ["맛집 게시판", "https://b.trycloudflare.com"],
      ],
    );

    const reloaded = new CommunityStore({ file, now: () => clock });
    await reloaded.load();
    assert.equal(reloaded.list().length, 2);
    const saved = JSON.parse(await readFile(file, "utf8"));
    assert.equal(saved.version, 1);
    assert.equal(saved.communities.length, 2);
  });

  test("12시간이 지난 항목은 목록에서 빠진다", async () => {
    let clock = 0;
    const store = new CommunityStore({
      file: path.join(temporary, "store-b", "communities.json"),
      now: () => clock,
    });
    await store.load();
    await store.upsert("오래된 글", "old.trycloudflare.com");
    clock += 12 * 60 * 60 * 1000 + 1;
    assert.deepEqual(store.list(), []);
  });

  test("가득 차면 새 이름은 거절하지만 기존 이름은 바꿀 수 있다", async () => {
    const store = new CommunityStore({
      file: path.join(temporary, "store-c", "communities.json"),
      maxEntries: 2,
    });
    await store.load();
    await store.upsert("하나", "one.trycloudflare.com");
    await store.upsert("둘", "two.trycloudflare.com");
    await assert.rejects(store.upsert("셋", "three.trycloudflare.com"), {
      code: "full",
      status: 409,
    });
    await store.upsert("하나", "uno.trycloudflare.com");
    assert.equal(store.list().length, 2);
  });

  test("저장에 실패하면 목록을 되돌린다", async () => {
    const store = new CommunityStore({
      file: path.join(temporary, "store-d", "communities.json"),
    });
    await store.load();
    store.save = () => Promise.reject(Object.assign(new Error("disk"), { code: "EIO" }));
    await assert.rejects(store.upsert("실패", "fail.trycloudflare.com"), { code: "EIO" });
    assert.deepEqual(store.list(), []);
  });

  test("깨진 저장 파일 항목은 건너뛴다", async () => {
    const file = path.join(temporary, "store-e", "communities.json");
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(
      file,
      JSON.stringify({
        communities: [
          { name: "정상", url: "https://ok.trycloudflare.com", updatedAt: new Date().toISOString() },
          { name: "", url: "https://bad.trycloudflare.com", updatedAt: new Date().toISOString() },
          { name: "다른 주소", url: "https://evil.example", updatedAt: new Date().toISOString() },
        ],
      }),
    );
    const store = new CommunityStore({ file });
    await store.load();
    assert.deepEqual(store.list().map((entry) => entry.name), ["정상"]);
  });
});

describe("접속 확인", () => {
  const response = (status) => ({ status, body: { cancel: async () => {} } });

  test("응답 코드와 DNS 오류로 열림·꺼짐을 나눈다", async () => {
    assert.equal(await probeTunnel("https://a", { fetchImpl: async () => response(200) }), "online");
    assert.equal(await probeTunnel("https://a", { fetchImpl: async () => response(404) }), "online");
    assert.equal(await probeTunnel("https://a", { fetchImpl: async () => response(502) }), "offline");
    assert.equal(await probeTunnel("https://a", { fetchImpl: async () => response(530) }), "offline");
    const dns = Object.assign(new TypeError("fetch failed"), { cause: { code: "ENOTFOUND" } });
    assert.equal(await probeTunnel("https://a", { fetchImpl: async () => { throw dns; } }), "offline");
    const timeout = new DOMException("timeout", "TimeoutError");
    assert.equal(await probeTunnel("https://a", { fetchImpl: async () => { throw timeout; } }), "unknown");
  });

  test("같은 주소를 동시에 여러 번 확인하지 않고, 동시 확인 수를 제한한다", async () => {
    let calls = 0;
    let active = 0;
    let peak = 0;
    const checker = new StatusChecker({
      maxConcurrent: 2,
      probe: async () => {
        calls += 1;
        active += 1;
        peak = Math.max(peak, active);
        await new Promise((resolve) => setTimeout(resolve, 5));
        active -= 1;
        return "online";
      },
    });
    await Promise.all([checker.check("x"), checker.check("x"), checker.check("y"), checker.check("z")]);
    assert.equal(calls, 3);
    assert.equal(peak, 2);
    assert.equal(checker.get("x").status, "online");
    assert.equal(checker.get("never").status, "unknown");
  });
});

test("요청 수 제한은 시간 창이 지나면 풀린다", () => {
  let clock = 0;
  const limiter = new RateLimiter({ windowMs: 1000, max: 2, now: () => clock });
  assert.equal(limiter.take("a"), 0);
  assert.equal(limiter.take("a"), 0);
  assert.equal(limiter.take("a"), 1);
  assert.equal(limiter.take("b"), 0);
  clock = 1000;
  assert.equal(limiter.take("a"), 0);
});

describe("HTTP 서버", () => {
  let server;
  let base;
  let store;
  const probes = [];

  before(async () => {
    const dist = path.join(temporary, "dist");
    await mkdir(path.join(dist, "assets"), { recursive: true });
    await writeFile(path.join(dist, "index.html"), `<!doctype html><title>KUCC</title>${"<p>x</p>".repeat(300)}`);
    await writeFile(path.join(dist, "assets", "app-abc.js"), "console.log(1)");
    store = new CommunityStore({ file: path.join(temporary, "http", "communities.json") });
    await store.load();
    const app = createApp({
      staticFiles: await loadStaticFiles(dist),
      store,
      statusChecker: new StatusChecker({
        probe: async (url) => {
          probes.push(url);
          return url.includes("down") ? "offline" : "online";
        },
      }),
      perClient: new RateLimiter({ windowMs: 60_000, max: 5 }),
    });
    server = createServer(app);
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  });
  after(() => new Promise((resolve) => server.close(resolve)));

  const post = (body, headers = {}) =>
    fetch(`${base}/api/communities`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "10.0.0.1", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });

  test("healthz와 정적 파일", async () => {
    const health = await fetch(`${base}/healthz`);
    assert.equal(await health.text(), "ok");

    const raw = await new Promise((resolve, reject) => {
      import("node:http").then(({ get }) =>
        get(`${base}/`, { headers: { "accept-encoding": "gzip" } }, (response) => {
          const chunks = [];
          response.on("data", (chunk) => chunks.push(chunk));
          response.on("end", () => resolve({ response, body: Buffer.concat(chunks) }));
        }).on("error", reject),
      );
    });
    assert.equal(raw.response.headers["content-encoding"], "gzip");
    assert.equal(raw.response.headers["cache-control"], "no-cache");
    assert.match(gunzipSync(raw.body).toString(), /<title>KUCC<\/title>/);

    const asset = await fetch(`${base}/assets/app-abc.js`);
    assert.equal(asset.headers.get("cache-control"), "public, max-age=31536000, immutable");
    const again = await fetch(`${base}/assets/app-abc.js`, {
      headers: { "if-none-match": asset.headers.get("etag") },
    });
    assert.equal(again.status, 304);
    assert.equal((await fetch(`${base}/missing.js`)).status, 404);
    assert.equal((await fetch(`${base}/../server/app.mjs`)).status, 404);
    assert.equal((await fetch(`${base}/`, { method: "POST" })).status, 405);
  });

  test("커뮤니티를 올리고 같은 이름으로 덮어쓴다", async () => {
    const created = await post({ name: "우리 과 게시판", url: "https://our-major.trycloudflare.com/" });
    assert.equal(created.status, 201);
    const first = await created.json();
    assert.equal(first.community.url, "https://our-major.trycloudflare.com");
    assert.equal(first.community.status, "online");
    assert.equal(first.replaced, false);

    const replaced = await post({ name: "우리 과 게시판", url: "down-now.trycloudflare.com" });
    assert.equal(replaced.status, 200);
    const second = await replaced.json();
    assert.equal(second.replaced, true);
    assert.equal(second.community.status, "offline");

    const list = await (await fetch(`${base}/api/communities`)).json();
    assert.deepEqual(
      list.communities.map((entry) => [entry.name, entry.url, entry.status]),
      [["우리 과 게시판", "https://down-now.trycloudflare.com", "offline"]],
    );
  });

  test("잘못된 요청을 거절한다", async () => {
    const wrongType = await fetch(`${base}/api/communities`, {
      method: "POST",
      headers: { "content-type": "text/plain", "x-real-ip": "10.0.0.2" },
      body: "{}",
    });
    assert.equal(wrongType.status, 415);

    const badUrl = await post({ name: "피싱", url: "https://example.com" }, { "x-real-ip": "10.0.0.2" });
    assert.equal(badUrl.status, 400);
    assert.equal((await badUrl.json()).error.code, "invalid_url");

    const badJson = await post("{", { "x-real-ip": "10.0.0.2" });
    assert.equal(badJson.status, 400);

    const big = await post({ name: "x", url: "y".repeat(5000) }, { "x-real-ip": "10.0.0.2" });
    assert.equal(big.status, 413);

    assert.equal((await fetch(`${base}/api/communities`, { method: "DELETE" })).status, 405);
    assert.equal((await fetch(`${base}/api/unknown`)).status, 404);
  });

  test("한 주소에서 너무 많이 올리면 잠시 막는다", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i += 1) {
      const response = await post({ name: `연속 ${i}`, url: `burst-${i}.trycloudflare.com` }, { "x-real-ip": "10.0.0.9" });
      statuses.push(response.status);
      await response.arrayBuffer();
    }
    assert.deepEqual(statuses, [201, 201, 201, 201, 201, 429]);
  });

  test("서버를 다시 켠 뒤 처음 목록을 열면 접속 결과를 함께 준다", async () => {
    const restarted = createServer(
      createApp({
        staticFiles: await loadStaticFiles(path.join(temporary, "dist")),
        store,
        statusChecker: new StatusChecker({ probe: async () => "online" }),
      }),
    );
    await new Promise((resolve) => restarted.listen(0, "127.0.0.1", resolve));
    const url = `http://127.0.0.1:${restarted.address().port}`;
    const { communities } = await (await fetch(`${url}/api/communities`)).json();
    assert.ok(communities.length > 0);
    assert.ok(communities.every((entry) => entry.status === "online" && entry.checkedAt));
    await new Promise((resolve) => restarted.close(resolve));
  });

  test("저장소를 쓸 수 없으면 API만 503으로 알린다", async () => {
    const app = createApp({
      staticFiles: await loadStaticFiles(path.join(temporary, "dist")),
      store: null,
      statusChecker: new StatusChecker(),
    });
    const offline = createServer(app);
    await new Promise((resolve) => offline.listen(0, "127.0.0.1", resolve));
    const url = `http://127.0.0.1:${offline.address().port}`;
    assert.equal((await fetch(`${url}/api/communities`)).status, 503);
    assert.equal((await fetch(`${url}/`)).status, 200);
    await new Promise((resolve) => offline.close(resolve));
  });
});
