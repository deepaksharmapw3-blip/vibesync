const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const musicRoutes = require("./routes/musicRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)))

// API routes
app.use("/api/music", musicRoutes)

// Handle client-side routing - serve index.html for all non-API routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Catch all other routes that don't match static files
app.use((req, res) => {
  // If it's not an API route and doesn't have a file extension, serve index.html
  if (!req.path.startsWith('/api/') && !req.path.includes('.')) {
    res.sendFile(path.join(__dirname, 'index.html'))
  } else {
    res.status(404).send('Not Found')
  }
})

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 VibeSync Server running on port ${PORT}`)
  console.log(`📱 Frontend: http://localhost:${PORT}`)
  console.log(`🎵 API: http://localhost:${PORT}/api/music`)
})