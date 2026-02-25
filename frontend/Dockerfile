FROM node:24-alpine AS builder
WORKDIR /app
# Enable corepack to get pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json ./ 
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# Enable corepack in the runner stage as well
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Use 'pnpm start' directly
CMD ["pnpm", "start"]
