# syntax=docker/dockerfile:1
# Node 26 LTS: keep it in step with .nvmrc (Dependabot ignores Node majors; move with the next LTS).

FROM node:26-alpine AS builder
WORKDIR /app
ENV STORYBOOK_DISABLE_TELEMETRY=1
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build-storybook

FROM caddy:2-alpine
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/storybook-static /srv
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
