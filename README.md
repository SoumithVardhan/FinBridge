# SR Associates - Comprehensive Financial Services Platform

A modern, responsive financial services platform built with **React.js + Vite + TypeScript + Tailwind CSS**, featuring comprehensive loan, insurance, and mutual fund solutions with interactive calculators and customer portal.

## 🏢 About SR Associates

**"Your Success is our Satisfaction"**

SR Associates is a trusted financial services company based in Guntur, Andhra Pradesh, providing comprehensive financial solutions including education loans, personal loans, business loans, home loans, vehicle loans, insurance, and mutual fund services with personalized guidance and expert consultation.

## 🌟 Features

### Core Services
- **Comprehensive Loans**: Education, Personal, Business, Home, and Vehicle loans with EMI calculator
- **Complete Insurance**: Life, Health, Motor, and General insurance with instant quotes
- **Mutual Funds**: Expert-curated investment portfolios with SIP calculator and fund comparison
- **Customer Portal**: Secure dashboard for application tracking and portfolio management

### Interactive Tools
- **EMI Calculator**: Real-time loan payment calculations with sliders
- **SIP Calculator**: Systematic Investment Plan projections with compound interest
- **Insurance Quote Generator**: Instant premium calculations and plan comparison
- **Investment Projections**: Dynamic calculation of returns and maturity values

### Modern Design
- Responsive design optimized for all devices (desktop, tablet, mobile)
- Modern gradient backgrounds with SR Associates red theme
- Interactive hover effects and smooth animations
- Professional color scheme with custom Tailwind configuration
- Lucide React icons integration

## 🛠️ Tech Stack

- **Frontend**: React.js 18.x with TypeScript
- **Build Tool**: Vite 4.x for fast development and building
- **Styling**: Tailwind CSS 3.x with custom SR Associates branding
- **Icons**: Lucide React for modern icon system
- **Animations**: Framer Motion for smooth animations
- **State Management**: React hooks and context
- **Type Safety**: Full TypeScript implementation

## 📁 Project Structure

```
FinBridge/
├── src/
│   ├── components/
│   │   ├── Calculators/
│   │   │   ├── EMICalculator.tsx
│   │   │   └── SIPCalculator.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── Sections/
│   │   │   ├── HeroSection.tsx
│   │   │   └── ServicesOverview.tsx
│   │   └── UI/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoansPage.tsx
│   │   ├── InsurancePage.tsx
│   │   ├── MutualFundsPage.tsx
│   │   ├── CustomerPortalPage.tsx
│   │   └── ContactPage.tsx
│   ├── constants/
│   │   └── brandConstants.ts
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── utils/
│   │   ├── calculations.ts
│   │   ├── validation.ts
│   │   └── typeHelpers.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the project**:
   ```bash
   cd ~/Desktop/FinBridge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   The app will automatically open at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎯 Services Offered

### Loan Services
- **Education Loans**: Fund your academic dreams with competitive rates from 8.5% onwards
- **Personal Loans**: Quick approval with minimal documentation from 10.5% onwards  
- **Home Loans**: Make your dream home reality with rates from 8.75% onwards
- **Business Loans**: Grow your business with flexible terms from 11% onwards
- **Vehicle Loans**: Get your dream vehicle with up to 90% financing from 9.5% onwards

### Insurance Services
- **Life Insurance**: Secure your family's future with comprehensive coverage
- **Health Insurance**: Cashless treatment with wide hospital network
- **Vehicle Insurance**: Complete protection with quick claim settlement
- **General Insurance**: Home, travel, and other insurance solutions

### Investment Services
- **Mutual Funds**: Expert-curated portfolios for wealth creation
- **SIP Planning**: Systematic investment plans for long-term goals
- **Tax Saving**: ELSS and tax-efficient investment options
- **Portfolio Management**: Professional guidance for optimal returns

## 🏆 Why Choose SR Associates

- ✅ **10,000+ Happy Clients** - Trusted by thousands across Andhra Pradesh
- ✅ **₹500Cr+ Loans Processed** - Proven track record of successful financing
- ✅ **99.8% Approval Rate** - High success rate for loan applications
- ✅ **24/7 Customer Support** - Round-the-clock assistance
- ✅ **24 Hour Processing** - Quick turnaround for urgent requirements
- ✅ **RBI Compliant** - Fully regulated and compliant operations
- ✅ **ISO 27001 Certified** - International security standards
- ✅ **Local Expertise** - Deep understanding of Andhra Pradesh market

## 🔧 SR Associates Branding

### Colors
The website uses SR Associates red theme defined in `tailwind.config.js`:
- **Primary**: Red color palette (#dc2626 to #7f1d1d)
- **Secondary**: Green to Emerald for growth indicators
- **Gradients**: Red to dark red for brand consistency
- **Neutral**: Gray scales for text and backgrounds

### Brand Constants
All SR Associates information is centralized in `src/constants/brandConstants.ts`:
- Company information and tagline
- Contact details (Guntur, Andhra Pradesh)
- Service offerings
- Statistics and certifications
- Color schemes and branding elements

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1024px+): Full feature experience with side-by-side layouts
- **Tablet** (768px - 1023px): Adapted layouts with stacked components
- **Mobile** (< 768px): Mobile-first design with hamburger navigation

## 🔒 Security Features

- Form validation on all input fields
- Input sanitization and XSS prevention
- Professional security messaging throughout
- Type-safe API interactions
- RBI compliance indicators

## 📞 Contact SR Associates

**Head Office**: Guntur, Andhra Pradesh, India
- **Email**: info@srassociates.com
- **Phone**: +91 98765 43210
- **WhatsApp**: +91 98765 43210

**Business Hours**:
- Monday - Friday: 9:00 AM - 7:00 PM
- Saturday: 9:00 AM - 5:00 PM
- Sunday: Closed

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Start development server on http://localhost:5173
```

### Production Build
```bash
npm run build  # Creates optimized build in dist/ folder
npm run preview  # Preview production build locally
```

### Deployment Options
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Zero-config deployment with GitHub integration
- **Traditional Hosting**: Upload `dist/` folder contents to any web server
- **Docker**: Containerize the application for cloud deployment

## 🔧 Customization Guide

### Brand Colors
To customize the SR Associates color scheme, edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#dc2626', // Main brand red
    700: '#b91c1c', // Darker red for hover states
    // ... other shades
  }
}
```

### Content Management
Update brand information in `src/constants/brandConstants.ts`:
```typescript
export const COMPANY_INFO = {
  name: 'SR Associates',
  tagline: 'Your Success is our Satisfaction',
  contact: {
    phone: '+91 98765 43210',
    email: 'info@srassociates.com',
    // ... other details
  }
};
```

## 📄 License

© 2025 SR Associates. All rights reserved.

**Proprietary Software**: This website is custom-built for SR Associates and contains proprietary business logic, branding, and service configurations specific to the financial services industry in Andhra Pradesh, India.

---

**Built with ❤️ for SR Associates - Empowering Financial Dreams in Guntur, Andhra Pradesh**

*"Your Success is our Satisfaction" - More than just a tagline, it's our commitment to every client's financial journey.*