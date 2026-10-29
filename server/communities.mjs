// 2주차 "서로 놀러가기" 커뮤니티 목록: 이름과 Cloudflare 임시 터널 주소만 보관한다.
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export const NAME_MAX = 30;
export const MAX_ENTRIES = 80;
export const TTL_MS = 12 * 60 * 60 * 1000;

export class InputError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export function normalizeName(raw) {
  if (typeof raw !== "string") {
    throw new InputError("invalid_name", "커뮤니티 이름을 입력해 주세요.");
  }
  // 줄바꿈 같은 공백은 한 칸으로 줄이고, 남은 제어 문자와 보이지 않는 서식 문자는 지운다.
  const name = raw
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .replace(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu, "")
    .trim();
  if (!name) {
    throw new InputError("invalid_name", "커뮤니티 이름을 입력해 주세요.");
  }
  if ([...name].length > NAME_MAX) {
    throw new InputError(
      "invalid_name",
      `커뮤니티 이름은 ${NAME_MAX}자까지 쓸 수 있어요.`,
    );
  }
  return { name, key: name.toLocaleLowerCase("ko-KR") };
}

const TUNNEL_HOST = /^[a-z0-9]+(?:-[a-z0-9]+)*\.trycloudflare\.com$/;

export function normalizeTunnelUrl(raw) {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new InputError("invalid_url", "터널 주소를 입력해 주세요.");
  }
  let text = raw.trim();
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) text = `https://${text}`;
  let url;
  try {
    url = new URL(text);
  } catch {
    throw new InputError("invalid_url", "주소 형식이 올바르지 않아요.");
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    !TUNNEL_HOST.test(url.hostname)
  ) {
    throw new InputError(
      "invalid_url",
      "https://….trycloudflare.com 형식의 터널 주소만 올릴 수 있어요.",
    );
  }
  return `https://${url.hostname}`;
}

export class CommunityStore {
  constructor({ file, now = () => Date.now(), ttlMs = TTL_MS, maxEntries = MAX_ENTRIES }) {
    this.file = file;
    this.now = now;
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
    this.entries = [];
    this.writing = Promise.resolve();
  }

  async load() {
    await mkdir(path.dirname(this.file), { recursive: true });
    try {
      const saved = JSON.parse(await readFile(this.file, "utf8"));
      const list = Array.isArray(saved?.communities) ? saved.communities : [];
      this.entries = list.flatMap((entry) => {
        try {
          const { name, key } = normalizeName(entry.name);
          const url = normalizeTunnelUrl(entry.url);
          const updatedAt = Date.parse(entry.updatedAt);
          return Number.isFinite(updatedAt) ? [{ name, key, url, updatedAt }] : [];
        } catch {
          return [];
        }
      });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      this.entries = [];
    }
    this.prune();
    // 시작할 때 한 번 써서 저장 경로에 쓸 수 있는지 확인한다.
    await this.save();
  }

  prune() {
    const cutoff = this.now() - this.ttlMs;
    const before = this.entries.length;
    this.entries = this.entries.filter((entry) => entry.updatedAt > cutoff);
    return before !== this.entries.length;
  }

