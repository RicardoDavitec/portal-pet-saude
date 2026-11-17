# Nest Dashboard G1 — build context = Dashboard-PetSaude/back
# npm install (não ci): package-lock do back pode divergir do package.json (typeorm ^1.1.0).
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3813
COPY package.json package-lock.json ./
RUN npm install --omit=dev --legacy-peer-deps --no-audit --no-fund
COPY --from=build /app/dist ./dist
EXPOSE 3813
HEALTHCHECK --interval=15s --timeout=5s --retries=8 --start-period=40s \
  CMD node -e "fetch('http://127.0.0.1:3813/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/main.js"]
