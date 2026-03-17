const detectMood = require("../services/aiService")
const { searchSongs } = require("../services/spotifyService")

exports.suggestSongs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const image = req.file.path;
    console.log("Detecting mood for image:", image);
    const mood = await detectMood(image);
    console.log("Detected mood:", mood);
    console.log("Searching songs for mood:", mood);
    
    if (!mood) {
      return res.status(500).json({ error: "Failed to detect mood" });
    }

    const songs = await searchSongs(mood);
    console.log("Found songs:", songs.length);
    
    if (!songs || songs.length === 0) {
      return res.status(500).json({ error: "No songs found for this mood" });
    }

    res.json({ mood, songs });
  } catch (error) {
    console.error("Error in suggestSongs:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: error.message || "Failed to suggest songs" });
  }
};