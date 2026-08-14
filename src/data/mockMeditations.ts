export interface MeditationStep {
  id: number;
  phase: string;
  focus: 'breathing' | 'awareness' | 'mindset' | 'integration';
  startSeconds: number;
  endSeconds: number;
  text: string;
}

export interface MeditationSession {
  id: string;
  title: string;
  subtitle: string;
  methodology: string;
  durationSeconds: number;
  audioUrl: string;
  affirmation: string;
  reflectionPrompt: string;
  steps: MeditationStep[];
}

export const GUIDED_MEDITATIONS: MeditationSession[] = [
  {
  "id": "mindfulness_mindset_1",
  "title": "Presença, Clareza & Foco",
  "subtitle": "Reprogramação de Mindset com Mindfulness MBSR",
  "methodology": "Mindfulness Tradicional (MBSR / RAIN)",
  "durationSeconds": 172,
  "audioUrl": "/audio/meditacao_mindset.mp3",
  "affirmation": "Minha mente está serena, meu discernimento está afiado e meu foco está alinhado no presente.",
  "reflectionPrompt": "Como você se sente após esta pausa para reprogramar seu foco?",
  "steps": [
    {
      "id": 1,
      "phase": "Acolhimento & Postura",
      "focus": "breathing",
      "startSeconds": 0.0,
      "endSeconds": 25.3,
      "text": "Bem-vindo a este momento de pausa e renovação. Encontre uma posição confortável, sentado com as costas eretas, porém relaxadas. Feche suavemente os olhos ou suavize o seu olhar para um ponto à frente. Permita-se pousar completamente no momento presente."
    },
    {
      "id": 2,
      "phase": "Ancoragem na Respiração",
      "focus": "breathing",
      "startSeconds": 25.3,
      "endSeconds": 56.3,
      "text": "Traga agora toda a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, soltando os ombros e liberando todo o peso do dia. Sinta o ar entrando com calma e saindo com alívio."
    },
    {
      "id": 3,
      "phase": "Presença & Desaceleração",
      "focus": "awareness",
      "startSeconds": 56.3,
      "endSeconds": 82.7,
      "text": "Observe as sensações do seu corpo. Sinta o apoio firme sob você. Solte qualquer tensão no maxilar, suavize a testa e os olhos. Não há nada para resolver neste exato segundo. Este momento é um espaço seguro de quietude e clareza."
    },
    {
      "id": 4,
      "phase": "Observação Sem Julgamento (Mindfulness)",
      "focus": "awareness",
      "startSeconds": 82.7,
      "endSeconds": 109.7,
      "text": "Se pensamentos, tarefas ou preocupações surgirem na mente, não tente lutar contra eles. Apenas reconheça a presença deles com gentileza, como quem observa nuvens passando pelo céu. Deixe-os ir embora no ritmo da sua respiração, retornando sempre ao centro do seu ser."
    },
    {
      "id": 5,
      "phase": "Reprogramação de Mindset",
      "focus": "mindset",
      "startSeconds": 109.7,
      "endSeconds": 139.6,
      "text": "Agora, interiorize estas convicções com firmeza e serenidade: Eu escolho a calma no lugar da pressa. Minha mente tem clareza e discernimento. Eu tenho autogoverno sobre minhas reações e foco absoluto no que é essencial. Eu estou em paz no meu presente e seguro no meu caminho."
    },
    {
      "id": 6,
      "phase": "Integração & Retorno",
      "focus": "integration",
      "startSeconds": 139.6,
      "endSeconds": 171.7,
      "text": "Faça mais uma respiração profunda e consciente. Sinta uma onda de energia limpa e renovadora percorrendo todo o seu corpo. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta mente serena, forte e focada para todas as suas escolhas de hoje."
    }
  ]
}
];
