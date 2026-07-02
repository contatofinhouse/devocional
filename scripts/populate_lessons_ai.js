import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

// 1. Configurações do Supabase
const SUPABASE_URL = 'https://xznzppgkkkkpzyvzemlr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bnpwcGdra2trcHp5dnplbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDIxNjMsImV4cCI6MjA3ODAxODE2M30.R7e76191bM6gsabfHh39aO6I6DCUrPGhy_K1HYIm8Sk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Carregar as chaves de API do arquivo .env
let anthropicApiKey = process.env.ANTHROPIC_API_KEY;
let geminiApiKey = process.env.GEMINI_API_KEY;

if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  
  const antMatch = envContent.match(/ANTHROPIC_API_KEY\s*=\s*(.*)/);
  if (antMatch) anthropicApiKey = antMatch[1].trim().replace(/['"]/g, '');

  const gemMatch = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/);
  if (gemMatch) geminiApiKey = gemMatch[1].trim().replace(/['"]/g, '');
}

// Inicializa a IA ativa de acordo com o que estiver configurado
let activeProvider = '';
let aiInstance = null;
let anthropicInstance = null;

if (geminiApiKey) {
  activeProvider = 'gemini';
  aiInstance = new GoogleGenerativeAI(geminiApiKey);
} else if (anthropicApiKey) {
  activeProvider = 'claude';
  anthropicInstance = new Anthropic({ apiKey: anthropicApiKey });
} else {
  console.error('❌ ERRO: Nenhuma chave de API encontrada (.env vazio).');
  console.log('Por favor, defina pelo menos uma chave no arquivo .env:');
  console.log('GEMINI_API_KEY=sua_chave_do_gemini (Grátis no Google AI Studio)');
  console.log('OU');
  console.log('ANTHROPIC_API_KEY=sua_chave_do_claude');
  process.exit(1);
}

// 3. Lista de temas
const THEMES = [
  { id: 'honestidade', name: 'Honestidade' },
  { id: 'responsabilidade', name: 'Responsabilidade' },
  { id: 'perseveranca', name: 'Perseverança' },
  { id: 'coragem', name: 'Coragem' },
  { id: 'obediencia', name: 'Obediência' },
  { id: 'paciencia', name: 'Paciência' },
  { id: 'lealdade', name: 'Lealdade' },
  { id: 'integridade', name: 'Integridade' },
  { id: 'perdao', name: 'Perdão' },
  { id: 'amizades', name: 'Amizades' },
  { id: 'bondade', name: 'Bondade' },
  { id: 'respeito', name: 'Respeito' },
  { id: 'generosidade', name: 'Generosidade' },
  { id: 'compaixao', name: 'Compaixão' },
  { id: 'reconciliacao', name: 'Reconciliação' },
  { id: 'pacificacao', name: 'Pacificação' },
  { id: 'comunicacao', name: 'Comunicação' },
  { id: 'fe', name: 'Fé' },
  { id: 'gratidao', name: 'Gratidão' },
  { id: 'humildade', name: 'Humildade' },
  { id: 'servico', name: 'Serviço' },
  { id: 'oracao', name: 'Oração' },
  { id: 'louvor', name: 'Louvor' },
  { id: 'confianca', name: 'Confiança' },
  { id: 'temor', name: 'Temor a Deus' },
  { id: 'escolhas', name: 'Escolhas' },
  { id: 'autocontrole', name: 'Autocontrole' },
  { id: 'ansiedade', name: 'Ansiedade' },
  { id: 'medo', name: 'Medo' },
  { id: 'influencia', name: 'Influência dos amigos' },
  { id: 'foco', name: 'Foco e Atenção' },
  { id: 'moderacao', name: 'Moderação' },
  { id: 'resiliencia', name: 'Resiliência' },
  { id: 'prudencia', name: 'Prudência' }
];

const GROUPS = [
  { mode: 'personal', group: 'adulto', label: 'Pessoal (Adulto)' },
  { mode: 'kids', group: 'kids', label: 'Pais & Filhos (Kids 4-8 anos)' },
  { mode: 'kids', group: 'teens', label: 'Pais & Filhos (Teens 9-14 anos)' },
  { mode: 'kids', group: 'young_adults', label: 'Pais & Filhos (Young Adults 15-18 anos)' }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log(`🚀 Iniciando Carga de Lições via ${activeProvider.toUpperCase()}...`);
  console.log(`Configuração: ${THEMES.length} temas, 6 noites por tema, 4 faixas etárias por noite.`);
  console.log('-----------------------------------------------------------------------');
  
  // MODO RETOMADA: Não limpa a base para continuar de onde parou
  console.log('▶️  Modo retomada ativado — pulando lições já cadastradas...\n');


  for (const theme of THEMES) {
    console.log(`\n📂 Processando Tema: ${theme.name.toUpperCase()} (${theme.id})`);
    
    for (const config of GROUPS) {
      console.log(`   👥 Faixa Etária: ${config.label}`);

      for (let night = 1; night <= 6; night++) {
        // Verificar se a lição já existe no Supabase
        const { data: existing, error: checkError } = await supabase
          .from('dev_lessons')
          .select('id')
          .eq('theme_id', theme.id)
          .eq('development_mode', config.mode)
          .eq('age_group', config.group)
          .eq('lesson_number', night)
          .maybeSingle();

        if (checkError) {
          console.error(`      ❌ Erro ao verificar banco de dados: ${checkError.message}`);
          continue;
        }

        if (existing) {
          console.log(`      ⏭️ Noite ${night}: Já cadastrada. Pulando.`);
          continue;
        }

        console.log(`      ✍️ Noite ${night}: Gerando via ${activeProvider.toUpperCase()}...`);
        
        try {
          const lessonData = activeProvider === 'gemini' 
            ? await generateWithGemini(theme, config, night)
            : await generateWithClaude(theme, config, night);

          if (!lessonData) throw new Error(`Falha ao obter JSON válido do ${activeProvider}.`);

          // Inserir lição
          const { data: newLesson, error: insertError } = await supabase
            .from('dev_lessons')
            .insert({
              theme_id: theme.id,
              theme_name: theme.name,
              development_mode: config.mode,
              age_group: config.group,
              lesson_number: night,
              title: lessonData.title,
              biblical_reference: lessonData.biblical_reference,
              biblical_story: lessonData.biblical_story,
              reflection: lessonData.reflection,
              challenge: lessonData.challenge,
              final_message: lessonData.final_message
            })
            .select('id')
            .single();

          if (insertError) throw insertError;

          // Inserir perguntas
          if (lessonData.questions && lessonData.questions.length > 0) {
            const questionRows = lessonData.questions.map((q, idx) => ({
              lesson_id: newLesson.id,
              question_text: q,
              display_order: idx + 1
            }));
            await supabase.from('dev_questions').insert(questionRows);
          }

          // Inserir orações
          if (lessonData.prayers && lessonData.prayers.length > 0) {
            const prayerRows = lessonData.prayers.map((p, idx) => ({
              lesson_id: newLesson.id,
              role: p.role,
              text_content: p.text || p.text_content || '',
              display_order: idx + 1
            }));
            await supabase.from('dev_prayers').insert(prayerRows);
          }

          console.log(`         ✅ Noite ${night} carregada: ${lessonData.title}`);
          
          // Delay de controle
          await sleep(activeProvider === 'gemini' ? 2500 : 2000);

        } catch (err) {
          console.error(`      ❌ Erro na Noite ${night}: ${err.message}`);
          console.log('      Carga abortada para verificação do erro.');
          process.exit(1);
        }
      }
    }
  }

  console.log('\n🎉 Processo de Geração Finalizado com Sucesso!');
}

function getPrompts(theme, config, night) {
  let targetDescription = '';
  let prayerRule = '';

  if (config.group === 'adulto') {
    targetDescription = 'público adulto no modo Desenvolvimento Pessoal. O tom deve ser profundo, intelectualmente honesto, focado em carreira, maturidade emocional, casamento e autogoverno. Aplique a psicologia cognitiva prática para identificar pensamentos automáticos e comportamentos e ensine técnicas de reestruturação mental.';
    prayerRule = 'Retorne um único item no array de orações com role="Individual", contendo uma reflexão/oração pessoal meditativa de conexão em primeira pessoa.';
  } else if (config.group === 'kids') {
    targetDescription = 'crianças de 4 a 8 anos acompanhadas de seus pais. O tom deve ser lúdico, com analogias simples da natureza ou animais, focando em comportamentos básicos como obediência, medo prático, dividir brinquedos e lidar com frustrações cotidianas de forma doce.';
    prayerRule = 'Retorne de 2 a 3 itens de diálogos no array de orações alternando as roles: "Pai" (fala do pai), "Filho" (fala da criança) e "Juntos" (fala em uníssono).';
  } else if (config.group === 'teens') {
    targetDescription = 'adolescentes de 9 a 14 anos acompanhados de seus pais. O tom deve ser realista e direto, sem infantilização. Foque em pressões escolares, aceitação social, integridade em testes, fofocas e dilemas morais comuns nessa idade.';
    prayerRule = 'Retorne de 2 a 3 itens de diálogos no array de orações alternando as roles: "Pai" (fala do pai), "Filho" (fala da criança) e "Juntos" (fala em uníssono).';
  } else if (config.group === 'young_adults') {
    targetDescription = 'jovens de 15 a 18 anos acompanhados de seus pais. O tom deve ser desafiador, focado em preparação para o futuro, amizades duradouras, limites morais, vocação e integridade nas escolhas privadas.';
    prayerRule = 'Retorne de 2 a 3 itens de diálogos no array de orações alternando as roles: "Pai" (fala do pai), "Filho" (fala da criança) e "Juntos" (fala em uníssono).';
  }

  const focusGuide = [
    '',
    'Noite 1: Fundamento & O que é? (História Bíblica clássica apresentando o tema)',
    'Noite 2: Aplicação no Cotidiano (Conecte com dilemas práticos do dia a dia do público)',
    'Noite 3: Pressão Social & Conflitos (Como agir quando outros pressionam contra a virtude)',
    'Noite 4: Reconhecendo Falhas & Redenção (Como se desculpar, se arrepender e reconstruir após errar)',
    'Noite 5: Construindo Confiança & Relações (O impacto direto dessa virtude nos relacionamentos e no lar)',
    'Noite 6: Legado & Caráter para o Futuro (Como essa virtude estabelece o destino de vida de quem a pratica)'
  ][night];

  const systemPrompt = `Você é uma inteligência artificial especialista em teologia e psicologia humana aplicada.
Gere um objeto JSON correspondente a uma lição de devocional altamente focada, profunda e de leitura rápida (leitura total de 3-4 minutos, para que o devocional completo com orações dure 15 minutos).

REGRAS DE ESTILO E ESCRITA:
1. NÃO utilize termos clichês, pieguice ou sentimentalismo de autoajuda.
2. PROIBIDO citar explicitamente termos de psicologia ou terapia (como "TCC", "Terapia Cognitivo-Comportamental", "Distorção Cognitiva"). Aplique a análise de pensamentos, sentimentos e ações de forma 100% fluida, invisível e integrada ao contexto moral.
3. PROIBIDO o uso de travessões (—) ou hifens soltos para introduzir explicações. Pontue suas frases de forma natural com vírgulas, pontos ou parênteses.
4. Use linguagem forte, de impacto, direta e literária refinada.
5. Responda APENAS com o objeto JSON limpo, sem marcações markdown de código.`;

  const prompt = `Gere um devocional instigante para o tema "${theme.name}" (${theme.id}), correspondente à Noite ${night} de 6 da trilha.
O conteúdo gerado é destinado ao ${targetDescription}.

Siga a seguinte diretriz de conteúdo para a Noite ${night}:
"${focusGuide}".

${prayerRule}

O JSON gerado deve seguir EXATAMENTE os seguintes limites de tamanho de campos:
{
  "title": "Título curto e impactante (máximo 6 palavras)",
  "biblical_reference": "Livro Capítulo:Versículos",
  "biblical_story": "Relato da história bíblica resumido em 1 a 2 parágrafos curtos, envolventes e sem enrolação (máximo 150 palavras no total)",
  "reflection": "Reflexão aplicando a moral da história de forma profunda e invisível à mente prática em exatamente 1 parágrafo robusto, direto e de forte impacto (máximo 150 palavras)",
  "challenge": "Desafio prático e acionável em uma única frase simples",
  "final_message": "Frase curta de forte impacto reflexivo (máximo 12 palavras)",
  "questions": [
    "Primeira pergunta rápida de reflexão prática (máximo 15 palavras)",
    "Segunda pergunta rápida de reflexão prática (máximo 15 palavras)",
    "Terceira pergunta rápida de reflexão prática (máximo 15 palavras)"
  ],
  "prayers": [
    { "role": "Pai/Filho/Juntos/Individual", "text": "Frase curta e sincera de oração/fala (máximo 2 linhas)." }
  ]
}`;

  return { systemPrompt, prompt };
}

async function generateWithGemini(theme, config, night) {
  const { systemPrompt, prompt } = getPrompts(theme, config, night);
  const model = aiInstance.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const response = await model.generateContent({
      prompt: `${systemPrompt}\n\n${prompt}`,
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error(`Erro ao chamar a API do Gemini: ${err.message}`);
    return null;
  }
}

async function generateWithClaude(theme, config, night) {
  const { systemPrompt, prompt } = getPrompts(theme, config, night);

  const models = [
    'claude-sonnet-4-6',
    'claude-3-5-sonnet-20241022',
    'claude-3-5-sonnet-20240620',
    'claude-3-5-sonnet-latest'
  ];

  let lastErrorMsg = '';

  for (const modelId of models) {
    try {
      const response = await anthropicInstance.messages.create({
        model: modelId,
        max_tokens: 3000,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      });

      const rawText = response.content[0].text;
      
      const startIdx = rawText.indexOf('{');
      const endIdx = rawText.lastIndexOf('}');
      if (startIdx === -1 || endIdx === -1) {
        throw new Error('Nenhum JSON encontrado no texto do Claude.');
      }
      const cleanJsonText = rawText.substring(startIdx, endIdx + 1);
      
      return JSON.parse(cleanJsonText);

    } catch (err) {
      lastErrorMsg = err.message;
      // Trata erro de modelo não encontrado (404) ou sem permissão na chave
      if (err.message.includes('not_found') || err.message.includes('404') || err.message.includes('model_not_found')) {
        console.warn(`      ⚠️ Modelo ${modelId} indisponível. Tentando próximo da fila...`);
        continue;
      }
      // Se for outro erro grave (como 401 ou 403), joga o erro para abortar a carga
      throw err;
    }
  }

  console.error(`❌ Erro definitivo ao chamar a API do Claude: ${lastErrorMsg}`);
  return null;
}

main().catch(console.error);
