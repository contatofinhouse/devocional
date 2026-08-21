const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Parser nativo de .env
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas no .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BIBLE_DATA = [
  {
    id: 'momentos',
    title: 'Momentos & Emoções',
    badge_name: 'Momentos',
    description: 'Passagens bíblicas e reflexões para acalmar o coração e renovar a fé.',
    color: '#4D96FF',
    bg_color: '#F0F5FF',
    sort_order: 1,
    themes: [
      {
        id: 'momento-ansiedade',
        name: 'Ansiedade & Inquietude',
        subtitle: 'A paz que excede todo o entendimento',
        biblical_reference: 'Filipenses 4:6-7',
        duration: '3 min',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        audio_url: '/audio/meditacao_ansiedade.mp3',
        audio_voice: 'nova',
        is_free: true,
        sort_order: 1,
        content: {
          biblicalReference: 'Filipenses 4:6-7',
          biblicalTextQuote: 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.',
          keyVerses: [
            { text: 'Humilhai-vos, pois, debaixo da potente mão de Deus, para que a seu tempo vos exalte; lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.', reference: '1 Pedro 5:6-7' },
            { text: 'Portanto, não vos inquieteis com o dia de amanhã, pois o amanhã trará os seus cuidados; basta ao dia o seu próprio mal.', reference: 'Mateus 6:34' }
          ],
          reflection: 'A ansiedade tenta nos convencer de que precisamos controlar o que ainda nem aconteceu. Mas a Palavra nos convida a uma troca sagrada: entregamos nossas preocupações em oração e recebemos a paz que guarda nossa mente. Hoje, respire fundo e entregue o controle Àquele que sustenta o universo.',
          prayer: 'Senhor, entrego nas Tuas mãos todas as incertezas e o peso do amanhã. Guarda os meus pensamentos na Tua verdade e preenche o meu peito com a Tua doce paz. Amém.',
          applicationQuestion: 'Qual preocupação específica você pode entregar nas mãos de Deus agora mesmo?'
        }
      },
      {
        id: 'momento-medo',
        name: 'Vencendo o Medo',
        subtitle: 'O Senhor é o meu refúgio e fortaleza',
        biblical_reference: 'Salmo 23:4 & Josué 1:9',
        duration: '3 min',
        image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        audio_url: '/audio/jornada_fase_1.mp3',
        audio_voice: 'onyx',
        is_free: false,
        sort_order: 2,
        content: {
          biblicalReference: 'Salmo 23:4',
          biblicalTextQuote: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.',
          keyVerses: [
            { text: 'Não to mandei eu? Sê forte e corajoso; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.', reference: 'Josué 1:9' }
          ],
          reflection: 'O medo nos paralisa quando olhamos para a tempestade em vez de olhar para Quem caminha sobre as águas. A presença de Deus não anula o vale, mas garante que nunca atravessaremos a escuridão sozinhos.',
          prayer: 'Pai celestial, quando o medo bater à minha porta, lembra-me de que Tua presença caminha ao meu lado. Tu és meu escudo e meu refúgio seguro. Em Ti confio. Amém.',
          applicationQuestion: 'Em qual área da sua vida você precisa dar um passo de coragem hoje?'
        }
      }
    ]
  },
  {
    id: 'historias',
    title: 'Histórias da Bíblia',
    badge_name: 'Narrativas',
    description: 'Grandes relatos de fé, coragem e aliança com Deus contados em atos.',
    color: '#FF6B6B',
    bg_color: '#FFF5F5',
    sort_order: 2,
    themes: [
      {
        id: 'historia-rute',
        name: 'A História de Rute',
        subtitle: 'A fidelidade que redefiniu uma linhagem real',
        biblical_reference: 'Livro de Rute 1-4',
        duration: '4 min',
        image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        audio_url: '/audio/historia_rute.mp3',
        audio_voice: 'nova',
        is_free: false,
        sort_order: 1,
        content: {
          biblicalReference: 'Rute 1:16-17',
          biblicalTextQuote: 'Disse, porém, Rute: Não me instes para que te deixe, e me afaste de ti; porque aonde quer que tu fores irei eu, e onde quer que pousares, ali pousarei eu; o teu povo é o meu povo, o teu Deus é o meu Deus.',
          acts: [
            { actNumber: 1, title: 'O Vazio e o Pacto Inquebrável', text: 'Após perder o marido e os dois filhos em Moabe, Noemi decide voltar desolada para Belém. Rute, porém, recusa deixá-la e sela uma das maiores declarações de lealdade da humanidade: "O teu Deus será o meu Deus".' },
            { actNumber: 2, title: 'A Graça no Campo de Boaz', text: 'Para sustentar Noemi, Rute recolhe espigas no campo de Boaz, homem justo e nobre. Boaz reconhece a virtude e o sacrifício de Rute, estendendo-lhe proteção, honra e alimento abundante.' },
            { actNumber: 3, title: 'O Pedido de Redenção na Eira', text: 'Seguindo a sábia orientação de Noemi, Rute pede a Boaz que estenda sua capa sobre ela como parente remidor. Boaz assume o compromisso público perante os anciãos da cidade.' },
            { actNumber: 4, title: 'A Restauração e a Linhagem Eterna', text: 'Boaz e Rute casam-se e têm Obede. O bebê é colocado no colo de Noemi, transformando o luto em riso. Obede gerou a Jessé, pai do Rei Davi, da linhagem de Jesus Cristo.' }
          ],
          reflection: 'O amor abnegado e a lealdade de Rute mostram como escolhas corretas feitas na dor atraem a providência redentora de Deus, transformando vidas comuns em canais de bênção para gerações.',
          prayer: 'Senhor, concede-me um coração leal, íntegro e fiel como o de Rute. Que minha vida reflita Teu amor acolhedor e confiança na Tua provisão soberana. Amém.',
          applicationQuestion: 'Como você pode demonstrar lealdade e cuidado a alguém próximo hoje?'
        }
      }
    ]
  },
  {
    id: 'kids',
    title: 'Bíblia Kids (Histórias Ilustradas)',
    badge_name: 'Kids',
    description: 'Histórias bíblicas em carrossel de cenas com lições práticas para os pequenos.',
    color: '#6BCB77',
    bg_color: '#F4FBF4',
    sort_order: 3,
    themes: [
      {
        id: 'kids-criacao',
        name: 'A Criação do Mundo',
        subtitle: 'Como Deus fez esse mundo tão lindo',
        biblical_reference: 'Gênesis 1:1-31',
        duration: '3 min',
        image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        audio_url: '/audio/jornada_fase_1.mp3',
        audio_voice: 'shimmer',
        is_free: false,
        sort_order: 1,
        content: {
          biblicalReference: 'Gênesis 1:1-31',
          biblicalTextQuote: 'No princípio criou Deus os céus e a terra... E viu Deus tudo quanto tinha feito, e eis que era muito bom.',
          moralLesson: 'Deus fez tudo com muito carinho e nos ama profundamente.',
          kidsPrayer: 'Papai do Céu, obrigado por criar esse mundo tão lindo, o céu azul e os animaizinhos! Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: A Luz no Escuro',
              imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
              text: 'No início de tudo, não havia nada além de escuridão. Então Deus olhou com amor e disse com Sua voz poderosa: "Haja Luz!" E uma luz brilhante e colorida surgiu iluminando todo o universo!'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: Céu, Mares e a Terra',
              imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
              text: 'Deus separou as águas azuis, criou o céu fofinho de nuvens e a terra firme com montanhas, florestas e flores de todas as cores do arco-íris.'
            }
          ]
        }
      }
    ]
  }
];

