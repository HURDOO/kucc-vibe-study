FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1
LABEL org.opencontainers.image.source="https://github.com/HURDOO/kucc-vibe-study" \
      org.opencontainers.image.title="KUCC 바이브코딩 스터디" \
      org.opencontainers.image.description="KUCC 7주 바이브코딩 스터디 교안, 발표 자료와 커뮤니티 목록"
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080 \
    DIST_DIR=/app/dist \
    DATA_DIR=/data
WORKDIR /app
COPY server/index.mjs server/app.mjs server/communities.mjs server/static.mjs ./server/
COPY --from=build /app/dist ./dist
RUN chmod -R a+rX /app
USER node
EXPOSE 8080
STOPSIGNAL SIGTERM
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
CMD ["node", "server/index.mjs"]
