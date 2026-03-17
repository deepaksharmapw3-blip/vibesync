# VibeSync 🎵

Mood-based music recommendation app that analyzes images to detect emotions and suggests matching songs from YouTube.

## Features

- 📸 Upload images to detect mood/emotion
- 🎵 Get personalized music recommendations
- 🎧 Direct YouTube links to songs
- 🌟 Works offline with mock data
- 🚀 Deployed on cloud platforms

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd VibeSync

# Install dependencies
npm install

# Start development servers
npm run dev
```

Visit `http://localhost:3000` for the app and `http://localhost:5000` for the API.

## Deployment

### Option 1: Heroku (Recommended)

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables** (optional):
   ```bash
   heroku config:set YOUTUBE_API_KEY=your_key_here
   heroku config:set GOOGLE_CLOUD_VISION_KEY=your_key_here
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

5. **Open your app**:
   ```bash
   heroku open
   ```

### Option 2: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard or:
   ```bash
   vercel env add YOUTUBE_API_KEY
   ```

### Option 3: Railway

1. **Connect your GitHub repo** to Railway
2. **Railway will auto-detect** the Node.js app
3. **Set environment variables** in Railway dashboard
4. **Deploy automatically** on git push

### Option 4: Render

1. **Connect your GitHub repo** to Render
2. **Choose "Web Service"**
3. **Set build command**: `npm install`
4. **Set start command**: `npm start`
5. **Add environment variables**
6. **Deploy**

## Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: YouTube API Key for real search results
YOUTUBE_API_KEY=your_youtube_api_key_here

# Optional: Google Cloud Vision API for real image analysis
GOOGLE_CLOUD_VISION_KEY=your_google_vision_key_here

# Port (automatically set by deployment platforms)
PORT=5000
```

## API Endpoints

- `POST /api/music/suggest` - Upload image and get music recommendations

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **AI**: Google Cloud Vision (optional)
- **Music**: YouTube API (optional, falls back to mock data)

## Project Structure

```
VibeSync/
├── server.js              # Main Express server
├── frontend-server.js     # Development frontend server
├── index.html            # Main HTML page
├── styles.css            # Styles
├── script.js             # Frontend JavaScript
├── routes/
│   └── musicRoutes.js    # API routes
├── controllers/
│   └── musicController.js # Business logic
├── services/
│   ├── aiService.js      # Image analysis
│   └── spotifyService.js # Music search
├── uploads/              # Uploaded images
├── package.json
├── Procfile             # Heroku deployment
├── vercel.json          # Vercel deployment
└── .env.example         # Environment variables template
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

ISC License