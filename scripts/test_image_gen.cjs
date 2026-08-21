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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const BRAIN_DIR = path.resolve('C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb');

async function testGeminiImagen(prompt, imageName) {
  console.log('Trying Gemini Imagen 3...');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`;
  
  const body = JSON.stringify({
    instances: [{ prompt: prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '16:9',
      outputMimeType: 'image/jpeg'
    }
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  });

  const json = await res.json();
  if (json.error) {
    console.error('Gemini Imagen error:', json.error);
    return false;
  }

  if (json.predictions && json.predictions[0] && json.predictions[0].bytesBase64Encoded) {
    const buffer = Buffer.from(json.predictions[0].bytesBase64Encoded, 'base64');
    
    if (!fs.existsSync(BRAIN_DIR)) fs.mkdirSync(BRAIN_DIR, { recursive: true });
    const brainPath = path.join(BRAIN_DIR, `${imageName}.jpg`);
    fs.writeFileSync(brainPath, buffer);
    console.log(`Saved to brain preview: ${brainPath}`);

    const publicKidsDir = path.resolve('public/images/bible_kids');
    if (!fs.existsSync(publicKidsDir)) fs.mkdirSync(publicKidsDir, { recursive: true });
    const publicPath = path.join(publicKidsDir, `${imageName}.jpg`);
    fs.writeFileSync(publicPath, buffer);
    console.log(`Saved to public assets: ${publicPath}`);
    return true;
  }

  console.log('No prediction bytes:', json);
  return false;
}

async function testOpenRouter(prompt, imageName) {
  console.log('Trying OpenRouter...');
  const url = 'https://openrouter.ai/api/v1/chat/completions';
  
  // Test with google/imagen-3 or flux
  const body = JSON.stringify({
    model: 'black-forest-labs/flux-1-schnell',
    prompt: prompt
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`
    },
    body: body
  });

  const json = await res.json();
  console.log('OpenRouter response:', json);
}

async function main() {
  const prompt = process.argv[2] || "A breathtaking Disney-Pixar 3D animated style children's storybook illustration of God creating light in the universe. Warm golden divine glowing light in cosmos.";
  const imageName = process.argv[3] || "kids_criacao_1_luz_preview";
  
  const success = await testGeminiImagen(prompt, imageName);
  if (!success) {
    await testOpenRouter(prompt, imageName);
  }
}

main();
