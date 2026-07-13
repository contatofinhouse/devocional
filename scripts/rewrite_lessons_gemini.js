import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

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
const progressPath = 'C:\\Users\\rafae\\.gemini\\antigravity-ide\\scratch\\progress_rewrite.json';
const sqlOutputPath = 'C:\\Users\\rafae\\Documents\\FINHOUSE\\SITES\\devocional\\store-assets\\dev_lessons_updates.sql';
const testSqlOutputPath = 'C:\\Users\\rafae\\Documents\\FINHOUSE\\SITES\\devocional\\store-assets\\test_validation.sql';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Loader function
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
}// Generate the prompt using few-shot examples matching the style guide
function getPrompt(lesson) {
  const devMode = lesson.development_mode;
  const ageGroup = lesson.age_group;

  let audienceDesc = '';
  if (devMode === 'personal' && ageGroup === 'adulto') {
    audienceDesc = 'adultos no modo Desenvolvimento Pessoal. O tom deve ser maduro, profundo e focado em integridade, autogoverno e fidelidade prática.';
  } else if (devMode === 'kids' && ageGroup === 'kids') {
    audienceDesc = 'crianças pequenas de 4 a 8 anos acompanhadas de seus pais. O tom deve ser lúdico, afetuoso, usando analogias simples da criação/natureza, focando em sentimentos práticos.';
  } else if (devMode === 'kids' && ageGroup === 'teens') {
    audienceDesc = 'adolescentes de 9 a 14 anos acompanhados de seus pais. O tom deve ser direto e focado em dilemas práticos (pressão escolar, aceitação, amizades), sem infantilização.';
  } else if (devMode === 'kids' && ageGroup === 'young_adults') {
    audienceDesc = 'jovens de 15 a 18 anos acompanhados de seus pais. O tom deve ser desafiador, focado em preparação para o futuro, limites morais e escolhas privadas sinceras.';
  }

  const systemPrompt = `Você é um editor teológico e especialista em literatura bíblica devocional.
Sua tarefa é reescrever os campos de um devocional preservando estritamente a história bíblica original, aplicando o seguinte guia de estilo e gerando perguntas e orações exclusivas.

DIRETRIZES DE ESCRITA:
1. NARRATIVA BÍBLICA (biblical_story): Fiel ao texto original da passagem. Conte como uma história real. NÃO acrescente explicações ou jargões psicológicos modernos. Mantenha entre 120 e 160 palavras. Forneça o contexto correto dos personagens.
2. REFLEXÃO (reflection): Conecte a história diretamente à vida prática do leitor de forma simples, concreta e profunda. Evite jargões de autoajuda. Mantenha exatamente 1 parágrafo curto e direto de forte impacto (máximo de 100 palavras).
3. DESAFIO (challenge): Uma ação prática, simples, direta e acionável no mesmo dia (máximo de 15 palavras).
4. MENSAGEM FINAL (final_message): Frase curta de forte impacto (máximo 12 palavras).
5. PERGUNTAS DE CONVERSA (questions): Gere exatamente 3 perguntas exclusivas e instigantes para esta lição:
   - Pergunta 1: Focada em compreensão da história bíblica.
   - Pergunta 2: Focada em conectar o tema à nossa realidade ou fraquezas diárias.
   - Pergunta 3: Focada em uma atitude ou ação prática.
6. ORAÇÃO (prayers):
   - Se o Modo for "kids": Gere uma oração curta dividida em 3 diálogos curtos para orar em família (um para o "Pai", um para o "Filho", e um para fazerem "Juntos"). Cada parte deve ter no máximo 2 frases curtas, sinceras e conectadas à lição.
   - Se o Modo for "personal": Gere um único texto curto de oração individual íntima e sincera (com o papel/role definido como "Individual").
7. VOCABULÁRIO PROIBIDO: NÃO use expressões modernas/terapêuticas como: "crise moral", "narrativa de proteção", "vulnerabilidade", "performance", "identidade fragmentada", "versão de si mesmo", "esconderijo emocional".
8. Retorne APENAS o JSON estruturado limpo.`;

  const prompt = `Aqui está o devocional original para você reescrever e enriquecer:
Tema: "${lesson.theme_name}"
Modo: "${devMode}"
Faixa Etária: "${ageGroup}"
Público Alvo: ${audienceDesc}
Passagem: "${lesson.biblical_reference}"

Devocional original a ser aperfeiçoado:
- Título original: "${lesson.title}"
- História bíblica original: "${lesson.biblical_story}"
- Reflexão original: "${lesson.reflection}"
- Desafio original: "${lesson.challenge}"
- Mensagem final original: "${lesson.final_message}"

Retorne o resultado no formato JSON estrito exatamente com a estrutura abaixo.
Se o Modo for "kids", a estrutura de "prayers" deve ter 3 falas (Pai, Filho, Juntos):
{
  "title": "Título curto (máximo 6 palavras)",
  "biblical_story": "Relato reescrito fiel à passagem (120 a 160 palavras)",
  "reflection": "Reflexão reescrita em 1 parágrafo prático (máximo 100 palavras)",
  "challenge": "Desafio prático acionável (máximo 15 palavras)",
  "final_message": "Frase de forte impacto (máximo 12 palavras)",
  "questions": [
    "Pergunta 1 (compreensão)",
    "Pergunta 2 (conexão com a realidade diária)",
    "Pergunta 3 (ação prática)"
  ],
  "prayers": [
    { "role": "Pai", "text": "Frase de oração do pai..." },
    { "role": "Filho", "text": "Frase de oração do filho..." },
    { "role": "Juntos", "text": "Frase de oração final juntos..." }
  ]
}

Se o Modo for "personal", a estrutura de "prayers" deve ter 1 fala (Individual):
{
  "title": "Título curto (máximo 6 palavras)",
  "biblical_story": "Relato reescrito fiel à passagem (120 a 160 palavras)",
  "reflection": "Reflexão reescrita em 1 parágrafo prático (máximo 100 palavras)",
  "challenge": "Desafio prático acionável (máximo 15 palavras)",
  "final_message": "Frase de forte impacto (máximo 12 palavras)",
  "questions": [
    "Pergunta 1 (compreensão)",
    "Pergunta 2 (conexão com a realidade diária)",
    "Pergunta 3 (ação prática)"
  ],
  "prayers": [
    { "role": "Individual", "text": "Texto da oração individual íntima e sincera..." }
  ]
}`;

  return { systemPrompt, prompt };
}

