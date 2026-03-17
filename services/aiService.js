// Mock AI service for testing purposes
// Returns a random mood instead of analyzing an image

const moods = [
  'happy',
  'sad',
  'energetic',
  'calm',
  'romantic',
  'party',
  'chill',
  'motivational',
  'relaxed',
  'excited'
];

async function detectMood(imagePath) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return a random mood
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  console.log(`Mock AI detected mood: ${randomMood} for image: ${imagePath}`);
  return randomMood;
}

module.exports = detectMood;