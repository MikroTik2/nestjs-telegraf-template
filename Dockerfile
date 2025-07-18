FROM node:20.12.0 AS base

FROM base AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=nodejs:nodejs package.json ./

RUN npm install --production

COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist
COPY --chown=nodejs:nodejs --from=builder /app/prisma/generated ./prisma/generated

CMD ["node", "dist/main"]