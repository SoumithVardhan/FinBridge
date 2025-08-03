// Vercel entry point for FinBridge API
import dotenv from 'dotenv';
import App from '../src/app';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = new App();

// Export the Express app for Vercel
export default app.app;
