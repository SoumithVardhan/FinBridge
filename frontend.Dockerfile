# Production-optimized Frontend Dockerfile
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Dependencies stage - separate for better caching
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile --production=false

# Builder stage - build the app
FROM base AS builder
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile --production=false

COPY . .

# Set build environment variables
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# Build the application
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx/frontend.conf /etc/nginx/conf.d/default.conf

# Set permissions (nginx user already exists in nginx:alpine)
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chown -R nginx:nginx /var/cache/nginx
RUN chown -R nginx:nginx /var/log/nginx
RUN chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Switch to nginx user
USER nginx

CMD ["nginx", "-g", "daemon off;"]
