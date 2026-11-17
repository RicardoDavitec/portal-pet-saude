FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY apps/api/package.json apps/api/
COPY packages/domain/package.json packages/domain/
COPY packages/ports/package.json packages/ports/
COPY packages/application/package.json packages/application/
COPY adapters/ad-ldap/package.json adapters/ad-ldap/
COPY adapters/prisma-postgres/package.json adapters/prisma-postgres/
COPY adapters/g1-dashboard-http/package.json adapters/g1-dashboard-http/
RUN npm install --workspace=@portal/api --include-workspace-root

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package-lock.json* ./
COPY . .
RUN npx prisma generate \
  && npm run build -w @portal/domain \
  && npm run build -w @portal/ports \
  && npm run build -w @portal/application \
  && npm run build -w @portal/ad-ldap \
  && npm run build -w @portal/prisma-postgres \
  && npm run build -w @portal/g1-dashboard-http \
  && npm run build -w @portal/api

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app /app
COPY apps/api/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 3000
CMD ["/entrypoint.sh"]
