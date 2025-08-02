"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const password_1 = require("../src/utils/password");
const logger_1 = require("../src/utils/logger");
const prisma = new client_1.PrismaClient();
async function main() {
    logger_1.logger.info('🌱 Starting database seeding...');
    try {
        const adminPassword = await password_1.PasswordService.hashPassword('Admin@123');
        const admin = await prisma.user.upsert({
            where: { email: 'admin@finbridge.com' },
            update: {},
            create: {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@finbridge.com',
                phone: '9876543210',
                passwordHash: adminPassword,
                role: client_1.UserRole.ADMIN,
                kycStatus: client_1.KYCStatus.VERIFIED,
                emailVerified: true,
                phoneVerified: true,
                isActive: true,
                city: 'Hyderabad',
                state: 'Telangana',
                country: 'India'
            }
        });
        const kycPassword = await password_1.PasswordService.hashPassword('Kyc@123');
        const kycOfficer = await prisma.user.upsert({
            where: { email: 'kyc@finbridge.com' },
            update: {},
            create: {
                firstName: 'KYC',
                lastName: 'Officer',
                email: 'kyc@finbridge.com',
                phone: '9876543211',
                passwordHash: kycPassword,
                role: client_1.UserRole.KYC_OFFICER,
                kycStatus: client_1.KYCStatus.VERIFIED,
                emailVerified: true,
                phoneVerified: true,
                isActive: true,
                city: 'Hyderabad',
                state: 'Telangana',
                country: 'India'
            }
        });
        const loanPassword = await password_1.PasswordService.hashPassword('Loan@123');
        const loanOfficer = await prisma.user.upsert({
            where: { email: 'loans@finbridge.com' },
            update: {},
            create: {
                firstName: 'Loan',
                lastName: 'Officer',
                email: 'loans@finbridge.com',
                phone: '9876543212',
                passwordHash: loanPassword,
                role: client_1.UserRole.LOAN_OFFICER,
                kycStatus: client_1.KYCStatus.VERIFIED,
                emailVerified: true,
                phoneVerified: true,
                isActive: true,
                city: 'Hyderabad',
                state: 'Telangana',
                country: 'India'
            }
        });
        const testUser1Password = await password_1.PasswordService.hashPassword('Test@123');
        const testUser1 = await prisma.user.upsert({
            where: { email: 'john.doe@example.com' },
            update: {},
            create: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '9876543213',
                passwordHash: testUser1Password,
                role: client_1.UserRole.USER,
                kycStatus: client_1.KYCStatus.VERIFIED,
                emailVerified: true,
                phoneVerified: true,
                isActive: true,
                dateOfBirth: new Date('1990-01-15'),
                gender: 'male',
                addressLine1: '123 Tech Street',
                city: 'Hyderabad',
                state: 'Telangana',
                pincode: '500001',
                country: 'India'
            }
        });
        const testUser2Password = await password_1.PasswordService.hashPassword('Test@123');
        const testUser2 = await prisma.user.upsert({
            where: { email: 'jane.smith@example.com' },
            update: {},
            create: {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                phone: '9876543214',
                passwordHash: testUser2Password,
                role: client_1.UserRole.USER,
                kycStatus: client_1.KYCStatus.PENDING,
                emailVerified: true,
                phoneVerified: false,
                isActive: true,
                dateOfBirth: new Date('1985-06-20'),
                gender: 'female',
                addressLine1: '456 Finance Avenue',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                country: 'India'
            }
        });
        const systemConfigs = [
            {
                key: 'MAX_LOAN_AMOUNT',
                value: '10000000',
                description: 'Maximum loan amount in rupees'
            },
            {
                key: 'MIN_LOAN_AMOUNT',
                value: '100000',
                description: 'Minimum loan amount in rupees'
            },
            {
                key: 'MAX_LOAN_TENURE',
                value: '360',
                description: 'Maximum loan tenure in months'
            },
            {
                key: 'MIN_SIP_AMOUNT',
                value: '500',
                description: 'Minimum SIP amount in rupees'
            },
            {
                key: 'MAX_INSURANCE_COVERAGE',
                value: '50000000',
                description: 'Maximum insurance coverage in rupees'
            },
            {
                key: 'KYC_DOCUMENT_EXPIRY_DAYS',
                value: '30',
                description: 'Number of days after which uploaded KYC documents expire if not verified'
            },
            {
                key: 'PASSWORD_RESET_EXPIRY_MINUTES',
                value: '15',
                description: 'Password reset OTP expiry time in minutes'
            },
            {
                key: 'EMAIL_VERIFICATION_EXPIRY_MINUTES',
                value: '15',
                description: 'Email verification OTP expiry time in minutes'
            }
        ];
        for (const config of systemConfigs) {
            await prisma.systemConfiguration.upsert({
                where: { key: config.key },
                update: { value: config.value, description: config.description },
                create: config
            });
        }
        logger_1.logger.info('✅ Database seeding completed successfully!');
        logger_1.logger.info(`👤 Admin User: admin@finbridge.com / Admin@123`);
        logger_1.logger.info(`👤 KYC Officer: kyc@finbridge.com / Kyc@123`);
        logger_1.logger.info(`👤 Loan Officer: loans@finbridge.com / Loan@123`);
        logger_1.logger.info(`👤 Test User 1: john.doe@example.com / Test@123`);
        logger_1.logger.info(`👤 Test User 2: jane.smith@example.com / Test@123`);
    }
    catch (error) {
        logger_1.logger.error('❌ Database seeding failed:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main()
    .then(async () => {
    process.exit(0);
})
    .catch(async (e) => {
    logger_1.logger.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map