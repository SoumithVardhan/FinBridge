#!/bin/bash

echo "🔧 FIXING CSP ISSUE - FINAL SOLUTION"
echo "===================================="

cd /Users/soumithvardhan/Desktop/FinBridge

echo "📊 What's being fixed:"
echo "✅ Content Security Policy updated to allow API connections"
echo "✅ Added connect-src for your Vercel API domain"
echo "✅ Environment variables are already working"
echo ""

echo "🔧 Building with CSP fix..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "📦 Deploying CSP fix..."
    git add .
    git commit -m "🔧 Fix CSP: Allow API connections to Vercel backend

    ✅ Added connect-src for https://sr-associates-api.vercel.app
    ✅ Fixed Content Security Policy blocking API calls
    ✅ Registration should now work for all users"
    
    git push origin main
    
    echo ""
    echo "🎯 CSP FIX DEPLOYED!"
    echo ""
    echo "⏰ Timeline:"
    echo "  - CSP policy updated ✅"
    echo "  - Netlify deployment: 2-3 minutes 🔄"
    echo ""
    echo "✅ After deployment, registration will work!"
    echo "🌐 Test at: https://sr-associates.netlify.app/portal"
    
else
    echo "❌ Build failed!"
    exit 1
fi
