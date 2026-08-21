const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.resolve('public/images/bible_kids');
const brainDir = path.resolve('C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

const scenes = [
  // 1. A Criação do Mundo
  { file: 'kids_criacao_mundo.jpg', prompt: "3D Disney Pixar animated movie style scene panorama of the Creation of the World, warm golden sun in clear pastel blue sky, lush green rolling mountains with colorful blooming flowers, crystal clear turquoise blue ocean with friendly playful jumping dolphins and baby animals on the shore, Pixar animation studio masterpiece 3D render, cinematic lighting, vibrant, 8k, no text", seed: 101 },
  { file: 'kids_criacao_1_luz.jpg', prompt: "3D Disney Pixar animated movie style scene of the Biblical Creation of Light, God saying Let there be light, spectacular radiant golden and warm colorful cosmic light rays bursting through deep dark blue space with sparkling golden stardust particles, whimsical, comforting, Disney Pixar 3D animation movie quality, cinematic lighting, cute, vibrant, 8k, masterpiece, no text", seed: 777 },
  { file: 'kids_criacao_2_mares.jpg', prompt: "3D Disney Pixar animated movie style scene of the Creation of oceans and sky, crystal clear turquoise blue ocean with gentle splashing waves and happy jumping cartoon dolphins, fluffy white clouds in a bright blue sunny sky, rolling lush green hills with blooming flowers and waterfalls, Pixar animation studio 3D render, 8k, no text", seed: 103 },
  { file: 'kids_criacao_3_animais.jpg', prompt: "3D Disney Pixar animated movie style scene of cute baby animals, adorable fluffy baby lion cubs, cute baby bunnies, playful puppy, and colorful parrots playing together happily on lush green grass with flowers under warm sunny sky, Pixar 3D characters, 8k, no text", seed: 104 },
  { file: 'kids_criacao_4_homem.jpg', prompt: "3D Disney Pixar animated movie style scene of the Garden of Eden, kind smiling people and friendly gentle animals living happily together under warm golden sunlight, lush fruit trees and blooming flowers, Pixar studio 3D render, 8k, no text", seed: 105 },

  // 2. A Arca de Noé
  { file: 'kids_noe_ark.jpg', prompt: "3D Disney Pixar animated movie style scene of the majestic wooden Noah's Ark resting on a lush green hill under a clear sunny blue sky with fluffy white clouds, warm natural lighting, Pixar studio render, 8k, no text", seed: 201 },
  { file: 'kids_noe_1_construcao.jpg', prompt: "3D Disney Pixar animated movie style scene of kind elderly Noah with gentle smiling face and white beard, wearing traditional tunic, and his cheerful sons building a huge wooden ark with wooden planks and hammers on a sunny green hill with forest background, warm golden sunlight, Pixar 3D character design, 8k, no text", seed: 202 },
  // kids_noe_2_embarque.jpg é a referência (NÃO alterar)
  { file: 'kids_noe_3_pomba.jpg', prompt: "3D Disney Pixar animated movie style scene of a cute friendly white dove holding a fresh green olive branch in its beak, flying towards kind elderly Noah smiling at the wooden ark window over calm blue waters under soft sunny skies, Pixar lighting and 3D render, 8k, no text", seed: 204 },
  { file: 'kids_noe_4_arcoiris.jpg', prompt: "3D Disney Pixar animated movie style scene of kind elderly Noah and his family celebrating on a lush green hill with all the happy cute animals under a magnificent glowing vibrant rainbow in a bright blue sky, Pixar animation movie quality, 8k, no text", seed: 205 },

  // 3. Davi e Golias
  { file: 'kids_davi_golias.jpg', prompt: "3D Disney Pixar animated movie style scene of brave young boy David holding his wooden shepherd staff and leather sling, standing confidently in a sunny green valley with cute fluffy sheep, giant Goliath in ornate bronze armor visible in the background, Pixar animation movie render, 8k, no text", seed: 301 },
  { file: 'kids_davi_1_pastor.jpg', prompt: "3D Disney Pixar animated movie style scene of cute young shepherd boy David with friendly smiling face playing a small wooden harp happily in a sunlit green meadow surrounded by cute fluffy white sheep and wildflowers, warm golden hour lighting, Pixar 3D character design, 8k, no text", seed: 302 },
  { file: 'kids_davi_2_golias.jpg', prompt: "3D Disney Pixar animated movie style scene of giant Goliath in shiny ornate bronze armor with helmet looking surprised and clumsy, as brave cute young boy David stands confidently looking at him in a sunny green valley with distant hills, Pixar animated movie scene, 8k, no text", seed: 303 },
  { file: 'kids_davi_3_vitoria.jpg', prompt: "3D Disney Pixar animated movie style scene of brave young boy David smiling joyfully, raising his leather sling with cheering happy soldiers and families celebrating victory on the sunlit green hillside, warm daylight, Pixar 3D render, 8k, no text", seed: 304 },

  // 4. Daniel na Cova dos Leões
  { file: 'kids_daniel_lions.jpg', prompt: "3D Disney Pixar animated movie style scene of kind smiling young boy Daniel gently hugging a big fluffy friendly lion inside a warm stone chamber with soft golden divine light beams coming from above, Pixar 3D animation quality, 8k, no text", seed: 401 },
  { file: 'kids_daniel_1_oracao.jpg', prompt: "3D Disney Pixar animated movie style scene of kind young boy Daniel kneeling beside an open arched stone window in his cozy bedroom, praying peacefully with closed eyes at sunset with warm amber glow, starry sky visible outside, Pixar 3D character design, 8k, no text", seed: 402 },
  { file: 'kids_daniel_2_cova.jpg', prompt: "3D Disney Pixar animated movie style scene of guards looking into a stone room in awe as large majestic fluffy lions lie down calmly and peacefully sleeping like big kittens beside young Daniel, warm torchlight, Pixar animation scene, 8k, no text", seed: 403 },
  { file: 'kids_daniel_3_anjo.jpg', prompt: "3D Disney Pixar animated movie style scene of a glowing cute golden 3D guardian angel with radiant wings gently petting big fluffy lions sleeping peacefully next to smiling boy Daniel in a warm stone room, Pixar render, 8k, no text", seed: 404 },

  // 5. Jonas e o Grande Peixe
  { file: 'kids_jonas_fish.jpg', prompt: "3D Disney Pixar animated movie style scene of kind Jonah inside the cozy glowing belly of a giant friendly blue whale looking out into the turquoise sea with colorful coral reefs and tropical fish, Pixar 3D animated movie render, 8k, no text", seed: 501 },
  { file: 'kids_jonas_1_navio.jpg', prompt: "3D Disney Pixar animated movie style scene of a wooden sailing ship sailing through dynamic turquoise blue ocean waves under stylized fluffy clouds with warm sunlight breaking through, Pixar cinematic lighting, 8k, no text", seed: 502 },
  { file: 'kids_jonas_2_baleia.jpg', prompt: "3D Disney Pixar animated movie style underwater scene of a giant friendly smiling blue cartoon whale gently protecting Jonah in the crystal clear turquoise sea with colorful sea turtles and tropical fish, Pixar lighting and 3D render, 8k, no text", seed: 503 },
  { file: 'kids_jonas_3_praia.jpg', prompt: "3D Disney Pixar animated movie style scene of cheerful smiling Jonah standing on a sunny tropical white sand beach with palm trees, waving warmly to joyful townspeople welcoming him, Pixar movie render, 8k, no text", seed: 504 },

  // 6. O Milagre dos Pães
  { file: 'kids_paes_milagre.jpg', prompt: "3D Disney Pixar animated movie style scene of kind smiling Jesus with warm welcoming face sitting on a green hill with a cute young boy holding a wicker basket of breads and fish, warm afternoon sunlight, Pixar 3D render, 8k, no text", seed: 601 },
  { file: 'kids_paes_1_multidao.jpg', prompt: "3D Disney Pixar animated movie style scene of a large crowd of cheerful cartoon children and families sitting on a sunny green hillside with wildflowers listening intently to kind Jesus near a calm blue lake, warm golden sunlight, Pixar animation scene, 8k, no text", seed: 602 },
  { file: 'kids_paes_2_menino.jpg', prompt: "3D Disney Pixar animated movie style scene of a cute joyful young boy with glowing expressive eyes offering a small wicker basket with five small golden breads and two fish to kind smiling Jesus, close-up warm character interaction, Pixar render, 8k, no text", seed: 603 },
  { file: 'kids_paes_3_cestos.jpg', prompt: "3D Disney Pixar animated movie style scene of twelve woven wicker baskets overflowing with warm golden freshly baked breads and fish, with happy children and families eating joyfully on a sunny green meadow, Pixar lighting and 3D character design, 8k, no text", seed: 604 }
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 45000 }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length > 5000) {
          fs.writeFileSync(destPath, buffer);
          resolve(buffer);
        } else {
          reject(new Error('Buffer too small'));
        }
      });
    }).on('error', reject);
  });
}

async function processItem(item, index) {
  const encoded = encodeURIComponent(item.prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=768&model=flux&seed=${item.seed}&nologo=true`;
  const pubPath = path.join(outDir, item.file);
  const brainPath = path.join(brainDir, item.file);

  console.log(`[${index + 1}/${scenes.length}] Generating ${item.file}...`);
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const buffer = await downloadImage(url, pubPath);
      fs.writeFileSync(brainPath, buffer);
      console.log(`  -> [SUCCESS] ${item.file} (${buffer.length} bytes)`);
      return true;
    } catch (err) {
      console.log(`  -> [RETRY ${attempt}] ${item.file}: ${err.message}`);
      await new Promise(r => setTimeout(r, 3000 * attempt));
    }
  }
  console.log(`  -> [FAILED] ${item.file}`);
  return false;
}

async function main() {
  console.log(`Starting sequential generation of ${scenes.length} Pixar scenes with backoff...`);
  for (let i = 0; i < scenes.length; i++) {
    await processItem(scenes[i], i);
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('ALL SCENES FINISHED GENERATING SUCCESSFULLY!');
}

main();
