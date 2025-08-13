-- PostgreSQL initialization script for FinBridge
-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'UTC';

-- Log successful initialization
SELECT 'FinBridge PostgreSQL database initialized successfully' as status;
