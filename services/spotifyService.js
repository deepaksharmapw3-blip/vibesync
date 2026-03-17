const axios = require("axios")

// Mock data for different moods
const mockSongs = {
  happy: [
    { name: "Happy - Pharrell Williams", artist: "Pharrell Williams", videoId: "ZbZSe6N_BXs" },
    { name: "Walking on Sunshine - Katrina & The Waves", artist: "Katrina & The Waves", videoId: "iPUmE-tznQY" },
    { name: "Here Comes the Sun - The Beatles", artist: "The Beatles", videoId: "lsV500W4BHU" },
    { name: "Levitating - Dua Lipa", artist: "Dua Lipa", videoId: "TUVcZfQe-Kw" },
    { name: "Can't Stop the Feeling! - Justin Timberlake", artist: "Justin Timberlake", videoId: "ru0K8uYEZWw" },
  ],
  sad: [
    { name: "Someone Like You - Adele", artist: "Adele", videoId: "hHUbLv4ThOo" },
    { name: "The Night We Met - Lord Huron", artist: "Lord Huron", videoId: "KHt6IS_n5X0" },
    { name: "Hurt - Johnny Cash", artist: "Johnny Cash", videoId: "SmVAWKfJ-Go" },
    { name: "Mad World - Gary Jules", artist: "Gary Jules", videoId: "nnyleM5G64w" },
    { name: "Skinny Love - Bon Iver", artist: "Bon Iver", videoId: "ssdgFoHLOSU" },
  ],
  energetic: [
    { name: "Blinding Lights - The Weeknd", artist: "The Weeknd", videoId: "4NRXx6G8_ZQ" },
    { name: "Uptown Funk - Mark Ronson ft. Bruno Mars", artist: "Mark Ronson ft. Bruno Mars", videoId: "OPf0YbXqDm0" },
    { name: "Don't You Worry Child - Swedish House Mafia", artist: "Swedish House Mafia", videoId: "1y6smkh6c-0" },
    { name: "Wake Me Up - Avicii", artist: "Avicii", videoId: "IcrbM1l_BoI" },
    { name: "Animals - Martin Garrix", artist: "Martin Garrix", videoId: "gCYcHz2k5-k" },
  ],
  calm: [
    { name: "Let It Be - The Beatles", artist: "The Beatles", videoId: "QDYfEBY9NM4" },
    { name: "Weightless - Marconi Union", artist: "Marconi Union", videoId: "UfcAVejs1Ac" },
    { name: "River Flows in You - Yiruma", artist: "Yiruma", videoId: "7maJOI3QMu0" },
    { name: "A Thousand Years - Christina Perri", artist: "Christina Perri", videoId: "rtOvBOTqAFE" },
    { name: "Sunset - The xx", artist: "The xx", videoId: "nV0Z3Bi0B0c" },
  ],
  romantic: [
    { name: "Perfect - Ed Sheeran", artist: "Ed Sheeran", videoId: "2Vv-BfVoq4g" },
    { name: "Thinking Out Loud - Ed Sheeran", artist: "Ed Sheeran", videoId: "lp-EO5I60KA" },
    { name: "Make You Feel My Love - Adele", artist: "Adele", videoId: "ufIvQFJWMAI" },
    { name: "At Last - Etta James", artist: "Etta James", videoId: "S-cbBjwza50" },
    { name: "All of Me - John Legend", artist: "John Legend", videoId: "450p7goxZqg" },
  ],
  party: [
    { name: "Shut Up and Dance - Walk the Moon", artist: "Walk the Moon", videoId: "6JCLY0Rlx6Q" },
    { name: "Mr. Brightside - The Killers", artist: "The Killers", videoId: "gGdGFtwCNBE" },
    { name: "Don't Stop Me Now - Queen", artist: "Queen", videoId: "HgzGwKwLq-g" },
    { name: "Uptown Funk - Mark Ronson ft. Bruno Mars", artist: "Mark Ronson ft. Bruno Mars", videoId: "OPf0YbXqDm0" },
    { name: "Dancing Queen - ABBA", artist: "ABBA", videoId: "xFrGuyw1V8s" },
  ],
  chill: [
    { name: "Lo-Fi Beats to Study To", artist: "Chill Music", videoId: "jfKfPfyJRdk" },
    { name: "Sunset Lover - Petit Biscuit", artist: "Petit Biscuit", videoId: "YhSFvEQvlFU" },
    { name: "Waves - Mr. Probz (Robin Schulz Remix)", artist: "Robin Schulz", videoId: "XGtC9SbIWws" },
    { name: "Falling - Harry Styles", artist: "Harry Styles", videoId: "nQl-N4d82EU" },
    { name: "Electric Feel - MGMT", artist: "MGMT", videoId: "VLsUkiaKqN8" },
  ],
  motivational: [
    { name: "Eye of the Tiger - Survivor", artist: "Survivor", videoId: "btPJPFnesV4" },
    { name: "We Will Rock You - Queen", artist: "Queen", videoId: "-tJYN-eG1zk" },
    { name: "Remember the Name - Fort Minor", artist: "Fort Minor", videoId: "8KEo6n9UMN8" },
    { name: "Lose Yourself - Eminem", artist: "Eminem", videoId: "_Yhyp-_hX2s" },
    { name: "Don't Stop Believin' - Journey", artist: "Journey", videoId: "1k8craCGpgs" },
  ],
  relaxed: [
    { name: "Breathe - Pink Floyd", artist: "Pink Floyd", videoId: "mPzO3nVYVFI" },
    { name: "Re: Stacks - Bon Iver", artist: "Bon Iver", videoId: "HjWHmEanE2k" },
    { name: "Harvest Moon - Neil Young", artist: "Neil Young", videoId: "sduZt9X--3E" },
    { name: "Dreams - Fleetwood Mac", artist: "Fleetwood Mac", videoId: "mrZRURcb1cM" },
    { name: "Lounge - Morcheeba", artist: "Morcheeba", videoId: "5Fy-Ay1_K3c" },
  ],
  excited: [
    { name: "Celebration - Kool & The Gang", artist: "Kool & The Gang", videoId: "3GwjfUFyY6M" },
    { name: "Good Life - Kanye West ft. T-Pain", artist: "Kanye West ft. T-Pain", videoId: "I8VRXD_qL_s" },
    { name: "Yeah! - Usher ft. Lil Jon & Ludacris", artist: "Usher ft. Lil Jon & Ludacris", videoId: "GxBSyx85Kp8" },
    { name: "Walking on Sunshine - Katrina & The Waves", artist: "Katrina & The Waves", videoId: "iPUmE-tznQY" },
    { name: "Happy - Pharrell Williams", artist: "Pharrell Williams", videoId: "ZbZSe6N_BXs" },
  ],
}

