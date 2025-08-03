#!/bin/bash

echo "🔧 Building FinBridge with fixes..."

# Navigate to project directory
cd /Users/soumithvardhan/Desktop/FinBridge

# Install dependencies if needed
npm install

# Build the project
npm run build

echo "✅ Build complete!"
echo ""
echo "🚀 Next steps:"
echo "1. The TypeScript errors should be fixed now"
echo "2. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Fix TypeScript errors and enhance debugging'"
echo "   git push origin main"
echo ""
echo "3. After deployment, check browser console for detailed debug info"
echo "4. Try registration and watch Network tab for POST requests"
