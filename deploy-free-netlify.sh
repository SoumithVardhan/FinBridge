#!/bin/bash

# SR Associates - FREE Netlify Deployment Script
echo "🎉 SR Associates - FREE Netlify Deployment"
echo "=========================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the FinBridge project root directory"
    exit 1
fi

# Install Netlify CLI if not present
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "🏗️ Building application for production..."
npm install
npm run build

# Create _redirects file for SPA routing
echo "/* /index.html 200" > dist/_redirects

# Create netlify.toml if it doesn't exist
if [ ! -f "netlify.toml" ]; then
    cat > netlify.toml << 'EOL'
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  VITE_NODE_ENV = "production"
  VITE_APP_NAME = "SR Associates"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
EOL
fi

echo "🚀 Deploying to Netlify..."

# Login to Netlify
echo "🔐 Please login to Netlify..."
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=dist

echo "✅ Deployment complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Your site is live on Netlify!"
echo "2. Set up custom domain:"
echo "   netlify domains:add srassociates.com"
echo "3. Configure DNS records with your domain provider"
echo "4. Set up Supabase database (FREE): https://supabase.com"
echo "5. Deploy backend to Vercel (FREE): cd server && vercel"
echo ""
echo "💰 Total Cost: FREE! 🎉"
echo "📱 Your website: https://[your-site].netlify.app"