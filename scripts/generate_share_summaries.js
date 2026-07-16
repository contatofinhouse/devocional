import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load API key from .env
let geminiApiKey = '';
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const match = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/);
  if (match) {
    geminiApiKey = match[1].trim().replace(/['"]/g, '');
  }
}

if (!geminiApiKey) {
  console.error("❌ GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

// Config paths
const lessonsJsonPath = 'C:\\Users\\rafae\\.gemini\\antigravity-ide\\scratch\\lessons.json';
const progressPath = 'C:\\Users\\rafae\\.gemini\\antigravity-ide\\scratch\\progress_summaries.json';
const sqlOutputPath = 'C:\\Users\\rafae\\Documents\\FINHOUSE\\SITES\\devocional\\store-assets\\dev_lessons_share_summaries.sql';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function loadProgress() {
  if (fs.existsSync(progressPath)) {
    try {
      return JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveProgress(progress) {
  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2), 'utf-8');
}

function escapeSqlString(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

async function runSummarizer() {
  console.log(`🚀 Iniciando a geração de resumos de narrativa bíblica via Gemini 2.5 Flash...`);
  
  if (!fs.existsSync(lessonsJsonPath)) {
    console.error("❌ lessons.json not found in scratch folder.");
    return;
  }

  const allLessons = JSON.parse(fs.readFileSync(lessonsJsonPath, 'utf-8'));
  const progress = loadProgress();

  if (!fs.existsSync(sqlOutputPath)) {
    fs.writeFileSync(sqlOutputPath, `-- dev_lessons share_summary updates generated on ${new Date().toISOString()}\n`, 'utf-8');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });
  let count = 0;

  for (const lesson of allLessons) {
    const id = lesson.id;
    if (progress[id]) {
      console.log(`⏭️ Ignorando lição já processada (ID: ${id})`);
      continue;
    }

    console.log(`✍️ Gerando resumo para [${lesson.theme_name}] (${lesson.title}) - ID: ${id}...`);
    
    const systemPrompt = `Você é um redator de conteúdo bíblico de alta qualidade. Sua tarefa é escrever um resumo da narrativa bíblica em português do Brasil contendo estritamente o relato histórico ou a parábola mencionada na lição.
DIRETRIZES:
1. O resumo deve ter OBRIGATORIAMENTE entre 70 e 80 palavras.
2. Deve conter APENAS os fatos da narrativa bíblica (a história em si, quem participou, o que aconteceu).
3. NÃO inclua nenhuma lição de moral, aplicação prática, reflexão pessoal ou encerramento motivacional.
4. Linguagem envolvente, clara e fiel ao texto bíblico.
5. Retorne APENAS o texto puro do resumo, sem formatação markdown ou aspas ao redor.`;

    const prompt = `Título da Lição: "${lesson.title}"
Referência Bíblica: "${lesson.biblical_reference}"
Texto da História Bíblica da lição: "${lesson.biblical_story}"

Escreva o resumo da narrativa bíblica com base nas diretrizes acima.`;

    let success = false;
    let retries = 5;

    while (!success && retries > 0) {
      try {
        const response = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }]
        });

        const summaryText = response.response.text().trim();
        const wordCount = summaryText.split(/\s+/).filter(Boolean).length;
        
        console.log(`ℹ️ Resumo gerado (${wordCount} palavras): "${summaryText}"`);

        if (wordCount < 60 || wordCount > 90) {
          console.warn(`⚠️ Aviso: contagem de palavras (${wordCount}) fora do ideal (70-80). Continuando assim mesmo.`);
        }

        // Generate UPDATE statement
        const sqlUpdate = `UPDATE "public"."dev_lessons" SET "share_summary" = ${escapeSqlString(summaryText)} WHERE "id" = '${id}';\n`;
        fs.appendFileSync(sqlOutputPath, sqlUpdate, 'utf-8');

        progress[id] = {
          timestamp: new Date().toISOString(),
          title: lesson.title,
          summary: summaryText,
          wordCount
        };
        saveProgress(progress);

        console.log(`✅ Salvo no arquivo SQL!`);
        success = true;
        count++;

        await sleep(100);

      } catch (err) {
        retries--;
        const backoffDelay = (5 - retries) * 5000;
        console.warn(`⚠️ Erro ao processar ID: ${id} (${err.message}). Tentando novamente em ${backoffDelay / 1000}s... (Restam ${retries} tentativas)`);
        await sleep(backoffDelay);
      }
    }

    if (!success) {
      console.error(`❌ Falha definitiva ao processar lição ID: ${id}. Parando o script.`);
      break;
    }
  }

  console.log(`\n🎉 Processo concluído! Total de resumos gerados: ${count}`);
}

runSummarizer().catch(console.error);
