const fs = require('fs');
const path = require('path');
const https = require('https');

function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let val = (match[2] || '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[match[1]] = val;
      }
    }
  }
}
loadEnv();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BRAIN_DIR = path.resolve('C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

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
    quality: 'standard'
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
    res.on('end', async () => {
      try {
        const json = JSON.parse(data);
        if (json.error) {
          console.error('API Error:', json.error);
          process.exit(1);
        }
        
        const imageUrl = json.data[0].url;
        console.log('Got Image URL:', imageUrl);

        // Ensure brain dir exists
        if (!fs.existsSync(BRAIN_DIR)) {
          fs.mkdirSync(BRAIN_DIR, { recursive: true });
        }
        
        const brainPath = path.join(BRAIN_DIR, `${imageName}.jpg`);
        await downloadFile(imageUrl, brainPath);
        console.log(`Saved to brain preview: ${brainPath}`);

        const publicKidsDir = path.resolve('public/images/bible_kids');
        if (!fs.existsSync(publicKidsDir)) {
          fs.mkdirSync(publicKidsDir, { recursive: true });
        }
        const publicPath = path.join(publicKidsDir, `${imageName}.jpg`);
        fs.copyFileSync(brainPath, publicPath);
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
  console.log('Usage: node generate_scene_image.cjs "<prompt>" <imageName>');
  process.exit(1);
}

generateDalleImage(prompt, imageName);
