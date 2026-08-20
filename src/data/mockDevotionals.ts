export interface DevotionalStory {
  biblicalReference: string;
  biblicalStoryTitle: string;
  biblicalStory: string;
  reflection: string;
  questions: string[];
  challenge: string;
  prayer: {
    dialogue: { role: 'Pai' | 'Filho' | 'Juntos' | 'Individual'; text: string }[];
  };
  finalMessage: string;
  shareSummary?: string;
}

export interface Devotional {
  id: string;
  theme: string;
  stories: DevotionalStory[];
}

export interface KidProfile {
  name: string;
  age: number;
  interests: string;
  hobbies: string;
  personality: string;
  difficulties: string;
  objectives: string;
  favoriteVerses: string;
  availableTime: number;
}

export interface ParentLog {
  id: string;
  date: string;
  devotionalId: string;
  devotionalTitle: string;
  howItWent: string;
  reaction: 'loved' | 'good' | 'neutral' | 'difficult';
  learnings: string;
  prayerRequests: string;
  progressPerceived: string;
  challengeStatus: 'not_started' | 'ongoing' | 'completed';
  rating?: number;
  tags?: string[];
}

export const TRAILS = [
  {
    id: 'carater',
    title: 'Construindo Caráter',
    badgeName: 'Caráter',
    description: 'Valores essenciais para formar o coração e as atitudes.',
    color: '#FF6B6B',
    bgColor: '#FFF5F5',
    themes: [
      { id: 'honestidade', name: 'Honestidade', icon: 'ShieldAlert', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { id: 'responsabilidade', name: 'Responsabilidade', icon: 'CheckSquare', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80' },
      { id: 'perseveranca', name: 'Perseverança', icon: 'Footprints', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { id: 'coragem', name: 'Coragem', icon: 'Flame', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80' },
      { id: 'obediencia', name: 'Obediência', icon: 'CheckSquare', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80' },
      { id: 'paciencia', name: 'Paciência', icon: 'Clock', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
      { id: 'lealdade', name: 'Lealdade', icon: 'Users', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&q=80' },
      { id: 'integridade', name: 'Integridade', icon: 'ShieldAlert', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos',
    badgeName: 'Relacionamento',
    description: 'Como amar o próximo, fazer bons amigos e respeitar o lar.',
    color: '#4D96FF',
    bgColor: '#F0F5FF',
    themes: [
      { id: 'generosidade', name: 'Generosidade', icon: 'Gift', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80' },
      { id: 'perdao', name: 'Perdão', icon: 'HeartHandshake', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { id: 'amizades', name: 'Amizades', icon: 'Users', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80' },
      { id: 'bondade', name: 'Bondade', icon: 'Sparkles', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=400&q=80' },
      { id: 'respeito', name: 'Respeito', icon: 'Smile', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
      { id: 'compaixao', name: 'Compaixão', icon: 'Heart', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80' },
      { id: 'reconciliacao', name: 'Reconciliação', icon: 'HeartHandshake', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=400&q=80' },
      { id: 'pacificacao', name: 'Pacificação', icon: 'Smile', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80' },
      { id: 'comunicacao', name: 'Comunicação', icon: 'MessageCircle', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'vida-deus',
    title: 'Vida com Deus',
    badgeName: 'Vida com Deus',
    description: 'Fortalecendo a fé, gratidão e o coração de servo.',
    color: '#6BCB77',
    bgColor: '#F4FBF4',
    themes: [
      { id: 'fe', name: 'Fé', icon: 'Compass', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80' },
      { id: 'gratidao', name: 'Gratidão', icon: 'Sun', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80' },
      { id: 'humildade', name: 'Humildade', icon: 'ChevronDown', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80' },
      { id: 'servico', name: 'Serviço', icon: 'HandPlatter', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=400&q=80' },
      { id: 'oracao', name: 'Oração', icon: 'MessageCircle', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80' },
      { id: 'louvor', name: 'Louvor', icon: 'Sparkles', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80' },
      { id: 'confianca', name: 'Confiança', icon: 'Compass', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80' },
      { id: 'temor', name: 'Temor a Deus', icon: 'ShieldAlert', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'sabedoria',
    title: 'Sabedoria',
    badgeName: 'Sabedoria',
    description: 'Lidando com emoções, escolhas difíceis e pressões do mundo.',
    color: '#F4D160',
    bgColor: '#FFFDF0',
    themes: [
      { id: 'ansiedade', name: 'Ansiedade', icon: 'Wind', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { id: 'escolhas', name: 'Escolhas', icon: 'HelpCircle', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
      { id: 'autocontrole', name: 'Autocontrole', icon: 'Lock', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=400&q=80' },
      { id: 'medo', name: 'Medo', icon: 'Moon', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80' },
      { id: 'influencia', name: 'Influência dos amigos', icon: 'Sparkle', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80' },
      { id: 'foco', name: 'Foco e Atenção', icon: 'CheckSquare', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80' },
      { id: 'moderacao', name: 'Moderação', icon: 'Lock', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80' },
      { id: 'resiliencia', name: 'Resiliência', icon: 'Footprints', duration: '3 min', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { id: 'prudencia', name: 'Prudência', icon: 'HelpCircle', duration: '2 min', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
    ]
  }
];

export const KIDS_CRISIS_SITUATIONS = [
  { id: 'honestidade', label: 'Mentiu ou escondeu algo hoje', category: 'Honestidade' },
  { id: 'responsabilidade', label: 'Não fez o dever de casa ou obrigações', category: 'Responsabilidade' },
  { id: 'perseveranca', label: 'Quer desistir de um esporte ou atividade', category: 'Perseverança' },
  { id: 'coragem', label: 'Está com medo de tentar algo novo', category: 'Coragem' },
  { id: 'obediencia', label: 'Desobedeceu aos pais ou professores', category: 'Obediência' },
  { id: 'paciencia', label: 'Perdeu a paciência ou está irritado', category: 'Paciência' },
  { id: 'lealdade', label: 'Deixou de apoiar ou excluiu um amigo', category: 'Lealdade' },
  { id: 'integridade', label: 'Trapaceou em um jogo ou prova', category: 'Integridade' },
  { id: 'perdao', label: 'Brigou com um amigo ou irmão', category: 'Perdão' },
  { id: 'amizades', label: 'Está se sentindo rejeitado ou excluído', category: 'Amizades' },
  { id: 'bondade', label: 'Foi egoísta ou grosseiro hoje', category: 'Bondade' },
  { id: 'respeito', label: 'Respondeu mal ou faltou com respeito', category: 'Respeito' },
  { id: 'generosidade', label: 'Não quis compartilhar suas coisas', category: 'Generosidade' },
  { id: 'fe', label: 'Dúvidas ou desanimado com Deus', category: 'Fé' },
  { id: 'gratidao', label: 'Reclamou muito e não agradeceu hoje', category: 'Gratidão' },
  { id: 'humildade', label: 'Quis se gabar ou diminuir alguém', category: 'Humildade' },
  { id: 'servico', label: 'Não ajudou nas tarefas do lar', category: 'Serviço' },
  { id: 'escolhas', label: 'Tomou uma decisão impulsiva ou errada', category: 'Escolhas' },
  { id: 'autocontrole', label: 'Teve um ataque de raiva ou birra', category: 'Autocontrole' },
  { id: 'ansiedade', label: 'Muito preocupado ou ansioso com algo', category: 'Ansiedade' },
  { id: 'medo', label: 'Com medo do escuro ou de dormir só', category: 'Medo' },
  { id: 'influencia', label: 'Cedendo a pressões erradas de colegas', category: 'Influência' },
  { id: 'foco', label: 'Disperso, sem foco nas tarefas importantes', category: 'Foco' },
  { id: 'moderacao', label: 'Passou tempo demais nas telas', category: 'Moderação' }
];

export const ADULT_CRISIS_SITUATIONS = [
  { id: 'honestidade', label: 'Fui desonesto ou omiti algo importante', category: 'Honestidade' },
  { id: 'responsabilidade', label: 'Negligência ou procrastinação grave', category: 'Responsabilidade' },
  { id: 'perseveranca', label: 'Desânimo de continuar um projeto/meta', category: 'Perseverança' },
  { id: 'coragem', label: 'Insegurança ou medo do fracasso', category: 'Coragem' },
  { id: 'obediencia', label: 'Desalinhado com meus princípios morais', category: 'Obediência' },
  { id: 'paciencia', label: 'Estressado ou impaciente com as pessoas', category: 'Paciência' },
  { id: 'lealdade', label: 'Faltei com lealdade a um compromisso', category: 'Lealdade' },
  { id: 'integridade', label: 'Pensei em tomar um atalho moral', category: 'Integridade' },
  { id: 'perdao', label: 'Alimentando mágoas ou ressentimento', category: 'Perdão' },
  { id: 'amizades', label: 'Solidão ou decepção com um amigo próximo', category: 'Amizades' },
  { id: 'bondade', label: 'Fui frio, egoísta ou indiferente', category: 'Bondade' },
  { id: 'respeito', label: 'Tratei alguém com arrogância ou rispidez', category: 'Respeito' },
  { id: 'generosidade', label: 'Retive recursos ou fui mesquinho', category: 'Generosidade' },
  { id: 'fe', label: 'Distante de Deus ou crise espiritual', category: 'Fé' },
  { id: 'gratidao', label: 'Insatisfeito e murmurando sobre a vida', category: 'Gratidão' },
  { id: 'humildade', label: 'Vaidade ou necessidade de provar algo', category: 'Humildade' },
  { id: 'servico', label: 'Focado apenas em mim, sem servir ninguém', category: 'Serviço' },
  { id: 'escolhas', label: 'Escolha financeira ou pessoal inconsequente', category: 'Escolhas' },
  { id: 'autocontrole', label: 'Perdi a cabeça ou explodi de raiva', category: 'Autocontrole' },
  { id: 'ansiedade', label: 'Sobrecarga mental, burnout ou ansiedade', category: 'Ansiedade' },
  { id: 'medo', label: 'Paralisado pelo medo do futuro', category: 'Medo' },
  { id: 'influencia', label: 'Cedendo a padrões e expectativas externas', category: 'Influência' },
  { id: 'foco', label: 'Sem direção ou foco nas minhas prioridades', category: 'Foco' },
  { id: 'moderacao', label: 'Excesso de telas, compras, comida ou trabalho', category: 'Moderação' }
];

const RAW_DEVOTIONALS: Record<string, Omit<Devotional, 'id'>> = {
  honestidade: { theme: 'Honestidade', stories: [] },
  responsabilidade: { theme: 'Responsabilidade', stories: [] },
  perseveranca: { theme: 'Perseverança', stories: [] },
  coragem: { theme: 'Coragem', stories: [] },
  obediencia: { theme: 'Obediência', stories: [] },
  paciencia: { theme: 'Paciência', stories: [] },
  lealdade: { theme: 'Lealdade', stories: [] },
  integridade: { theme: 'Integridade', stories: [] },
  perdao: { theme: 'Perdão', stories: [] },
  amizades: { theme: 'Amizades', stories: [] },
  bondade: { theme: 'Bondade', stories: [] },
  respeito: { theme: 'Respeito', stories: [] },
  generosidade: { theme: 'Generosidade', stories: [] },
  compaixao: { theme: 'Compaixão', stories: [] },
  reconciliacao: { theme: 'Reconciliação', stories: [] },
  pacificacao: { theme: 'Pacificação', stories: [] },
  comunicacao: { theme: 'Comunicação', stories: [] },
  fe: { theme: 'Fé', stories: [] },
  gratidao: { theme: 'Gratidão', stories: [] },
  humildade: { theme: 'Humildade', stories: [] },
  servico: { theme: 'Serviço', stories: [] },
  oracao: { theme: 'Oração', stories: [] },
  louvor: { theme: 'Louvor', stories: [] },
  confianca: { theme: 'Confiança', stories: [] },
  temor: { theme: 'Temor a Deus', stories: [] },
  escolhas: { theme: 'Escolhas', stories: [] },
  autocontrole: { theme: 'Autocontrole', stories: [] },
  ansiedade: { theme: 'Ansiedade', stories: [] },
  medo: { theme: 'Medo', stories: [] },
  influencia: { theme: 'Influência dos amigos', stories: [] },
  foco: { theme: 'Foco e Atenção', stories: [] },
  moderacao: { theme: 'Moderação', stories: [] },
  resiliencia: { theme: 'Resiliência', stories: [] },
  prudencia: { theme: 'Prudência', stories: [] }
};

export function getStaticDevotional(id: string): Devotional {
  const raw = RAW_DEVOTIONALS[id] || RAW_DEVOTIONALS['honestidade'];
  return {
    id,
    theme: raw.theme,
    stories: []
  };
}

export function generatePersonalizedDevotional(profile: KidProfile, themeId?: string): Devotional {
  const selectedTheme = themeId || 'honestidade';
  const raw = RAW_DEVOTIONALS[selectedTheme] || RAW_DEVOTIONALS['honestidade'];
  return {
    id: `personalized-${selectedTheme}-${profile.name || 'default'}-${Date.now()}`,
    theme: raw.theme,
    stories: []
  };
}
