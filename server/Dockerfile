# Fixed Production Dockerfile for Backend (ARM64 compatible)
FROM node:18-alpine AS builder

# Install required dependencies for Prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client with correct binary
RUN npx prisma generate

# Production stage
FROM node:18-alpine AS production

# Install OpenSSL and other required libraries
RUN apk add --no-cache openssl openssl-dev libc6-compat curl

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

# Copy built application
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY . .

# Build the application
RUN npm run build

# Create necessary directories
RUN mkdir -p uploads logs && \
    chown -R backend:nodejs /app

# Switch to non-root user
USER backend

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
CMD ["npm", "start"]
