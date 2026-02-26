FROM node:24-alpine AS builder
WORKDIR /app
# Enable corepack to get pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json ./ 
RUN pnpm install
COPY . .
# Bake NEXT_PUBLIC_* vars into the build (required for Next.js client-side usage)
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_UPLOADS_BASE_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_UPLOADS_BASE_URL=$NEXT_PUBLIC_UPLOADS_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN pnpm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# Enable corepack in the runner stage as well
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/public ./public

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/ || exit 1

# Use 'pnpm start' directly
CMD ["pnpm", "start"]
