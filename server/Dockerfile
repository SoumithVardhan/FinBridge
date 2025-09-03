# Production-optimized Backend Dockerfile
FROM node:18-alpine AS base
RUN apk add --no-cache openssl libc6-compat curl
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci --frozen-lockfile --production=false
RUN npx prisma generate

# Builder stage
FROM base AS builder
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
COPY tsconfig.json ./
RUN npm ci --frozen-lockfile --production=false
RUN npx prisma generate

COPY src ./src/
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S backend -u 1001

# Copy built app and dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Create directories and set permissions
RUN mkdir -p uploads logs
RUN chown -R backend:nodejs /app

# Switch to non-root user
USER backend

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["npm", "start"]