  list() {
    if (this.prune()) this.save().catch(() => {});
    return [...this.entries].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  async upsert(rawName, rawUrl) {
    const { name, key } = normalizeName(rawName);
    const url = normalizeTunnelUrl(rawUrl);
    this.prune();
    const replaced = this.entries.some(
      (entry) => entry.key === key || entry.url === url,
    );
    const others = this.entries.filter(
      (entry) => entry.key !== key && entry.url !== url,
    );
    if (others.length >= this.maxEntries) {
      throw new InputError(
        "full",
        "목록이 가득 찼어요. 진행자에게 알려 주세요.",
        409,
      );
    }
    const entry = { name, key, url, updatedAt: this.now() };
    const previous = this.entries;
    this.entries = [...others, entry];
    try {
      await this.save();
    } catch (error) {
      this.entries = previous;
      throw error;
    }
    return { entry, replaced };
  }

  save() {
    const data = {
      version: 1,
      communities: this.entries.map(({ name, url, updatedAt }) => ({
        name,
        url,
        updatedAt: new Date(updatedAt).toISOString(),
      })),
    };
    // 쓰기를 한 줄로 세우고, 임시 파일을 만든 뒤 이름을 바꿔 반쯤 쓴 파일이 남지 않게 한다.
    const run = this.writing.then(async () => {
      const temporary = `${this.file}.${process.pid}.tmp`;
      await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, {
        mode: 0o600,
      });
      await rename(temporary, this.file);
    });
    this.writing = run.catch(() => {});
    return run;
  }
}

// 터널이 닫히면 주소의 DNS가 사라지고, 터널은 열렸지만 내 서버가 꺼져 있으면 Cloudflare가 5xx를 돌려준다.
export async function probeTunnel(url, { fetchImpl = fetch, timeoutMs = 4000 } = {}) {
  try {
    const response = await fetchImpl(url, {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
      headers: { "user-agent": "kucc-vibe-study-status/1" },
    });
    response.body?.cancel().catch(() => {});
    return response.status < 500 ? "online" : "offline";
  } catch (error) {
    return error?.cause?.code === "ENOTFOUND" ? "offline" : "unknown";
  }
}

export class StatusChecker {
  constructor({ probe = probeTunnel, now = () => Date.now(), freshMs = 20_000, maxConcurrent = 6 } = {}) {
    this.probe = probe;
    this.now = now;
    this.freshMs = freshMs;
    this.maxConcurrent = maxConcurrent;
    this.results = new Map();
    this.running = new Map();
    this.queue = [];
    this.active = 0;
  }

  get(url) {
    return this.results.get(url) ?? { status: "unknown", checkedAt: null };
  }

  forget(urls) {
    const keep = new Set(urls);
    for (const url of this.results.keys()) {
      if (!keep.has(url)) this.results.delete(url);
    }
  }

  // 오래된 결과만 백그라운드에서 다시 확인한다.
  refresh(urls) {
    for (const url of urls) {
      const last = this.results.get(url);
      if (!last || this.now() - last.checkedAt >= this.freshMs) {
        this.check(url).catch(() => {});
      }
    }
  }

  check(url) {
    if (this.running.has(url)) return this.running.get(url);
    const task = new Promise((resolve) => this.queue.push({ url, resolve }));
    this.running.set(url, task);
    this.drain();
    return task;
  }

  drain() {
    while (this.active < this.maxConcurrent && this.queue.length) {
      const { url, resolve } = this.queue.shift();
      this.active += 1;
      Promise.resolve(this.probe(url))
        .catch(() => "unknown")
        .then((status) => {
          const result = { status, checkedAt: this.now() };
          this.results.set(url, result);
          resolve(result);
        })
        .finally(() => {
          this.active -= 1;
          this.running.delete(url);
          this.drain();
        });
    }
  }
}

export class RateLimiter {
  constructor({ windowMs, max, now = () => Date.now() }) {
    this.windowMs = windowMs;
    this.max = max;
    this.now = now;
    this.hits = new Map();
  }

  // 허용하면 0, 막으면 다시 시도할 수 있을 때까지의 초를 돌려준다.
  take(key) {
    const now = this.now();
    const recent = (this.hits.get(key) ?? []).filter(
      (time) => now - time < this.windowMs,
    );
    if (recent.length >= this.max) {
      this.hits.set(key, recent);
      return Math.max(1, Math.ceil((recent[0] + this.windowMs - now) / 1000));
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 5000) {
      for (const [other, times] of this.hits) {
        if (!times.some((time) => now - time < this.windowMs)) {
          this.hits.delete(other);
        }
      }
    }
    return 0;
  }
}
