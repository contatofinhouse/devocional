import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import { randomUUID } from 'crypto';

// 1. Configurações do Supabase
const SUPABASE_URL = 'https://xznzppgkkkkpzyvzemlr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bnpwcGdra2trcHp5dnplbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDIxNjMsImV4cCI6MjA3ODAxODE2M30.R7e76191bM6gsabfHh39aO6I6DCUrPGhy_K1HYIm8Sk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Chaves de API
let anthropicApiKey = process.env.ANTHROPIC_API_KEY;
let geminiApiKey = process.env.GEMINI_API_KEY;

if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const antMatch = envContent.match(/ANTHROPIC_API_KEY\s*=\s*(.*)/);
  if (antMatch) anthropicApiKey = antMatch[1].trim().replace(/['"]/g, '');

  const gemMatch = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/);
  if (gemMatch) geminiApiKey = gemMatch[1].trim().replace(/['"]/g, '');
}

let activeProvider = '';
let genAI = null;
let anthropicInstance = null;

if (geminiApiKey) {
  activeProvider = 'gemini';
  genAI = new GoogleGenerativeAI(geminiApiKey);
} else if (anthropicApiKey) {
  activeProvider = 'claude';
  anthropicInstance = new Anthropic({ apiKey: anthropicApiKey });
} else {
  console.error('❌ ERRO: Nenhuma chave de API encontrada.');
  process.exit(1);
}

// 3. Configuração dos 4 Públicos
const GROUPS = [
  { mode: 'personal', group: 'adulto', label: 'Pessoal (Adulto)' },
  { mode: 'kids', group: 'kids', label: 'Pais & Filhos (Kids 4-8 anos)' },
  { mode: 'kids', group: 'teens', label: 'Pais & Filhos (Teens 9-14 anos)' },
  { mode: 'kids', group: 'young_adults', label: 'Pais & Filhos (Young Adults 15-18 anos)' }
];

// 4. Mapeamento dos Temas e Noites 7 a 10
const EXPANSION_THEMES = [
  {
    theme_id: 'responsabilidade',
    theme_name: 'Responsabilidade',
    nights: [
      {
        night: 7,
        reference: 'Mateus 25:14-29',
        focus: 'A Fidelidade nos Talentos: Administrar com dedicação e diligência o que Deus nos confiou, prestando contas sem desculpas ou negligência.'
      },
      {
        night: 8,
        reference: 'Lucas 12:42-48',
        focus: 'O Mordomo Fiel e Prudente: A quem muito foi confiado, muito será exigido; o zelo, a vigilância e a integridade no cumprimento dos deveres diários.'
      },
      {
        night: 9,
        reference: '2 Tessalonicenses 3:6-13',
        focus: 'Dignidade do Trabalho e Proatividade: Não depender do esforço alheio, cumprir as próprias tarefas com dignidade e não cansar de fazer o bem.'
      },
      {
        night: 10,
        reference: '1 Timóteo 4:12-16',
        focus: 'Autoliderança e Exemplo Pessoal: Cuidar de si mesmo e da conduta; ser padrão nas palavras, atitudes, amor, fé e pureza.'
      }
    ]
  },
  {
    theme_id: 'perseveranca',
    theme_name: 'Perseverança',
    nights: [
      {
        night: 7,
        reference: 'Gálatas 6:9-10',
        focus: 'A Colheita no Tempo Certo: Não desfalecer nem desanimar no bem, sabendo que a perseverança gera frutos no tempo estabelecido por Deus.'
      },
      {
        night: 8,
        reference: 'Tiago 1:2-4, 12',
        focus: 'A Provação que Gera Firmeza: Encarar as dificuldades como instrumentos de maturidade, integridade e fortalecimento do caráter.'
      },
      {
        night: 9,
        reference: '2 Timóteo 4:6-8',
        focus: 'Guardando a Fé até o Fim: Paulo no fim da jornada terrena que combateu o bom combate, completou a carreira e guardou a fé inegociável.'
      },
      {
        night: 10,
        reference: 'Apocalipse 3:10-12',
        focus: 'A Recompensa dos Vitoriosos: A firmeza inabalável diante dos testes da vida e a promessa de vitória eterna para quem persevera fiel.'
      }
    ]
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getPrompt(theme, config, nightPlan) {
  let audienceDesc = '';
  let prayerRule = '';
  const themeTitle = theme.theme_name || theme.name;

  if (config.group === 'adulto') {
    audienceDesc = 'adultos no modo Desenvolvimento Pessoal. O tom deve ser maduro, profundo e focado em integridade, autogoverno e fidelidade prática.';
    prayerRule = 'Gere um único texto de oração individual meditativa e íntima (com o campo "role" como "Individual").';
  } else if (config.group === 'kids') {
    audienceDesc = 'crianças pequenas de 4 a 8 anos acompanhadas de seus pais. O tom deve ser lúdico, afetuoso, usando analogias simples da criação/natureza, focando em sentimentos práticos.';
    prayerRule = 'Gere 3 falas de oração curtas para orar em família no array "prayers" com as roles "Pai", "Filho" e "Juntos".';
  } else if (config.group === 'teens') {
    audienceDesc = 'adolescentes de 9 a 14 anos acompanhados de seus pais. O tom deve ser direto e focado em dilemas práticos (pressão escolar, aceitação, responsabilidades, amizades), sem infantilização.';
    prayerRule = 'Gere 3 falas de oração curtas para orar em família no array "prayers" com as roles "Pai", "Filho" e "Juntos".';
  } else if (config.group === 'young_adults') {
    audienceDesc = 'jovens de 15 a 18 anos acompanhados de seus pais. O tom deve ser desafiador, focado em preparação para o futuro, limites morais, escolhas privadas sinceras e disciplina.';
    prayerRule = 'Gere 3 falas de oração curtas para orar em família no array "prayers" com as roles "Pai", "Filho" e "Juntos".';
  }

  const systemPrompt = `Você é um teólogo, escritor e editor especialista em literatura bíblica devocional cristã.
Sua tarefa é gerar uma lição devocional inspiradora, teologicamente rica e de leitura rápida e direta sobre o tema ${themeTitle.toUpperCase()} no NOVO TESTAMENTO.

DIRETRIZES RÍGIDAS DE ESCRITA:
1. NARRATIVA BÍBLICA (biblical_story): Baseie-se fielmente na passagem do Novo Testamento informada (${nightPlan.reference}). Conte como uma narrativa histórica viva, clara e envolvente. NÃO acrescente termos modernos ou explicações psicológicas. Mantenha entre 120 e 160 palavras.
2. REFLEXÃO (reflection): Aplique a moral da história à vida prática diária do leitor em exatamente 1 parágrafo robusto e direto (máximo de 100 palavras). Evite clichês de autoajuda.
3. DESAFIO DO DIA (challenge): Uma ação prática, simples, direta e acionável no mesmo dia (máximo de 15 palavras).
4. MENSAGEM FINAL (final_message): Frase curta de forte impacto reflexivo (máximo 12 palavras).
5. PERGUNTAS DE CONVERSA (questions): Gere exatamente 3 perguntas exclusivas:
   - P1: Focada em compreensão da história bíblica.
   - P2: Focada em conexão com os dilemas e sentimentos diários.
   - P3: Focada em atitude prática de mudança.
6. ORAÇÃO (prayers):
   ${prayerRule}
7. RESUMO DE COMPARTILHAMENTO (share_summary): 3 a 4 linhas resumindo o aprendizado para envio pelo WhatsApp (narrativa bíblica clara e lição central).
8. VOCABULÁRIO PROIBIDO: Proibido o uso de expressões como "crise moral", "narrativa de proteção", "vulnerabilidade", "performance", "identidade fragmentada", "versão de si mesmo", "esconderijo emocional". Proibido o uso de travessões soltos (—) no meio do texto.
9. Retorne APENAS o JSON estruturado puro, sem blocos markdown.`;

  const prompt = `Gere a lição da Noite ${nightPlan.night} de 10 sobre o tema "${themeTitle}" para o público ${audienceDesc}.
Passagem Bíblica do Novo Testamento: "${nightPlan.reference}".
Eixo Temático da Noite: "${nightPlan.focus}".

Estrutura JSON obrigatória:
{
  "title": "Título curto e impactante (máximo 6 palavras)",
  "biblical_reference": "${nightPlan.reference}",
  "biblical_story": "Texto da história bíblica (120 a 160 palavras)",
  "reflection": "Texto da reflexão prática em 1 parágrafo (máximo 100 palavras)",
  "challenge": "Ação prática do dia (máximo 15 palavras)",
  "final_message": "Frase de impacto (máximo 12 palavras)",
  "share_summary": "Resumo de 3 a 4 linhas para compartilhamento no WhatsApp",
  "questions": [
    "Pergunta 1 (compreensão)",
    "Pergunta 2 (conexão diária)",
    "Pergunta 3 (atitude prática)"
  ],
  "prayers": [
    ${config.group === 'adulto'
      ? '{ "role": "Individual", "text": "Texto da oração individual sincera..." }'
      : '{ "role": "Pai", "text": "Oração do pai..." }, { "role": "Filho", "text": "Oração do filho..." }, { "role": "Juntos", "text": "Oração final juntos..." }'
    }
  ]
}`;

  return { systemPrompt, prompt };
}

async function generateWithGemini(theme, config, nightPlan) {
  const { systemPrompt, prompt } = getPrompt(theme, config, nightPlan);
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.7-flash',
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7
    }
  });

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  return JSON.parse(text);
}

async function generateWithClaude(theme, config, nightPlan) {
  const { systemPrompt, prompt } = getPrompt(theme, config, nightPlan);
  const res = await anthropicInstance.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }]
  });
  const text = res.content[0].text;
  const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleanJson);
}

