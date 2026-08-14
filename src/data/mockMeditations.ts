export interface MeditationStep {
  id: number;
  phase: string;
  focus: 'breathing' | 'awareness' | 'mindset' | 'integration';
  startSeconds: number;
  endSeconds: number;
  text: string;
}

export interface ScientificMethodology {
  title: string;
  origin: string;
  benefits: string[];
  stages: { stage: string; desc: string }[];
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
  scientificMethodology: ScientificMethodology;
  steps: MeditationStep[];
}

export const GUIDED_MEDITATIONS: MeditationSession[] = [
  {
  "id": "mindfulness_mindset_1",
  "title": "Presença, Clareza & Foco",
  "subtitle": "Reprogramação de Mindset com Metodologia MBSR & RAIN",
  "methodology": "Mindfulness MBSR",
  "durationSeconds": 99,
  "audioUrl": "/audio/meditacao_mindset.mp3",
  "affirmation": "Minha mente está serena, meu discernimento está afiado e meu foco está ancorado no presente.",
  "reflectionPrompt": "Como sua mente se sente após esta sessão de ancoragem?",
  "scientificMethodology": {
    "title": "Base Científica: MBSR & Neuroplasticidade",
    "origin": "Desenvolvido pelo Dr. Jon Kabat-Zinn na UMass Medical School e validado em Harvard & Stanford.",
    "benefits": [
      "Redução mensurável do cortisol e desativação da amígdala cerebral (centro do estresse).",
      "Desativação da Rede em Modo Padrão (DMN), eliminando ruído mental e pensamentos ruminantes.",
      "Protocolo RAIN: Reconhecer, Permitir, Investigar com gentileza e Nutrir o autocuidado.",
      "Estímulo à neuroplasticidade para ancoragem de clareza, autogoverno e foco intencional."
    ],
    "stages": [
      {
        "stage": "1. Ancoragem Respiratória",
        "desc": "Coerência cardíaca com ritmo 4-4-6 para estabilizar o sistema nervoso autônomo."
      },
      {
        "stage": "2. Escaneamento Corporal",
        "desc": "Liberação da tensão física somatizada no maxilar, ombros e testa."
      },
      {
        "stage": "3. Observador Imparcial (RAIN)",
        "desc": "Observação de pensamentos intrusivos como nuvens passageiras, sem julgamento."
      },
      {
        "stage": "4. Reprogramação Cognitiva",
        "desc": "Ancoragem neural de convicções de serenidade, autogoverno e firmeza de propósito."
      }
    ]
  },
  "steps": [
    {
      "id": 1,
      "phase": "1. Acolhimento e Postura",
      "focus": "breathing",
      "startSeconds": 0.0,
      "endSeconds": 14.8,
      "text": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos. Permita-se estar presente, aqui e agora."
    },
    {
      "id": 2,
      "phase": "2. Ancoragem na Respiração",
      "focus": "breathing",
      "startSeconds": 14.8,
      "endSeconds": 36.1,
      "text": "Traga a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um breve instante... E solte o ar devagar pela boca, relaxando os ombros e liberando todo o cansaço acumulado. Sinta a calma entrando a cada respiração."
    },
    {
      "id": 3,
      "phase": "3. Desaceleração & Escaneamento",
      "focus": "awareness",
      "startSeconds": 36.1,
      "endSeconds": 53.5,
      "text": "Observe o seu corpo neste momento. Solte a tensão do maxilar, relaxe a testa e os olhos. Não há nada para resolver neste segundo. Este é o seu espaço de quietude, clareza e paz interior."
    },
    {
      "id": 4,
      "phase": "4. Observação Sem Julgamento (RAIN)",
      "focus": "awareness",
      "startSeconds": 53.5,
      "endSeconds": 68.7,
      "text": "Se pensamentos ou preocupações surgirem, não lute contra eles. Apenas observe cada pensamento como uma nuvem passando no céu, e gentilmente traga o foco de volta para a sua respiração."
    },
    {
      "id": 5,
      "phase": "5. Reprogramação de Mindset",
      "focus": "mindset",
      "startSeconds": 68.7,
      "endSeconds": 84.4,
      "text": "Agora, sinta esta verdade em sua mente: Eu escolho a serenidade. Minha mente é clara, focada e consciente. Eu tenho autogoverno sobre minhas escolhas e estou em paz no meu caminho."
    },
    {
      "id": 6,
      "phase": "6. Integração & Retorno",
      "focus": "integration",
      "startSeconds": 84.4,
      "endSeconds": 99.2,
      "text": "Faça mais uma respiração profunda. Movimente suavemente as mãos e os pés. Quando se sentir pronto, abra os olhos, levando esta clareza e tranquilidade para todo o seu dia."
    }
  ]
}
];
