#!/usr/bin/env node
// 정적 사이트와 2주차 커뮤니티 목록 API를 함께 제공하는 서버
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.mjs";
import { CommunityStore, StatusChecker } from "./communities.mjs";
import { loadStaticFiles } from "./static.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 8080);
const host = process.env.HOST ?? "0.0.0.0";
const distDir = path.resolve(process.env.DIST_DIR ?? path.join(here, "../dist"));
const dataDir = path.resolve(process.env.DATA_DIR ?? "/data");

const staticFiles = await loadStaticFiles(distDir);

let store = new CommunityStore({ file: path.join(dataDir, "communities.json") });
try {
  await store.load();
} catch (error) {
  // 저장소를 쓸 수 없어도 수업 자료는 계속 제공한다.
  console.error(`커뮤니티 목록 저장소를 쓸 수 없습니다 (${dataDir}):`, error.code ?? error.message);
  store = null;
}

const server = createServer(
  createApp({ staticFiles, store, statusChecker: new StatusChecker() }),
);
server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.keepAliveTimeout = 5_000;
server.listen(port, host, () => {
  console.log(`listening on http://${host}:${port} (files ${staticFiles.size}, communities ${store ? "on" : "off"})`);
});

function shutdown() {
  server.close(async () => {
    await store?.writing;
    process.exit(0);
  });
  server.closeIdleConnections();
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