function escapeSql(str) {
  if (!str) return "''";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

async function runExpansion() {
  console.log('🚀 Iniciando Geração de Lições (Noites 7 a 10) para Responsabilidade e Perseverança...');
  console.log(`Provider: ${activeProvider.toUpperCase()}`);
  console.log('-------------------------------------------------------------');

  const allGeneratedLessons = [];

  for (const theme of EXPANSION_THEMES) {
    console.log(`\n=============================================================`);
    console.log(`🌟 TEMA: ${theme.theme_name.toUpperCase()} (${theme.theme_id})`);
    console.log(`=============================================================`);

    const sqlLessonInserts = [];
    const sqlQuestionInserts = [];
    const sqlPrayerInserts = [];

    for (const nightPlan of theme.nights) {
      console.log(`\n🌙 NOITE ${nightPlan.night}: ${nightPlan.reference} (${nightPlan.focus.substring(0, 50)}...)`);

      for (const config of GROUPS) {
        console.log(`   👥 Faixa Etária: ${config.label}`);
        console.log(`      ✍️ Gerando conteúdo...`);

        try {
          const lessonData = activeProvider === 'gemini'
            ? await generateWithGemini(theme, config, nightPlan)
            : await generateWithClaude(theme, config, nightPlan);

          if (!lessonData || !lessonData.title) throw new Error('Dados JSON inválidos');

          const lessonId = randomUUID();
          const lessonRecord = {
            id: lessonId,
            theme_id: theme.theme_id,
            theme_name: theme.theme_name,
            development_mode: config.mode,
            age_group: config.group,
            lesson_number: nightPlan.night,
            title: lessonData.title,
            biblical_reference: lessonData.biblical_reference,
            biblical_story: lessonData.biblical_story,
            reflection: lessonData.reflection,
            challenge: lessonData.challenge,
            final_message: lessonData.final_message,
            share_summary: lessonData.share_summary,
            questions: lessonData.questions || [],
            prayers: lessonData.prayers || []
          };

          allGeneratedLessons.push(lessonRecord);

          // 1. Inserir no Supabase (Direto)
          const { error: insertLessonErr } = await supabase.from('dev_lessons').insert({
            id: lessonId,
            theme_id: theme.theme_id,
            theme_name: theme.theme_name,
            development_mode: config.mode,
            age_group: config.group,
            lesson_number: nightPlan.night,
            title: lessonData.title,
            biblical_reference: lessonData.biblical_reference,
            biblical_story: lessonData.biblical_story,
            reflection: lessonData.reflection,
            challenge: lessonData.challenge,
            final_message: lessonData.final_message,
            share_summary: lessonData.share_summary
          });

          if (insertLessonErr) {
            console.error(`      ⚠️ Erro ao inserir dev_lessons no Supabase: ${insertLessonErr.message}`);
          }

          // Questions
          if (lessonData.questions && lessonData.questions.length > 0) {
            const qInserts = lessonData.questions.map((q, idx) => ({
              id: randomUUID(),
              lesson_id: lessonId,
              question_text: q,
              display_order: idx + 1
            }));
            const { error: qErr } = await supabase.from('dev_questions').insert(qInserts);
            if (qErr) console.error(`      ⚠️ Erro dev_questions: ${qErr.message}`);
          }

          // Prayers
          if (lessonData.prayers && lessonData.prayers.length > 0) {
            const pInserts = lessonData.prayers.map((p, idx) => ({
              id: randomUUID(),
              lesson_id: lessonId,
              role: p.role,
              text_content: p.text || p.text_content || '',
              display_order: idx + 1
            }));
            const { error: pErr } = await supabase.from('dev_prayers').insert(pInserts);
            if (pErr) console.error(`      ⚠️ Erro dev_prayers: ${pErr.message}`);
          }

          // 2. Acumular SQL para arquivos de backup
          sqlLessonInserts.push(
            `(${escapeSql(lessonId)}, ${escapeSql(theme.theme_id)}, ${escapeSql(theme.theme_name)}, ${escapeSql(config.mode)}, ${escapeSql(config.group)}, ${nightPlan.night}, ${escapeSql(lessonData.title)}, ${escapeSql(lessonData.biblical_reference)}, ${escapeSql(lessonData.biblical_story)}, ${escapeSql(lessonData.reflection)}, ${escapeSql(lessonData.challenge)}, ${escapeSql(lessonData.final_message)}, ${escapeSql(lessonData.share_summary)}, NOW())`
          );

          (lessonData.questions || []).forEach((q, idx) => {
            sqlQuestionInserts.push(
              `(${escapeSql(randomUUID())}, ${escapeSql(lessonId)}, ${escapeSql(q)}, ${idx + 1})`
            );
          });

          (lessonData.prayers || []).forEach((p, idx) => {
            sqlPrayerInserts.push(
              `(${escapeSql(randomUUID())}, ${escapeSql(lessonId)}, ${escapeSql(p.role)}, ${escapeSql(p.text || p.text_content || '')}, ${idx + 1})`
            );
          });

          console.log(`      ✅ Sucesso: "${lessonData.title}" salvo no banco.`);
          await sleep(1000);

        } catch (err) {
          console.error(`      ❌ Erro na Noite ${nightPlan.night} (${config.group}):`, err.message);
        }
      }
    }

    // Gerar SQL do Tema
    let themeSql = `-- Novas Lições de ${theme.theme_name} (Noites 7 a 10 - Novo Testamento)\n\n`;
    if (sqlLessonInserts.length > 0) {
      themeSql += `INSERT INTO "public"."dev_lessons" ("id", "theme_id", "theme_name", "development_mode", "age_group", "lesson_number", "title", "biblical_reference", "biblical_story", "reflection", "challenge", "final_message", "share_summary", "created_at") VALUES\n` + sqlLessonInserts.join(',\n') + `;\n\n`;
    }
    if (sqlQuestionInserts.length > 0) {
      themeSql += `INSERT INTO "public"."dev_questions" ("id", "lesson_id", "question_text", "display_order") VALUES\n` + sqlQuestionInserts.join(',\n') + `;\n\n`;
    }
    if (sqlPrayerInserts.length > 0) {
      themeSql += `INSERT INTO "public"."dev_prayers" ("id", "lesson_id", "role", "text_content", "display_order") VALUES\n` + sqlPrayerInserts.join(',\n') + `;\n\n`;
    }

    const sqlPath = `c:\\Users\\rafae\\Documents\\FINHOUSE\\SITES\\devocional\\store-assets\\dev_lessons_${theme.theme_id}_7_10.sql`;
    fs.writeFileSync(sqlPath, themeSql, 'utf-8');
    console.log(`💾 Arquivo SQL salvo: ${sqlPath}`);
  }

  // Salvar backup JSON de todas as novas lições
  const jsonPath = `C:\\Users\\rafae\\.gemini\\antigravity-ide\\scratch\\responsabilidade_perseveranca_7_10.json`;
  fs.writeFileSync(jsonPath, JSON.stringify(allGeneratedLessons, null, 2), 'utf-8');
  console.log(`\n💾 Backup JSON salvo em: ${jsonPath}`);
  console.log(`🎉 Total de lições geradas e salvas no banco: ${allGeneratedLessons.length} / 32`);
}

runExpansion();
