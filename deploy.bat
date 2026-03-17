@echo off
REM VibeSync Deployment Script for Windows
echo 🚀 Deploying VibeSync to the cloud...

REM Check if git is initialized
if not exist ".git" (
    echo 📝 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: VibeSync mood-based music app"
)

REM Choose deployment platform
echo Choose your deployment platform:
echo 1) Heroku
echo 2) Vercel
echo 3) Railway
echo 4) Render
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo 🌐 Deploying to Heroku...
    heroku --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Heroku CLI not found. Please install it first: https://devcenter.heroku.com/articles/heroku-cli
        pause
        exit /b 1
    )
    set /p app_name="Enter your Heroku app name: "
    heroku create %app_name%
    git push heroku main
    heroku open
) else if "%choice%"=="2" (
    echo ⚡ Deploying to Vercel...
    vercel --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Vercel CLI not found. Please install it first: npm i -g vercel
        pause
        exit /b 1
    )
    vercel --prod
) else if "%choice%"=="3" (
    echo 🚂 For Railway deployment:
    echo 1. Go to https://railway.app
    echo 2. Connect your GitHub repository
    echo 3. Railway will auto-detect your Node.js app
    echo 4. Set environment variables in Railway dashboard
    echo 5. Deploy automatically on git push
    pause
) else if "%choice%"=="4" (
    echo 🔄 For Render deployment:
    echo 1. Go to https://render.com
    echo 2. Connect your GitHub repository
    echo 3. Choose 'Web Service'
    echo 4. Set build command: npm install
    echo 5. Set start command: npm start
    echo 6. Add environment variables
    pause
) else (
    echo ❌ Invalid choice. Please run the script again.
    pause
    exit /b 1
)

echo ✅ Deployment initiated! Check your cloud platform dashboard for status.
pause