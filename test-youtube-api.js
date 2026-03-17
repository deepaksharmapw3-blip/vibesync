// Test if YouTube API is accessible
require('dotenv').config();
const axios = require('axios');

async function testYouTubeAPI() {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        
        console.log("Testing YouTube API...\n");
        console.log("API Key configured:", !!apiKey);
        
        if (!apiKey) {
            console.error("❌ YouTube API key is not set in .env file");
            return;
        }

        console.log("API Key last 4 chars:", apiKey.slice(-4));
        console.log("\nMaking request to YouTube API...\n");

        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent('happy music')}&type=video&maxResults=5&key=${apiKey}`
        );

        console.log("✅ YouTube API is working!\n");
        console.log("Status:", response.status);
        console.log("Videos found:", response.data.items.length);
        console.log("\nTop 3 results:");
        
        response.data.items.slice(0, 3).forEach((item, i) => {
            console.log(`  ${i + 1}. ${item.snippet.title}`);
            console.log(`     Channel: ${item.snippet.channelTitle}`);
            console.log(`     URL: https://www.youtube.com/watch?v=${item.id.videoId}`);
        });

    } catch (error) {
        console.error("❌ YouTube API Error:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error:", error.response.data);
        } else {
            console.error("Message:", error.message);
        }
    }
}

testYouTubeAPI();
