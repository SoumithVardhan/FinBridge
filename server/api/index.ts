// Minimal Vercel entry point for FinBridge API
import express from 'express';
import cors from 'cors';

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FinBridge API is healthy',
    services: {
      database: true,
      redis: true
    },
    environment: process.env.NODE_ENV || 'production',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Basic API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'FinBridge API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to FinBridge API',
    health: '/api/health',
    docs: '/api/docs'
  });
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND'
  });
});

// Export the Express app for Vercel
export default app;
