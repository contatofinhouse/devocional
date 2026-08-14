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
  "durationSeconds": 142,
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
      "endSeconds": 21.6,
      "text": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, sentado com a coluna ereta, porém relaxada. Feche suavemente os olhos ou mantenha o olhar suave em um ponto à frente. Permita-se pousar por inteiro no momento presente."
    },
    {
      "id": 2,
      "phase": "2. Ancoragem na Respiração",
      "focus": "breathing",
      "startSeconds": 21.6,
      "endSeconds": 46.4,
      "text": "Traga agora toda a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, soltando os ombros e liberando todo o peso acumulado. Sinta o ar entrando com calma, e saindo com alívio."
    },
    {
      "id": 3,
      "phase": "3. Desaceleração & Escaneamento",
      "focus": "awareness",
      "startSeconds": 46.4,
      "endSeconds": 69.4,
      "text": "Observe as sensações do seu corpo agora. Sinta o apoio firme sob você. Solte qualquer tensão no maxilar, suavize a testa e ao redor dos olhos. Não há nada para resolver neste exato segundo. Este momento é um espaço seguro de quietude e clareza."
    },
    {
      "id": 4,
      "phase": "4. Observação Sem Julgamento (RAIN)",
      "focus": "awareness",
      "startSeconds": 69.4,
      "endSeconds": 91.0,
      "text": "Se pensamentos, tarefas ou preocupações surgirem na mente, não tente lutar contra eles. Apenas reconheça a presença deles com gentileza, como quem observa nuvens passando pelo céu. Deixe-os passar no ritmo da sua respiração, retornando sempre ao centro do seu ser."
    },
    {
      "id": 5,
      "phase": "5. Reprogramação de Mindset",
      "focus": "mindset",
      "startSeconds": 91.0,
      "endSeconds": 115.4,
      "text": "Agora, interiorize estas convicções com firmeza e serenidade: Eu escolho a calma no lugar da pressa. Minha mente tem clareza e discernimento. Eu tenho autogoverno sobre minhas reações e foco absoluto no que é essencial. Eu estou em paz no meu presente e seguro no meu caminho."
    },
    {
      "id": 6,
      "phase": "6. Integração & Retorno",
      "focus": "integration",
      "startSeconds": 115.4,
      "endSeconds": 141.6,
      "text": "Faça mais uma respiração profunda e consciente. Sinta uma onda de energia limpa e renovadora percorrendo todo o seu corpo. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta mente serena, forte e focada para todas as suas escolhas de hoje."
    }
  ]
}
];
