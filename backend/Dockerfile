# сборка
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# продакшн-запуск
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/start.sh ./start.sh
COPY --from=builder /app/ormconfig.ts ./ormconfig.ts
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/public /app/public

RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["sh", "./start.sh"]