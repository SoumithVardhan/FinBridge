-- FinBridge Database Initialization Script
-- This script will be automatically executed when the PostgreSQL container starts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create additional indexes for better performance (Prisma will handle table creation)
-- These will be applied after Prisma migrations

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE finbridge_dev TO finbridge;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO finbridge;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO finbridge;

-- Create logs table for application logging
CREATE TABLE IF NOT EXISTS application_logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    service VARCHAR(50),
    user_id VARCHAR(50),
    ip_address INET,
    metadata JSONB
);

-- Create index on timestamp for log queries
CREATE INDEX IF NOT EXISTS idx_application_logs_timestamp ON application_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_application_logs_level ON application_logs(level);

-- Insert default system configurations
INSERT INTO system_configurations (key, value, description) VALUES
('maintenance_mode', 'false', 'Enable/disable maintenance mode'),
('max_login_attempts', '5', 'Maximum login attempts before account lockout'),
('session_timeout', '3600', 'Session timeout in seconds'),
('file_upload_max_size', '10485760', 'Maximum file upload size in bytes'),
('kyc_auto_approval', 'false', 'Enable automatic KYC approval for testing'),
('email_verification_required', 'true', 'Require email verification for new accounts'),
('sms_verification_required', 'true', 'Require SMS verification for new accounts'),
('loan_processing_fee_percentage', '1.0', 'Default loan processing fee percentage'),
('min_credit_score', '650', 'Minimum credit score for loan approval')
ON CONFLICT (key) DO NOTHING;

-- Create sample admin user (password: admin123)
-- This should be removed in production
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@finbridge.com') THEN
        INSERT INTO users (
            id,
            email,
            email_verified,
            password_hash,
            role,
            first_name,
            last_name,
            phone,
            phone_verified,
            kyc_status,
            is_active,
            created_at
        ) VALUES (
            gen_random_uuid(),
            'admin@finbridge.com',
            true,
            '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2XRXPK.l2O', -- admin123
            'ADMIN',
            'Admin',
            'User',
            '+91-9999999999',
            true,
            'VERIFIED',
            true,
            NOW()
        );
    END IF;
END $$;

-- Create sample demo user (password: demo123)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'demo@finbridge.com') THEN
        INSERT INTO users (
            id,
            email,
            email_verified,
            password_hash,
            role,
            first_name,
            last_name,
            phone,
            phone_verified,
            kyc_status,
            is_active,
            pan_number,
            aadhar_number,
            address_line1,
            city,
            state,
            pincode,
            created_at
        ) VALUES (
            gen_random_uuid(),
            'demo@finbridge.com',
            true,
            '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2XRXPK.l2O', -- demo123
            'USER',
            'Demo',
            'User',
            '+91-9876543210',
            true,
            'VERIFIED',
            true,
            'ABCDE1234F',
            '123456789012',
            '123 Demo Street',
            'Mumbai',
            'Maharashtra',
            '400001',
            NOW()
        );
    END IF;
END $$;

-- Performance optimization
ANALYZE;

-- Log the completion
INSERT INTO application_logs (level, message, service) 
VALUES ('INFO', 'Database initialization completed successfully', 'database');
