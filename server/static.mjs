// dist의 정적 빌드를 메모리에 올려 두고 제공한다(이전 Caddy 설정과 같은 캐시 규칙).
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".txt", ".svg"]);

export async function loadStaticFiles(root) {
  const files = new Map();
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!entry.isFile()) continue;
      const body = await readFile(full);
      const extension = path.extname(entry.name).toLowerCase();
      const urlPath = `/${path.relative(root, full).split(path.sep).join("/")}`;
      files.set(urlPath, {
        body,
        gzip:
          COMPRESSIBLE.has(extension) && body.length > 1024
            ? gzipSync(body, { level: 9 })
            : null,
        type: TYPES[extension] ?? "application/octet-stream",
        etag: `"${createHash("sha256").update(body).digest("base64url").slice(0, 27)}"`,
        cacheControl: urlPath.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      });
    }
  }
  await walk(root);
  if (!files.has("/index.html")) {
    throw new Error(`${root}/index.html이 없습니다. 먼저 npm run build를 실행하세요.`);
  }
  return files;
}

export function serveStatic(files, request, response, pathname) {
  let key;
  try {
    key = decodeURIComponent(pathname);
  } catch {
    key = null;
  }
  const file = key === "/" ? files.get("/index.html") : key && files.get(key);
  if (!file) {
    response.writeHead(404, {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache",
    });
    response.end("Not Found");
    return;
  }
  const headers = {
    "content-type": file.type,
    "cache-control": file.cacheControl,
    etag: file.etag,
  };
  if (file.gzip) headers.vary = "Accept-Encoding";
  if (request.headers["if-none-match"] === file.etag) {
    response.writeHead(304, headers);
    response.end();
    return;
  }
  const useGzip =
    file.gzip && /\bgzip\b/.test(request.headers["accept-encoding"] ?? "");
  const body = useGzip ? file.gzip : file.body;
  if (useGzip) headers["content-encoding"] = "gzip";
  headers["content-length"] = body.length;
  response.writeHead(200, headers);
  response.end(request.method === "HEAD" ? undefined : body);
}