// Escape strings for PostgreSQL
function escapeSqlString(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

async function runRewrite(isValidation = false) {
  console.log(`🚀 Iniciando reescrita de lições via Gemini 1.5 Flash... (Modo Teste: ${isValidation})`);
  
  if (!fs.existsSync(lessonsJsonPath)) {
    console.error("❌ lessons.json not found in scratch folder.");
    return;
  }

  const allLessons = JSON.parse(fs.readFileSync(lessonsJsonPath, 'utf-8'));
  const progress = loadProgress();
  const outputPath = isValidation ? testSqlOutputPath : sqlOutputPath;

  // Clear output file or initialize it
  if (!isValidation && !fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, `-- dev_lessons updates generated on ${new Date().toISOString()}\n`, 'utf-8');
  } else if (isValidation) {
    fs.writeFileSync(outputPath, `-- Validation test updates\n`, 'utf-8');
  }

  const targetLessons = isValidation ? allLessons.slice(0, 5) : allLessons;
  let count = 0;

  const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

  for (const lesson of targetLessons) {
    const id = lesson.id;
    if (!isValidation && progress[id]) {
      console.log(`⏭️ Ignorando lição já processada (ID: ${id})`);
      continue;
    }

    console.log(`✍️ Processando [${lesson.theme_name}] (${lesson.development_mode} - ${lesson.age_group}) - ID: ${id}...`);
    const { systemPrompt, prompt } = getPrompt(lesson);

    let success = false;
    let retries = 6;

    while (!success && retries > 0) {
      try {
        const response = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }]
        });

        const rawText = response.response.text();
        const startIdx = rawText.indexOf('{');
        const endIdx = rawText.lastIndexOf('}');
        if (startIdx === -1 || endIdx === -1) {
          throw new Error("Não foi possível encontrar um objeto JSON na resposta.");
        }
        const cleanJson = rawText.substring(startIdx, endIdx + 1);
        const data = JSON.parse(cleanJson.trim());

        // Simple validation
        if (!data.title || !data.biblical_story || !data.reflection || !data.questions || data.questions.length !== 3 || !data.prayers || data.prayers.length === 0) {
          throw new Error("Campos obrigatórios, perguntas ou orações ausentes/inválidos no retorno JSON.");
        }

        // Generate UPDATE SQL statement
        const sqlUpdate = `UPDATE "public"."dev_lessons" SET "title" = ${escapeSqlString(data.title)}, "biblical_story" = ${escapeSqlString(data.biblical_story)}, "reflection" = ${escapeSqlString(data.reflection)}, "challenge" = ${escapeSqlString(data.challenge)}, "final_message" = ${escapeSqlString(data.final_message)} WHERE "id" = '${id}';\n`;

        // Write statement to file immediately
        fs.appendFileSync(outputPath, sqlUpdate, 'utf-8');

        // Save progress if not validation mode
        if (!isValidation) {
          progress[id] = {
            timestamp: new Date().toISOString(),
            original: {
              title: lesson.title,
              story: lesson.biblical_story,
              reflection: lesson.reflection,
              challenge: lesson.challenge,
              final_message: lesson.final_message
            },
            updated: data
          };
          saveProgress(progress);
        }

        console.log(`✅ Lição processada com sucesso: ${data.title}`);
        success = true;
        count++;

        // Run as fast as possible without blocking event loop
        await sleep(50);

      } catch (err) {
        retries--;
        const backoffDelay = (6 - retries) * 7000;
        console.warn(`⚠️ Erro ao processar ID: ${id} (${err.message}). Tentando novamente em ${backoffDelay / 1000} segundos... (Tentativas restantes: ${retries})`);
        await sleep(backoffDelay);
      }
    }

    if (!success) {
      console.error(`❌ Falha definitiva ao processar lição ID: ${id}. Abortando para evitar perda de dados.`);
      break;
    }
  }

  console.log(`\n🎉 Processo Concluído! Total de lições salvas em ${outputPath}: ${count}`);
}

// Run in validation mode or full mode depending on args
const args = process.argv.slice(2);
const isValidation = args.includes('--validate');
runRewrite(isValidation).catch(console.error);
