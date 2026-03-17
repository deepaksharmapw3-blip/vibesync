// Quick test script to verify the backend is working
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

async function testAPI() {
    try {
        console.log("Starting API test...\n");

        // Check if a test image exists
        const uploadsDir = './uploads';
        const files = fs.readdirSync(uploadsDir);
        
        if (files.length === 0) {
            console.log("No test images found in uploads directory.");
            console.log("Please upload an image through the frontend first.\n");
            return;
        }

        // Use the first image in uploads
        const testImagePath = path.join(uploadsDir, files[0]);
        console.log("Using test image:", testImagePath);

        const form = new FormData();
        form.append('image', fs.createReadStream(testImagePath));

        console.log("\nSending request to http://localhost:5000/api/music/suggest...\n");

        const response = await axios.post('http://localhost:5000/api/music/suggest', form, {
            headers: form.getHeaders()
        });

        console.log("✅ API Response Received!\n");
        console.log("Status:", response.status);
        console.log("Mood:", response.data.mood);
        console.log("Songs found:", response.data.songs.length);
        console.log("\nFirst 3 songs:");
        response.data.songs.slice(0, 3).forEach((song, i) => {
            console.log(`  ${i + 1}. ${song.name}`);
            console.log(`     Artist: ${song.artist}`);
        });

    } catch (error) {
        console.error("❌ Error testing API:");
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        } else {
            console.error("Error message:", error.message);
        }
    }
}

testAPI();