async function seed() {
  console.log('🚀 Iniciando sincronização das Trilhas e Histórias da Bíblia no Supabase...');

  for (const trail of BIBLE_DATA) {
    const { error: trailErr } = await supabase
      .from('bible_trails')
      .upsert({
        id: trail.id,
        title: trail.title,
        badge_name: trail.badge_name,
        description: trail.description,
        color: trail.color,
        bg_color: trail.bg_color,
        sort_order: trail.sort_order
      });

    if (trailErr) {
      console.warn(`⚠️ Aviso ao salvar trilha ${trail.id}:`, trailErr.message);
    } else {
      console.log(`✅ Trilha [${trail.title}] sincronizada.`);
    }

    for (const theme of trail.themes) {
      const { error: themeErr } = await supabase
        .from('bible_stories')
        .upsert({
          id: theme.id,
          trail_id: trail.id,
          name: theme.name,
          subtitle: theme.subtitle,
          biblical_reference: theme.biblical_reference,
          duration: theme.duration,
          image_url: theme.image_url,
          audio_url: theme.audio_url,
          audio_voice: theme.audio_voice,
          is_free: theme.is_free,
          sort_order: theme.sort_order,
          content: theme.content
        });

      if (themeErr) {
        console.warn(`⚠️ Aviso ao salvar história ${theme.id}:`, themeErr.message);
      } else {
        console.log(`   ➔ História [${theme.name}] salva com sucesso.`);
      }
    }
  }

  console.log('🎉 Sincronização concluída com sucesso!');
}

seed().catch(err => {
  console.error('❌ Erro na execução do seed:', err);
});
