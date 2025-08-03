# Complete FinBridge API Endpoints

Your updated API now includes ALL the original endpoints from your Docker setup:

## 🔐 Authentication Endpoints

### POST /api/auth/register
- Register new user with full validation
- Password hashing with bcrypt
- JWT token generation
- Connects to Supabase database

### POST /api/auth/login  
- User authentication with email/password
- Account status validation (active/blocked)
- JWT token generation
- Redis session management

### POST /api/auth/refresh
- Refresh expired access tokens
- Redis-based token validation
- Secure token rotation

### POST /api/auth/logout
- Secure logout with token revocation
- Redis cleanup
- Requires authentication

### GET /api/auth/profile
- Get current user profile
- Full user data retrieval
- Requires authentication

### POST /api/auth/forgot-password
- Password reset request
- OTP generation and storage
- Email enumeration protection

### POST /api/auth/reset-password
- Password reset with OTP validation
- Token expiration handling
- Secure password update

### POST /api/auth/change-password
- Change password for authenticated users
- Current password verification
- Token revocation for security

### POST /api/auth/verify-email
- Email verification with OTP
- Account activation
- Requires authentication

### POST /api/auth/send-email-verification
- Send email verification code
- OTP generation and storage
- Requires authentication

## 🏥 System Endpoints

### GET /api/health
- Database connectivity check (Supabase)
- Redis connectivity check (Upstash)
- System status monitoring

### GET /api
- API information and available endpoints
- Version information
- Environment status

### GET /
- Welcome message
- Basic API documentation links

## 🔧 Production Features

✅ **Complete Database Integration**: Supabase PostgreSQL
✅ **Redis Caching**: Upstash Redis for sessions
✅ **JWT Authentication**: Access & refresh tokens
✅ **Rate Limiting**: Prevents abuse
✅ **CORS Configuration**: Netlify + localhost support
✅ **Password Security**: bcrypt hashing
✅ **Input Validation**: Comprehensive validation
✅ **Error Handling**: Production-ready error responses
✅ **Health Monitoring**: System status endpoints
✅ **Security Headers**: Production security
✅ **Environment Variables**: Complete configuration

## 🚀 Production Stack

```
Frontend (Netlify) → Backend (Vercel) → Database (Supabase) → Cache (Upstash Redis)
```

All endpoints are now production-ready and will work with your full stack deployment!
