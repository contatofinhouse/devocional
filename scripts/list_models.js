import fs from 'fs';

let geminiApiKey = '';
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const match = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/);
  if (match) {
    geminiApiKey = match[1].trim().replace(/['"]/g, '');
  }
}

async function run(pageToken = '') {
  let url = `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`;
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.models) {
      for (const m of data.models) {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${m.name}`);
        }
      }
    }
    if (data.nextPageToken) {
      await run(data.nextPageToken);
    }
  } catch (e) {
    console.error("Error fetching models:", e.message);
  }
}

run();
