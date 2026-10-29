import { defineConfig } from "vite";

// 개발 서버에서는 커뮤니티 목록 API를 로컬 Node 서버(npm run serve:local)로 넘긴다.
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8080",
    },
  },
});
