FROM node:20-bookworm-slim AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
ENV HUSKY=0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
ENV HUSKY=0
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG API_URL
ARG DUMMY_TOKEN_EXPIRES_IN_MINS
ARG SESSION_SECRET
ENV API_URL=$API_URL
ENV DUMMY_TOKEN_EXPIRES_IN_MINS=$DUMMY_TOKEN_EXPIRES_IN_MINS
ENV SESSION_SECRET=$SESSION_SECRET

ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir .next && chown node:node .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

CMD ["node", "server.js"]
