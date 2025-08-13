# 🏦 FinBridge - Financial Services Platform

A comprehensive financial services platform built with React, Node.js, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Secure registration and login
- **Dashboard**: Financial overview and portfolio management  
- **Loans**: Loan application and management
- **Investments**: Mutual funds and SIP management
- **Insurance**: Policy management and claims
- **KYC**: Document verification system
- **Portfolio Tracking**: Investment performance monitoring

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Prisma ORM** for database operations
- **PostgreSQL** for data storage
- **Redis** for caching
- **JWT** for authentication

### DevOps
- **Docker** & Docker Compose
- **Adminer** for database management
- **MailHog** for email testing

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd FinBridge
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your secure values
nano .env
```

**⚠️ Important**: Update all secrets in `.env` file:
- Database passwords
- JWT secrets (minimum 32 characters)
- Encryption keys
- Cookie secrets

### 3. Start Application
```bash
# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/api/docs
- **Database Admin**: http://localhost:8080
- **Email Testing**: http://localhost:8025

## 📁 Project Structure

```
FinBridge/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Backend utilities
│   │   └── config/        # Configuration files
│   └── prisma/            # Database schema and migrations
├── public/                # Static assets
├── docker-compose.yml     # Docker services configuration
├── .env.example          # Environment template
└── README.md             # This file
```

## 🔒 Security Features

- **JWT Authentication** with access/refresh tokens
- **Password Hashing** with bcrypt
- **Rate Limiting** for API endpoints
- **CORS Protection** configured
- **Environment Variables** for sensitive data
- **Input Validation** with Joi schemas
- **SQL Injection Protection** via Prisma ORM

## 📝 API Documentation

Interactive API documentation is available at:
- **Local**: http://localhost:5001/api/docs
- **Swagger/OpenAPI** specification included

### Key Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get user profile
- `POST /api/loans/apply` - Apply for loan
- `GET /api/investments` - Get investments
- `POST /api/insurance/apply` - Apply for insurance

## 🗄️ Database

### Schema
- **Users**: Authentication and profile data
- **Loans**: Loan applications and management
- **Investments**: Investment portfolios
- **Insurance**: Policy management
- **Transactions**: Financial transaction history
- **Documents**: KYC document storage

### Migrations
```bash
# Run database migrations
docker exec finbridge_backend npx prisma migrate deploy

# Generate Prisma client
docker exec finbridge_backend npx prisma generate

# View database
docker exec finbridge_backend npx prisma studio
```

## 🧪 Testing

### Manual Testing
1. **Registration**: Create new user account
2. **Login**: Authenticate with credentials
3. **Dashboard**: View financial overview
4. **Loan Application**: Apply for different loan types
5. **Investment**: Explore mutual fund options
6. **KYC**: Upload verification documents

### API Testing
```bash
# Health check
curl http://localhost:5001/api/health

# Register user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "Test@123",
    "confirmPassword": "Test@123"
  }'
```

## 🚀 Deployment

### Production Checklist
- [ ] Update all environment variables
- [ ] Change default passwords
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure email service (replace MailHog)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Environment Variables
```bash
# Required for production
NODE_ENV=production
POSTGRES_PASSWORD=<secure-password>
JWT_ACCESS_SECRET=<secure-32-char-secret>
JWT_REFRESH_SECRET=<secure-32-char-secret>
ENCRYPTION_KEY=<secure-32-char-key>
```

## 🛟 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check PostgreSQL status
docker exec finbridge_postgres pg_isready -U finbridge_user -d finbridge

# Reset database
docker-compose down
docker volume rm finbridge_postgres_data
docker-compose up -d
```

**Frontend API Errors**
```bash
# Check backend logs
docker-compose logs backend

# Verify environment variables
docker exec finbridge_frontend env | grep VITE_API_URL
```

**Port Conflicts**
```bash
# Check port usage
lsof -i :3000
lsof -i :5001

# Modify ports in docker-compose.yml if needed
```

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the troubleshooting section
- Review API documentation

---

**⚠️ Security Note**: Never commit `.env` files or expose sensitive credentials. Always use the `.env.example` template for sharing configuration structure.
