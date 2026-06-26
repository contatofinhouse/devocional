export interface DevotionalStory {
  biblicalReference: string;
  biblicalStoryTitle: string;
  biblicalStory: string;
  reflection: string;
  questions: string[];
  challenge: string;
  prayer: {
    dialogue: { role: 'Pai' | 'Filho' | 'Juntos'; text: string }[];
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

export const CRISIS_SITUATIONS = [
  { id: 'honestidade', label: 'Mentiu hoje', category: 'Honestidade' },
  { id: 'responsabilidade', label: 'Não fez o dever / nota baixa', category: 'Responsabilidade' },
  { id: 'perseveranca', label: 'Quer desistir de algo', category: 'Perseverança' },
  { id: 'coragem', label: 'Está com muito medo', category: 'Coragem' },
  { id: 'perdao', label: 'Brigou com um amigo / irmão', category: 'Perdão' },
  { id: 'amizades', label: 'Terminou uma amizade', category: 'Amizades' },
  { id: 'bondade', label: 'Foi egoísta / desatento', category: 'Bondade' },
  { id: 'respeito', label: 'Desrespeitou os pais', category: 'Respeito' },
  { id: 'generosidade', label: 'Não quer compartilhar', category: 'Generosidade' },
  { id: 'fe', label: 'Está desanimado com Deus', category: 'Fé' },
  { id: 'gratidao', label: 'Está reclamando muito', category: 'Gratidão' },
  { id: 'humildade', label: 'Quer ser melhor que os outros', category: 'Humildade' },
  { id: 'servico', label: 'Não ajuda em nada em casa', category: 'Serviço' },
  { id: 'escolhas', label: 'Fez uma escolha errada', category: 'Escolhas' },
  { id: 'autocontrole', label: 'Perdeu o controle / raiva', category: 'Autocontrole' },
  { id: 'ansiedade', label: 'Está muito ansioso', category: 'Ansiedade' },
  { id: 'medo', label: 'Está com medo / pesadelo', category: 'Medo' },
  { id: 'influencia', label: 'Más influências', category: 'Influência' }
];

// Helper to expand any devotional theme to exactly 6 progressive lessons
function expandTo6Lessons(theme: string, baseStories: DevotionalStory[]): DevotionalStory[] {
  const story1 = baseStories[0];
  const story2 = baseStories[1] || baseStories[0];

  return [
    // Lição 1: O Exemplo Prático (História 1)
    {
      ...story1,
      biblicalStoryTitle: `${story1.biblicalStoryTitle} (Lição 1 de 6)`,
    },
    // Lição 2: Desafio no Cotidiano
    {
      ...story1,
      biblicalStoryTitle: `Aplicando no dia a dia: ${theme} (Lição 2 de 6)`,
      reflection: `No dia a dia, a verdadeira prática de ${theme} aparece quando ninguém está nos observando.\n\nEscolher fazer o que é correto quando estamos na internet, fazendo um teste escolar ou decidindo dividir algo é o nosso verdadeiro teste de maturidade.`,
      challenge: `Parar e pensar antes de tomar qualquer atitude amanhã: isso reflete o valor de ${theme}?`,
      finalMessage: `A constância em ${theme} molda o nosso futuro.`
    },
    // Lição 3: Conflitos e Barreiras
    {
      ...story1,
      biblicalStoryTitle: `Vencendo as barreiras: ${theme} (Lição 3 de 6)`,
      reflection: `Encontraremos desculpas para ignorar o valor de ${theme}.\n\nSeja a opinião de amigos, o medo da punição ou a preguiça de fazer o que é certo. Superar esses obstáculos é o que nos faz crescer.`,
      questions: [
        `Quais desculpas costumamos usar para ignorar o valor de ${theme}?`,
        `Como podemos ajudar um ao outro a manter esse valor vivo?`,
        `Qual o maior obstáculo que você enfrentou essa semana?`
      ],
      challenge: `Identificar uma área onde você costuma falhar em ${theme} e criar uma regra simples para evitar o erro.`
    },
    // Lição 4: O Exemplo Histórico (História 2)
    {
      ...story2,
      biblicalStoryTitle: `${story2.biblicalStoryTitle} (Lição 4 de 6)`,
    },
    // Lição 5: Atitude no Lar
    {
      ...story2,
      biblicalStoryTitle: `Construindo o lar com: ${theme} (Lição 5 de 6)`,
      reflection: `A nossa casa é o primeiro lugar onde devemos exercitar ${theme}.\n\nTratar os irmãos com respeito, falar a verdade para os pais e ajudar nas tarefas diárias cria um ambiente de paz e confiança.`,
      challenge: `Dar um abraço ou fazer um favor direto para alguém da sua família hoje sem reclamar.`,
      finalMessage: `Valores reais começam dentro de casa.`
    },
    // Lição 6: O Impacto no Futuro
    {
      ...story2,
      biblicalStoryTitle: `O impacto da maturidade: ${theme} (Lição 6 de 6)`,
      reflection: `Carregar o valor de ${theme} para o futuro fará de você um líder natural.\n\nPessoas de caráter forte influenciam positivamente a sociedade e constroem legados duradouros de paz e respeito.`,
      questions: [
        `Como você se imagina aplicando ${theme} no seu futuro trabalho ou faculdade?`,
        `Que tipo de exemplo queremos ser para as outras pessoas?`,
        `Qual o maior aprendizado que colhemos nesta trilha?`
      ],
      challenge: `Escrever em um papel um compromisso de vida com ${theme} e guardá-lo em sua bíblia ou gaveta.`,
      finalMessage: `Caráter é o que somos na escuridão.`
    }
  ];
}
const RAW_DEVOTIONALS: Record<string, Omit<Devotional, 'id'>> = {
  honestidade: {
    theme: 'Honestidade',
    stories: [
      {
        biblicalReference: '📖 Mateus 26:69-75',
        biblicalStoryTitle: 'Pedro e o peso da mentira',
        biblicalStory: 'Naquela noite fria, após Jesus ser preso no Getsêmani, Pedro o seguiu de longe até o pátio da casa do sumo sacerdote Caifás. Ele se misturou com os guardas e servos que se aqueciam ao redor de uma fogueira para não levantar suspeitas.\n\nDe repente, uma das criadas do pátio fixou os olhos nele e disse em voz alta para todos ouvirem: "Você também estava com Jesus, o galileu!". Pedro, tomado por um medo repentino das consequências, negou diante de todos, dizendo: "Não sei o que você está falando". Ele tentou disfarçar e se afastar da fogueira.\n\nTentando se esquivar do perigo, ele foi para o portão de entrada do pátio. Mas outra criada o viu lá e disse aos que estavam ao redor: "Este homem também estava com Jesus Nazareno". Pedro, sentindo a pressão crescer, negou pela segunda vez, jurando solenemente: "Não conheço esse homem!".\n\nPouco depois, os que estavam ali se aproximaram e disseram a Pedro de forma firme: "Certamente você é um deles, pois o seu sotaque da Galileia o denuncia claramente". Então, tomado de pânico absoluto, Pedro começou a praguejar e a jurar: "Não conheço esse homem!".\n\nImediatamente, o galo cantou pela segunda vez. Nesse exato momento, o Senhor voltou-se e olhou diretamente nos olhos de Pedro. Pedro lembrou-se da palavra que Jesus lhe dissera: "Antes que o galo cante hoje, você me negará três vezes". Saindo dali com o coração partido, Pedro chorou amargamente, arrependido por ter mentido para tentar se proteger.',
        reflection: 'Mentir parece a saída mais fácil para escapar de uma bronca na escola ou em casa.\n\nMas a mentira cria um peso no nosso coração e destrói a confiança.\n\nA honestidade exige coragem, mas nos mantém leves e livres.',
        questions: [
          'Por que Pedro mentiu mesmo amando muito a Jesus?',
          'O que você sente quando fica com medo de contar a verdade?',
          'Como a verdade nos deixa mais leves?'
        ],
        challenge: 'Falar uma verdade completa para os pais hoje sobre algo que você tentou esconder ou disfarçar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, nos ajude a amar a verdade acima do nosso orgulho.' },
            { role: 'Filho', text: 'Me dê coragem para não mentir por medo de levar bronca.' },
            { role: 'Pai', text: 'Que a nossa casa seja sempre baseada na verdade.' },
            { role: 'Filho', text: 'Me ajuda a manter meu coração limpo.' },
            { role: 'Juntos', text: 'Que a verdade guie nossos passos todos os dias. Amém.' }
          ]
        },
        finalMessage: 'A verdade cria confiança. A mentira cria barreiras.'
      },
      {
        biblicalReference: '📖 Atos 5:1-11',
        biblicalStoryTitle: 'Ananias, Safira e a falsa aparência',
        biblicalStory: 'Na igreja primitiva, os novos convertidos compartilhavam seus bens para ajudar os necessitados. Um casal chamado Ananias e Safira decidiu vender uma propriedade de terra que possuíam.\n\nContudo, eles combinaram em segredo reter uma parte do dinheiro da venda para si mesmos, enquanto traziam apenas o restante aos pés dos apóstolos, fingindo que estavam doando o valor integral obtido.\n\nQuando Ananias chegou com o dinheiro, o apóstolo Pedro percebeu a falsidade pelo Espírito Santo e perguntou: "Ananias, por que Satanás encheu o seu coração para que você mentisse ao Espírito Santo e retivesse parte do valor da terra? Você não mentiu aos homens, mas a Deus". Ouvindo estas palavras, Ananias caiu e morreu.\n\nCerca de três horas mais tarde, entrou sua esposa Safira, sem saber do ocorrido. Pedro perguntou a ela: "Diga-me, vocês venderam a terra por esse preço?". Ela respondeu: "Sim, por esse preço". Pedro então a confrontou: "Por que vocês entraram em acordo para testar o Espírito do Senhor?". Safira também caiu e faleceu imediatamente, mostrando que a mentira destrói a vida espiritual da comunidade.',
        reflection: 'Às vezes fingimos ser ou fazer algo apenas para parecer bonitos para os outros.\n\nA integridade real significa ser a mesma pessoa por dentro e por fora, sem mentiras de conveniência.',
        questions: [
          'Qual era o objetivo de Ananias e Safira ao mentirem?',
          'Por que é ruim tentar passar uma imagem falsa de quem somos?',
          'Como podemos ajudar um ao outro a ser transparente?'
        ],
        challenge: 'Não fingir ou aumentar uma história hoje apenas para receber elogios.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, afasta de nós o desejo de impressionar com mentiras.' },
            { role: 'Filho', text: 'Ajuda-me a ser sincero, mesmo que isso não me destaque.' },
            { role: 'Pai', text: 'Que a nossa honestidade seja simples e real.' },
            { role: 'Filho', text: 'Me ensina a não criar falsas aparências.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A integridade não precisa de máscaras.'
      }
    ]
  },
  responsabilidade: {
    theme: 'Responsabilidade',
    stories: [
      {
        biblicalReference: '📖 Mateus 25:14-30',
        biblicalStoryTitle: 'A parábola dos talentos',
        biblicalStory: 'Jesus ensinou sobre a responsabilidade através da parábola de um homem rico que, prestes a fazer uma longa viagem ao estrangeiro, reuniu seus servos e lhes confiou os seus bens.\n\nA um servo ele entregou cinco talentos (uma enorme soma de dinheiro), a outro dois, e a um terceiro deu um talento, cada um de acordo com a sua capacidade individual. Em seguida, partiu.\n\nO servo que recebeu cinco talentos agiu prontamente: trabalhou, negociou com afinco e obteve mais cinco talentos de lucro. Da mesma forma, o que recebera dois talentos trabalhou e dobrou a quantia para quatro. Mas o servo que recebera apenas um talento foi tomado pelo medo e pela preguiça; ele cavou um buraco no chão e escondeu o dinheiro do seu senhor.\n\nMuito tempo depois, o senhor voltou e pediu contas a eles. O primeiro e o segundo servos apresentaram orgulhosamente o dobro do que receberam, sendo elogiados: "Muito bem, servo bom e fiel! Você foi fiel no pouco, eu o colocarei sobre o muito. Entre na alegria do seu senhor". Mas o terceiro servo começou a dar desculpas, culpando o senhor por ser rigoroso. O senhor tirou o talento dele e condenou sua negligência.',
        reflection: 'Responsabilidade é cuidar bem do que nos foi confiado: nosso tempo, nossas tarefas e nossas obrigações na escola e em casa.\n\nQuando deixamos de fazer nossa parte por preguiça ou desatenção, todos perdem.\n\nSer fiel no pouco nos prepara para coisas maiores.',
        questions: [
          'Por que você acha que o terceiro servo escondeu o dinheiro?',
          'Qual é a sua principal tarefa em casa ou na escola hoje?',
          'Como podemos ser mais responsáveis com o nosso tempo?'
        ],
        challenge: 'Organizar suas coisas de estudo ou seu quarto hoje mesmo sem ninguém pedir.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a cuidar bem de tudo o que o Senhor nos dá.' },
            { role: 'Filho', text: 'Me ajuda a cumprir minhas tarefas diárias com alegria e sem reclamar.' },
            { role: 'Pai', text: 'Que possamos ser pessoas de confiança em nosso lar.' },
            { role: 'Filho', text: 'Afasta de mim a preguiça e a desculpa fácil.' },
            { role: 'Juntos', text: 'Queremos ser responsáveis e fiéis em tudo. Amém.' }
          ]
        },
        finalMessage: 'Responsabilidade é fazer o que deve ser feito, mesmo quando ninguém está olhando.'
      },
      {
        biblicalReference: '📖 Gênesis 2:15, 3:9-13',
        biblicalStoryTitle: 'Adão e a fuga da culpa',
        biblicalStory: 'No princípio, o Senhor Deus tomou o homem e o colocou no Jardim do Éden para o cultivar, cuidar e guardar com responsabilidade.\n\nEntretanto, quando Adão e Eva desobedeceram à ordem expressa de não comer da árvore do conhecimento do bem e do mal, a primeira reação deles foi se esconder com vergonha entre as árvores do jardim assim que ouviram a voz de Deus soprando na brisa da tarde.\n\nQuando Deus os chamou e os confrontou sobre o que haviam feito, Adão fugiu de sua responsabilidade culpando a mulher: "A mulher que tu me deste por companheira me deu da árvore, e eu comi". E quando Deus perguntou a Eva, ela culpou a serpente: "A serpente me enganou, e eu comi". Nenhum dos dois assumiu o próprio ato.',
        reflection: 'Assumir a culpa quando erramos é uma parte crucial da maturidade.\n\nDar desculpas ou culpar os outros (como o irmão, o colega ou a internet) só prolonga os problemas.',
        questions: [
          'Por que é tão difícil dizer "eu errei, a culpa foi minha"?',
          'O que acontece com os nossos relacionamentos quando tentamos culpar os outros?',
          'Como podemos assumir a responsabilidade e corrigir nossos erros?'
        ],
        challenge: 'Se cometer um erro amanhã, assuma-o imediatamente sem dar desculpas.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos livre do hábito de culpar os outros.' },
            { role: 'Filho', text: 'Me dê coragem para admitir quando a falha for minha.' },
            { role: 'Pai', text: 'Que saibamos pedir desculpas sinceras na nossa casa.' },
            { role: 'Filho', text: 'Me ajude a assumir minhas escolhas.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Quem assume seus erros tem poder para consertá-los.'
      }
    ]
  },
  perseveranca: {
    theme: 'Perseverança',
    stories: [
      {
        biblicalReference: '📖 Neemias 4:1-23',
        biblicalStoryTitle: 'Neemias e a reconstrução dos muros',
        biblicalStory: 'Neemias tinha a missão de reconstruir os muros destruídos de Jerusalém.\n\nSeus inimigos zombaram, ameaçaram e tentaram parar a obra por várias vezes.\n\nO povo estava cansado e com medo. Mas Neemias organizou guardas, colocou espadas nas mãos dos trabalhadores e continuou firme.\n\nEles trabalhavam do amanhecer até o nascer das estrelas. Com determinação, o muro foi concluído em apenas 52 dias.',
        reflection: 'Perseverar significa não desistir quando as coisas ficam difíceis ou cansativas.\n\nSeja ao estudar uma matéria difícil, treinar um esporte ou praticar um instrumento, o desânimo vai aparecer.\n\nSe focarmos no objetivo e continuarmos dando pequenos passos, venceremos as barreiras.',
        questions: [
          'O que fez Neemias continuar mesmo com tantas pessoas zombando dele?',
          'Qual tarefa ou atividade dá mais vontade de desistir hoje?',
          'O que podemos fazer para nos apoiar nos dias difíceis?'
        ],
        challenge: 'Dedicar 15 minutos adicionais a uma tarefa difícil que você estava adiando ou querendo abandonar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos dê firmeza e foco diante das dificuldades.' },
            { role: 'Filho', text: 'Me ajuda a não desanimar quando eu errar ou achar algo difícil.' },
            { role: 'Pai', text: 'Que a nossa família aprenda a trabalhar em equipe e perseverar.' },
            { role: 'Filho', text: 'Renova minhas forças para continuar tentando.' },
            { role: 'Juntos', text: 'Com a Tua força, nós não vamos desistir. Amém.' }
          ]
        },
        finalMessage: 'A perseverança transforma o esforço diário em conquistas extraordinárias.'
      },
      {
        biblicalReference: '📖 Gênesis 32:22-32',
        biblicalStoryTitle: 'Jacó e a persistência na bênção',
        biblicalStory: 'Jacó estava sozinho à noite à beira do ribeiro de Jaboque.\n\nUm homem misterioso apareceu e lutou com ele até o amanhecer.\n\nVendo que a luta continuava, o homem feriu a coxa de Jacó, mas Jacó se recusou a soltá-lo: "Não te deixarei ir, a não ser que me abençoes".\n\nPor sua persistência, Jacó recebeu um novo nome e foi abençoado.',
        reflection: 'A perseverança na oração e na busca pelo que é correto agrada a Deus.\n\nÀs vezes, as maiores bênçãos exigem paciência e esforço contínuo de nossa parte.',
        questions: [
          'O que a persistência de Jacó nos ensina sobre objetivos difíceis?',
          'Você já desistiu de algo perto de conseguir?',
          'Como podemos persistir em fazer o bem mesmo sem ver resultados rápidos?'
        ],
        challenge: 'Orar por um problema difícil por três dias seguidos sem parar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a persistir in oração.' },
            { role: 'Filho', text: 'Me ajude a não desistir de buscar aquilo que agrada a Ti.' },
            { role: 'Pai', text: 'Que nossa família tenha espírito de resiliência.' },
            { role: 'Filho', text: 'Me fortaleça para continuar lutando.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Persistência no bem sempre gera frutos doces.'
      }
    ]
  },
  coragem: {
    theme: 'Coragem',
    stories: [
      {
        biblicalReference: '📖 1 Samuel 17:32-50',
        biblicalStoryTitle: 'Davi diante do gigante',
        biblicalStory: 'O guerreiro gigante Golias desafiava o exército de Israel todos os dias. Todos os soldados sentiam medo e recuavam.\n\nQuando o jovem pastor Davi chegou ao acampamento, ele não aceitou aquela covardia.\n\nO rei Saul tentou colocar sua própria armadura pesada em Davi. Mas Davi não conseguia nem andar com ela. Ele a retirou.\n\nEle pegou apenas seu cajado, cinco pedras lisas e sua funda.\n\nGolias riu dele. Mas Davi respondeu: "Você vem contra mim com espada e lança, mas eu vou contra você em nome do Senhor!".\n\nDavi girou a funda, arremessou a pedra e derrubou o gigante.',
        reflection: 'Ter coragem hoje não é lutar contra gigantes físicos.\n\nÉ defender quem está sendo excluído na escola, dizer "não" para uma má influência ou tentar fazer algo novo mesmo com medo de falhar.\n\nNão precisamos fingir ser super-heróis. A coragem começa quando confiamos que Deus está do nosso lado.',
        questions: [
          'Por que você acha que Davi recusou a armadura do rei?',
          'Qual é o maior "gigante" (medo ou desafio) que você enfrenta hoje?',
          'Como podemos apoiar um ao outro a agir com coragem esta semana?'
        ],
        challenge: 'Enfrente um pequeno medo hoje: seja iniciar uma conversa difícil ou praticar algo que te deixa inseguro.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Pai Celestial, afasta o medo dos nossos corações.' },
            { role: 'Filho', text: 'Dá-me a coragem de Davi para enfrentar meus desafios diários.' },
            { role: 'Pai', text: 'Que a nossa família seja guiada pela fé, não pelo temor.' },
            { role: 'Filho', text: 'Me ajuda a fazer o certo mesmo que ninguém mais faça.' },
            { role: 'Juntos', text: 'Caminhamos confiantes sob a Tua proteção. Amém.' }
          ]
        },
        finalMessage: 'A coragem não é a ausência de medo, mas a decisão de que alguma coisa é mais importante do que o medo.'
      },
      {
        biblicalReference: '📖 Daniel 6:1-24',
        biblicalStoryTitle: 'Daniel na cova dos leões',
        biblicalStory: 'O rei assinou uma lei proibindo orações a qualquer deus além dele por trinta dias.\n\nDaniel sabia da lei, mas não parou. Ele subiu ao seu quarto, abriu as janelas em direção a Jerusalém e orou três vezes ao dia.\n\nEle foi descoberto, preso e jogado na cova de leões famintos. Mas Daniel manteve a paz e, na manhã seguinte, saiu ileso porque confiou em Deus.',
        reflection: 'A coragem moral é fazer o que é certo aos olhos de Deus, mesmo sob grande pressão ou risco de ficarmos sozinhos.',
        questions: [
          'De onde veio a tranquilidade de Daniel na cova?',
          'Quando você precisa de coragem para demonstrar sua fé?',
          'Como podemos apoiar uns aos outros a manter princípios corretos?'
        ],
        challenge: 'Defender alguém ou manter um valor correto mesmo que os colegas façam piada.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos dê a integridade e firmeza de Daniel.' },
            { role: 'Filho', text: 'Me dê coragem para não esconder minhas crenças por vergonha.' },
            { role: 'Pai', text: 'Que a nossa confiança esteja inteiramente em Ti.' },
            { role: 'Filho', text: 'Me proteja nos momentos de provação.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A fé em Deus cala os leões da vida.'
      }
    ]
  },
  obediencia: {
    theme: 'Obediência',
    stories: [
      {
        biblicalReference: '📖 Gênesis 6:9-22',
        biblicalStoryTitle: 'Noé constrói a arca',
        biblicalStory: 'Deus viu a maldade no mundo e ordenou que Noé construísse uma grande arca de madeira no meio da terra seca.\n\nNoé nunca tinha visto chuva pesada ou dilúvio. Os vizinhos provavelmente riram dele e o chamaram de louco.\n\nMas Noé seguiu as instruções exatas de Deus sobre as dimensões e materiais. Ele obedeceu em silêncio e salvou sua família.',
        reflection: 'Obediência inteligente é confiar na sabedoria de Deus ou dos nossos pais, mesmo quando não compreendemos todo o cenário.\n\nFazer o que é instruído nos protege de perigos que ainda não conseguimos enxergar.',
        questions: [
          'Por que Noé continuou construindo mesmo sob zombaria?',
          'Quais regras em casa ou na escola parecem mais difíceis de obedecer?',
          'Como a obediência demonstra amor e confiança?'
        ],
        challenge: 'Atender a uma orientação dos seus pais imediatamente, de primeira, sem reclamar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a ter um coração ensinável e obediente.' },
            { role: 'Filho', text: 'Me ajuda a respeitar os limites que meus pais e professores colocam.' },
            { role: 'Pai', text: 'Que a obediência seja fruto da nossa confiança mútua.' },
            { role: 'Filho', text: 'Tira de mim o orgulho de querer fazer tudo do meu jeito.' },
            { role: 'Juntos', text: 'Caminhamos em obediência às Tuas palavras. Amém.' }
          ]
        },
        finalMessage: 'A obediência de hoje prepara o sucesso de amanhã.'
      },
      {
        biblicalReference: '📖 2 Reis 5:1-14',
        biblicalStoryTitle: 'Naamã e os sete mergulhos',
        biblicalStory: 'Naamã era um comandante poderoso atingido pela lepra. Ele viajou até o profeta Eliseu em busca de cura.\n\nEliseu enviou apenas um mensageiro para lhe dizer: "Vá e lave-se sete vezes no rio Jordão".\n\nNaamã ficou indignado porque esperava um ritual pomposo e achou o Jordão um rio sujo. Seus servos, porém, o aconselharam a obedecer à instrução simples. Ele mergulhou e foi completamente curado.',
        reflection: 'Muitas vezes o orgulho nos impede de obedecer a instruções simples e práticas.\n\nA obediência verdadeira requer descer do nosso próprio salto.',
        questions: [
          'Por que Naamã ficou com raiva da instrução de Eliseu?',
          'Que pequenas atitudes de obediência diária evitam grandes problemas?',
          'Como podemos praticar a obediência com humildade?'
        ],
        challenge: 'Fazer uma tarefa simples solicitada por seus pais sem questionar ou enrolar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a aceitar correções com humildade.' },
            { role: 'Filho', text: 'Me ensina a ouvir e seguir conselhos simples de quem sabe mais.' },
            { role: 'Pai', text: 'Que o orgulho não impeça a nossa cura e crescimento.' },
            { role: 'Filho', text: 'Dá-me um coração maleável.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Grandes milagres começam com pequenos passos de obediência.'
      }
    ]
  },
  paciencia: {
    theme: 'Paciência',
    stories: [
      {
        biblicalReference: '📖 Gênesis 21:1-7',
        biblicalStoryTitle: 'Abraão e a promessa do filho',
        biblicalStory: 'Deus prometeu a Abraão que ele seria pai de uma grande nação. Mas os anos passaram.\n\nAbraão e Sara envelheceram muito. A espera durou 25 anos. Parecia biologicamente impossível.\n\nEles tiveram dúvidas no caminho, mas mantiveram a fé. No tempo certo de Deus, Sara deu à luz Isaque, cujo nome significa riso.',
        reflection: 'Esperar é uma das partes mais difíceis da vida moderna. Queremos tudo ao toque de um botão.\n\nMas as coisas mais valiosas — caráter, amadurecimento, grandes conquistas — exigem tempo de maturação.\n\nA paciência nos ensina a controlar nossos impulsos e descansar no tempo certo.',
        questions: [
          'Como deve ter sido a espera de Abraão ao longo de 25 anos?',
          'Em quais situações você perde a paciência mais facilmente?',
          'Como podemos treinar nosso coração para saber esperar?'
        ],
        challenge: 'Aguardar sua vez sem reclamar ou mexer no celular durante um momento de espera amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a suportar a espera com paz de espírito.' },
            { role: 'Filho', text: 'Me ajuda a não ficar irritado quando as coisas demoram.' },
            { role: 'Pai', text: 'Que nossa casa seja um refúgio de paciência mútua.' },
            { role: 'Filho', text: 'Quero aprender a valorizar o processo, não só o final.' },
            { role: 'Juntos', text: 'Confiamos no Teu tempo perfeito. Amém.' }
          ]
        },
        finalMessage: 'A paciência não é apenas esperar, mas a nossa atitude enquanto esperamos.'
      },
      {
        biblicalReference: '📖 Tiago 5:7-8',
        biblicalStoryTitle: 'O lavrador e a colheita',
        biblicalStory: 'A Bíblia usa o exemplo do agricultor que planta a semente no solo.\n\nEle não pode forçar a planta a crescer rápido. Ele precisa esperar pacientemente pela chuva do outono e da primavera.\n\nEle cuida, vigia e aguarda o fruto precioso da terra com dedicação diária.',
        reflection: 'O crescimento real é gradual. Não podemos acelerar a vida sem estragar as sementes.\n\nAprender a esperar com paciência produz raízes fortes.',
        questions: [
          'Por que o agricultor não pode acelerar a colheita?',
          'Como essa metáfora se aplica aos seus estudos ou treinos?',
          'Como podemos cuidar da nossa paciência diária?'
        ],
        challenge: 'Praticar paciência ativa: fazer um desenho detalhado ou montar algo que exija tempo sem pressa.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, ensina-nos a regar nossas sementes com calma.' },
            { role: 'Filho', text: 'Me ajuda a aceitar que nem tudo acontece na hora que eu quero.' },
            { role: 'Pai', text: 'Dá-nos serenidade para os dias de espera.' },
            { role: 'Filho', text: 'Que eu não tente queimar etapas.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A colheita vem para quem sabe esperar trabalhando.'
      }
    ]
  },
  lealdade: {
    theme: 'Lealdade',
    stories: [
      {
        biblicalReference: '📖 Rute 1:1-18',
        biblicalStoryTitle: 'Rute e a fidelidade a Noemi',
        biblicalStory: 'Noemi perdeu seu marido e seus dois filhos em uma terra estrangeira. Sem recursos, decidiu voltar para sua cidade natal.\n\nEla aconselhou suas noras a ficarem em sua própria terra para reconstruírem suas vidas.\n\nOrfa despediu-se, mas Rute apegou-se a Noemi e declarou: "Para onde fores irei, teu povo será o meu povo e o teu Deus o meu Deus". Rute não abandonou a sogra na pobreza.',
        reflection: 'Lealdade é permanecer fiel a alguém mesmo quando as circunstâncias ficam difíceis ou desfavoráveis.\n\nSignifica não abandonar a família ou os amigos quando eles enfrentam crises, pobreza ou rejeição alheia.',
        questions: [
          'O que motivou Rute a seguir Noemi mesmo sem garantias de futuro?',
          'O que significa ser leal à nossa família hoje?',
          'Como podemos demonstrar lealdade aos amigos nos momentos de dificuldade?'
        ],
        challenge: 'Apoiar um membro da família em uma tarefa pesada ou defendê-lo de uma crítica hoje.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, ensina-nos a lealdade de Rute em nosso lar.' },
            { role: 'Filho', text: 'Me ajuda a ser fiel aos meus amigos e à minha família.' },
            { role: 'Pai', text: 'Que nunca abandonemos uns aos outros nas tempestades da vida.' },
            { role: 'Filho', text: 'Quero ser alguém em quem as pessoas possam confiar sempre.' },
            { role: 'Juntos', text: 'Nossa união é baseada no compromisso mútuo. Amém.' }
          ]
        },
        finalMessage: 'A lealdade brilha mais forte nas noites mais escuras.'
      },
      {
        biblicalReference: '📖 Lucas 22:24-30',
        biblicalStoryTitle: 'A fidelidade nas provações',
        biblicalStory: 'Jesus conversava com seus discípulos sobre o reino. Ele elogiou o grupo pela lealdade ao longo do seu ministério.\n\nEle disse: "Vocês são os que têm permanecido ao meu lado nas minhas provações".\n\nMesmo com falhas, a permanência deles ao lado de Jesus nos momentos difíceis foi honrada.',
        reflection: 'Estar junto nos momentos fáceis é simples. A lealdade real se prova na adversidade.',
        questions: [
          'Por que Jesus valorizou a permanência dos discípulos?',
          'Como a falta de lealdade fere as pessoas?',
          'De que forma podemos exercitar a lealdade no cotidiano?'
        ],
        challenge: 'Cumprir uma promessa que você fez a alguém, mesmo que agora dê preguiça.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, faça-nos leais aos nossos compromissos.' },
            { role: 'Filho', text: 'Ajuda-me a honrar minhas palavras com atitudes.' },
            { role: 'Pai', text: 'Que a fidelidade seja escudo em nosso lar.' },
            { role: 'Filho', text: 'Afasta de mim a traição ou a fofoca.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A palavra empenhada é a assinatura do caráter.'
      }
    ]
  },
  integridade: {
    theme: 'Integridade',
    stories: [
      {
        biblicalReference: '📖 Gênesis 39:1-23',
        biblicalStoryTitle: 'José e o teste do caráter',
        biblicalStory: 'José trabalhava na casa de Potifar, no Egito. Ele era eficiente e Potifar confiava plenamente nele.\n\nA esposa de Potifar tentou convencer José a fazer o que era errado e desleal ao patrão e a Deus por várias vezes.\n\nJosé recusou firmemente: "Como poderia eu cometer algo tão mau e pecar contra Deus?". Ele preferiu ser preso injustamente a quebrar sua integridade.',
        reflection: 'Integridade é fazer o que é correto mesmo quando ninguém está nos observando ou quando agir corretamente nos custa caro.\n\nÉ a consistência entre o que dizemos crer e o que realmente praticamos nas decisões privadas.',
        questions: [
          'Qual teria sido a desculpa fácil para José ceder?',
          'O que significa ser íntegro quando estamos sozinhos na internet ou no quarto?',
          'Como a falta de integridade afeta a nossa paz interior?'
        ],
        challenge: 'Cumprir uma obrigação sem desvios ou colar, mesmo sabendo que ninguém iria descobrir.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, gera em nós um caráter limpo e transparente.' },
            { role: 'Filho', text: 'Me ajuda a fazer o que é certo mesmo quando eu estiver sozinho.' },
            { role: 'Pai', text: 'Que a nossa vida privada seja igual à nossa vida pública.' },
            { role: 'Filho', text: 'Guarda meus olhos e meu coração de caminhos tortos.' },
            { role: 'Juntos', text: 'Buscamos a integridade como nosso valor maior. Amém.' }
          ]
        },
        finalMessage: 'Integridade é ser quem você diz que é em qualquer situação.'
      },
      {
        biblicalReference: '📖 Daniel 1:8-20',
        biblicalStoryTitle: 'Daniel e a escolha do alimento',
        biblicalStory: 'Daniel decidiu em seu coração não se contaminar com a comida do rei da Babilônia, que desonrava seus princípios de fé.\n\nEle propôs um teste ao chefe dos oficiais para comer apenas legumes e água por dez dias.\n\nSua decisão íntegra foi honrada por Deus, deixando-o mais saudável e sábio que todos os outros jovens.',
        reflection: 'A integridade começa com pequenas decisões diárias de não negociar o que sabemos ser o correto.',
        questions: [
          'Por que a escolha do alimento era um teste de integridade para Daniel?',
          'Quais pequenos compromissos com o que é certo podemos assumir hoje?',
          'Como defender nossos princípios com educação?'
        ],
        challenge: 'Manter sua palavra em uma decisão de estudo ou dever mesmo contra a vontade.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, fortaleça nossas decisões por princípios corretos.' },
            { role: 'Filho', text: 'Dá-me convicção para não imitar comportamentos errados.' },
            { role: 'Pai', text: 'Que nossa casa respire retidão.' },
            { role: 'Filho', text: 'Ajuda-me a respeitar minha consciência.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A integridade silenciosa fala mais alto do que discursos barulhentos.'
      }
    ]
  },

  // --- RELACIONAMENTOS ---
  perdao: {
    theme: 'Perdão',
    stories: [
      {
        biblicalReference: '📖 Gênesis 45:1-15',
        biblicalStoryTitle: 'José perdoa seus irmãos',
        biblicalStory: 'Os irmãos de José tinham inveja dele e o venderam como escravo. José passou por muitas dificuldades e prisões no Egito.\n\nAnos depois, Deus o abençoou e ele se tornou o governador de todo o Egito.\n\nQuando a fome atingiu a terra, seus irmãos veio implorar por comida, sem reconhecê-lo. José tinha todo o poder para prendê-los ou se vingar.\n\nMas ele chorou e disse: "Eu sou José, o irmão de vocês!". Ele os abraçou, providenciou mantimentos e os perdoou.',
        reflection: 'Guardar mágoa é como carregar uma pedra pesada na mochila. Só machuca quem está carregando.\n\nPerdoar não significa concordar com o erro do outro, mas decidir liberar a raiva para ter paz de espírito.\n\nComo Deus nos perdoa, também precisamos aprender a perdoar.',
        questions: [
          'Por que teria sido fácil para José se vingar de seus irmãos?',
          'Como você acha que José se sentiu depois de liberar o perdão?',
          'Existe alguma chateação antiga que você precisa perdoar hoje?'
        ],
        challenge: 'Pedir desculas a alguém que você chateou ou dizer a quem te machucou que você não guarda rancor.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, o perdão é difícil quando estamos machucados.' },
            { role: 'Filho', text: 'Me ajuda a liberar a raiva e desculpar quem errou comigo.' },
            { role: 'Pai', text: 'Ensina-nos a resolver nossos conflitos com amor e paciência.' },
            { role: 'Filho', text: 'Queremos paz no nosso coração e na nossa família.' },
            { role: 'Juntos', text: 'Perdoa as nossas falhas assim como perdoamos os outros. Amém.' }
          ]
        },
        finalMessage: 'O perdão é a chave que liberta o nosso coração de correntes invisíveis.'
      },
      {
        biblicalReference: '📖 Mateus 18:21-35',
        biblicalStoryTitle: 'A parábola do credor incompassivo',
        biblicalStory: 'Um rei perdoou uma dívida impagável de milhões a um de seus servos.\n\nEsse mesmo servo, ao sair, encontrou um colega que lhe devia uma quantia muito pequena. Em vez de perdoar, mandou prendê-lo.\n\nAo saber disso, o rei ficou indignado e cobrou a falta de misericórdia daquele homem.',
        reflection: 'Perdoar os outros é consequência natural de entender o quanto nós mesmos somos perdoados por Deus todos os dias.',
        questions: [
          'Por que o primeiro servo agiu de forma tão injusta?',
          'O que torna o perdão uma atitude difícil no dia a dia?',
          'De que forma o perdão restaura nossa paz?'
        ],
        challenge: 'Deixar de lado uma reclamação boba sobre um colega ou irmão hoje.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a lembrar do Teu perdão sobre nossas vidas.' },
            { role: 'Filho', text: 'Me ensina a não reter pequenas mágoas dos outros.' },
            { role: 'Pai', text: 'Que a misericórdia seja constante em nosso lar.' },
            { role: 'Filho', text: 'Limpa o meu coração de qualquer ressentimento.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Quem muito é perdoado, muito deve perdoar.'
      }
    ]
  },
  amizades: {
    theme: 'Amizades',
    stories: [
      {
        biblicalReference: '📖 1 Samuel 18:1-4, 20:1-42',
        biblicalStoryTitle: 'A aliança de Davi e Jônatas',
        biblicalStory: 'Jônatas era filho do rei Saul. Ele tinha todos os motivos para competir com Davi pelo trono, mas escolheu ser seu amigo.\n\nEles fizeram um pacto de amizade sincera. Jônatas até deu sua própria capa e espada a Davi como símbolo de respeito.\n\nQuando o rei Saul tentou matar Davi, Jônatas arriscou a própria vida para avisar o amigo e ajudá-lo a escapar em segurança.',
        reflection: 'Bons amigos não são aqueles que apenas se divertem conosco quando tudo está bem.\n\nAmigos de verdade nos apoiam nos momentos difíceis, nos dizem a verdade com amor e nos defendem.\n\nPara ter amigos de verdade, precisamos primeiro aprender a ser um amigo leal.',
        questions: [
          'O que fez a amizade de Davi e Jônatas ser tão forte?',
          'O que você mais valoriza em um amigo hoje?',
          'Como você pode ser um amigo melhor para alguém esta semana?'
        ],
        challenge: 'Mandar uma mensagem ou fazer um elogio sincero a um amigo especial hoje.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Pai, obrigado pelas amizades saudáveis em nossas vidas.' },
            { role: 'Filho', text: 'Me ajuda a escolher bem meus amigos e a ser leal a eles.' },
            { role: 'Pai', text: 'Que a nossa família seja acolhedora com os amigos uns dos outros.' },
            { role: 'Filho', text: 'Dê-me sabedoria para afastar influências ruins.' },
            { role: 'Juntos', text: 'Obrigado por ser o nosso maior amigo. Amém.' }
          ]
        },
        finalMessage: 'Amizade verdadeira é baseada em lealdade, respeito e apoio mútuo.'
      },
      {
        biblicalReference: '📖 Eclesiastes 4:9-12',
        biblicalStoryTitle: 'Melhor serem dois do que um',
        biblicalStory: 'A Bíblia diz que dois são melhores que um, porque se um cair, o outro pode ajudar a levantar.\n\nMas quem está sozinho e cai não tem ninguém para apoiá-lo.\n\nAlém disso, um cordão de três dobras não se quebra facilmente. A união de amigos sob a presença de Deus é forte e resistente.',
        reflection: 'Não fomos feitos para viver isolados ou tentar resolver tudo sozinhos.\n\nCaminhar com amigos corretos nos dá segurança para enfrentar as dificuldades.',
        questions: [
          'O que acontece quando tentamos carregar um problema pesado sozinhos?',
          'Quem são as pessoas com quem você pode contar quando cai?',
          'Como podemos fortalecer nosso cordão de amizades em Deus?'
        ],
        challenge: 'Oferecer ajuda prática a um amigo que está com dificuldade em alguma matéria ou atividade.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a caminhar em comunidade e apoiar o próximo.' },
            { role: 'Filho', text: 'Me dê sabedoria para estender a mão a quem cair ao meu lado.' },
            { role: 'Pai', text: 'Que a nossa família seja um ponto de apoio para os outros.' },
            { role: 'Filho', text: 'Abençoa meus amigos com Tua presença.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Bons companheiros tornam a jornada mais segura e alegre.'
      }
    ]
  },
  bondade: {
    theme: 'Bondade',
    stories: [
      {
        biblicalReference: '📖 Lucas 10:25-37',
        biblicalStoryTitle: 'O bom samaritano',
        biblicalStory: 'Um homem viajava de Jerusalém para Jericó quando foi assaltado, espancado e deixado quase morto na estrada.\n\nUm sacerdote passou e o ignorou. Um levita passou, olhou e seguiu em frente.\n\nMas um samaritano — que pertencia a um povo inimigo — parou ao vê-lo. Ele cuidou das feridas do homem, colocou-o em seu próprio animal, levou-o a uma hospedaria e pagou todas as despesas.',
        reflection: 'Bondade não é apenas ter sentimentos gentis. É agir quando vemos alguém precisando de ajuda.\n\nA bondade de verdade atravessa barreiras, ajuda quem não pode nos retribuir e faz a diferença nos pequenos detalhes do dia a dia.',
        questions: [
          'Por que as duas primeiras pessoas ignoraram o homem ferido?',
          'O que significa "amar o próximo" no seu dia a dia na escola?',
          'Quando foi a última vez que alguém usou de bondade com você?'
        ],
        challenge: 'Ajudar um colega, professor ou vizinho em uma tarefa sem receber nada em troca.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, abre nossos olhos para ver quem precisa de ajuda ao nosso redor.' },
            { role: 'Filho', text: 'Tira de mim o egoísmo e me ajuda a ser prestativo.' },
            { role: 'Pai', text: 'Que a bondade seja uma marca forte em nossa família.' },
            { role: 'Filho', text: 'Me ajuda a responder com paciência e amor.' },
            { role: 'Juntos', text: 'Que a nossa vida reflita a Tua bondade todos os dias. Amém.' }
          ]
        },
        finalMessage: 'A bondade é uma linguagem que todos compreendem.'
      },
      {
        biblicalReference: '📖 2 Reis 6:8-23',
        biblicalStoryTitle: 'Eliseu e a bondade com os inimigos',
        biblicalStory: 'O exército inimigo cercou a cidade para capturar Eliseu. Deus, porém, cegou os soldados após oração do profeta.\n\nEliseu os guiou até o centro de Samaria, onde recuperaram a visão cercados pelo exército de Israel.\n\nO rei de Israel quis matá-los, mas Eliseu ordenou: "Não os mate. Sirva-lhes pão e água e deixe-os voltar ao seu senhor". Aquele gesto de bondade cessou os ataques.',
        reflection: 'A bondade mais difícil e poderosa é aquela que praticamos com quem nos chateia ou nos trata mal.',
        questions: [
          'Por que Eliseu preferiu alimentar os inimigos em vez de combatê-los?',
          'Como você reage quando alguém te trata mal na escola?',
          'Como podemos desarmar o mau comportamento de alguém com um gesto bom?'
        ],
        challenge: 'Responder com uma frase gentil a alguém que falar de forma ríspida com você amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a vencer o mal com o bem.' },
            { role: 'Filho', text: 'Me ensina a não pagar o mal com a mesma moeda.' },
            { role: 'Pai', text: 'Que a paciência de Eliseu nos inspire.' },
            { role: 'Filho', text: 'Que minhas atitudes desarmem a raiva dos outros.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A bondade é a melhor resposta para a agressividade.'
      }
    ]
  },
  respeito: {
    theme: 'Respeito',
    stories: [
      {
        biblicalReference: '📖 Lucas 19:1-10',
        biblicalStoryTitle: 'Jesus e Zaqueu',
        biblicalStory: 'Zaqueu era o chefe dos cobradores de impostos. Ele era odiado por todos porque cobrava mais do que devia.\n\nComo era baixo de estatura, subiu numa figueira para conseguir ver Jesus passar.\n\nAs pessoas apontavam e zombavam dele. Mas Jesus parou debaixo da árvore, olhou para ele com respeito e disse: "Zaqueu, desça depressa, pois hoje vou ficar na sua casa".\n\nAquele gesto de respeito transformou a vida de Zaqueu, que decidiu devolver o dinheiro roubado e ajudar os pobres.',
        reflection: 'Respeito é tratar as pessoas com valor e dignidade, mesmo quando não concordamos com as atitudes delas ou quando elas são ignoradas pelos outros.\n\nQuando respeitamos o próximo, reconhecemos que cada pessoa foi criada por Deus e tem importância.',
        questions: [
          'Por que as pessoas ficaram incomodadas de Jesus ir à casa de Zaqueu?',
          'Como a falta de respeito afeta o ambiente escolar ou a internet?',
          'O que podemos fazer para demonstrar mais respeito dentro da nossa casa?'
        ],
        challenge: 'Prestar atenção total e escutar sem interromper quando alguém estiver falando com você amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a enxergar as pessoas como o Senhor enxerga.' },
            { role: 'Filho', text: 'Ajuda-me a não julgar ou rir dos meus colegas na escola.' },
            { role: 'Pai', text: 'Que o respeito e a honra comecem no nosso relacionamento de pais e filhos.' },
            { role: 'Filho', text: 'Me ajuda a obedecer e respeitar meus professores e pais.' },
            { role: 'Juntos', text: 'Queremos tratar a todos com dignidade e amor. Amém.' }
          ]
        },
        finalMessage: 'O respeito é a base de todo relacionamento saudável.'
      },
      {
        biblicalReference: '📖 1 Samuel 24:1-22',
        biblicalStoryTitle: 'Davi respeita a vida de Saul',
        biblicalStory: 'O rei Saul perseguia Davi para matá-lo. Davi e seus homens estavam escondidos no fundo de uma caverna.\n\nSaul entrou na mesma caverna sozinho. Os homens de Davi disseram que era a chance de se livrar dele.\n\nDavi aproximou-se em silêncio e apenas cortou a ponta do manto de Saul. Ele sentiu remorso e proibiu seus homens de atacá-lo, respeitando a posição de autoridade do rei.',
        reflection: 'O respeito pelos líderes e pelas autoridades é fundamental, mesmo quando eles erram conosco.',
        questions: [
          'Por que Davi sentiu remorso apenas por cortar o manto de Saul?',
          'Como podemos manter o respeito pelos outros mesmo quando estamos com raiva?',
          'Como você demonstra respeito pelas regras?'
        ],
        challenge: 'Falar com calma e educação mesmo quando discordar de alguma orientação de autoridade amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, ensina-nos a honrar as pessoas que o Senhor colocou sobre nós.' },
            { role: 'Filho', text: 'Me dê autocontrole para falar com respeito aos meus professores e pais.' },
            { role: 'Pai', text: 'Que o respeito guie nossas divergências.' },
            { role: 'Filho', text: 'Me ajuda a não agir por vingança.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Respeito é a chave da ordem e do amor.'
      }
    ]
  },
  generosidade: {
    theme: 'Generosidade',
    stories: [
      {
        biblicalReference: '📖 João 6:1-14',
        biblicalStoryTitle: 'O lanche compartilhado',
        biblicalStory: 'Uma grande multidão seguia Jesus e estava com fome em um lugar isolado. Os discípulos disseram que não havia dinheiro para comprar comida para todos.\n\nMais André encontrou um menino que tinha cinco pães de cevada e dois peixinhos. O garoto entregou tudo o que tinha.\n\nJesus pegou os pães e peixes, deu graças e os multiplicou. Todos comeram até se fartar, e ainda sobraram doze cestos cheios.',
        reflection: 'Generosidade não é doar apenas o que sobra. É estar disposto a compartilhar o que temos, mesmo quando parece pouco.\n\nO menino entregou seu próprio lanche e viu um milagre acontecer. Quando abrimos as mãos para doar, Deus abençoa as nossas atitudes e multiplica o bem.',
        questions: [
          'Como você acha que o menino se sentiu ao entregar seu lanche para a multidão?',
          'O que é mais difícil compartilhar: brinquedos, tempo ou atenção?',
          'Como nossa família pode exercitar a generosidade juntos?'
        ],
        challenge: 'Dividir algo bom (um lanche, um doce ou seu tempo de tela) com um irmão ou colega de classe.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus generoso, obrigado por tudo o que o Senhor nos provê diariamente.' },
            { role: 'Filho', text: 'Ajuda-me a não ser apegado às minhas coisas e a saber compartilhar.' },
            { role: 'Pai', text: 'Que o nosso lar seja conhecido pela hospitalidade e partilha.' },
            { role: 'Filho', text: 'Quero dar com alegria, sem esperar nada em troca.' },
            { role: 'Juntos', text: 'Ensina-nos a ser generosos assim como o Senhor é conosco. Amém.' }
          ]
        },
        finalMessage: 'Generosidade é doar de coração aberto, sabendo que o maior ganho está em dar.'
      },
      {
        biblicalReference: '📖 1 Reis 17:7-16',
        biblicalStoryTitle: 'A viúva de Sarepta',
        biblicalStory: 'Havia uma grande seca e faltava alimento. O profeta Elias foi até Sarepta e pediu água e um pedaço de pão a uma viúva pobre.\n\nEla respondeu que tinha apenas um punhado de farinha numa panela e um pouco de azeite numa botija para preparar uma última refeição para ela e seu filho, esperando depois morrer de fome.\n\nElias disse para não ter medo e preparar primeiro um bolo para ele. Ela obedeceu com generosidade. A farinha da panela e o azeite da botija não se acabaram até o fim da seca.',
        reflection: 'Quando somos generosos com o pouco que temos, mostramos que nossa confiança está no Deus da provisão, não nos bens materiais.',
        questions: [
          'Por que era difícil para a viúva dividir sua última porção de comida?',
          'O que significa dar com alegria quando estamos escassos?',
          'Como Deus supre nossas necessidades quando somos generosos?'
        ],
        challenge: 'Ceder a preferência de algo ou ajudar alguém com seu próprio material de estudo.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a doar mesmo quando sentimos falta de algo.' },
            { role: 'Filho', text: 'Me livre do medo de faltar se eu compartilhar com o próximo.' },
            { role: 'Pai', text: 'Que em nossa casa nunca falte azeite e farinha para acolher os outros.' },
            { role: 'Filho', text: 'Dá-me um coração desprendido de coisas materiais.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A mão que doa está sempre pronta a receber de Deus.'
      }
    ]
  },
  compaixao: {
    theme: 'Compaixão',
    stories: [
      {
        biblicalReference: '📖 Mateus 20:29-34',
        biblicalStoryTitle: 'Jesus e os cegos de Jericó',
        biblicalStory: 'Dois homens cegos estavam sentados à beira do caminho. Ao ouvirem que Jesus estava passando, começaram a gritar: "Senhor, Filho de Davi, tem misericórdia de nós!".\n\nA multidão os repreendia para que se calassem, achando que eles incomodavam. Mas eles gritavam ainda mais alto.\n\nJesus parou, chamou-os e perguntou: "O que vocês querem que eu faça?". Eles pediram para ver. Jesus teve compaixão, tocou nos olhos deles e imediatamente recuperaram a visão.',
        reflection: 'Compaixão é sentir a dor do outro no nosso próprio coração e parar o que estamos fazendo para ajudar, mesmo quando a maioria prefere ignorar.',
        questions: [
          'Por que a multidão mandava os cegos se calarem?',
          'O que impede as pessoas de demonstrarem compaixão no dia a dia?',
          'Como podemos ter um olhar atento a quem está sofrendo?'
        ],
        challenge: 'Conversar ou sentar-se com um colega na escola que costuma ficar sozinho no recreio.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos dê um coração cheio de misericórdia e compaixão.' },
            { role: 'Filho', text: 'Me ajuda a notar a tristeza dos outros e a oferecer consolo.' },
            { role: 'Pai', text: 'Que em nosso lar nunca fechemos os olhos para o sofrimento.' },
            { role: 'Filho', text: 'Quero ser o abraço de Deus para alguém triste.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A compaixão é o amor em ação.'
      },
      {
        biblicalReference: '📖 Lucas 7:11-17',
        biblicalStoryTitle: 'A viúva de Naim',
        biblicalStory: 'Jesus aproximou-se de uma cidade e viu sair o enterro do filho único de uma viúva. Aquela mulher estava desamparada.\n\nAo vê-la, o Senhor teve profunda compaixão por ela e disse: "Não chore".\n\nEle tocou no caixão, ordenou ao jovem que se levantasse e ele voltou à vida, sendo entregue à sua mãe.',
        reflection: 'Deus se importa com as nossas lágrimas. A compaixão Dele nos alcança em nossos piores momentos.',
        questions: [
          'Por que a situação daquela mulher era tão desesperadora?',
          'Como demonstramos compaixão a quem perdeu alguém querido?',
          'Como podemos levar palavras de esperança aos outros?'
        ],
        challenge: 'Enviar uma palavra de carinho ou fazer um desenho para alguém que está passando por dias tristes.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, obrigado pelo Teu consolo nas horas de dor.' },
            { role: 'Filho', text: 'Me ensina a ter empatia e respeito pela dor das pessoas.' },
            { role: 'Pai', text: 'Que possamos chorar com os que choram.' },
            { role: 'Filho', text: 'Usa-me para consolar meus amigos.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'O amor de Deus nos conforta para podermos confortar o próximo.'
      }
    ]
  },
  reconciliacao: {
    theme: 'Reconciliação',
    stories: [
      {
        biblicalReference: '📖 Gênesis 33:1-11',
        biblicalStoryTitle: 'O reencontro de Jacó e Esaú',
        biblicalStory: 'Jacó havia enganado seu irmão Esaú no passado e fugiu com medo de ser morto. A separação durou muitos anos.\n\nQuando finalmente decidiram se reencontrar, Jacó estava apavorado com a possibilidade de um ataque.\n\nEsaú, porém, correu ao encontro de Jacó, abraçou-o, beijou-o e ambos choraram. A paz foi restabelecida com um abraço sincero.',
        reflection: 'Resolver conflitos antigos exige coragem de admitir erros e disposição para abraçar em paz.\n\nA reconciliação desfaz nós na garganta e reconstrói famílias.',
        questions: [
          'Por que Jacó tinha tanto medo do reencontro?',
          'O que mudou no coração de Esaú para recebê-lo em paz?',
          'Como podemos resolver pequenas brigas em casa rapidamente?'
        ],
        challenge: 'Fazer as pazes com um irmão ou amigo com quem você discutiu recentemente.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, cure os desentendimentos na nossa família.' },
            { role: 'Filho', text: 'Me ajude a dar o primeiro passo para fazer as pazes.' },
            { role: 'Pai', text: 'Que o orgulho não nos impeça de estender a mão.' },
            { role: 'Filho', text: 'Queremos viver em união.' },
            { role: 'Juntos', text: 'Abençoa a nossa harmonia familiar. Amém.' }
          ]
        },
        finalMessage: 'A reconciliação reconstrói pontes que a raiva tentou quebrar.'
      },
      {
        biblicalReference: '📖 Lucas 15:11-32',
        biblicalStoryTitle: 'O abraço do pai',
        biblicalStory: 'O filho pródigo pegou sua parte da herança, partiu para longe e gastou tudo de forma insensata.\n\nFaminto e arrependido, decidiu voltar para casa e pedir para ser tratado como um empregado.\n\nO pai, vendo-o de longe, correu ao seu encontro, abraçou-o com amor e preparou uma grande festa de reconciliação.',
        reflection: 'Deus está sempre pronto a nos receber de volta quando erramos. Precisamos ter a mesma atitude acolhedora com os outros.',
        questions: [
          'Qual foi a atitude do pai ao ver o filho voltando?',
          'Por que o irmão mais velho ficou irritado?',
          'Como podemos celebrar quando alguém reconhece o erro e muda?'
        ],
        challenge: 'Acolher e ser gentil com alguém que errou com você, mas pediu desculpas.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Pai Celeste, obrigado porque o Senhor sempre nos acolhe de volta.' },
            { role: 'Filho', text: 'Me ajuda a não julgar quem erra, mas a celebrar a reconciliação.' },
            { role: 'Pai', text: 'Que o nosso lar seja livre de ressentimentos.' },
            { role: 'Filho', text: 'Ensina-me a abraçar com amor.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A reconciliação traz de volta o que estava perdido.'
      }
    ]
  },
  pacificacao: {
    theme: 'Pacificação',
    stories: [
      {
        biblicalReference: '📖 1 Samuel 25:1-35',
        biblicalStoryTitle: 'Abigail e as palavras de paz',
        biblicalStory: 'Nabal, marido de Abigail, tratou os homens de Davi com desprezo e recusou dar-lhes comida. Davi ficou furioso e marchou com seus soldados para destruí-lo.\n\nSabendo disso, Abigail agiu rápido: preparou mantimentos, foi ao encontro de Davi e falou com sabedoria e respeito.\n\nEla convenceu Davi a não derramar sangue por vingança. Davi agradeceu a Abigail pelo bom conselho que evitou a tragédia.',
        reflection: 'Pacificadores são aqueles que intervêm com calma e sabedoria para apagar incêndios de raiva entre as pessoas, evitando brigas e agressões.',
        questions: [
          'O que teria acontecido se Abigail tivesse agido com orgulho ou raiva?',
          'Como podemos acalmar um colega irritado na escola?',
          'O que significa ser um pacificador no lar?'
        ],
        challenge: 'Não tomar partido ou alimentar uma discussão amanhã; em vez disso, tente acalmar os ânimos.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos use como instrumentos de paz.' },
            { role: 'Filho', text: 'Ajuda-me a falar palavras suaves que acalmam a raiva.' },
            { role: 'Pai', text: 'Que a nossa família evite a discórdia.' },
            { role: 'Filho', text: 'Quero ser um pacificador entre meus amigos.' },
            { role: 'Juntos', text: 'Bem-aventurados os pacificadores, porque serão chamados filhos de Deus. Amém.' }
          ]
        },
        finalMessage: 'A resposta calma desvia a fúria.'
      },
      {
        biblicalReference: '📖 Gênesis 26:12-31',
        biblicalStoryTitle: 'Isaque e os poços da paz',
        biblicalStory: 'Os filisteus tinham inveja da prosperidade de Isaque e entulharam os poços de água dele com terra.\n\nEm vez de brigar, Isaque mudou-se de lugar e cavou novos poços. Os inimigos voltaram a disputar os poços.\n\nIsaque continuou mudando e cavando em paz, até que encontraram um lugar amplo onde houve paz para todos.',
        reflection: 'Às vezes, a melhor escolha para manter a paz é ceder a disputas desnecessárias e focar no que constrói.',
        questions: [
          'Por que Isaque preferiu mudar-se a guerrear pela água?',
          'Quais disputas bobas no videogame ou na escola podemos evitar para ter paz?',
          'Como demonstrar maturidade ao ceder?'
        ],
        challenge: 'Ceder voluntariamente em uma disputa de opinião ou jogo para manter a harmonia.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a saber quando recuar para preservar a paz.' },
            { role: 'Filho', text: 'Me livre do desejo teimoso de querer ganhar todas as discussões.' },
            { role: 'Pai', text: 'Que a nossa tranquilidade fale mais alto que o barulho da disputa.' },
            { role: 'Filho', text: 'Me ajuda a manter a calma.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Quem pacifica ganha paz.'
      }
    ]
  },
  comunicacao: {
    theme: 'Comunicação',
    stories: [
      {
        biblicalReference: '📖 Provérbios 15:1-4, Tiago 3:1-12',
        biblicalStoryTitle: 'O poder da língua',
        biblicalStory: 'A Bíblia compara a nossa língua ao pequeno leme que guia um grande navio nas águas tempestuosas.\n\nTambém compara a língua a uma pequena faísca que pode incendiar uma floresta inteira se não for controlada.\n\nNossas palavras têm o poder de ferir como espadas ou de trazer cura como remédio. Comunicar-se bem exige autogoverno.',
        reflection: 'Falar de forma clara, respeitosa e no momento certo evita mal-entendidos e constrói relacionamentos de confiança.',
        questions: [
          'Como uma faísca pequena pode queimar uma grande floresta?',
          'Você já se arrependeu de falar algo sem pensar?',
          'Como podemos melhorar a comunicação no nosso dia a dia?'
        ],
        challenge: 'Falar apenas palavras positivas e de encorajamento para as pessoas amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, coloque guardas em nossas bocas.' },
            { role: 'Filho', text: 'Ajuda-me a falar com respeito e a não usar palavras feias ou apelidos.' },
            { role: 'Pai', text: 'Que a nossa comunicação em família seja clara e amorosa.' },
            { role: 'Filho', text: 'Me ensina a ouvir mais do que falar.' },
            { role: 'Juntos', text: 'Que o nosso falar edifique quem ouve. Amém.' }
          ]
        },
        finalMessage: 'Palavras gentis são mel para a alma.'
      },
      {
        biblicalReference: '📖 Gênesis 11:1-9',
        biblicalStoryTitle: 'A torre de Babel e o ruído',
        biblicalStory: 'Os homens decidiram construir uma torre enorme que chegasse até o céu para orgulho próprio.\n\nDeus confundiu a linguagem deles, de modo que nenhum entendia o que o outro dizia.\n\nSem conseguir se comunicar com clareza, a construção parou e o grupo se espalhou, incapaz de trabalhar em conjunto.',
        reflection: 'Sem uma comunicação clara e alinhada aos bons princípios, qualquer trabalho em equipe desmorona.',
        questions: [
          'O que aconteceu com a construção quando a comunicação falhou?',
          'Por que é importante conferir se a outra pessoa realmente entendeu o que dissemos?',
          'Como evitar ruídos e fofocas?'
        ],
        challenge: 'Explicar de forma calma e detalhada o que você deseja, em vez de reclamar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a nos expressar com clareza e paciência.' },
            { role: 'Filho', text: 'Me ensina a explicar o que eu sinto em vez de ficar emburrado.' },
            { role: 'Pai', text: 'Que a nossa escuta seja tão boa quanto a nossa fala.' },
            { role: 'Filho', text: 'Afasta a falta de comunicação de nossa casa.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Comunicar-se bem é a chave do entendimento.'
      }
    ]
  },

  // --- VIDA COM DEUS ---
  fe: {
    theme: 'Fé',
    stories: [
      {
        biblicalReference: '📖 Hebreus 11:1-8, Gênesis 12:1-4',
        biblicalStoryTitle: 'A partida de Abraão',
        biblicalStory: 'Deus disse a Abraão: "Saia da sua terra, do meio dos seus parentes e vá para a terra que eu lhe mostrarei".\n\nAbraão não sabia para onde estava indo, quais caminhos percorreria ou os perigos que enfrentaria.\n\nMesmo assim, ele arrumou suas malas, reuniu sua família e partiu porque confiava na promessa de Deus. Ele deu o primeiro passo no escuro.',
        reflection: 'Ter fé não é tener certeza de tudo o que vai acontecer no futuro.\n\nFé é confiar no caráter de Deus e dar o primeiro passo na direção correta, mesmo quando não conseguimos ver o final do caminho.\n\nQuando confiamos em Deus, nossa ansiedade diminui porque sabemos quem nos guia.',
        questions: [
          'Por que foi difícil para Abraão deixar sua casa e sua terra?',
          'Em quais momentos você sente mais dificuldade para confiar em Deus?',
          'Como a fé pode nos ajudar a enfrentar situações desconhecidas na escola?'
        ],
        challenge: 'Escrever seu versículo favorito em um papel e ler logo ao acordar para lembrar de confiar em Deus.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, aumenta a nossa fé nos momentos de dúvida.' },
            { role: 'Filho', text: 'Ajuda-me a confiar que o Senhor tem o melhor para mim, mesmo nas dificuldades.' },
            { role: 'Pai', text: 'Que a nossa família caminhe segura nas Tuas promessas.' },
            { role: 'Filho', text: 'Guarda minha mente de dúvidas que me paralisam.' },
            { role: 'Juntos', text: 'Nós escolhemos confiar em Ti a cada passo. Amém.' }
          ]
        },
        finalMessage: 'A fé começa onde a nossa visão termina.'
      },
      {
        biblicalReference: '📖 Mateus 14:22-33',
        biblicalStoryTitle: 'Pedro caminha sobre as águas',
        biblicalStory: 'Os discípulos estavam no barco no meio da noite enfrentando ondas fortes. De repente, viram Jesus caminhando sobre as águas.\n\nAssustados, acharam que era um fantasma. Mas Jesus disse: "Coragem! Sou eu. Não tenham medo".\n\nPedro respondeu: "Senhor, se és tu, manda-me ir ao teu encontro por sobre as águas". Jesus disse: "Venha". Pedro saiu do barco e caminhou, mas ao olhar para o vento forte, sentiu medo e começou a afundar, gritando por socorro. Jesus o segurou.',
        reflection: 'Manter a fé exige manter os olhos focados na promessa, não nas circunstâncias assustadoras ao redor.',
        questions: [
          'O que fez Pedro caminhar sobre a água no início?',
          'O que fez Pedro começar a afundar?',
          'Como podemos manter nosso foco em Deus quando as coisas dão errado?'
        ],
        challenge: 'Substituir um pensamento de dúvida ou medo por uma oração de confiança hoje.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor Jesus, ajuda-nos a não tirar os olhos de Ti.' },
            { role: 'Filho', text: 'Quando as dificuldades parecerem ondas grandes, me segura com Tua mão.' },
            { role: 'Pai', text: 'Que a nossa foi seja firme mesmo em meio ao vento.' },
            { role: 'Filho', text: 'Tira de mim o medo de afundar.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Olhar para Deus afasta o medo das tempestades.'
      }
    ]
  },
  gratidao: {
    theme: 'Gratidão',
    stories: [
      {
        biblicalReference: '📖 Lucas 17:11-19',
        biblicalStoryTitle: 'O único que voltou',
        biblicalStory: 'Dez leprosos se aproximaram de Jesus na entrada de um povoado. Eles gritavam de longe por misericórdia, pois a doença era contagiosa.\n\nJesus disse para eles se apresentarem aos sacerdotes. Enquanto caminhavam, todos foram curados.\n\nAo perceber que estava curado, apenas um deles voltou correndo, dando glória a Deus em voz alta. Ele se ajoelhou aos pés de Jesus e agradeceu. Jesus perguntou: "Onde estão os outros nove?".',
        reflection: 'Muitas vezes recebemos coisas boas em nosso dia — saúde, comida, família, amigos — e simplesmente seguimos em frente sem agradecer, achando que é nossa obrigação receber.\n\nA gratidão muda o nosso foco das coisas que nos faltam para as bênçãos que já temos.\n\nAgradecer expressa maturidade e alegria.',
        questions: [
          'Por que você acha que os outros nove curados não voltaram para agradecer?',
          'Quais são as três coisas boas que aconteceu no seu dia hoje?',
          'Como podemos demonstrar mais gratidão às pessoas da nossa família?'
        ],
        challenge: 'Agradecer a três pessoas diferentes amanhã por coisas específicas que elas fizeram por você.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, perdoa as vezes em que reclamamos por coisas bobas.' },
            { role: 'Filho', text: 'Obrigado pela minha saúde, meus estudos e pela nossa casa.' },
            { role: 'Pai', text: 'Ajuda-nos a notar os Teus cuidados nos pequenos detalhes da rotina.' },
            { role: 'Filho', text: 'Quero ter uma atitude alegre e grata todos os dias.' },
            { role: 'Juntos', text: 'Obrigado por tudo o que o Senhor realiza em nossas vidas. Amém.' }
          ]
        },
        finalMessage: 'Corações gratos enxergam a beleza nas coisas simples da vida.'
      },
      {
        biblicalReference: '📖 Filipenses 4:4-7, 1 Tessalonicenses 5:18',
        biblicalStoryTitle: 'Paulo escreve da prisão',
        biblicalStory: 'O apóstolo Paulo estava preso em condições difíceis na Roma antiga.\n\nMesmo sem liberdade e com poucos recursos, ele escreveu cartas encorajadoras para as igrejas, dizendo: "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus".\n\nEle não esperou a prisão acabar para começar a ser grato pela presença divina e pelas amizades.',
        reflection: 'A gratidão real não depende de tudo estar perfeito ao nosso redor. É uma escolha de focar no bem sob qualquer condição.',
        questions: [
          'Como era possível Paulo ter alegria na prisão?',
          'Que pequenas coisas na rotina nós costumamos esquecer de agradecer?',
          'Como a reclamação contínua afeta o nosso dia a dia?'
        ],
        challenge: 'Passar o dia de amanhã sem fazer nenhuma única reclamação em voz alta.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos dê a atitude de Paulo para encontrar motivos de gratidão em meio a lutas.' },
            { role: 'Filho', text: 'Me ajuda a focar nas coisas boas e a parar de reclamar.' },
            { role: 'Pai', text: 'Que a nossa casa seja cheia de palavras de louvor e gratidão.' },
            { role: 'Filho', text: 'Obrigado por este dia de vida.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A gratidão abre a porta da alegria.'
      }
    ]
  },
  humildade: {
    theme: 'Humildade',
    stories: [
      {
        biblicalReference: '📖 João 13:1-17',
        biblicalStoryTitle: 'O verdadeiro líder serve',
        biblicalStory: 'Na época de Jesus, as estradas eram de terra e poeira.\n\nQuando as pessoas chegavam a uma casa, seus pés ficavam sujos.\n\nPor isso, normalmente o empregado da casa lavava os pés dos convidados. Era considerado um dos trabalhos mais simples e humildes.\n\nNuma noite, Jesus estava reunido com seus discípulos. Eles o chamavam de Mestre e Senhor. Era o líder deles.\n\nMas aconteceu algo surpreendente.\n\nJesus pegou uma toalha, colocou água numa bacia e começou a lavar os pés dos discípulos, um por um.\n\nQuando chegou a vez de Pedro, ele ficou espantado.\n\n— Senhor, o senhor vai lavar os meus pés?\n\nPedro achava que aquilo estava errado. Na cabeça dele, os mais importantes eram servidos.\n\nMas Jesus queria ensinar uma lição.\n\nDepois de terminar, disse:\n\n"Eu dei o exemplo para que vocês façam como eu fiz."\n\nJesus mostrou que a verdadeira grandeza não está em mandar nos outros. Está em servir os outros.',
        reflection: 'Muitas pessoas pensam que ser importante significa receber atenção, elogios ou estar acima dos outros.\n\nJesus mostrou algo diferente.\n\nUma pessoa humilde não se acha melhor que ninguém. Ela não precisa provar o tempo todo que é mais forte, mais inteligente ou mais capaz.\n\nEla está disposta a ajudar. A servir. A aprender. A reconhecer quando está errada.\n\nHumildade não é pensar menos de si mesmo. É pensar menos apenas em si mesmo.',
        questions: [
          'O que você sentiu ao imaginar Jesus lavando os pés dos discípulos?',
          'Por que Pedro ficou tão surpreso?',
          'Como você pode ajudar alguém esta semana sem esperar nada em troca?'
        ],
        challenge: 'Fazer uma coisa útil para alguém sem ser pedido e sem contar para ninguém. Pode ser ajudar em casa, ajudar um colega na escola ou fazer algo gentil. Na próxima conversa, contem um ao outro o que fizeram.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, obrigado pelo exemplo de Jesus.' },
            { role: 'Filho', text: 'Obrigado porque Ele nos ensinou a servir.' },
            { role: 'Pai', text: 'Ajuda-nos a não pensar apenas em nós mesmos.' },
            { role: 'Filho', text: 'Ajuda-me a enxergar as necessidades das outras pessoas.' },
            { role: 'Pai', text: 'Que possamos ser humildes.' },
            { role: 'Filho', text: 'E usar nossas atitudes para fazer o bem.' },
            { role: 'Juntos', text: 'Que sigamos o exemplo de Jesus todos os dias. Amém.' }
          ]
        },
        finalMessage: 'Quem é humilde não precisa ser o mais importante da sala. Ele se preocupa em fazer a diferença na vida das pessoas ao seu redor.'
      },
      {
        biblicalReference: '📖 Lucas 18:9-14',
        biblicalStoryTitle: 'O fariseu e o cobrador de impostos',
        biblicalStory: 'Jesus contou sobre dois homens que foram ao templo orar.\n\nUm fariseu, muito orgulhoso, orava de pé, agradecendo por não ser pecador como os outros e listando suas boas ações.\n\nJá o cobrador de impostos, de longe, nem ousava olhar para o céu. Batia no peito dizendo: "Deus, tem misericórdia de mim, que sou pecador". Jesus afirmou que este último voltou para casa perdoado por sua humildade.',
        reflection: 'Reconhecer nossos erros diante de Deus e dos outros é o primeiro passo para o crescimento real. O orgulho cega, a humildade cura.',
        questions: [
          'Por que a oração do fariseu não foi aceita?',
          'Como podemos evitar nos achar melhores que os outros na escola ou em jogos?',
          'Qual a importância de reconhecer que precisamos melhorar?'
        ],
        challenge: 'Reconhecer um erro e pedir desculpas sinceras se você falhar em algo amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, limpa-nos do orgulho espiritual e da vaidade.' },
            { role: 'Filho', text: 'Me ajuda a ver minhas próprias falhas antes de julgar os outros.' },
            { role: 'Pai', text: 'Que em nossa casa busquemos sempre a verdade e a humildade.' },
            { role: 'Filho', text: 'Quero um coração simples.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A verdadeira força está na simplicidade do coração.'
      }
    ]
  },
  servico: {
    theme: 'Serviço',
    stories: [
      {
        biblicalReference: '📖 Lucas 22:24-27, Marcos 10:45',
        biblicalStoryTitle: 'A discussão dos discípulos',
        biblicalStory: 'Os discípulos começaram a discutir entre si sobre qual deles era o mais importante no Reino.\n\nJesus os chamou e explicou: "Os reis das nações mandam nelas, mas entre vocês não deve ser assim. Pelo contrário, o maior deve ser como o mais jovem, e o que lidera deve ser como o que serve".\n\nEle lembrou a todos que Ele próprio não veio para ser servido, mas para servir e dar a vida por muitos.',
        reflection: 'Ser prestativo e servir os outros é a melhor atitude que podemos ter na família, na escola e na igreja.\n\nNão precisamos esperar cargos ou ordens para agir. Quando vemos uma necessidade — louça na pia, lixo cheio, um colega carregando peso — a atitude de serviço nos leva a estender a mão sem reclamar.\n\nQuem serve é quem realmente lidera.',
        questions: [
          'Por que os discípulos queriam ser considerados os maiores?',
          'Quais são os pequenos atos de serviço que você pode praticar em nossa casa?',
          'Qual é o maior desafio na hora de servir alguém?'
        ],
        challenge: 'Assumir voluntariamente uma tarefa doméstica difícil amanhã sem ninguém pedir.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a ter a atitude de servo que Jesus teve.' },
            { role: 'Filho', text: 'Me ajuda a ver onde posso ajudar sem precisar ser obrigado.' },
            { role: 'Pai', text: 'Que o egoísmo saia do nosso meio para dar lugar à cooperação.' },
            { role: 'Filho', text: 'Dá-me alegria em fazer coisas simples pelas pessoas.' },
            { role: 'Juntos', text: 'Que a nossa família sirva a Ti servindo uns aos outros. Amém.' }
          ]
        },
        finalMessage: 'Quem não vive para servir, não serve para viver.'
      },
      {
        biblicalReference: '📖 Atos 9:36-43',
        biblicalStoryTitle: 'Tabita e as roupas de bondade',
        biblicalStory: 'Tabita era uma discípula conhecida por suas obras de caridade e serviço constante em Jope.\n\nEla passava seus dias costurando túnicas e vestidos para as viúvas necessitadas e pessoas pobres.\n\nQuando adoeceu e faleceu, toda a comunidade chorou mostrando a Pedro as roupas que ela tinha feito enquanto estava com elas. Sua atitude de serviço marcou a cidade.',
        reflection: 'Nossos talentos manuais e nosso tempo podem ser usados de forma prática para trazer conforto aos outros.',
        questions: [
          'Por que as viúvas choravam tanto por Tabita?',
          'Que talentos práticos você tem que podem servir aos outros?',
          'Como podemos servir às pessoas necessitadas de forma simples?'
        ],
        challenge: 'Fazer algo útil com as mãos (consertar, limpar ou organizar) para facilitar a vida de alguém em casa.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, obrigado pelas habilidades que o Senhor nos dá.' },
            { role: 'Filho', text: 'Me usa para trazer conforto e ajuda com minhas ações.' },
            { role: 'Pai', text: 'Que usemos nosso tempo para edificar a comunidade.' },
            { role: 'Filho', text: 'Me ensina a ser prestativo como Tabita.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Servir com nossas habilidades é um reflexo do amor divino.'
      }
    ]
  },
  oracao: {
    theme: 'Oração',
    stories: [
      {
        biblicalReference: '📖 Lucas 11:1-13',
        biblicalStoryTitle: 'Ensina-nos a orar',
        biblicalStory: 'Os discípulos viam Jesus se retirar muitas vezes para lugares isolados para falar com o Pai.\n\nCuriosos com a intimidade que Ele demonstrava, pediram: "Senhor, ensina-nos a orar".\n\nJesus então proferiu a oração do Pai Nosso, mostrando que orar é conversar com Deus com simplicidade, pedindo o pão diário, perdão pelas falhas e direção contra as tentações.',
        reflection: 'A oração não é um conjunto de palavras mágicas ou discursos complicados. É um diálogo sincero entre filho e pai.\n\nPodemos falar com Deus sobre tudo: nossos medos, alegrias e planos. Ele escuta com atenção.',
        questions: [
          'Por que os discípulos sentiram vontade de aprender a orar com Jesus?',
          'Sobre o que você mais gosta de conversar em suas orações?',
          'Como podemos tornar a oração um hábito natural diário?'
        ],
        challenge: 'Fazer uma oração silenciosa de 1 minuto hoje antes de dormir, agradecendo por algo bom.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, obrigado porque sempre nos ouve com amor.' },
            { role: 'Filho', text: 'Me ajuda a falar contigo com sinceridade e amizade.' },
            { role: 'Pai', text: 'Que nossa família tenha o hábito da oração constante.' },
            { role: 'Filho', text: 'Quero compartilhar minhas preocupações contigo.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Orar é abrir a porta do coração para a presença de Deus.'
      },
      {
        biblicalReference: '📖 Mateus 26:36-46',
        biblicalStoryTitle: 'A oração no Getsêmani',
        biblicalStory: 'Na noite em que seria traído, Jesus foi ao jardim do Getsêmani para orar. Ele sentia uma angústia profunda.\n\nEle se ajoelhou e orou com sinceridade: "Meu Pai, se for possível, afasta de mim este cálice; contudo, não seja como eu quero, mas como tu queres".\n\nMesmo na hora mais difícil, a oração de Jesus foi de entrega total e confiança na vontade do Pai.',
        reflection: 'Orar nos momentos difíceis nos dá força para enfrentar as tempestades da vida com paz de espírito.',
        questions: [
          'O que a oração de Jesus nos ensina sobre aceitar a vontade de Deus?',
          'Como a oração pode nos trazer paz nos momentos de desespero?',
          'Como podemos apoiar uns aos outros em oração nas crises?'
        ],
        challenge: 'Orar por um amigo ou familiar que está passando por problemas de saúde ou tristeza hoje.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos dê forças para aceitar a Tua vontade sempre.' },
            { role: 'Filho', text: 'Me ajuda a orar nos dias em que eu me sentir triste ou com medo.' },
            { role: 'Pai', text: 'Que nossa oração seja um momento de descanso em Ti.' },
            { role: 'Filho', text: 'Renova minhas forças.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A oração honesta nos conecta com a força divina.'
      }
    ]
  },
  louvor: {
    theme: 'Louvor',
    stories: [
      {
        biblicalReference: '📖 Atos 16:16-34',
        biblicalStoryTitle: 'Cânticos na prisão',
        biblicalStory: 'Paulo e Silas foram presos injustamente, açoitados e colocados no cárcere mais profundo, com os pés presos em troncos de madeira.\n\nPor volta da meia-noite, em vez de reclamarem ou chorarem, eles começaram a orar e cantar hinos a Deus. Os outros presos ouviam espantados.\n\nDe repente, houve um terremoto forte que abriu as portas e soltou as correntes de todos, levando o carcereiro a crer em Deus.',
        reflection: 'O louvor não é apenas cantar quando estamos felizes. É uma arma de gratidão e fé que usamos mesmo nas situações mais escuras e difíceis.\n\nCantar louvores muda a atmosfera ao nosso redor.',
        questions: [
          'Como deve ter sido para os outros presos ouvir cânticos no meio da noite?',
          'Como a música e o louvor mudam o seu humor quando você está chateado?',
          'Como podemos louvar mais em nossa rotina diária?'
        ],
        challenge: 'Ouvir ou cantar uma música de louvor e adoração para animar o seu coração amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, que a nossa boca sempre tenha um cântico de gratidão.' },
            { role: 'Filho', text: 'Ajuda-me a louvar a Ti mesmo quando as coisas não derem certo.' },
            { role: 'Pai', text: 'Que a música traga paz para dentro da nossa casa.' },
            { role: 'Filho', text: 'Quero cantar Teu amor com alegria.' },
            { role: 'Juntos', text: 'Nossa alegria vem do Senhor todos os dias. Amém.' }
          ]
        },
        finalMessage: 'O louvor quebra correntes de tristeza.'
      },
      {
        biblicalReference: '📖 Josué 6:1-20',
        biblicalStoryTitle: 'O grito de vitória em Jericó',
        biblicalStory: 'As muralhas de Jericó eram intransponíveis. Deus ordenou que o exército marchasse ao redor da cidade por sete dias em silêncio.\n\nNo sétimo dia, os sacerdotes tocaram as buzinas e todo o povo deu um grande grito de louvor.\n\nAo som do louvor e das buzinas, as muralhas caíram por terra e a cidade foi conquistada.',
        reflection: 'Muitas vezes, a nossa maior barreira cai quando decidimos louvar a Deus antes mesmo de ver o problema resolvido.',
        questions: [
          'Por que o silêncio e o grito final foram importantes na estratégia?',
          'Quais são as "muralhas" que precisamos derrubar em nossas atitudes?',
          'Como o louvor demonstra a nossa certeza na vitória de Deus?'
        ],
        challenge: 'Agradecer e louvar a Deus por uma solução antes mesmo do problema se resolver amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a louvar diante de muralhas difíceis.' },
            { role: 'Filho', text: 'Me ajuda a confiar no Teu poder com gritos de alegria.' },
            { role: 'Pai', text: 'Dá-nos fé para ver as vitórias que o Senhor prepara.' },
            { role: 'Filho', text: 'Quero erguer minha voz para Ti.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'O louvor antecipado é a maior prova de fé.'
      }
    ]
  },
  confianca: {
    theme: 'Confiança',
    stories: [
      {
        biblicalReference: '📖 Mateus 14:22-33',
        biblicalStoryTitle: 'Pedro caminha sobre as águas',
        biblicalStory: 'Os discípulos enfrentavam uma tempestade no barco. De repente, viram Jesus caminhando sobre a água.\n\nAssustados, acharam que era um fantasma. Mas Jesus disse: "Coragem! Sou eu. Não tenham medo".\n\nPedro pediu: "Senhor, se és tu, manda-me ir ao teu encontro". Pedro saiu do barco e caminhou. Mas ao olhar para o vento forte, sentiu medo, começou a afundar e gritou. Jesus o segurou.',
        reflection: 'Confiar em Deus significa manter o foco em Suas promessas, mesmo quando as dificuldades ao redor parecem assustadoras como o vento forte.\n\nQuando duvidamos e focamos no problema, começamos a afundar na preocupação.',
        questions: [
          'O que fez Pedro caminhar sobre a água e o que o fez afundar?',
          'Que "ventos fortes" tiram a sua tranquilidade no dia a dia?',
          'Como podemos lembrar que Jesus está perto para nos segurar?'
        ],
        challenge: 'Dizer a si mesmo "Deus está no controle" sempre que começar a se preocupar amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor Jesus, ajuda-nos a manter nossos olhos em Ti.' },
            { role: 'Filho', text: 'Quando eu sentir que vou afundar nas preocupações, segura minha mão.' },
            { role: 'Pai', text: 'Que a nossa confiança esteja enraizada no Teu amor.' },
            { role: 'Filho', text: 'Me ensina a não ter medo das dificuldades.' },
            { role: 'Juntos', text: 'Temos paz porque confiamos em Ti. Amém.' }
          ]
        },
        finalMessage: 'A confiança em Deus acalma o coração nas tempestades.'
      },
      {
        biblicalReference: '📖 Salmo 23:1-6',
        biblicalStoryTitle: 'O pastor e a ovelha',
        biblicalStory: 'O salmista Davi escreveu que o Senhor é o nosso pastor, e por isso nada nos faltará.\n\nEle nos guia a pastos verdes e águas tranquilas. Mesmo quando passamos por vales escuros de medo, não precisamos temer mal nenhum, porque a Sua vara e o Seu cajado nos protegem.',
        reflection: 'A ovelha confia totalmente no pastor porque sabe que ele a defende de lobos e a leva para locais seguros. Nós somos as ovelhas de Deus.',
        questions: [
          'Por que a ovelha se sente segura perto do pastor?',
          'O que representa o "vale escuro" para você hoje?',
          'Como a presença de Deus afasta o medo?'
        ],
        challenge: 'Ler o Salmo 23 inteiro em silêncio antes de dormir.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor Deus, obrigado por ser o nosso Pastor amoroso.' },
            { role: 'Filho', text: 'Ajuda-me a descansar sabendo que o Senhor me guia a águas limpas.' },
            { role: 'Pai', text: 'Afasta o temor dos vales escuros da nossa caminhada.' },
            { role: 'Filho', text: 'Eu confio no Teu cuidado.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Com Deus como nosso pastor, o nosso futuro está seguro.'
      }
    ]
  },
  temor: {
    theme: 'Temor a Deus',
    stories: [
      {
        biblicalReference: '📖 Êxodo 20:1-20',
        biblicalStoryTitle: 'Os dez mandamentos no monte',
        biblicalStory: 'O povo de Israel estava acampado ao pé do Monte Sinai. O monte estava coberto de fumaça, com trovões, relâmpagos e o som forte de uma buzina.\n\nDeus desceu sobre o monte para entregar a Lei. O povo tremeu de medo e ficou de longe.\n\nMoisés explicou: "Não temam. Deus veio para provar vocês, para que o temor Dele esteja diante de vocês, para que não pequem".',
        reflection: 'Temor a Deus não é ter medo de ser castigado como por um monstro. É um respeito profundo e reverência pelo Seu poder e santidade.\n\nEsse respeito nos leva a querer agradar a Deus em tudo o que fazemos, fugindo do que é errado por amor a Ele.',
        questions: [
          'Qual a diferença entre ter "medo" e ter "repeito profundo/temor"?',
          'Como o temor a Deus nos ajuda a tomar decisões melhores longe dos pais?',
          'Como podemos honrar o nome de Deus em nossas conversas?'
        ],
        challenge: 'Evitar falar palavras feias ou fazer piadas de mau gosto amanhã, demonstrando respeito a Deus.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus majestoso, ensina-nos a ter reverência pela Tua santidade.' },
            { role: 'Filho', text: 'Me ajuda a respeitar Suas orientações com amor, sabendo que o Senhor é grande.' },
            { role: 'Pai', text: 'Que o temor a Ti guie as nossas atitudes diárias na nossa casa.' },
            { role: 'Filho', text: 'Quero fazer o que te agrada.' },
            { role: 'Juntos', text: 'O Senhor é grande e digno de todo louvor. Amém.' }
          ]
        },
        finalMessage: 'O temor do Senhor é o princípio de toda a verdadeira sabedoria.'
      },
      {
        biblicalReference: '📖 Isaías 6:1-8',
        biblicalStoryTitle: 'Isaías e a glória no templo',
        biblicalStory: 'O profeta Isaías teve uma visão do Senhor assentado em um trono alto e sublime. Os serafins cobriam o rosto cantando: "Santo, Santo, Santo é o Senhor dos Exércitos".\n\nIsaías sentiu sua própria pequenez e impureza. Mas um anjo tocou seus lábios com uma brasa do altar, perdoando-o. Quando Deus perguntou quem iria falar por Ele, Isaías respondeu com reverência: "Eis-me aqui, envia-me a mim".',
        reflection: 'Reconhecer a grandeza e a santidade de Deus nos leva a colocar nossa vida à disposição do Seu serviço com humildade.',
        questions: [
          'Por que os anjos cobriam o rosto diante de Deus?',
          'Como você se sente ao pensar no tamanho da criação de Deus?',
          'Como essa grandeza nos ajuda a confiar no Seu poder?'
        ],
        challenge: 'Anotar em um papel uma atitude que você sabe que desagrada a Deus e decidir abandoná-la.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, perdoa nossas imperfeições diante da Tua glória.' },
            { role: 'Filho', text: 'Me usa para espalhar a Tua palavra com respeito e humildade.' },
            { role: 'Pai', text: 'Que a nossa família sirva a Ti de coração limpo.' },
            { role: 'Filho', text: 'Aqui estou para fazer a Tua vontade.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A reverência nos aproxima da vontade de Deus.'
      }
    ]
  },

  // --- SABEDORIA ---
  escolhas: {
    theme: 'Escolhas',
    stories: [
      {
        biblicalReference: '📖 Mateus 7:24-27',
        biblicalStoryTitle: 'Os dois construtores',
        biblicalStory: 'Jesus contou a história de dois homens. O homem prudente construiu sua casa sobre a rocha sólida.\n\nO homem insensato construiu sua casa na areia da praia.\n\nVeio uma tempestade violenta, os rios transbordaram e o vento soprou contra as duas casas.\n\nA casa na rocha resistiu firme. Mas a casa na areia desabou completamente, e a sua queda foi enorme.',
        reflection: 'Nossas escolhas diárias são como tijolos na construção da nossa vida.\n\nEscolher a rocha significa ouvir os bons conselhos e fazer o que é correto, mesmo que dê mais trabalho.\n\nEscolher a areia é buscar o atalho fácil e fazer o que dá na telha. A tempestade das consequências sempre vem.',
        questions: [
          'Por que o homem insensato preferiu construir na areia?',
          'Quais são as escolhas mais importantes que você faz no seu dia a dia?',
          'Como a sabedoria nos protege das consequências ruins?'
        ],
        challenge: 'Diante de uma escolha difícil amanhã, pare por 10 segundos, pense nas consequências e escolha o caminho da rocha.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Pai amado, nos dê sabedoria para fazer escolhas prudentes.' },
            { role: 'Filho', text: 'Ajuda-me a ouvir Teus conselhos e os conselhos dos meus pais.' },
            { role: 'Pai', text: 'Protege os passos da nossa família em caminhos corretos.' },
            { role: 'Filho', text: 'Que eu não seja levado pela pressa ou facilidade.' },
            { role: 'Juntos', text: 'Construímos nossa vida na Tua verdade. Amém.' }
          ]
        },
        finalMessage: 'Suas escolhas hoje determinam quem você será amanhã.'
      },
      {
        biblicalReference: '📖 Deuteronômio 30:15-20',
        biblicalStoryTitle: 'A escolha entre a vida e a morte',
        biblicalStory: 'Moisés reuniu o povo e declarou: "Hoje coloco diante de vocês a vida e o bem, a morte e o mal.\n\nEscolham, pois, a vida, para que vivam vocês e seus filhos, amando o Senhor, obedecendo à sua voz e apegando-se a Ele".\n\nA escolha diária de seguir a Deus ou seguir caminhos de desobediência estava nas mãos de cada um.',
        reflection: 'Tomar boas decisões exige olhar além do prazer imediato e escolher o que traz vida a longo prazo.',
        questions: [
          'O que significa "escolher a vida" nas pequenas atitudes da escola?',
          'Como as decisões erradas de uma pessoa afetam a sua família?',
          'Como podemos orar antes de tomar decisões importantes?'
        ],
        challenge: 'Escolher ajudar ou estudar amanhã mesmo quando a vontade for apenas procrastinar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a escolher caminhos que trazem vida ao nosso lar.' },
            { role: 'Filho', text: 'Me ensina a pensar no futuro antes de agir por impulso.' },
            { role: 'Pai', text: 'Que a Tua palavra seja a bússola das nossas escolhas.' },
            { role: 'Filho', text: 'Eu escolho o bem.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Escolher a vida é escolher a obediência.'
      }
    ]
  },
  autocontrole: {
    theme: 'Autocontrole',
    stories: [
      {
        biblicalReference: '📖 Provérbios 16:32, 25:28',
        biblicalStoryTitle: 'A cidade sem muros',
        biblicalStory: 'A Bíblia diz em Provérbios que a pessoa que não domina seu próprio espírito é como uma cidade com os muros derrubados.\n\nAntigamente, uma cidade sem muros ficava completamente desprotegida contra invasores e animais selvagens.\n\nSem autocontrole, ficamos expostos à raiva, às palavras duras e às decisões impensadas que destroem nossas amizades e nossa paz.',
        reflection: 'Autocontrole é a nossa capacidade de dizer "não" para os nossos impulsos imediatos.\n\nIsso vale para dominar a boca na hora da raiva, controlar o tempo que passamos no celular ou videogame, e saber frear a irritação quando as coisas não saem do nosso jeito.\n\nQuem se controla é mais forte do que quem conquista cidades.',
        questions: [
          'Como você imagina uma pessoa que não tem controle sobre suas palavras?',
          'Em qual área da vida você acha mais difícil ter autocontrole?',
          'O que podemos fazer juntos para manter a calma na hora das discussões?'
        ],
        challenge: 'Se você se sentir irritado ou ansioso amanhã, feche a boca, respire fundo e conte até 10 antes de falar.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, guarda a nossa boca e os nossos pensamentos.' },
            { role: 'Filho', text: 'Me ajuda a controlar minha paciência no videogame e com meus amigos.' },
            { role: 'Pai', text: 'Que o Teu Espírito traga paz e domínio próprio ao nosso lar.' },
            { role: 'Filho', text: 'Dá-me sabedoria para parar na hora certa.' },
            { role: 'Juntos', text: 'O Senhor é o dono das nossas vidas e atitudes. Amém.' }
          ]
        },
        finalMessage: 'Governar a si mesmo é a maior das vitórias.'
      },
      {
        biblicalReference: '📖 Gênesis 4:1-9',
        biblicalStoryTitle: 'Caim e a falta de domínio próprio',
        biblicalStory: 'Caim ficou extremamente irritado porque sua oferta não foi aceita como a de seu irmão Abel.\n\nDeus o alertou: "Por que você está com raiva? Se fizer o bem, será aceito. Mas se não fizer, o pecado está à porta, pronto para dominá-lo. Você deve dominá-lo".\n\nCaim ignorou o aviso, não controlou sua ira e atacou seu irmão no campo.',
        reflection: 'A raiva é uma emoção natural, mas nos dominar se não tivermos autocontrole. Controlar as reações evita tragédias.',
        questions: [
          'O que Deus quis dizer com "o pecado está à porta"?',
          'Como podemos lidar com a inveja ou raiva sem machucar os outros?',
          'Quem é o verdadeiro dono das suas reações?'
        ],
        challenge: 'Fastar-se fisicamente de uma situação de conflito por alguns minutos até a raiva passar amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos dê forças para dominar os nossos impulsos de ira.' },
            { role: 'Filho', text: 'Me ajuda a ouvir avisos e a me acalmar antes de gritar ou brigar.' },
            { role: 'Pai', text: 'Que a mansidão prevaleça em nossa convivência.' },
            { role: 'Filho', text: 'Dá-me calma nas frustrações.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Quem domina sua própria raiva é mais forte que um guerreiro.'
      }
    ]
  },
  ansiedade: {
    theme: 'Ansiedade',
    stories: [
      {
        biblicalReference: '📖 Mateus 6:25-34',
        biblicalStoryTitle: 'Os lírios do campo',
        biblicalStory: 'Jesus reuniu as pessoas em uma colina e disse: "Não andem ansiosos com o que comer, beber ou vestir".\n\nEle apontou para o céu: "Olhem para as aves do céu; elas não semeiam, não colhem, nem guardam em celeiros; contudo, o Pai celestial as alimenta".\n\nDepois apontou para o chão: "Vejam como crescem os lírios do campo; eles não trabalham nem fiam. Contudo, nem o rei Salomão se vestiu como um deles".',
        reflection: 'Preocupar-se demais com as notas da escola, com a opinião dos outros ou com o futuro nos causa um nó no peito.\n\nJesus nos lembra que a ansiedade não resolve problemas nem nos ajuda a crescer.\n\nQuando fazemos nossa parte e confiamos a Deus o que não podemos controlar, nosso coração volta a ter calma.',
        questions: [
          'Por que Jesus usou passarinhos e flores como exemplos?',
          'O que mais tem trazido preocupação ou ansiedade ao seu coração?',
          'Como podemos lembrar que Deus está no controle de tudo?'
        ],
        challenge: 'Entregar sua maior preocupação em uma oração sincera hoje e decidir não falar mais nela pelo resto da noite.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor Jesus, traz calmaria para a nossa mente agitada.' },
            { role: 'Filho', text: 'Ajuda-me a descansar sabendo que o Senhor cuida de mim.' },
            { role: 'Pai', text: 'Afasta as preocupações exageradas do peito do meu filho.' },
            { role: 'Filho', text: 'Quero dormir em paz confiando em Ti.' },
            { role: 'Juntos', text: 'O amanhã pertence ao Senhor, e nele descansamos. Amém.' }
          ]
        },
        finalMessage: 'A ansiedade não esvazia o amanhã das suas dores; ela esvazia o hoje da sua força.'
      },
      {
        biblicalReference: '📖 1 Reis 19:1-9',
        biblicalStoryTitle: 'Elias debaixo do zimbro',
        biblicalStory: 'O profeta Elias ficou com muito medo após receber uma ameaça da rainha Jezabel. Ele fugiu para o deserto, exausto e ansioso.\n\nEle se deitou debaixo de uma árvore e pediu para morrer por causa do desespero.\n\nDeus, porém, enviou um anjo para trazer pão e água, ordenando-lhe que comesse e descansasse. Deus cuidou do seu corpo antes de falar com ele em uma brisa suave.',
        reflection: 'Muitas vezes, a nossa ansiedade aumenta por causa do cansaço físico. Comer bem e dormir o suficiente faz parte do cuidado de Deus.',
        questions: [
          'Por que Elias sentiu tanta exaustão e desespero?',
          'Como o sono e a alimentação afetam a nossa paciência e ansiedade?',
          'Como Deus se revelou a Elias (no vento forte ou na brisa suave)?'
        ],
        challenge: 'Dormir no horário combinado hoje, desligando as telas meia hora antes.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a respeitar o descanso do nosso corpo.' },
            { role: 'Filho', text: 'Me ajuda a desacelerar a mente na hora de deitar.' },
            { role: 'Pai', text: 'Que a Tua brisa suave traga calmaria ao nosso lar.' },
            { role: 'Filho', text: 'Eu entrego meu cansaço a Ti.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'O descanso físico também cura a alma ansiosa.'
      }
    ]
  },
  medo: {
    theme: 'Medo',
    stories: [
      {
        biblicalReference: '📖 Marcos 4:35-41',
        biblicalStoryTitle: 'A calmaria no mar',
        biblicalStory: 'Os discípulos estavam em um barco quando começou uma tempestade violenta. O vento forte jogava as ondas para dentro do barco.\n\nEles eram pescadores experientes, mas ficaram apavorados.\n\nJesus estava dormindo tranquilamente na popa sobre um travesseiro.\n\nDesesperados, os discípulos o acordaram gritando: "Mestre, não te importa que morramos?". Jesus se levantou, ordenou ao vento e ao mar: "Cale-se! Acalme-se!". Imediatamente houve grande bonança.',
        reflection: 'O medo costuma gritar alto dentro de nós, parecendo que vai nos afogar. Pode ser medo do escuro, de errar, de ficar sozinho ou de rejeição.\n\nMas Jesus está no mesmo barco que nós. Ele tem autoridade sobre todas as nossas tempestades.\n\nConversar sobre nossos medos e orar nos dá segurança e dissipa a escuridão.',
        questions: [
          'Por que Jesus conseguia dormir durante a tempestade?',
          'Quais são os maiores medos que aparecem à noite ou na escola?',
          'O que significa ter Jesus no barco da nossa vida?'
        ],
        challenge: 'Escrever seu maior medo em um papel e depois rasgar o papel, simbolizando que você o entrega a Deus.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus Todo-Poderoso, repreende todo o medo que tenta entrar em nossa casa.' },
            { role: 'Filho', text: 'Quando eu sentir medo do escuro ou do futuro, me ajuda a lembrar de Ti.' },
            { role: 'Pai', text: 'Que o Teu perfeito amor lance fora todo o medo de nossas vidas.' },
            { role: 'Filho', text: 'Eu escolho confiar que estou seguro.' },
            { role: 'Juntos', text: 'O Senhor é o meu refúgio e minha fortaleza. Amém.' }
          ]
        },
        finalMessage: 'A fé não impede que a tempestade aconteça, mas nos impede de afundar no medo.'
      },
      {
        biblicalReference: '📖 2 Reis 6:8-17',
        biblicalStoryTitle: 'Os carros de fogo ao redor',
        biblicalStory: 'O exército inimigo cercou a cidade de Eliseu à noite com cavalos e carros de guerra. O servo do profeta levantou-se cedo, viu o cerco e entrou em pânico.\n\nEliseu acalmou-o: "Não tenha medo, pois os que estão conosco são mais do que os que estão com eles".\n\nEliseu orou para que Deus abrisse os olhos do rapaz. O servo olhou e viu que o monte estava cheio de cavalos e carros de fogo ao redor de Eliseu.',
        reflection: 'Muitas vezes sentimos medo porque só olhamos para a ameaça visível, esquecendo que o poder invisível de Deus nos cerca e nos protege.',
        questions: [
          'Por que o servo ficou com tanto pânico ao acordar?',
          'O que Eliseu viu que o rapaz não conseguia ver?',
          'Como podemos manter a calma quando nos sentimos encurralados por um problema?'
        ],
        challenge: 'Declarar em voz alta: "O poder de Deus me protege" sempre que sentir insegurança amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, abra os nossos olhos espirituais para ver a Tua proteção.' },
            { role: 'Filho', text: 'Me ajuda a lembrar que o Senhor está comigo quando eu me sentir indefeso.' },
            { role: 'Pai', text: 'Tira a cegueira do medo da nossa família.' },
            { role: 'Filho', text: 'Eu confio no Teu exército de amor.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Quem confia em Deus nunca está desamparado.'
      }
    ]
  },
  influencia: {
    theme: 'Influência dos amigos',
    stories: [
      {
        biblicalReference: '📖 Provérbios 13:20, Daniel 1:1-21',
        biblicalStoryTitle: 'Daniel e a comida do rei',
        biblicalStory: 'Daniel e seus três amigos foram levados presos para a Babilônia. O rei ordenou que eles fossem alimentados com as melhores comidas e vinhos de sua mesa.\n\nMas Daniel sabia que aqueles alimentos desonravam a Deus. Ele decidiu não se contaminar com a comida do palácio.\n\nOs outros jovens concordaram e seguiram a mesma influência. Daniel pediu legumes e água. Após dez dias, eles pareciam mais saudáveis e fortes do que todos os outros.',
        reflection: 'Amigos podem nos puxar para cima ou nos empurrar para baixo.\n\nFazer o que é certo exige coragem quando todos ao redor estão fazendo o que é errado para parecerem "descolados".\n\nQuem caminha com os sábios torna-se sábio. Seja você a boa influência na escola, em vez de se deixar levar.',
        questions: [
          'Por que foi difícil para Daniel recusar a comida do palácio?',
          'Você já se sentiu pressionado a fazer algo errado para agradar a um grupo de amigos?',
          'Como podemos manter a nossa identidade e nossos valores mesmo sob pressão?'
        ],
        challenge: 'Dizer "não" educadamente se algum colega te propor fazer algo que você sabe que é errado amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, dê discernimento ao meu filho para escolher suas amizades.' },
            { role: 'Filho', text: 'Ajuda-me a ser firme na escola e a não fazer besteira para ser aceito.' },
            { role: 'Pai', text: 'Que possamos ser luz e influenciar positivamente os ambientes.' },
            { role: 'Filho', text: 'Me dê forças para apoiar meus amigos a fazerem o bem.' },
            { role: 'Juntos', text: 'Escolhemos andar no Teu caminho com sabedoria. Amém.' }
          ]
        },
        finalMessage: 'A verdadeira força está em se manter firme em seus valores, mesmo quando todos os outros decidem ceder.'
      },
      {
        biblicalReference: '📖 Números 13:25-33, 14:1-10',
        biblicalStoryTitle: 'Os dez espias e o relatório do medo',
        biblicalStory: 'Doze líderes foram espiar a Terra Prometida. Ao voltarem, dez deles espalharam relatórios ruins e cheios de medo na comunidade, dizendo que os habitantes eram gigantes e que Israel seria destruído.\n\nApenas Josué e Calebe tentaram acalmar o povo, dizendo que com a ajuda de Deus a terra seria conquistada. Mas a multidão se deixou levar pela má influência dos dez espias rebeldes e chorou a noite inteira.',
        reflection: 'A opinião negativa ou temerosa da maioria pode nos influenciar a desistir das promessas de Deus se não tomarmos cuidado.',
        questions: [
          'Por que a maioria se deixou influenciar pelos dez espias em vez de Josué e Calebe?',
          'Como o desânimo dos outros pode nos contaminar?',
          'Como ser firme e manter a esperança mesmo quando todos ao redor reclamam?'
        ],
        challenge: 'Apoiar uma ideia positiva ou defender um bom comportamento na escola, mesmo que a maioria seja contra.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, guarde nossa mente contra a influência do medo e da murmuração.' },
            { role: 'Filho', text: 'Me ajuda a ter a visão de Josué e Calebe e a não seguir a maioria no erro.' },
            { role: 'Pai', text: 'Que sejamos portadores de relatórios de fé.' },
            { role: 'Filho', text: 'Afasta de mim as conversas destrutivas.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Seguir a multidão pode nos levar ao deserto; seguir a fé nos leva à promessa.'
      }
    ]
  },
  foco: {
    theme: 'Foco e Atenção',
    stories: [
      {
        biblicalReference: '📖 Lucas 10:38-42',
        biblicalStoryTitle: 'Marta, Maria e a melhor parte',
        biblicalStory: 'Jesus visitou a casa de duas irmãs. Marta correu de um lado para o outro, agitada e distraída com os preparativos da refeição.\n\nSua irmã Maria, porém, sentou-se aos pés de Jesus para escutar com atenção tudo o que Ele ensinava.\n\nMarta reclamou que estava fazendo tudo sozinha, mas Jesus explicou: "Marta, você está inquieta e distraída com muitas coisas, mas poucas são necessárias. Maria escolheu a melhor parte, e esta não lhe será tirada".',
        reflection: 'Na era do celular, das notificações e das telas, ficar distraído é muito fácil. Marta não estava fazendo algo ruim, mas perdeu o foco do que era mais importante naquele momento.\n\nTer atenção e saber focar no que realmente importa traz paz e aprendizado real.',
        questions: [
          'Por que Marta ficou tão irritada com a atitude de sua irmã?',
          'Quais coisas mais tiram o seu foco durante os estudos ou momentos em família?',
          'Como podemos praticar sentar aos pés de Jesus na nossa rotina?'
        ],
        challenge: 'Desligar e afastar o celular por 1 hora completa durante a realização das suas tarefas amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, nos ajude a acalmar a nossa agitação diária.' },
            { role: 'Filho', text: 'Me ensina a focar no que estou fazendo e a não me distrair com telas toda hora.' },
            { role: 'Pai', text: 'Que saibamos priorizar o relacionamento em nosso lar.' },
            { role: 'Filho', text: 'Quero escolher a melhor parte.' },
            { role: 'Juntos', text: 'Conceda-nos atenção e foco nas coisas importantes. Amém.' }
          ]
        },
        finalMessage: 'Quem foca no essencial encontra verdadeira paz.'
      },
      {
        biblicalReference: '📖 Mateus 6:19-21',
        biblicalStoryTitle: 'Onde está o seu tesouro',
        biblicalStory: 'Jesus ensinou: "Não acumulem tesouros na terra, onde a traça e a ferrugem destroem. Mas acumulem tesouros no céu.\n\nPorque onde estiver o seu tesouro, aí estará também o seu coração".\n\nNossa atenção e foco seguem aquilo que consideramos mais valioso na vida.',
        reflection: 'Se nosso foco está apenas em coisas passageiras (pontuação em jogos, curtidas na internet, bens), nosso coração fica inquieto. Focar em valores eternos traz estabilidade.',
        questions: [
          'O que Jesus quis dizer com "tesouros no céu"?',
          'Para onde o seu coração mais se desvia no dia a dia?',
          'Como direcionar o nosso foco para atitudes corretas?'
        ],
        challenge: 'Escolher investir seu tempo em ler um livro ou fazer uma gentileza em vez de jogar videogame amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, alinhe nossos tesouros com a Tua vontade.' },
            { role: 'Filho', text: 'Ajuda-me a dar valor ao que realmente importa: amor, família e fé.' },
            { role: 'Pai', text: 'Guarde nossos corações de distrações vazias.' },
            { role: 'Filho', text: 'Que meu tesouro esteja em Ti.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'Onde você coloca sua atenção, aí coloca seu coração.'
      }
    ]
  },
  moderacao: {
    theme: 'Moderação',
    stories: [
      {
        biblicalReference: '📖 Provérbios 25:16, 27:7',
        biblicalStoryTitle: 'A doçura do mel',
        biblicalStory: 'O livro de Provérbios diz: "Se você encontrar mel, coma apenas o suficiente; para que não se farte dele e venha a vomitá-lo".\n\nO mel é doce e saudável, mas o excesso faz mal.\n\nIsso nos ensina que coisas boas em excesso (comer doces, jogar videogame, assistir séries) perdem a doçura e nos fazem mal se não usarmos de moderação e equilíbrio.',
        reflection: 'Moderação é saber colocar limite no que fazemos por prazer, impedindo que o passatempo vire um vício ou atrapalhe nossas responsabilidades diárias.',
        questions: [
          'Por que comer mel em excesso faz mal?',
          'Quais atividades você tem dificuldade de praticar com equilíbrio?',
          'Como a falta de limite afeta o nosso humor e rendimento?'
        ],
        challenge: 'Parar uma atividade prazerosa (videogame ou série) exatamente no horário combinado, sem pedir "mais 5 minutinhos".',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus de ordem, nos ajude a viver com equilíbrio e moderação.' },
            { role: 'Filho', text: 'Me ajuda a saber a hora de parar de jogar ou comer doces.' },
            { role: 'Pai', text: 'Que a temperança seja uma virtude visível no nosso dia a dia.' },
            { role: 'Filho', text: 'Quero dominar meus desejos com inteligência.' },
            { role: 'Juntos', text: 'Obrigado por nos dar sabedoria para agir com moderação. Amém.' }
          ]
        },
        finalMessage: 'O equilíbrio é o segredo para aproveitar a vida com saúde.'
      },
      {
        biblicalReference: '📖 Daniel 1:8-16',
        biblicalStoryTitle: 'O teste do equilíbrio',
        biblicalStory: 'Daniel e seus amigos escolheram não comer os banquetes ricos do palácio babilônico.\n\nEles preferiram uma dieta equilibrada e simples de legumes e água, evitando os excessos da mesa real.\n\nApós dez dias, a moderação deles foi comprovada em corpos mais saudáveis e mentes dez vezes mais ágeis.',
        reflection: 'Escolher a moderação nos protege das consequências físicas e mentais do excesso alimentar ou comportamental.',
        questions: [
          'Por que o banquete do rei podia ser um perigo para os jovens?',
          'Como a simplicidade e a moderação nos ajudam no foco diário?',
          'De que forma podemos praticar a moderação na mesa?'
        ],
        challenge: 'Beber apenas água e evitar refrigerantes ou sucos artificiais no dia de amanhã.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, ensina-nos a nos alimentar e viver com simplicidade.' },
            { role: 'Filho', text: 'Me ajuda a resistir aos banquetes de excessos que aparecem.' },
            { role: 'Pai', text: 'Que o nosso lar seja livre de exageros e desperdícios.' },
            { role: 'Filho', text: 'Que meu corpo seja cuidado com moderação.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'O corpo saudável abriga uma mente equilibrada.'
      }
    ]
  },
  resiliencia: {
    theme: 'Resiliência',
    stories: [
      {
        biblicalReference: '📖 Jó 1:1-22, 42:10-17',
        biblicalStoryTitle: 'A resiliência de Jó',
        biblicalStory: 'Jó era um homem íntegro que perdeu tudo o que tinha em um único dia: seus bens, seus animais e seus filhos. Pouco depois, foi atingido por uma doença terrível.\n\nMesmo sofrendo imensamente e sem entender o motivo de sua dor, Jó se ajoelhou e declarou: "O Senhor deu, o Senhor tirou; louvado seja o nome do Senhor".\n\nEle passou pelo vale do sofrimento mantendo sua integridade, e Deus restaurou sua saúde e seus bens em dobro.',
        reflection: 'Resiliência é a nossa capacidade de passar por crises, perdas e momentos tristes sem deixar que a amargura destrua o nosso coração.\n\nÉ a força para se reconstruir após quedas ou frustrações profundas.',
        questions: [
          'Como foi possível Jó manter a foi após perder tudo o que amava?',
          'Quando você passa por uma frustração (como perder um jogo ou tirar nota ruim), como costuma reagir?',
          'Como a nossa família pode ser resiliente diante das crises?'
        ],
        challenge: 'Aceitar com calma uma frustração ou perda amanhã, sem reclamar ou bater o pé.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus, ensina-nos a nos manter firmes em meio às perdas.' },
            { role: 'Filho', text: 'Me ajuda a ter resiliência para recomeçar quando eu errar ou perder.' },
            { role: 'Pai', text: 'Que a nossa esperança esteja firme no Teu caráter, não nas circunstâncias.' },
            { role: 'Filho', text: 'Quero ser forte nas frustrações.' },
            { role: 'Juntos', text: 'Com a Tua ajuda, nós nos reerguemos em paz. Amém.' }
          ]
        },
        finalMessage: 'Frustrações são oportunidades para crescer mais fortes.'
      },
      {
        biblicalReference: '📖 Lucas 22:54-62, João 21:15-19',
        biblicalStoryTitle: 'A restauração de Pedro',
        biblicalStory: 'Pedro falhou gravemente ao negar Jesus três vezes por medo. Ele se sentiu um fracasso absoluto e chorou amargamente.\n\nApós ressuscitar, Jesus o encontrou à beira do mar e perguntou três vezes: "Pedro, você me ama?".\n\nJesus não o rejeitou, mas o perdoou e ordenou que ele cuidasse das Suas ovelhas, ajudando Pedro a se levantar do seu pior erro.',
        reflection: 'Errar gravemente não define o nosso fim. A resiliência nos permite aceitar o perdão de Deus e continuar a nossa caminhada.',
        questions: [
          'Por que Pedro achava que sua carreira de discípulo tinha acabado?',
          'Como Jesus ajudou Pedro a se reerguer da culpa?',
          'Como podemos ajudar uns aos outros a recomeçar após erros?'
        ],
        challenge: 'Anotar em um papel uma falha recente e declarar: "Isso não define quem eu sou. Eu posso recomeçar".',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, obrigado pelo Teu perdão que nos restaura.' },
            { role: 'Filho', text: 'Me ajuda a não desistir de mim mesmo quando eu errar.' },
            { role: 'Pai', text: 'Que a culpa não paralise o progresso em nossa casa.' },
            { role: 'Filho', text: 'Quero continuar caminhando.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A maior vitória não é nunca cair, mas levantar-se a cada queda.'
      }
    ]
  },
  prudencia: {
    theme: 'Prudência',
    stories: [
      {
        biblicalReference: '📖 Mateus 25:1-13',
        biblicalStoryTitle: 'As dez virgens',
        biblicalStory: 'Jesus contou a parábola de dez moças que saíram ao encontro do noivo à noite com suas lâmpadas.\n\nCinco delas eram prudentes e levaram óleo reserva em suas vasilhas. As outras cinco eram insensatas e não levaram reserva.\n\nO noivo demorou e as lâmpadas começaram a apagar. As prudentes usaram seu óleo de reserva e entraram na festa de casamento, enquanto as insensatas ficaram de fora.',
        reflection: 'Prudência é a sabedoria de prever necessidades futuras e nos preparar com antecedência, evitando problemas por causa da pressa ou da negligência.\n\nSer prudente evita que sejamos pegos de surpresa.',
        questions: [
          'Por que as cinco moças insensatas não levaram óleo reserva?',
          'Como a falta de planejamento afeta a sua rotina escolar?',
          'O que podemos fazer para ser mais prudentes em nossas atividades semanais?'
        ],
        challenge: 'Deixar sua mochila e sua roupa de amanhã preparadas hoje à noite.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Deus sábio, ensina-nos a antever as necessidades com prudência.' },
            { role: 'Filho', text: 'Me ajuda a planejar minhas tarefas e a não deixar tudo para a última hora.' },
            { role: 'Pai', text: 'Que a prudência evite correria e ansiedade em nosso lar.' },
            { role: 'Filho', text: 'Quero ser previdente nas minhas escolhas.' },
            { role: 'Juntos', text: 'Conceda-nos sabedoria para planejar nossos dias. Amém.' }
          ]
        },
        finalMessage: 'O prudente enxerga o perigo de longe e se prepara; o ingênuo segue em frente e sofre as consequências.'
      },
      {
        biblicalReference: '📖 Provérbios 22:3, Gênesis 41:25-36',
        biblicalStoryTitle: 'José armazena o trigo',
        biblicalStory: 'José interpretou o sonho do faraó avisando que haveria sete anos de fartura seguidos por sete anos de fome severa no Egito.\n\nJosé foi prudente: liderou o armazenamento de um quinto das colheitas de trigo durante os anos bons.\n\nQuando a fome severa chegou, o Egito tinha comida armazenada para alimentar seu povo e outras nações.',
        reflection: 'Ser prudente nos anos de fartura garante a nossa sustentação nas épocas de dificuldade.',
        questions: [
          'Como a prudência de José salvou vidas em toda a região?',
          'Como a moderação nos gastos ou o ato de poupar demonstram prudência?',
          'Como planejar nossos recursos?'
        ],
        challenge: 'Anotar em uma planilha ou caderno tudo o que você gastou ou economizou esta semana.',
        prayer: {
          dialogue: [
            { role: 'Pai', text: 'Senhor, dá-nos a sabedoria financeira e de recursos de José.' },
            { role: 'Filho', text: 'Me ajuda a economizar e a não gastar tudo o que ganho em bobagens.' },
            { role: 'Pai', text: 'Que a prudência na administração governe a nossa casa.' },
            { role: 'Filho', text: 'Ajuda-me a ser previdente.' },
            { role: 'Juntos', text: 'Amém.' }
          ]
        },
        finalMessage: 'A previdência é o escudo contra a escassez.'
      }
    ]
  }
};

export function getStaticDevotional(id: string): Devotional {
  const raw = RAW_DEVOTIONALS[id] || RAW_DEVOTIONALS['humildade'];
  const expandedStories = expandTo6Lessons(raw.theme, raw.stories);
  return {
    id,
    theme: raw.theme,
    stories: expandedStories
  };
}

export function generatePersonalizedDevotional(profile: KidProfile, themeId?: string): Devotional {
  const selectedTheme = themeId || 'humildade';
  const raw = RAW_DEVOTIONALS[selectedTheme] || RAW_DEVOTIONALS['humildade'];
  const expandedStories = expandTo6Lessons(raw.theme, raw.stories);
  
  const childName = profile.name || 'seu filho';
  
  // Clean, non-sappy personalization inline replacements
  const stories = expandedStories.map(story => {
    return {
      ...story,
      biblicalStory: story.biblicalStory.replace(/você/g, childName),
      reflection: story.reflection.replace('uma pessoa humilde', `${childName}, uma pessoa humilde`)
    };
  });

  return {
    id: `personalized-${selectedTheme}-${Date.now()}`,
    theme: raw.theme,
    stories
  };
}
