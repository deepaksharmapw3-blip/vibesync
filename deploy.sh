#!/bin/bash

# VibeSync Deployment Script
echo "🚀 Deploying VibeSync to the cloud..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: VibeSync mood-based music app"
fi

# Choose deployment platform
echo "Choose your deployment platform:"
echo "1) Heroku"
echo "2) Vercel"
echo "3) Railway"
echo "4) Render"
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🌐 Deploying to Heroku..."
        if ! command -v heroku &> /dev/null; then
            echo "❌ Heroku CLI not found. Please install it first: https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        read -p "Enter your Heroku app name: " app_name
        heroku create $app_name
        git push heroku main
        heroku open
        ;;
    2)
        echo "⚡ Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "❌ Vercel CLI not found. Please install it first: npm i -g vercel"
            exit 1
        fi
        vercel --prod
        ;;
    3)
        echo "🚂 Deploying to Railway..."
        echo "1. Go to https://railway.app"
        echo "2. Connect your GitHub repository"
        echo "3. Railway will auto-detect your Node.js app"
        echo "4. Set environment variables in Railway dashboard"
        echo "5. Deploy automatically on git push"
        ;;
    4)
        echo "🔄 Deploying to Render..."
        echo "1. Go to https://render.com"
        echo "2. Connect your GitHub repository"
        echo "3. Choose 'Web Service'"
        echo "4. Set build command: npm install"
        echo "5. Set start command: npm start"
        echo "6. Add environment variables"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo "✅ Deployment initiated! Check your cloud platform dashboard for status."