async function searchSongs(mood) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.log("YouTube API key not configured, using mock data");
      return getMockSongs(mood);
    }

    console.log("YouTube API Key exists:", !!apiKey);
    console.log("Searching for:", mood + " music");

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(mood + ' music')}&type=video&maxResults=10&key=${apiKey}`);
    
    console.log("YouTube API response status:", response.status);
    console.log("Items found:", response.data.items?.length);

    if (!response.data.items || response.data.items.length === 0) {
      return getMockSongs(mood);
    }

    return response.data.items.map(item => ({
      name: item.snippet.title,
      artist: item.snippet.channelTitle,
      uri: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error("Error in searchSongs:", error.message);
    console.log("Falling back to mock data for mood:", mood);
    return getMockSongs(mood);
  }
}

function getMockSongs(mood) {
  // Normalize mood to lowercase
  const normalizedMood = mood.toLowerCase().trim();
  
  // Find best matching mood
  let songList = mockSongs[normalizedMood];
  
  if (!songList) {
    // If exact match not found, try to find partial match
    const moodKey = Object.keys(mockSongs).find(key => normalizedMood.includes(key) || key.includes(normalizedMood));
    songList = moodKey ? mockSongs[moodKey] : mockSongs.chill;
  }
  
  return songList.map(song => ({
    name: song.name,
    artist: song.artist,
    uri: `https://www.youtube.com/watch?v=${song.videoId}`
  }));
}

module.exports = { searchSongs }