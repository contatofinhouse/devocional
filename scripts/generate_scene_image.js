const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BRAIN_DIR = path.resolve('C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb');

async function generateDalleImage(prompt, imageName) {
  if (!OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY not found in .env');
    process.exit(1);
  }

  console.log(`Generating image for: "${prompt.substring(0, 80)}..."`);
  
  const body = JSON.stringify({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
    response_format: 'b64_json'
  });

  const req = https.request('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Length': Buffer.byteLength(body)
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.error) {
          console.error('API Error:', json.error);
          process.exit(1);
        }
        
        const b64 = json.data[0].b64_json;
        const buffer = Buffer.from(b64, 'base64');
        
        // Ensure brain dir exists
        if (!fs.existsSync(BRAIN_DIR)) {
          fs.mkdirSync(BRAIN_DIR, { recursive: true });
        }
        
        const brainPath = path.join(BRAIN_DIR, `${imageName}.jpg`);
        fs.writeFileSync(brainPath, buffer);
        console.log(`Saved to brain preview: ${brainPath}`);

        const publicKidsDir = path.resolve('public/images/bible_kids');
        if (!fs.existsSync(publicKidsDir)) {
          fs.mkdirSync(publicKidsDir, { recursive: true });
        }
        const publicPath = path.join(publicKidsDir, `${imageName}.jpg`);
        fs.writeFileSync(publicPath, buffer);
        console.log(`Saved to public app assets: ${publicPath}`);

        console.log('SUCCESS');
      } catch (err) {
        console.error('Parse error:', err);
        process.exit(1);
      }
    });
  });

  req.on('error', (err) => {
    console.error('Request error:', err);
    process.exit(1);
  });

  req.write(body);
  req.end();
}

const prompt = process.argv[2];
const imageName = process.argv[3] || 'generated_preview';

if (!prompt) {
  console.log('Usage: node generate_scene_image.js "<prompt>" <imageName>');
  process.exit(1);
}

generateDalleImage(prompt, imageName);
