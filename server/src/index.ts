import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { redisService } from './config/redis';
import { logger } from './utils/logger';
import App from './app';

// Load environment variables
dotenv.config();

async function startServer() {
  try {
    // Validate required environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'JWT_ACCESS_SECRET',
      'JWT_REFRESH_SECRET',
      'REDIS_URL'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    // Connect to database
    await connectDatabase();
    logger.info('✅ Database connected successfully');

    // Connect to Redis
    await redisService.connect();
    logger.info('✅ Redis connected successfully');

    // Initialize Express app
    const app = new App();
    const PORT = process.env.PORT || 5000;

    // Start server
    const server = app.app.listen(PORT, () => {
      logger.info(`🚀 FinBridge API Server running on port ${PORT}`);
      logger.info(`🔒 Security: Helmet, CORS, Rate Limiting enabled`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`📊 Health Check: http://localhost:${PORT}/api/health`);
      
      if (process.env.SWAGGER_ENABLED === 'true') {
        logger.info(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
      }
    });

    // Handle server errors
    server.on('error', (error: Error) => {
      logger.error('Server error:', error);
      process.exit(1);
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer().catch((error) => {
  logger.error('Server startup failed:', error);
  process.exit(1);
});
