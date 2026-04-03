FROM oven/bun:latest AS build

WORKDIR /app
COPY search-website/package.json search-website/bun.lock ./
RUN bun install --frozen-lockfile

COPY search-website/ ./
ENV VITE_BASE_PATH=/
RUN bun run build-only

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
