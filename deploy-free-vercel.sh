#!/bin/bash

# SR Associates - FREE Backend Deployment to Vercel
echo "🚀 SR Associates - FREE Vercel Backend Deployment"
echo "==============================================="

cd server

# Check if we're in the server directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the server directory"
    exit 1
fi

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Create vercel.json for serverless deployment
cat > vercel.json << 'EOL'
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["prisma/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
EOL

echo "🏗️ Building server..."
npm install
npm run build

echo "🔐 Please login to Vercel..."
vercel login

echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Backend deployment complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Configure environment variables in Vercel dashboard:"
echo "   - DATABASE_URL (from Supabase)"
echo "   - JWT_ACCESS_SECRET"
echo "   - CORS_ORIGIN"
echo "2. Update frontend environment variables with your Vercel URL"
echo "3. Test API endpoints"
echo ""
echo "💰 Total Cost: FREE! 🎉"
echo "🔗 Your API: https://[your-api].vercel.app"