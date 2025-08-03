#!/bin/bash

echo "🚀 FinBridge Emergency Deployment Script"
echo "========================================"

# Navigate to project directory
cd /Users/soumithvardhan/Desktop/FinBridge

# Check git status
echo "📊 Checking git status..."
git status

# Add all changes
echo "➕ Adding all changes..."
git add .

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "🔧 Fix registration: TypeScript errors, environment variables, and debugging - $(date)"

# Push to trigger deployment
echo "🚀 Pushing to trigger deployment..."
git push origin main

echo ""
echo "✅ Deployment triggered!"
echo ""
echo "⏰ Expected timeline:"
echo "  - Git push: 30 seconds"
echo "  - Netlify build: 2-3 minutes"
echo "  - Deployment: 1-2 minutes"
echo "  - Total: 3-5 minutes"
echo ""
echo "🔗 Monitor deployment at: https://app.netlify.com/sites/sr-associates/deploys"
echo "🌐 Test site after deployment: https://sr-associates.netlify.app/"
