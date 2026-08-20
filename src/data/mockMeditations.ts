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
  objective: string;
  whyApproach: string;
  characteristics: string[];
  benefits: string[];
  stages: { stage: string; desc: string }[];
}

export interface MeditationSession {
  id: string;
  title: string;
  subtitle: string;
  category: 'thematic' | 'journey';
  phaseNumber?: number;
  themeLabel: string;
  imageUrl: string;
  methodology: string;
  durationSeconds: number;
  audioUrl: string;
  voiceGender: 'female' | 'male' | 'deep_calm';
  speakerName: string;
  ambientType: 'night_432hz' | 'ocean_432hz' | 'piano_432hz' | 'nature_432hz' | 'deep_432hz';
  ambientTitle: string;
  isPremium: boolean;
  isOpenEyesMode?: boolean;
  affirmation: string;
  reflectionPrompt: string;
  scientificMethodology: ScientificMethodology;
  steps: MeditationStep[];
}

export const GUIDED_MEDITATIONS: MeditationSession[] = [
  // ==========================================
  // MEDITAÇÕES TEMÁTICAS (7 sessões)
  // ==========================================
  {
    "id": "mindfulness_mindset_1",
    "title": "Presença, Clareza & Foco",
    "subtitle": "Respiração Quadrada 4-4-6 & Interrupção do Multitasking Mental",
    "category": "thematic",
    "themeLabel": "Presença",
    "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "methodology": "Respiração Quadrada & Atenção Focada",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Harmônicos Theta 432Hz",
    "isPremium": false,
    "affirmation": "Minha mente está serena, lúcida e focada no presente.",
    "reflectionPrompt": "Como sua mente se sente após esta pausa de clareza?",
    "scientificMethodology": {
      "title": "Presença, Clareza & Foco",
      "origin": "Protocolo de Respiração Quadrada & Controle Executivo.",
      "objective": "Interromper rapidamente o multitasking mental e restaurar a atenção focada através de respiração rítmica estruturada.",
      "whyApproach": "A respiração quadrada (4-4-6) ativa o freio vagal, desacelera o ritmo cardíaco e restaura a coerência entre córtex pré-frontal e sistema nervoso autônomo em menos de 3 minutos.",
      "characteristics": [
        "Técnica de respiração rítmica com contagem (4 tempos inspiração, 4 retenção, 6 expiração)",
        "Interrupção do fluxo de estímulos visuais ao fechar os olhos",
        "Soltura ativa de mandíbula e testa como reset muscular",
        "Observação de pensamentos como 'nuvens passageiras' sem engajamento"
      ],
      "benefits": [
        "Redução mensurável do cortisol e desativação da amígdala cerebral.",
        "Desativação da Rede em Modo Padrão (DMN), interrompendo ruminação.",
        "Restauração do controle executivo e clareza de decisão.",
        "Desaceleração cardíaca via estimulação vagal pela expiração prolongada."
      ],
      "stages": [
        { "stage": "1. Interrupção de Estímulos", "desc": "Fechar os olhos para cessar o fluxo visual e iniciar o reset atencional." },
        { "stage": "2. Respiração Quadrada 4-4-6", "desc": "Três ciclos de inspiração, retenção e expiração prolongada com contagem." },
        { "stage": "3. Soltura Muscular", "desc": "Liberação de tensão na mandíbula, testa e ombros." },
        { "stage": "4. Clareza Atencional", "desc": "Observação de pensamentos sem engajamento e retorno ao fôlego." }
      ]
    },
    "audioUrl": "/audio/meditacao_mindset.mp3",
    "durationSeconds": 210,
    "steps": [
      { "id": 1, "phase": "1. Interrupção & Postura", "focus": "breathing", "startSeconds": 0, "endSeconds": 30, "text": "Encontre uma posição ereta e confortável. Os pés bem apoiados no chão. Feche os olhos para interromper o fluxo de estímulos visuais." },
      { "id": 2, "phase": "2. Respiração Quadrada 4-4-6", "focus": "breathing", "startSeconds": 30, "endSeconds": 100, "text": "Inspire pelo nariz em quatro tempos... um... dois... três... quatro. Retenha o ar... um... dois... três... quatro. Expire devagar pela boca em seis tempos... um... dois... três... quatro... cinco... seis. Mais uma vez. Inspire... clareza e oxigênio. Retenha. E solte... qualquer pressa ou dispersão. E mais uma. Inspire. Segure. E solte devagar." },
      { "id": 3, "phase": "3. Soltura & Observação", "focus": "awareness", "startSeconds": 100, "endSeconds": 175, "text": "Solte a mandíbula. Relaxe a testa. Sinta o coração desacelerar. Se tarefas pendentes surgirem na mente... apenas observe. São nuvens passageiras. Deixe-as passar. Retorne ao fôlego. Sinta a mente limpa, presente e disponível." },
      { "id": 4, "phase": "4. Retorno com Foco", "focus": "integration", "startSeconds": 175, "endSeconds": 210, "text": "Faça mais uma respiração profunda. Movimente os dedos. E abra os olhos com foco e prontidão." }
    ]
  },
  {
    "id": "meditacao_ansiedade",
    "title": "Alívio da Ansiedade & Pânico",
    "subtitle": "Estimulação Vagal, Grounding Sensorial & Respiração Diafragmática",
    "category": "thematic",
    "themeLabel": "Ansiedade",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "methodology": "Estimulação Vagal & Ancoragem Somática",
    "voiceGender": "female",
    "speakerName": "Sofia",
    "ambientType": "ocean_432hz",
    "ambientTitle": "Ondas do Mar & Harmônicos 432Hz",
    "isPremium": false,
    "affirmation": "Eu estou seguro. Este momento de ansiedade vai passar.",
    "reflectionPrompt": "Sinta a tensão deixando seu peito. O que traz descanso à sua alma agora?",
    "scientificMethodology": {
      "title": "Alívio da Ansiedade & Pânico",
      "origin": "Teoria Polivagal & Biofeedback Respiratório.",
      "objective": "Interromper a resposta de luta-ou-fuga e restaurar a sensação de segurança através da estimulação do nervo vago e do grounding sensorial.",
      "whyApproach": "A expiração prolongada (6 tempos) ativa o sistema nervoso parassimpático via nervo vago, enquanto o toque das mãos no peito e barriga fornece ancoragem proprioceptiva que sinaliza segurança ao cérebro.",
      "characteristics": [
        "Toque bilateral auto-administrado (mão no peito + mão na barriga)",
        "Respiração com expiração prolongada para ativação vagal",
        "Grounding sensorial (percepção de peso dos pés, pernas, costas)",
        "Normalização de batimentos cardíacos via feedback respiratório"
      ],
      "benefits": [
        "Ativação do sistema nervoso parassimpático, interrompendo luta-ou-fuga.",
        "Normalização do ritmo cardíaco e alívio da sensação de aperto torácico.",
        "Restauração do fluxo sanguíneo no córtex pré-frontal para discernimento.",
        "Sensação profunda de ancoragem e segurança no momento presente."
      ],
      "stages": [
        { "stage": "1. Ancoragem com Toque", "desc": "Mão no peito e mão na barriga como contato de segurança." },
        { "stage": "2. Respiração Vagal 4-4-6", "desc": "Ciclos de inspiração, retenção e expiração prolongada." },
        { "stage": "3. Grounding Sensorial", "desc": "Percepção dos pés, pernas, costas e mãos no corpo." },
        { "stage": "4. Restauração da Calma", "desc": "Soltura muscular e normalização do ritmo interior." }
      ]
    },
    "audioUrl": "/audio/meditacao_ansiedade.mp3",
    "durationSeconds": 270,
    "steps": [
      { "id": 1, "phase": "1. Segurança & Toque", "focus": "breathing", "startSeconds": 0, "endSeconds": 35, "text": "Você está em segurança agora. Este momento de ansiedade vai passar. Feche os olhos, ou repouse o olhar em um ponto fixo. Coloque uma mão sobre o peito e a outra sobre a barriga. Sinta o apoio das suas próprias mãos." },
      { "id": 2, "phase": "2. Respiração Vagal", "focus": "breathing", "startSeconds": 35, "endSeconds": 110, "text": "Vamos respirar juntos. Inspire pelo nariz em quatro tempos... um... dois... três... quatro. Segure com calma... um... dois... três... quatro. Expire devagar pela boca em seis tempos... um... dois... três... quatro... cinco... seis. Mais uma vez. Inspire, enchendo o abdômen. Retenha com suavidade. E solte bem devagar... sentindo os ombros descerem. De novo. Inspire. Segure. Solte." },
      { "id": 3, "phase": "3. Grounding & Soltura", "focus": "awareness", "startSeconds": 110, "endSeconds": 225, "text": "Agora deixe a respiração natural retornar. Perceba os pés no chão. O peso das pernas. O apoio das costas. Sinta a pressão da mão sobre o peito. O coração batendo ali embaixo. O ritmo está diminuindo. O corpo está compreendendo que não há perigo agora. Solte a mandíbula. Relaxe os punhos. Amoleça a barriga. Tudo está bem neste instante." },
      { "id": 4, "phase": "4. Retorno Restaurado", "focus": "integration", "startSeconds": 225, "endSeconds": 270, "text": "Sinta a sua respiração ficando mais longa... mais calma... mais leve. Faça uma respiração profunda. Sinta o alívio no peito. E abra os olhos com tranquilidade." }
    ]
  },
  {
    "id": "meditacao_transito",
    "title": "Calma & Foco no Trânsito",
    "subtitle": "Atenção Periférica Segura & Soltura de Tensão no Volante",
    "category": "thematic",
    "themeLabel": "Trânsito",
    "imageUrl": "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80",
    "methodology": "Atenção Plena de Olhos Abertos & Regulação Viária",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "nature_432hz",
    "ambientTitle": "Estrada Serena & Frequência 432Hz",
    "isPremium": true,
    "isOpenEyesMode": true,
    "affirmation": "Eu dirijo com paciência, calma e presença.",
    "reflectionPrompt": "Como você pode transformar o trajeto em uma oportunidade de calma?",
    "scientificMethodology": {
      "title": "Calma & Foco no Trânsito",
      "origin": "Protocolos de Atenção Plena Situacional & Teoria Polivagal.",
      "objective": "Manter a segurança viária enquanto libera a irritabilidade, soltura a rigidez muscular e cultiva a atenção panorâmica no volante.",
      "whyApproach": "A atenção plena de olhos abertos treina a visão periférica segura e desativa a resposta de 'road rage' ao converter hipervigilância tensa em atenção panorâmica relaxada.",
      "characteristics": [
        "Modo olhos abertos com atenção total na via",
        "Soltura da pegada excessiva no volante e do trapézio",
        "Respiração consciente aproveitando paradas ou fluxo lento",
        "Desarmamento da irritabilidade via soltura de mandíbula e ombros"
      ],
      "benefits": [
        "Desativação imediata da resposta de irritabilidade ao volante.",
        "Conversão de hipervigilância tensa em atenção panorâmica segura.",
        "Soltura da musculatura cervical e da pegada excessiva no volante.",
        "Aumento da paciência e serenidade diante de imprevistos viários."
      ],
      "stages": [
        { "stage": "1. Postura & Volante", "desc": "Ajuste de posição e soltura do aperto excessivo das mãos." },
        { "stage": "2. Soltura Muscular", "desc": "Relaxamento de ombros, mandíbula e mãos sem perder o controle." },
        { "stage": "3. Respiração no Fluxo", "desc": "Aproveitamento de paradas para ciclos de respiração consciente." },
        { "stage": "4. Direção Serena", "desc": "Visão periférica aberta e condução com prudência e paciência." }
      ]
    },
    "audioUrl": "/audio/meditacao_transito.mp3",
    "durationSeconds": 240,
    "steps": [
      { "id": 1, "phase": "1. Postura & Volante", "focus": "awareness", "startSeconds": 0, "endSeconds": 40, "text": "Esta sessão é para a sua condução segura. Mantenha os olhos na via. Ajuste a postura no banco. Sinta o apoio das costas. Perceba as mãos no volante. Solte o aperto excessivo dos dedos. Segure com firmeza, mas sem rigidez." },
      { "id": 2, "phase": "2. Soltura & Respiração", "focus": "breathing", "startSeconds": 40, "endSeconds": 120, "text": "Relaxe os ombros. Deixe-os cair longe das orelhas. Destranque os dentes. Solte a mandíbula. Agora, aproveite o fluxo do trânsito ou uma parada para respirar. Inspire pelo nariz, enchendo o abdômen. E expire pela boca, soltando a pressa. Mais uma vez. Inspire calma. Expire impaciência." },
      { "id": 3, "phase": "3. Atenção Panorâmica", "focus": "awareness", "startSeconds": 120, "endSeconds": 195, "text": "O trânsito tem o ritmo dele. A sua paz depende de você. Mantenha a visão periférica, panorâmica, aberta. Perceba os veículos ao redor sem tensão. Se alguém fechar ou buzinar... note a reação no corpo. Solte. Respire. Volte ao volante com serenidade." },
      { "id": 4, "phase": "4. Direção em Paz", "focus": "integration", "startSeconds": 195, "endSeconds": 240, "text": "Conduza com prudência, paciência e presença. Siga o seu trajeto em paz." }
    ]
  },
  {
    "id": "meditacao_trabalho",
    "title": "Foco & Produtividade no Trabalho",
    "subtitle": "Reset Cognitivo, Descompressão Ocular & Clareza de Prioridade",
    "category": "thematic",
    "themeLabel": "Trabalho",
    "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    "methodology": "Controle Executivo & Atenção Focada",
    "voiceGender": "male",
    "speakerName": "Gabriel",
    "ambientType": "piano_432hz",
    "ambientTitle": "Piano Acústico & Frequência 432Hz para Foco",
    "isPremium": true,
    "affirmation": "Eu trabalho com foco, clareza e discernimento.",
    "reflectionPrompt": "Qual tarefa essencial requer sua maior atenção agora?",
    "scientificMethodology": {
      "title": "Foco & Produtividade no Trabalho",
      "origin": "Neurociência Cognitiva da Atenção Plena.",
      "objective": "Realizar um reset cognitivo rápido no ambiente profissional, aliviando a fadiga ocular e o acúmulo mental para retomar com prioridade clara e foco renovado.",
      "whyApproach": "A pausa consciente interrompe o custo de troca multitarefa (task switching cost) e restaura o córtex pré-frontal dorsolateral, enquanto a descompressão ocular alivia a fadiga de tela.",
      "characteristics": [
        "Fechamento temporário dos olhos para descanso da fadiga de tela",
        "Respiração intencional para soltar acúmulo de urgências e mensagens",
        "Soltura de tensão ocular, cervical e escapular",
        "Escolha de prioridade única para o próximo bloco de trabalho"
      ],
      "benefits": [
        "Eliminação do custo de troca multitarefa e restauração do foco sustentado.",
        "Alívio da fadiga ocular causada por exposição prolongada a telas.",
        "Redução da reatividade emocional em situações de pressão profissional.",
        "Equilíbrio entre produtividade e serenidade interior."
      ],
      "stages": [
        { "stage": "1. Pausa & Reset", "desc": "Fechamento dos olhos e desaceleração do ritmo frenético." },
        { "stage": "2. Descompressão Ocular", "desc": "Relaxamento dos olhos, testa, pescoço e ombros." },
        { "stage": "3. Clareza de Prioridade", "desc": "Identificação da tarefa essencial para o próximo bloco de tempo." },
        { "stage": "4. Retorno com Energia", "desc": "Abertura dos olhos com foco renovado e determinação." }
      ]
    },
    "audioUrl": "/audio/meditacao_trabalho.mp3",
    "durationSeconds": 240,
    "steps": [
      { "id": 1, "phase": "1. Pausa & Postura", "focus": "breathing", "startSeconds": 0, "endSeconds": 30, "text": "Faça uma pausa onde está. Sente-se com a coluna ereta. Os pés firmes no chão. As mãos sobre as pernas. Feche os olhos por alguns instantes." },
      { "id": 2, "phase": "2. Respiração & Descompressão", "focus": "breathing", "startSeconds": 30, "endSeconds": 100, "text": "Inspire profundamente pelo nariz. E ao soltar o ar... solte o acúmulo de telas, mensagens e urgências. Mais uma vez. Inspire espaço. Expire ruído mental. Relaxe os olhos por trás das pálpebras. Eles trabalham muito durante o dia. Solte a tensão da testa. Do pescoço. Dos ombros. Deixe as mãos se abrirem e descansarem." },
      { "id": 3, "phase": "3. Prioridade & Visualização", "focus": "mindset", "startSeconds": 100, "endSeconds": 200, "text": "Sinta o corpo desacelerar, mesmo que o ambiente continue agitado. Agora, pergunte-se com calma: qual é a única coisa essencial para este próximo bloco de tempo? Não tudo. Uma coisa. Visualize-se fazendo essa tarefa com clareza e concentração." },
      { "id": 4, "phase": "4. Retorno com Foco", "focus": "integration", "startSeconds": 200, "endSeconds": 240, "text": "Faça uma respiração profunda. Sinta a mente mais leve e mais nítida. Abra os olhos com energia e retome com foco." }
    ]
  },
  {
    "id": "meditacao_despertar",
    "title": "Despertar com Disposição & Gratidão",
    "subtitle": "Ativação Matinal, Respiração Energizante & Cultivo de Gratidão",
    "category": "thematic",
    "themeLabel": "Despertar",
    "imageUrl": "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80",
    "methodology": "Neuroativação Positiva & Gratidão Matinal",
    "voiceGender": "female",
    "speakerName": "Beatriz",
    "ambientType": "nature_432hz",
    "ambientTitle": "Brisa da Manhã & Ressonância 432Hz",
    "isPremium": true,
    "affirmation": "Este dia é uma oportunidade. Eu estou vivo, posso agir e posso cuidar.",
    "reflectionPrompt": "Pelo que você é grato ao abrir os olhos nesta manhã?",
    "scientificMethodology": {
      "title": "Despertar com Disposição & Gratidão",
      "origin": "Psicologia Positiva & Neurobiologia da Gratidão.",
      "objective": "Iniciar o dia com energia intencional, ativação postural e cultivo consciente de gratidão para elevar a disposição e blindar contra o estresse matinal.",
      "whyApproach": "A respiração energizante matinal eleva a liberação de dopamina e cortisol saudável (CAR - Cortisol Awakening Response), enquanto a gratidão ativa o circuito de recompensa mesolímbico.",
      "characteristics": [
        "Respiração vigorosa para ativação do organismo ao despertar",
        "Alongamento postural com abertura do peito e coluna",
        "Cultivo de três motivos concretos de gratidão",
        "Ativação energética para disposição ao longo do dia"
      ],
      "benefits": [
        "Liberação de dopamina e serotonina para iniciar o dia com disposição.",
        "Regulação do ciclo circadiano e aumento da energia mental.",
        "Blindagem emocional contra o estresse e pessimismo matinal.",
        "Fortalecimento do circuito de recompensa via prática de gratidão."
      ],
      "stages": [
        { "stage": "1. Despertar Postural", "desc": "Alongamento da coluna e abertura do peito." },
        { "stage": "2. Respiração Energizante", "desc": "Ciclos vigorosos de inspiração e expiração para acordar o organismo." },
        { "stage": "3. Gratidão Ativa", "desc": "Identificação de três motivos concretos de gratidão." },
        { "stage": "4. Ativação para o Dia", "desc": "Energia e disposição espalhando-se pelo corpo inteiro." }
      ]
    },
    "audioUrl": "/audio/meditacao_despertar.mp3",
    "durationSeconds": 210,
    "steps": [
      { "id": 1, "phase": "1. Despertar & Postura", "focus": "breathing", "startSeconds": 0, "endSeconds": 30, "text": "Bom dia. Antes de começar o dia, dê a si mesmo este momento. Sente-se. Alongue suavemente a coluna. Abra o peito e os ombros." },
      { "id": 2, "phase": "2. Respiração Energizante", "focus": "breathing", "startSeconds": 30, "endSeconds": 85, "text": "Inspire pelo nariz com entusiasmo, enchendo os pulmões de ar. E expire soltando qualquer resquício de sono. Mais uma vez. Inspire disposição e energia. Expire cansaço e peso. E mais uma. Inspire. Sinta o corpo acordar. Expire. Solte tudo o que é de ontem." },
      { "id": 3, "phase": "3. Gratidão & Presença", "focus": "mindset", "startSeconds": 85, "endSeconds": 170, "text": "Sinta os pés no chão. O corpo sentado. A presença. Agora, traga à mente três motivos reais de gratidão. Pode ser algo simples. Alguém que você ama. Algo que tem. Algo que pode fazer. Sinta o calor da gratidão no peito. Este dia é uma oportunidade. Você está vivo. Você pode agir. Você pode cuidar." },
      { "id": 4, "phase": "4. Energia para o Dia", "focus": "integration", "startSeconds": 170, "endSeconds": 210, "text": "Sinta a energia se espalhando pelo corpo inteiro. Faça uma respiração profunda. Sorria suavemente. E abra os olhos, pronto para o dia." }
    ]
  },
  {
    "id": "meditacao_sono",
    "title": "Sono Profundo & Repouso Noturno",
    "subtitle": "Descarga Gravitacional & Escaneamento Progressivo para Sono",
    "category": "thematic",
    "themeLabel": "Dormir",
    "imageUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    "methodology": "Relaxamento Progressivo & Indução de Sono",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "night_432hz",
    "ambientTitle": "Chuva Serena & Frequência 432Hz Noturna",
    "isPremium": true,
    "affirmation": "O dia terminou. Não há mais nada que precise ser feito agora.",
    "reflectionPrompt": "O que você pode soltar antes de dormir esta noite?",
    "scientificMethodology": {
      "title": "Sono Profundo & Repouso Noturno",
      "origin": "Protocolos de Higiene do Sono & Relaxamento Progressivo.",
      "objective": "Conduzir o organismo a uma desativação somática completa para reduzir a latência do sono e promover o sono de ondas lentas restaurador.",
      "whyApproach": "O escaneamento descendente (cabeça → pés) com foco em peso e calor ativa a resposta de relaxamento muscular progressivo, reduzindo o tônus simpático e facilitando a transição para frequências cerebrais Theta e Delta.",
      "characteristics": [
        "Posição deitada com corpo estendido e braços ao lado do tronco",
        "Entrega cognitiva das pendências e preocupações do dia",
        "Escaneamento descendente com foco em peso, calor e soltura",
        "Proporção alta de silêncio (~70% do tempo total)"
      ],
      "benefits": [
        "Redução da latência do sono (tempo para adormecer).",
        "Relaxamento muscular global prevenindo microdespertares noturnos.",
        "Transição acelerada para ondas cerebrais Theta e Delta.",
        "Consolidação da memória e restauração celular durante o repouso."
      ],
      "stages": [
        { "stage": "1. Entrega do Dia", "desc": "Reconhecimento de que o dia terminou e soltura de pendências." },
        { "stage": "2. Escaneamento Descendente", "desc": "Relaxamento progressivo da cabeça, rosto, ombros e braços." },
        { "stage": "3. Pesagem do Corpo", "desc": "Sensação de peso e afundamento no colchão, tronco e pernas." },
        { "stage": "4. Mergulho no Sono", "desc": "Respiração cada vez mais sutil conduzindo ao adormecer." }
      ]
    },
    "audioUrl": "/audio/meditacao_sono.mp3",
    "durationSeconds": 450,
    "steps": [
      { "id": 1, "phase": "1. Entrega do Dia", "focus": "breathing", "startSeconds": 0, "endSeconds": 60, "text": "Deite-se confortavelmente. Feche os olhos. O dia terminou. Não há mais nada que precise ser feito agora. Respire fundo pelo nariz... e solte o ar devagar pela boca. A cada expiração, sinta o corpo afundar um pouco mais na cama. Entregue as pendências do dia. Solte as preocupações. Elas estarão lá amanhã se precisarem de você." },
      { "id": 2, "phase": "2. Cabeça, Rosto & Ombros", "focus": "awareness", "startSeconds": 60, "endSeconds": 165, "text": "Relaxe a testa. As pálpebras pesadas. Solte os dentes. A mandíbula se abre levemente. O pescoço e a garganta relaxam. Os ombros afundam no colchão. Não há nada para carregar. Os braços pesados e quentes ao lado do corpo. As mãos se abrem e descansam." },
      { "id": 3, "phase": "3. Tronco, Pernas & Pés", "focus": "awareness", "startSeconds": 165, "endSeconds": 340, "text": "O peito respirando devagar... em ondas suaves. O abdômen macio, sem esforço. As pernas, pesadas e soltas, afundam na cama. Os pés quentes e descansados. O corpo inteiro repousa. Confiante. Seguro. Acolhido." },
      { "id": 4, "phase": "4. Sono Restaurador", "focus": "integration", "startSeconds": 340, "endSeconds": 450, "text": "A respiração se faz sozinha... mais lenta... mais suave. Mergulhe no sono. Durma em paz." }
    ]
  },
  {
    "id": "meditacao_com_deus",
    "title": "Meditação com Deus: Salmos & Presença Divina",
    "subtitle": "Contemplação Devocional com Salmo 23, Salmo 46 & Provérbios 3:5-6",
    "category": "thematic",
    "themeLabel": "Com Deus",
    "imageUrl": "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80",
    "methodology": "Oração Contemplativa & Meditação Bíblica",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "piano_432hz",
    "ambientTitle": "Piano Devocional & Frequência 432Hz",
    "isPremium": false,
    "affirmation": "Eu não estou sozinho. O Senhor é a minha paz e o meu refúgio.",
    "reflectionPrompt": "Como a presença de Deus traz descanso à sua alma neste momento?",
    "scientificMethodology": {
      "title": "Meditação com Deus: Salmos & Presença Divina",
      "origin": "Tradição Contemplativa Cristã & Lectio Divina.",
      "objective": "Cultivar uma conexão espiritual profunda com Deus através da meditação em Salmos e Provérbios, promovendo entrega, paz interior e confiança na soberania divina.",
      "whyApproach": "A meditação contemplativa em textos sagrados ativa o córtex pré-frontal medial (sentido de propósito) e reduz a atividade da amígdala (centro do medo), combinando os benefícios neurobiológicos da meditação com a dimensão espiritual da fé.",
      "characteristics": [
        "Contemplação do Salmo 23 (provisão e cuidado divino)",
        "Meditação no Salmo 46 (aquietar-se e confiar na soberania de Deus)",
        "Reflexão em Provérbios 3:5-6 (confiança no Senhor)",
        "Período estendido de oração silenciosa e entrega"
      ],
      "benefits": [
        "Ativação do córtex pré-frontal medial (sentido de propósito e paz).",
        "Redução da atividade da amígdala (centro do medo e ansiedade).",
        "Aumento de bem-estar subjetivo e resiliência via conexão espiritual.",
        "Sensação profunda de amparo, proteção e confiança no Criador."
      ],
      "stages": [
        { "stage": "1. Abertura & Entrega", "desc": "Respiração de entrega e disposição do coração para a presença de Deus." },
        { "stage": "2. Salmo 23 & Salmo 46", "desc": "Contemplação das promessas de provisão, descanso e refúgio." },
        { "stage": "3. Provérbios 3:5-6", "desc": "Reflexão sobre confiança e entrega do entendimento ao Senhor." },
        { "stage": "4. Oração Silenciosa", "desc": "Período estendido de silêncio contemplativo e paz divina." }
      ]
    },
    "audioUrl": "/audio/meditacao_com_deus.mp3",
    "durationSeconds": 420,
    "steps": [
      { "id": 1, "phase": "1. Abertura & Entrega", "focus": "breathing", "startSeconds": 0, "endSeconds": 55, "text": "Bem-vindo a este momento de comunhão e descanso na presença de Deus. Encontre uma posição confortável, com o coração aberto. Feche os olhos em reverência e paz. Faça uma respiração profunda. Ao soltar o ar, entregue toda sobrecarga, toda ansiedade e todo temor nas mãos do Criador." },
      { "id": 2, "phase": "2. Salmo 23 & Salmo 46", "focus": "mindset", "startSeconds": 55, "endSeconds": 215, "text": "Medite na promessa do Salmo 23: O Senhor é o meu pastor. Nada me faltará. Ele me faz repousar em pastos verdejantes. Leva-me para junto das águas de descanso. Sinta essas águas tranquilas lavando a sua alma. Toda pressa... todo medo... toda preocupação com o amanhã. Deus cuida de você. Ouça a voz de Deus no Salmo 46: Aquietai-vos... e sabei que Eu sou Deus. Aquietar-se é a decisão de soltar o controle e confiar na soberania do Pai. Deus é o nosso refúgio e fortaleza. Socorro bem presente nas tribulações." },
      { "id": 3, "phase": "3. Provérbios & Confiança", "focus": "mindset", "startSeconds": 215, "endSeconds": 310, "text": "Como nos ensina Provérbios: Confia no Senhor de todo o teu coração... e não te estribes no teu próprio entendimento. Em oração silenciosa, deixe a paz de Deus guardar a sua mente e o seu espírito." },
      { "id": 4, "phase": "4. Paz & Retorno", "focus": "integration", "startSeconds": 310, "endSeconds": 420, "text": "Eu não estou sozinho. O Senhor é a minha paz e o meu refúgio. Faça uma respiração profunda. Ancore essa fé no coração. E abra os olhos em graça e paz." }
    ]
  },

  // ==========================================
  // TRILHA DE EVOLUÇÃO (8 Níveis Progressivos)
  // ==========================================
  {
    "id": "jornada_fase_1_ancoragem_sonora",
    "title": "Fase 1: Ancoragem Sonora & Presença",
    "subtitle": "Escuta Receptiva & Desengate do Piloto Automático",
    "category": "journey",
    "phaseNumber": 1,
    "themeLabel": "Fase 1 • Básico",
    "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "methodology": "Ancoragem Sensorial & Atenção Plena",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Ondas Alpha 432Hz & Sons Presentes",
    "isPremium": false,
    "affirmation": "Eu me ancoro no presente através da escuta.",
    "reflectionPrompt": "Quais sons ao seu redor você percebeu pela primeira vez hoje?",
    "scientificMethodology": {
      "title": "Ancoragem Sonora & Presença",
      "origin": "Protocolo Clínico de Atenção Plena & Escuta Não-Reativa.",
      "objective": "Treinar a escuta receptiva — receber sons sem rotular, julgar ou reagir — como porta de entrada para a presença plena.",
      "whyApproach": "A escuta não-reativa (effortless listening) ativa o córtex auditivo primário enquanto inibe a Rede de Modo Padrão (DMN), interrompendo a ruminação mental. É a técnica mais acessível para quem nunca meditou.",
      "characteristics": [
        "Foco na paisagem sonora externa sem rotulação conceitual",
        "Percepção de sons próximos, distantes e do silêncio entre eles",
        "Zero esforço ativo — os sons vêm até o praticante",
        "Retorno gentil à escuta quando a mente divagar"
      ],
      "benefits": [
        "Desativação imediata do piloto automático e da ruminação mental.",
        "Modulação da atenção exógena e redução de cortisol.",
        "Aumento de ondas alfa no córtex auditivo.",
        "Preparação do sistema nervoso para práticas mais profundas."
      ],
      "stages": [
        { "stage": "1. Acomodação & Contato", "desc": "Percepção do peso e contato do corpo com a superfície." },
        { "stage": "2. Escuta Próxima", "desc": "Atenção nos sons mais próximos: respiração, sons sutis da sala." },
        { "stage": "3. Escuta Distante", "desc": "Expansão da percepção para sons distantes e o silêncio de fundo." },
        { "stage": "4. Retorno ao Corpo", "desc": "Reconexão com o corpo inteiro e respiração profunda." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_1.mp3",
    "durationSeconds": 200,
    "steps": [
      { "id": 1, "phase": "1. Acomodação & Contato", "focus": "breathing", "startSeconds": 0, "endSeconds": 30, "text": "Acomode-se onde você está. Pode fechar os olhos... ou repousar o olhar para baixo. Sinta o contato do seu corpo com a superfície que o apoia. O peso dos pés no chão... as mãos sobre as pernas. Faça uma respiração longa e solta." },
      { "id": 2, "phase": "2. Escuta Próxima", "focus": "awareness", "startSeconds": 30, "endSeconds": 75, "text": "E agora, leve toda a sua atenção para o campo dos sons. Você não precisa ir até os sons. Deixe que eles venham até você. Perceba os sons mais próximos... os sons desta sala. O som da sua própria respiração. Algum som sutil que talvez você não tivesse notado antes." },
      { "id": 3, "phase": "3. Escuta Distante & Silêncio", "focus": "awareness", "startSeconds": 75, "endSeconds": 160, "text": "Agora, expanda a escuta para os sons mais distantes. Sons que vêm de longe... sem se importar com o que são. Note o volume... a textura... a duração de cada som. E perceba o que existe entre um som e outro. O silêncio de fundo. Sons que surgem do silêncio... duram um instante... e voltam ao silêncio. Se a mente tentar criar histórias, apenas volte a escutar. Descanse nessa escuta aberta por mais alguns instantes." },
      { "id": 4, "phase": "4. Retorno", "focus": "integration", "startSeconds": 160, "endSeconds": 200, "text": "Traga a atenção de volta para o corpo inteiro. Faça uma respiração profunda. E quando estiver pronto... abra suavemente os olhos." }
    ]
  },
  {
    "id": "jornada_fase_2_escaneamento_corporal",
    "title": "Fase 2: Escaneamento Corporal Profundo",
    "subtitle": "Propriocepção Detalhada & Liberação de Microtensões",
    "category": "journey",
    "phaseNumber": 2,
    "themeLabel": "Fase 2 • Básico",
    "imageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80",
    "methodology": "Escaneamento Corporal (Body Scan MBSR)",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "nature_432hz",
    "ambientTitle": "Brisa Serena & Ressonância 432Hz",
    "isPremium": true,
    "affirmation": "Eu percebo o meu corpo por dentro e libero o que não preciso mais carregar.",
    "reflectionPrompt": "Qual região do seu corpo relaxou mais visivelmente nesta sessão?",
    "scientificMethodology": {
      "title": "Escaneamento Corporal Profundo",
      "origin": "Protocolo MBSR (Body Scan) de Jon Kabat-Zinn.",
      "objective": "Desenvolver a propriocepção — a capacidade de perceber o corpo por dentro — de forma detalhada e não-reativa, liberando microtensões musculares involuntárias.",
      "whyApproach": "O Body Scan estimula a ínsula anterior (mapeamento interoceptivo), reduzindo a somatização do estresse. Ao 'notar sem consertar', o praticante desfaz padrões de tensão crônica sem esforço.",
      "characteristics": [
        "Varredura sequencial dos pés à cabeça (ou cabeça aos pés)",
        "Micro-observações somáticas de peso, pressão, calor e vibração",
        "Convite a 'soltar' sem forçar o relaxamento",
        "Frase curta por região corporal, seguida de pausa exploratória"
      ],
      "benefits": [
        "Ativação da ínsula anterior para mapeamento interoceptivo.",
        "Diminuição do tônus simpático e liberação de tensão muscular crônica.",
        "Redução de cefaleia tensional e bruxismo diurno.",
        "Fortalecimento da conexão cérebro-corpo (consciência somática)."
      ],
      "stages": [
        { "stage": "1. Pés & Pernas", "desc": "Percepção de peso, pressão, vibração e calor nos pés e pernas." },
        { "stage": "2. Abdômen & Mãos", "desc": "Amolecimento do abdômen e soltura das mãos e dedos." },
        { "stage": "3. Ombros, Pescoço & Rosto", "desc": "Liberação de ombros, mandíbula, testa e músculos faciais." },
        { "stage": "4. Corpo Inteiro", "desc": "Consciência global do corpo integrado em presença." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_2.mp3",
    "durationSeconds": 240,
    "steps": [
      { "id": 1, "phase": "1. Chegando ao Corpo", "focus": "breathing", "startSeconds": 0, "endSeconds": 40, "text": "Traga a sua atenção para dentro do corpo. Feche os olhos, se for confortável. Perceba o corpo sentado... onde quer que você esteja. Sinta o peso do corpo sobre o assento... sobre o chão. Faça algumas respirações profundas. E a cada inspiração... sinta o ar entrando e despertando o corpo. A cada expiração... relaxe um pouco mais profundamente." },
      { "id": 2, "phase": "2. Pés, Pernas & Abdômen", "focus": "awareness", "startSeconds": 40, "endSeconds": 110, "text": "Leve a atenção para os pés no chão. Sinta a sola dos pés em contato com o solo. O peso... a pressão... a vibração... o calor. Suba a atenção para as pernas apoiadas na cadeira. Pressão... pulsação... peso... leveza. Sinta as costas encostadas no assento. Traga a atenção para a área do abdômen. Se a barriga estiver tensa ou contraída... deixe amolecer. Respire." },
      { "id": 3, "phase": "3. Mãos, Ombros & Rosto", "focus": "awareness", "startSeconds": 110, "endSeconds": 195, "text": "Perceba as suas mãos. As mãos estão tensas ou apertadas? Veja se pode permitir que elas se soltem. Sinta os braços. Perceba qualquer sensação nos braços. Deixe os ombros se soltarem. Perceba o pescoço e a garganta. Deixe-os macios... relaxados. Solte a mandíbula. Deixe o rosto e os músculos faciais se suavizarem." },
      { "id": 4, "phase": "4. Corpo Inteiro", "focus": "integration", "startSeconds": 195, "endSeconds": 240, "text": "Agora, perceba o corpo inteiro, presente, aqui. Faça mais uma respiração. Esteja consciente do corpo inteiro... da melhor forma que puder. Respire. E quando estiver pronto... abra os olhos." }
    ]
  },
  {
    "id": "jornada_fase_3_respiracao_consciente",
    "title": "Fase 3: Respiração Consciente & Foco Atencional",
    "subtitle": "Atenção Sustentada na Âncora Respiratória & Retorno Gentil",
    "category": "journey",
    "phaseNumber": 3,
    "themeLabel": "Fase 3 • Básico",
    "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "methodology": "Atenção Focada na Respiração (Focused Attention)",
    "voiceGender": "female",
    "speakerName": "Sofia",
    "ambientType": "ocean_432hz",
    "ambientTitle": "Ondas do Mar & Harmônicos 432Hz",
    "isPremium": true,
    "affirmation": "Cada retorno ao fôlego fortalece o meu foco e a minha paz interior.",
    "reflectionPrompt": "Onde no corpo você sentiu a respiração com mais nitidez?",
    "scientificMethodology": {
      "title": "Respiração Consciente & Foco Atencional",
      "origin": "Protocolo de Atenção Focada (Focused Attention Meditation).",
      "objective": "Estabilizar a atenção sustentada numa âncora respiratória primária e treinar o retorno gentil após cada distração — cada 'retorno' é uma repetição neural.",
      "whyApproach": "Acompanhar o ciclo contínuo do fôlego fortalece o córtex pré-frontal dorsolateral e melhora o controle executivo. A rotulação suave ('pensando') reduz a reatividade e treina a metacognição.",
      "characteristics": [
        "Identificação do ponto de maior nitidez respiratória (narinas, peito ou abdômen)",
        "Acompanhamento do ciclo completo: início, meio e fim da inspiração e expiração",
        "Rotulação suave (noting): 'pensando...' quando a mente divagar",
        "Período estendido de silêncio (~90s) para prática autônoma"
      ],
      "benefits": [
        "Fortalecimento do circuito pré-frontal/cingulado anterior.",
        "Melhora na regulação da atenção e controle executivo.",
        "Aumento da coerência EEG alfa-theta.",
        "Queda progressiva de pensamentos intrusivos com prática regular."
      ],
      "stages": [
        { "stage": "1. Postura & Acomodação", "desc": "Coluna ereta, corpo acomodado e olhos fechados." },
        { "stage": "2. Ponto de Nitidez", "desc": "Escolha da âncora respiratória: narinas, peito ou abdômen." },
        { "stage": "3. Acompanhamento do Ciclo", "desc": "Observação de cada inspiração e expiração completas." },
        { "stage": "4. Silêncio & Prática", "desc": "Período estendido de prática silenciosa autônoma." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_3.mp3",
    "durationSeconds": 330,
    "steps": [
      { "id": 1, "phase": "1. Postura & Acomodação", "focus": "breathing", "startSeconds": 0, "endSeconds": 35, "text": "Adote uma postura confortável, com a coluna naturalmente ereta. Feche suavemente os olhos. Permita que o corpo se acomode por completo." },
      { "id": 2, "phase": "2. Ponto de Nitidez", "focus": "breathing", "startSeconds": 35, "endSeconds": 120, "text": "Traga a atenção para a respiração natural. Não mude nada no ritmo do fôlego. Apenas observe o ar entrando... e o ar saindo. Onde a respiração é mais nítida para você agora? Pode ser o ar fresco entrando pelas narinas. Pode ser a expansão suave do peito. Ou o abdômen subindo na inspiração... e descendo na expiração. Escolha esse ponto de maior nitidez. Faça dele a sua âncora." },
      { "id": 3, "phase": "3. Ciclo & Retorno Gentil", "focus": "awareness", "startSeconds": 120, "endSeconds": 230, "text": "Acompanhe o ciclo completo de uma inspiração. O início... o meio... o final da inspiração. E o início da expiração... o meio... e o final da expiração. Apenas isso. O ar que entra. O ar que sai. Se a mente se distrair com um pensamento ou uma tarefa... isso é completamente normal. Apenas note com gentileza... pensando. E traga a atenção de volta ao fôlego. Cada retorno ao fôlego é uma repetição que fortalece o foco. Não é um erro se distrair. O momento de notar é o momento da prática." },
      { "id": 4, "phase": "4. Silêncio & Retorno", "focus": "integration", "startSeconds": 230, "endSeconds": 330, "text": "Vamos ficar em silêncio agora, acompanhando a respiração. Sentindo o corpo respirar. Faça uma respiração mais profunda. Sinta o corpo inteiro presente. E quando estiver pronto... abra suavemente os olhos." }
    ]
  },
  {
    "id": "jornada_fase_4_emocoes_dificeis",
    "title": "Fase 4: Acolhimento de Emoções Difíceis",
    "subtitle": "Técnica RAIN: Reconhecer, Acolher, Investigar & Nutrir",
    "category": "journey",
    "phaseNumber": 4,
    "themeLabel": "Fase 4 • Intermediário",
    "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "methodology": "Técnica RAIN & Regulação Emocional",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Harmonia Profunda 432Hz",
    "isPremium": true,
    "affirmation": "As emoções são temporárias. Eu sou o espaço onde elas passam.",
    "reflectionPrompt": "Qual sentimento desafiador você conseguiu acolher com compaixão?",
    "scientificMethodology": {
      "title": "Acolhimento de Emoções Difíceis (Técnica RAIN)",
      "origin": "Técnica RAIN de Tara Brach & Neurociência Afetiva.",
      "objective": "Desenvolver resiliência emocional — aprender a estar com o desconforto sem reagir, fugir ou suprimir — usando a técnica RAIN e o porto seguro somático.",
      "whyApproach": "A técnica RAIN (Reconhecer, Acolher, Investigar, Nutrir) associada à rotulação afetiva (affect labeling) reduz o disparo da amígdala cerebral em até 50%. O 'porto seguro' somático (pés no chão, mão no peito) impede que o praticante se desregule.",
      "characteristics": [
        "Estabelecimento de 'porto seguro' somático antes de abordar o desconforto",
        "R: Reconhecer e nomear silenciosamente a emoção presente",
        "A: Acolher — permitir que a sensação exista sem julgamento",
        "I: Investigar — localizar onde no corpo a emoção se manifesta",
        "N: Nutrir — oferecer compaixão ao lugar vulnerável"
      ],
      "benefits": [
        "Inibição top-down da amígdala via córtex pré-frontal ventrolateral.",
        "Aumento da janela de tolerância emocional (distress tolerance).",
        "Regulação do eixo HPA (redução de cortisol sob estresse).",
        "Desenvolvimento de flexibilidade psicológica e resiliência."
      ],
      "stages": [
        { "stage": "1. Porto Seguro", "desc": "Pés firmes no chão, mão no peito — lugar de estabilidade." },
        { "stage": "2. Reconhecer & Acolher", "desc": "Nomear a emoção e permitir que ela exista sem julgamento." },
        { "stage": "3. Investigar no Corpo", "desc": "Localizar onde no corpo a emoção se manifesta fisicamente." },
        { "stage": "4. Nutrir & Soltar", "desc": "Oferecer compaixão e respirar ao redor da área tensa." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_4.mp3",
    "durationSeconds": 390,
    "steps": [
      { "id": 1, "phase": "1. Porto Seguro", "focus": "breathing", "startSeconds": 0, "endSeconds": 65, "text": "Acomode-se de forma gentil e acolhedora. Se desejar, coloque uma das mãos sobre o peito. Feche os olhos. Faça duas respirações longas e soltas, soltando o ar com alívio. Primeiro, vamos encontrar o seu porto seguro no corpo. Sinta os pés firmes no chão. Sinta o calor da mão no peito. Esse contato é o seu lugar de estabilidade. Sempre pode voltar a ele." },
      { "id": 2, "phase": "2. Reconhecer & Acolher", "focus": "awareness", "startSeconds": 65, "endSeconds": 170, "text": "Agora, traga à mente alguma situação recente que tenha gerado tensão, preocupação ou aperto. Não precisa ser algo enorme. Algo moderado. Reconheça: o que está sentindo agora? Pode nomear silenciosamente... ansiedade... frustração... medo... tristeza. Não tente resolver. Apenas reconheça o que está aí. Agora, acolha. Permita que a sensação exista sem julgamento. Diga interiormente: sim, isso está aqui agora." },
      { "id": 3, "phase": "3. Investigar & Nutrir", "focus": "awareness", "startSeconds": 170, "endSeconds": 320, "text": "Investigue com cuidado: onde no corpo essa emoção se manifesta? É um aperto no peito? Uma pressão na garganta? Um peso no estômago? Um nó nos ombros? Respire suavemente ao redor dessa área. Não precisa resolver. Não precisa entender. Apenas dê espaço. Se ficar intenso demais, volte ao porto seguro. Os pés no chão. A mão no peito. A respiração. E quando se sentir estável, olhe novamente para a sensação com gentileza. As emoções são temporárias. Elas chegam... atingem um pico... e naturalmente se desfazem. Agora, nutra esse lugar vulnerável com compaixão. Imagine que está cuidando de si mesmo como cuidaria de alguém que ama." },
      { "id": 4, "phase": "4. Soltura & Retorno", "focus": "integration", "startSeconds": 320, "endSeconds": 390, "text": "Respire profundamente. Solte o que puder ser solto. Sinta a firmeza dos pés no chão. E quando estiver pronto... abra os olhos com serenidade." }
    ]
  },
  {
    "id": "jornada_fase_5_bondade_amorosa",
    "title": "Fase 5: Bondade Amorosa (Metta)",
    "subtitle": "Cultivo de Compaixão Progressiva: Si Mesmo → Próximos → Todos",
    "category": "journey",
    "phaseNumber": 5,
    "themeLabel": "Fase 5 • Intermediário",
    "imageUrl": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
    "methodology": "Meditação Metta (Loving-Kindness)",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "piano_432hz",
    "ambientTitle": "Piano Devocional & Frequência 432Hz",
    "isPremium": true,
    "affirmation": "Meu coração transborda perdão, generosidade e paz.",
    "reflectionPrompt": "Para quem você direcionou votos sinceros de paz e bem?",
    "scientificMethodology": {
      "title": "Bondade Amorosa (Metta)",
      "origin": "Tradição Metta Bhavana & Neurobiologia do Afeto Positivo.",
      "objective": "Cultivar afeto positivo genuíno — por si mesmo, por pessoas próximas, por pessoas neutras e por todos — através de votos silenciosos de bem-estar.",
      "whyApproach": "A prática de Metta eleva a produção de ocitocina, melhora a variabilidade da frequência cardíaca (HRV) e reduz a hostilidade crônica. É a prática com maior evidência para redução de autocrítica patológica.",
      "characteristics": [
        "Atenção direcionada à região do coração no centro do peito",
        "Progressão clássica: ser querido → si mesmo → neutros → difíceis → todos",
        "Votos silenciosos estruturados (segurança, paz, saúde, alegria)",
        "Aceitação sem forçar — se houver resistência, apenas notar"
      ],
      "benefits": [
        "Ativação da ínsula e estriado ventral (circuito de recompensa afetiva).",
        "Aumento significativo de HRV e tônus vagal.",
        "Redução de inflamação sistêmica e hostilidade crônica.",
        "Dissolução de ressentimentos e fortalecimento de empatia."
      ],
      "stages": [
        { "stage": "1. Coração & Calor", "desc": "Atenção na região cardíaca e sensação de cuidado." },
        { "stage": "2. Ser Querido", "desc": "Votos de segurança, paz, saúde e alegria para alguém amado." },
        { "stage": "3. Si Mesmo", "desc": "Direcionamento dos mesmos votos para si mesmo com compaixão." },
        { "stage": "4. Expansão Universal", "desc": "Inclusão de familiares, neutros, difíceis e todos os seres." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_5.mp3",
    "durationSeconds": 450,
    "steps": [
      { "id": 1, "phase": "1. Coração & Calor", "focus": "awareness", "startSeconds": 0, "endSeconds": 60, "text": "Acomode-se com o peito aberto e as mãos relaxadas. Feche os olhos com tranquilidade. Faça duas ou três respirações longas, soltando qualquer pressa. Leve a atenção para a região do coração, no centro do peito. Sinta o calor nessa área. A respiração sutil. Permita que uma sensação de cuidado surja ali." },
      { "id": 2, "phase": "2. Ser Querido", "focus": "mindset", "startSeconds": 60, "endSeconds": 175, "text": "Traga à mente a imagem de alguém por quem você sinta um carinho espontâneo. Pode ser uma pessoa, um animal, alguém que naturalmente faz você sorrir. Veja o rosto dessa presença querida. E envie silenciosamente os seguintes votos de coração: Que você esteja seguro e protegido. Que você tenha paz no coração. Que você tenha saúde e bem-estar. Que você viva com alegria. Sinta o calor que nasce de desejar o bem a quem você ama." },
      { "id": 3, "phase": "3. Si Mesmo & Expansão", "focus": "mindset", "startSeconds": 175, "endSeconds": 370, "text": "Agora, com cuidado, traga esse mesmo carinho para dentro de você mesmo. Que eu esteja seguro e guardado. Que eu tenha paz e saúde. Que eu me acolha com paciência e compaixão. Se houver resistência, apenas note. Não force. Agora, expanda esse círculo de afeto. Inclua familiares... amigos... colegas. E se sentir disponível... inclua pessoas com quem você teve dificuldades. Sem forçar. Apenas permitindo, se for possível agora. Que todos possamos viver com dignidade, compreensão e paz." },
      { "id": 4, "phase": "4. Integração & Retorno", "focus": "integration", "startSeconds": 370, "endSeconds": 450, "text": "Sinta esse calor generoso no corpo inteiro. Faça uma respiração profunda. Permita um sorriso suave. E abra os olhos, levando essa bondade para o seu dia." }
    ]
  },
  {
    "id": "jornada_fase_6_consciencia_aberta",
    "title": "Fase 6: Consciência Aberta Multissensorial",
    "subtitle": "Open Monitoring: Respiração, Sons & Corpo em Atenção Panorâmica",
    "category": "journey",
    "phaseNumber": 6,
    "themeLabel": "Fase 6 • Avançado",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "methodology": "Consciência Aberta (Open Monitoring)",
    "voiceGender": "male",
    "speakerName": "Gabriel",
    "ambientType": "nature_432hz",
    "ambientTitle": "Floresta Serena & Frequência 432Hz",
    "isPremium": true,
    "affirmation": "Eu sou o espaço onde tudo acontece. Respiração, sons e corpo em harmonia.",
    "reflectionPrompt": "Como foi a transição fluida entre respiração, sons e sensações corporais?",
    "scientificMethodology": {
      "title": "Consciência Aberta Multissensorial (Open Monitoring)",
      "origin": "Protocolo de Monitoramento Aberto (Choiceless Awareness).",
      "objective": "Integrar respiração, audição e sensações corporais em um campo panorâmico de atenção, sem foco preferencial — culminando na consciência sem escolha.",
      "whyApproach": "A atenção aberta (choiceless awareness) treina a rede atencional dorsal e a rede de saliência simultaneamente, criando uma metaconsciência que observa sem se identificar com nenhum estímulo.",
      "characteristics": [
        "Progressão em 3 fases: respiração → sons → corpo",
        "Integração simultânea das 3 âncoras em consciência panorâmica",
        "Soltura de todas as âncoras para 'consciência sem escolha'",
        "Período estendido de silêncio contemplativo (~80s)"
      ],
      "benefits": [
        "Co-ativação de redes atencionais múltiplas simultaneamente.",
        "Sincronização gama frontal (marcador de integração neural).",
        "Silenciamento da autocrítica via desfusão cognitiva.",
        "Aumento da densidade de substância cinzenta no hipocampo."
      ],
      "stages": [
        { "stage": "1. Fase Respiração", "desc": "Ancoragem no ritmo natural do fôlego." },
        { "stage": "2. Fase Sons", "desc": "Expansão para o campo sonoro mantendo o fôlego presente." },
        { "stage": "3. Fase Corpo", "desc": "Inclusão das sensações corporais em atenção panorâmica." },
        { "stage": "4. Consciência Sem Escolha", "desc": "Soltura de todas as âncoras — ser a testemunha silenciosa." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_6.mp3",
    "durationSeconds": 510,
    "steps": [
      { "id": 1, "phase": "1. Fase Respiração", "focus": "breathing", "startSeconds": 0, "endSeconds": 75, "text": "Assuma uma postura estável, digna e confortável. Feche os olhos. Faça três respirações longas e intencionais. Fase um: a respiração. Acompanhe o ritmo natural do fôlego. O ar entrando... o ar saindo. Sem controlar. Apenas observando." },
      { "id": 2, "phase": "2. Fase Sons & Corpo", "focus": "awareness", "startSeconds": 75, "endSeconds": 215, "text": "Fase dois: os sons. Mantendo o fôlego presente... expanda a atenção para o campo sonoro. Sons próximos... sons distantes... o silêncio de fundo. Respiração e sons coexistindo na sua percepção. Fase três: o corpo. Agora inclua as sensações do corpo inteiro. O peso... a postura... a temperatura da pele... pulsações sutis. Três âncoras simultâneas: fôlego... sons... corpo. Tudo acontecendo ao mesmo tempo na sua consciência aberta." },
      { "id": 3, "phase": "3. Consciência Sem Escolha", "focus": "awareness", "startSeconds": 215, "endSeconds": 455, "text": "Agora, solte todas as âncoras. Não há mais nada específico para focar. Seja apenas a testemunha silenciosa do que surge e passa. Pensamentos vêm e vão como nuvens. Sons surgem e desaparecem. Sensações mudam continuamente. Você é o espaço onde tudo isso acontece. Descanse nesse espaço aberto." },
      { "id": 4, "phase": "4. Retorno", "focus": "integration", "startSeconds": 455, "endSeconds": 510, "text": "Faça uma respiração profunda. Sinta o corpo inteiro presente. E quando estiver pronto... abra os olhos." }
    ]
  },
  {
    "id": "jornada_fase_7_sono_restaurador",
    "title": "Fase 7: Descompressão Noturna & Sono Restaurador",
    "subtitle": "Yoga Nidra Adaptado: Descarga Gravitacional & Pesagem do Corpo",
    "category": "journey",
    "phaseNumber": 7,
    "themeLabel": "Fase 7 • Noite",
    "imageUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    "methodology": "Yoga Nidra Adaptado & Desativação Somática",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "night_432hz",
    "ambientTitle": "Chuva Suave & Harmônicos Delta 432Hz",
    "isPremium": true,
    "affirmation": "O dia terminou. Meu corpo mergulha no repouso restaurador.",
    "reflectionPrompt": "Sinta seu corpo afundando no colchão. Qual peso você soltou?",
    "scientificMethodology": {
      "title": "Descompressão Noturna & Sono Restaurador",
      "origin": "Yoga Nidra Adaptado & Relaxamento Muscular Progressivo.",
      "objective": "Conduzir o organismo a uma desativação somática completa, da cabeça aos pés, para indução fisiológica do sono restaurador de ondas lentas.",
      "whyApproach": "O relaxamento muscular progressivo (PMR) combinado com a consciência de peso (pesagem gravitacional) estimula a transição para ondas cerebrais Theta e Delta, facilitando o sono de ondas lentas (estágio N3).",
      "characteristics": [
        "Posição deitada com corpo estendido",
        "Escaneamento da cabeça aos pés com foco em peso e calor",
        "Consciência gravitacional — sentir o corpo 'afundando' no colchão",
        "Proporção muito alta de silêncio (~70% do tempo) com voz cada vez mais suave"
      ],
      "benefits": [
        "Ativação do sistema parassimpático via relaxamento progressivo.",
        "Eliminação da latência prolongada do sono (dificuldade de adormecer).",
        "Prevenção de microdespertares por relaxamento muscular global.",
        "Indução natural de melatonina e transição para ondas Delta."
      ],
      "stages": [
        { "stage": "1. Encerramento do Dia", "desc": "Reconhecimento de que o dia terminou e liberação de pendências." },
        { "stage": "2. Cabeça & Tronco Superior", "desc": "Relaxamento de couro cabeludo, testa, mandíbula, pescoço e ombros." },
        { "stage": "3. Braços, Tronco & Pernas", "desc": "Descida pelos braços, costas, abdômen, pernas e pés com pesagem." },
        { "stage": "4. Entrega ao Sono", "desc": "Corpo inteiro afundando, respiração cada vez mais sutil." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_7.mp3",
    "durationSeconds": 570,
    "steps": [
      { "id": 1, "phase": "1. Preparação & Encerramento", "focus": "breathing", "startSeconds": 0, "endSeconds": 70, "text": "Deite-se confortavelmente, com o corpo estendido e os braços ao lado do tronco. Feche os olhos. Faça uma respiração profunda pelo nariz... e solte o ar devagar pela boca. Mais uma vez. Inspire... e solte, sentindo o corpo afundar na cama. O dia de hoje terminou. Tudo o que pôde ser feito foi feito. Agora é hora de descansar." },
      { "id": 2, "phase": "2. Cabeça, Rosto & Ombros", "focus": "awareness", "startSeconds": 70, "endSeconds": 200, "text": "Traga a atenção para o topo da cabeça. Sinta o couro cabeludo relaxando. A testa se abrindo... se alisando. As pálpebras pesadas e descansadas. Solte a mandíbula. Separe levemente os dentes. A língua solta na base da boca. Sinta o pescoço relaxando... a garganta solta. Os ombros afundam no travesseiro. Não há nada para carregar agora." },
      { "id": 3, "phase": "3. Braços, Tronco, Pernas & Pés", "focus": "awareness", "startSeconds": 200, "endSeconds": 440, "text": "Desça pelos braços. Os cotovelos... os antebraços... os pulsos. As mãos e os dedos completamente soltos e pesados. Sinta as costas recebendo o suporte completo do colchão. Cada vértebra descansa sobre a superfície. O peito respirando em ondas lentas. O abdômen subindo e descendo, macio, sem esforço. Solte o quadril. As coxas afundam na cama. Os joelhos... as panturrilhas... relaxando. Os tornozelos soltos. Os pés pesados e quentes. Os dedos dos pés completamente descansados. O corpo inteiro afundando suavemente. Como se a gravidade estivesse gentilmente puxando cada célula para o repouso." },
      { "id": 4, "phase": "4. Entrega ao Sono", "focus": "integration", "startSeconds": 440, "endSeconds": 570, "text": "Não há nada para fazer. Nada para resolver. Nada para planejar. Apenas o corpo descansando... e a respiração se fazendo sozinha. Deixe-se levar pelo ritmo suave do fôlego... mergulhando no sono. Durma em paz." }
    ]
  },
  {
    "id": "jornada_fase_8_quietude_contemplativa",
    "title": "Fase 8: Quietude Contemplativa & Presença Aberta",
    "subtitle": "Prática Avançada com Períodos Estendidos de Silêncio Autônomo",
    "category": "journey",
    "phaseNumber": 8,
    "themeLabel": "Fase 8 • Mestre",
    "imageUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    "methodology": "Presença Aberta & Contemplação Autônoma",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Harmonia Cósmica 432Hz & Silêncio Sagrado",
    "isPremium": true,
    "affirmation": "Eu repouso na consciência pura. Minha serenidade é inabalável.",
    "reflectionPrompt": "Como percebe a transformação da sua mente após completar as 8 fases?",
    "scientificMethodology": {
      "title": "Quietude Contemplativa & Presença Aberta",
      "origin": "Prática Contemplativa Avançada & Neurociência da Meditação.",
      "objective": "Repousar na consciência pura — períodos longos de silêncio com mínima instrução, desenvolvendo autonomia meditativa e estabilidade emocional espontânea.",
      "whyApproach": "A prática autônoma consolida a neuroplasticidade adquirida nos 7 níveis anteriores. Longos períodos de silêncio geram ondas gama de alta frequência (marcador de insight e clareza) e espessamento cortical nas áreas de empatia e controle executivo.",
      "characteristics": [
        "Mínima instrução verbal (~20% do tempo)",
        "Períodos estendidos de silêncio (~4 minutos contínuos)",
        "Observação de pensamentos como 'eventos na mente' sem identificação",
        "Proporção fala:silêncio de 20:80 (prática contemplativa avançada)"
      ],
      "benefits": [
        "Aumento da espessura cortical no córtex pré-frontal e na ínsula.",
        "Produção sustentada de ondas gama de alta frequência.",
        "Estabilidade emocional espontânea sob qualquer contexto.",
        "Preservação de telômeros (marcador de longevidade celular)."
      ],
      "stages": [
        { "stage": "1. Postura & Entrada", "desc": "Postura meditativa e três respirações conscientes." },
        { "stage": "2. Presença Aberta", "desc": "Observação sem escolha — pensamentos como nuvens no céu." },
        { "stage": "3. Silêncio Estendido", "desc": "Período longo de quietude contemplativa autônoma (~4 min)." },
        { "stage": "4. Retorno Lúcido", "desc": "Reconexão com o corpo e abertura dos olhos com clareza." }
      ]
    },
    "audioUrl": "/audio/jornada_fase_8.mp3",
    "durationSeconds": 630,
    "steps": [
      { "id": 1, "phase": "1. Postura & Entrada", "focus": "breathing", "startSeconds": 0, "endSeconds": 70, "text": "Assuma a sua postura de prática. Coluna ereta, corpo relaxado. Feche os olhos. Faça três respirações lentas e conscientes. Sinta a clareza que se instala quando o corpo está quieto." },
      { "id": 2, "phase": "2. Presença Aberta", "focus": "awareness", "startSeconds": 70, "endSeconds": 185, "text": "Nesta prática, você não precisa fazer nada de especial. Apenas repouse na sua própria presença. Observe o que está acontecendo agora... sem escolher. O fôlego se move. Sons surgem e passam. Sensações mudam. Pensamentos aparecem como eventos na mente. Você não é os seus pensamentos. Você é o espaço amplo e calmo onde os pensamentos passam. Quando perceber que se perdeu em uma história, simplesmente note. E retorne ao silêncio." },
      { "id": 3, "phase": "3. Silêncio Contemplativo", "focus": "mindset", "startSeconds": 185, "endSeconds": 555, "text": "Vamos entrar agora em um período estendido de quietude. Sem instrução. Apenas presença. Sinta a respiração. Descanse no ser." },
      { "id": 4, "phase": "4. Retorno Lúcido", "focus": "integration", "startSeconds": 555, "endSeconds": 630, "text": "Traga a atenção de volta para o corpo sentado. Sinta os pés no chão. As mãos. A postura. Faça uma respiração profunda. E quando estiver pronto... abra os olhos com lucidez." }
    ]
  }
];
