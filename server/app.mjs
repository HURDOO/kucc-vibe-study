import { InputError, RateLimiter } from "./communities.mjs";
import { serveStatic } from "./static.mjs";

const BODY_LIMIT = 4 * 1024;

function sendJson(response, status, body, headers = {}) {
  const text = JSON.stringify(body);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(text),
    ...headers,
  });
  response.end(text);
}

function sendError(response, status, code, message, headers) {
  sendJson(response, status, { error: { code, message } }, headers);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const tooLarge = () =>
      new InputError("too_large", "보낸 내용이 너무 길어요.", 413);
    if (Number(request.headers["content-length"]) > BODY_LIMIT) {
      request.resume();
      reject(tooLarge());
      return;
    }
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      if (size > BODY_LIMIT) return;
      size += chunk.length;
      if (size > BODY_LIMIT) reject(tooLarge());
      else chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function clientAddress(request) {
  // 컨테이너 포트는 호스트 루프백에만 열리고, 앞단 Nginx가 X-Real-IP를 덮어쓴다.
  const real = request.headers["x-real-ip"];
  return (typeof real === "string" && real.trim()) || request.socket.remoteAddress || "unknown";
}

function publicEntry(entry, statusChecker) {
  const { status, checkedAt } = statusChecker.get(entry.url);
  return {
    name: entry.name,
    url: entry.url,
    updatedAt: new Date(entry.updatedAt).toISOString(),
    status,
    checkedAt: checkedAt ? new Date(checkedAt).toISOString() : null,
  };
}

export function createApp({
  staticFiles,
  store,
  statusChecker,
  perClient = new RateLimiter({ windowMs: 60_000, max: 20 }),
  overall = new RateLimiter({ windowMs: 60_000, max: 120 }),
  postCheckMs = 5000,
  listCheckMs = 2500,
}) {
  async function listCommunities(response) {
    const entries = store.list();
    const urls = entries.map((entry) => entry.url);
    statusChecker.forget(urls);
    // 한 번도 확인하지 않은 주소(서버 재시작 직후 등)는 잠깐 기다려 결과를 함께 준다.
    const unchecked = urls.filter((url) => !statusChecker.get(url).checkedAt);
    statusChecker.refresh(urls);
    if (unchecked.length) {
      await Promise.race([
        Promise.all(unchecked.map((url) => statusChecker.check(url))),
        new Promise((resolve) => setTimeout(resolve, listCheckMs).unref()),
      ]);
    }
    sendJson(response, 200, {
      communities: entries.map((entry) => publicEntry(entry, statusChecker)),
    });
  }

  async function addCommunity(request, response) {
    const type = request.headers["content-type"] ?? "";
    if (!/^application\/json\b/i.test(type)) {
      sendError(response, 415, "unsupported_type", "JSON으로 보내 주세요.");
      return;
    }
    const wait =
      perClient.take(clientAddress(request)) || overall.take("all");
    if (wait) {
      sendError(
        response,
        429,
        "rate_limited",
        "잠시 후 다시 올려 주세요.",
        { "retry-after": String(wait) },
      );
      return;
    }
    let payload;
    try {
      payload = JSON.parse(await readBody(request));
    } catch (error) {
      if (error instanceof InputError) throw error;
      throw new InputError("invalid_json", "보낸 내용을 읽을 수 없어요.");
    }
    const { entry, replaced } = await store.upsert(payload?.name, payload?.url);
    // 바로 접속해 보고 결과를 함께 알려준다. 오래 걸리면 확인 중으로 둔다.
    await Promise.race([
      statusChecker.check(entry.url),
      new Promise((resolve) => setTimeout(resolve, postCheckMs).unref()),
    ]);
    sendJson(response, replaced ? 200 : 201, {
      community: publicEntry(entry, statusChecker),
      replaced,
    });
  }

  return async function handle(request, response) {
    response.setHeader("x-content-type-options", "nosniff");
    response.setHeader("referrer-policy", "strict-origin-when-cross-origin");
    let pathname = "/";
    try {
      pathname = new URL(request.url ?? "/", "http://localhost").pathname;
    } catch {
      /* 잘못된 요청 주소는 404로 처리한다. */
    }
    try {
      if (pathname === "/healthz") {
        response.writeHead(200, {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
        });
        response.end(request.method === "HEAD" ? undefined : "ok");
        return;
      }
      if (pathname === "/api/communities") {
        if (!store) {
          sendError(response, 503, "unavailable", "지금은 목록을 쓸 수 없어요. 진행자에게 알려 주세요.");
          return;
        }
        if (request.method === "GET") return await listCommunities(response);
        if (request.method === "POST") return await addCommunity(request, response);
        sendError(response, 405, "method_not_allowed", "지원하지 않는 요청이에요.", {
          allow: "GET, POST",
        });
        return;
      }
      if (pathname.startsWith("/api/")) {
        sendError(response, 404, "not_found", "없는 주소예요.");
        return;
      }
      if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { allow: "GET, HEAD" });
        response.end();
        return;
      }
      serveStatic(staticFiles, request, response, pathname);
    } catch (error) {
      if (response.headersSent) {
        response.destroy();
        return;
      }
      if (error instanceof InputError) {
        sendError(response, error.status, error.code, error.message);
        return;
      }
      console.error("요청 처리 실패:", error?.code ?? error?.message ?? error);
      sendError(response, 500, "server_error", "서버에서 문제가 생겼어요. 잠시 후 다시 시도해 주세요.");
    }
  };
}
