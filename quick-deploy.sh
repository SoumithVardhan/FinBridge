#!/bin/bash
# Quick deploy script for FinBridge

echo "🚀 Starting FinBridge deployment process..."

# Build the frontend
echo "📦 Building frontend..."
npm run build

echo "✅ Build complete! Ready for deployment."
echo ""
echo "🔧 Next steps:"
echo "1. Commit and push your changes to trigger Netlify deployment"
echo "2. Check the browser console for debug information"
echo "3. Try the registration process"
echo ""
echo "📊 Environment check:"
echo "API URL should be: https://sr-associates-api.vercel.app/api"
echo ""
echo "🐛 Debug info will appear in browser console when you visit the site"
