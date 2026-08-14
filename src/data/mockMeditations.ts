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
  "durationSeconds": 157,
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
      "endSeconds": 18.8,
      "text": "Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos e permita-se estar presente."
    },
    {
      "id": 2,
      "phase": "2. Ancoragem Respiratória (Ciclo 1)",
      "focus": "breathing",
      "startSeconds": 18.8,
      "endSeconds": 47.0,
      "text": "Inspire profundamente pelo nariz... Segure... E solte o ar devagar pela boca, soltando os ombros e relaxando."
    },
    {
      "id": 3,
      "phase": "3. Respiração de Alívio (Ciclo 2)",
      "focus": "breathing",
      "startSeconds": 47.0,
      "endSeconds": 67.2,
      "text": "Puxe o ar com calma e profundidade... e solte devagar, sentindo o alívio e a descompressão em todo o corpo."
    },
    {
      "id": 4,
      "phase": "4. Desaceleração & Escaneamento",
      "focus": "awareness",
      "startSeconds": 67.2,
      "endSeconds": 91.2,
      "text": "Solte a tensão do maxilar, relaxe a testa e os ombros. Sinta seu corpo pousar em quietude e paz."
    },
    {
      "id": 5,
      "phase": "5. Observador Sem Julgamento (RAIN)",
      "focus": "awareness",
      "startSeconds": 91.2,
      "endSeconds": 116.4,
      "text": "Apenas observe seus pensamentos como nuvens passando no céu, sem julgamento, retornando à respiração."
    },
    {
      "id": 6,
      "phase": "6. Reprogramação de Mindset",
      "focus": "mindset",
      "startSeconds": 116.4,
      "endSeconds": 137.6,
      "text": "Eu escolho a serenidade. Minha mente é clara, focada e consciente. Tenho autogoverno e clareza no meu caminho."
    },
    {
      "id": 7,
      "phase": "7. Integração & Retorno",
      "focus": "integration",
      "startSeconds": 137.6,
      "endSeconds": 157.1,
      "text": "Respire fundo, movimente suavemente as mãos e abra os olhos, levando esta clareza para o seu dia."
    }
  ]
}
];
