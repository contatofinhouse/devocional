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
    description: 'Valores essenciais para formar o coração e as atitudes.',
    color: '#FF6B6B',
    bgColor: '#FFF5F5',
    themes: [
      { id: 'honestidade', name: 'Honestidade', icon: 'ShieldAlert' },
      { id: 'responsabilidade', name: 'Responsabilidade', icon: 'CheckSquare' },
      { id: 'perseveranca', name: 'Perseverança', icon: 'Footprints' },
      { id: 'coragem', name: 'Coragem', icon: 'Flame' },
      { id: 'obediencia', name: 'Obediência', icon: 'CheckSquare' },
      { id: 'paciencia', name: 'Paciência', icon: 'Clock' },
      { id: 'lealdade', name: 'Lealdade', icon: 'Users' },
      { id: 'integridade', name: 'Integridade', icon: 'ShieldAlert' }
    ]
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos',
    description: 'Como amar o próximo, fazer bons amigos e respeitar o lar.',
    color: '#4D96FF',
    bgColor: '#F0F5FF',
    themes: [
      { id: 'perdao', name: 'Perdão', icon: 'HeartHandshake' },
      { id: 'amizades', name: 'Amizades', icon: 'Users' },
      { id: 'bondade', name: 'Bondade', icon: 'Sparkles' },
      { id: 'respeito', name: 'Respeito', icon: 'Smile' },
      { id: 'generosidade', name: 'Generosidade', icon: 'Gift' },
      { id: 'compaixao', name: 'Compaixão', icon: 'Heart' },
      { id: 'reconciliacao', name: 'Reconciliação', icon: 'HeartHandshake' },
      { id: 'pacificacao', name: 'Pacificação', icon: 'Smile' },
      { id: 'comunicacao', name: 'Comunicação', icon: 'MessageCircle' }
    ]
  },
  {
    id: 'vida-deus',
    title: 'Vida com Deus',
    description: 'Fortalecendo a fé, gratidão e o coração de servo.',
    color: '#6BCB77',
    bgColor: '#F4FBF4',
    themes: [
      { id: 'fe', name: 'Fé', icon: 'Compass' },
      { id: 'gratidao', name: 'Gratidão', icon: 'Sun' },
      { id: 'humildade', name: 'Humildade', icon: 'ChevronDown' },
      { id: 'servico', name: 'Serviço', icon: 'HandPlatter' },
      { id: 'oracao', name: 'Oração', icon: 'MessageCircle' },
      { id: 'louvor', name: 'Louvor', icon: 'Sparkles' },
      { id: 'confianca', name: 'Confiança', icon: 'Compass' },
      { id: 'temor', name: 'Temor a Deus', icon: 'ShieldAlert' }
    ]
  },
  {
    id: 'sabedoria',
    title: 'Sabedoria',
    description: 'Lidando com emoções, escolhas difíceis e pressões do mundo.',
    color: '#F4D160',
    bgColor: '#FFFDF0',
    themes: [
      { id: 'escolhas', name: 'Escolhas', icon: 'HelpCircle' },
      { id: 'autocontrole', name: 'Autocontrole', icon: 'Lock' },
      { id: 'ansiedade', name: 'Ansiedade', icon: 'Wind' },
      { id: 'medo', name: 'Medo', icon: 'Moon' },
      { id: 'influencia', name: 'Influência dos amigos', icon: 'Sparkle' },
      { id: 'foco', name: 'Foco e Atenção', icon: 'CheckSquare' },
      { id: 'moderacao', name: 'Moderação', icon: 'Lock' },
      { id: 'resiliencia', name: 'Resiliência', icon: 'Footprints' },
      { id: 'prudencia', name: 'Prudência', icon: 'HelpCircle' }
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
