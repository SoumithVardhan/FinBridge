import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
  errorFormat: 'colorless',
});

// Log all queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    logger.debug('Prisma Query', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

export { prisma };

// Database connection utility
export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    
    // Test the connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    
    logger.info('✅ Local PostgreSQL Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    
    // Provide helpful error messages for common issues
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        logger.error('💡 PostgreSQL container is not running. Please run:');
        logger.error('   make dev  or  docker-compose up -d');
      } else if (error.message.includes('password authentication failed')) {
        logger.error('💡 Database authentication failed. Check your .env file');
      }
    }
    
    throw error;
  }
};

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('📤 Database disconnected successfully');
  } catch (error) {
    logger.error('❌ Database disconnection error:', error);
  }
};

// Health check
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('❌ Database health check failed:', error);
    return false;
  }
};
