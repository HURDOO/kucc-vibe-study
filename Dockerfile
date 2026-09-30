FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY tsconfig.json index.html ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM caddy:2-alpine@sha256:6aeddd44c3078b0f9a35206472a11420648a79c184603ef95957d0a20044cb2b
LABEL org.opencontainers.image.source="https://github.com/HURDOO/kucc-vibe-study" \
      org.opencontainers.image.title="KUCC 바이브코딩 스터디" \
      org.opencontainers.image.description="KUCC 7주 바이브코딩 스터디 교안과 발표 자료"
ENV XDG_CONFIG_HOME=/tmp/config XDG_DATA_HOME=/tmp/data
COPY --chmod=644 docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
RUN setcap -r /usr/bin/caddy && chmod -R a+rX /srv
USER 65532:65532
EXPOSE 8080
STOPSIGNAL SIGTERM
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["caddy"]
CMD ["run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
