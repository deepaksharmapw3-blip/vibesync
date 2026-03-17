const express = require("express")
const multer = require("multer")
const {suggestSongs} = require("../controllers/musicController")

const router = express.Router()

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  }
  next(error);
};

router.post("/suggest", upload.single("image"), handleMulterError, suggestSongs)

module.exports = router