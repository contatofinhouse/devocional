export interface BibleScene {
  sceneNumber: number;
  title: string;
  imageUrl: string;
  text: string;
}

export interface BibleContent {
  // Para Trilha Kids
  scenes?: BibleScene[];
  kidsPrayer?: string;
  moralLesson?: string;
  
  // Para Trilha Momentos & Histórias
  keyVerses?: { text: string; reference: string }[];
  acts?: { actNumber: number; title: string; text: string }[];
  reflection?: string;
  prayer?: string;
  applicationQuestion?: string;
  
  // Referência canônica comum
  biblicalReference: string;
  biblicalTextQuote?: string;
}

export interface BibleStoryItem {
  id: string;
  trailId: 'momentos' | 'historias' | 'kids';
  name: string;
  subtitle: string;
  biblicalReference: string;
  duration: string;
  imageUrl: string;
  audioUrl?: string;
  audioVoice?: string;
  isFree: boolean;
  content: BibleContent;
}

export interface BibleTrail {
  id: 'momentos' | 'historias' | 'kids';
  title: string;
  badgeName: string;
  description: string;
  color: string;
  bgColor: string;
  themes: BibleStoryItem[];
}

export const BIBLE_TRAILS: BibleTrail[] = [
  // ==========================================
  // 1. TRILHA MOMENTOS & EMOÇÕES (1ª TRILHA)
  // ==========================================
  {
    id: 'momentos',
    title: 'Momentos & Emoções',
    badgeName: 'Momentos',
    description: 'Passagens bíblicas e reflexões para acalmar o coração e renovar a fé.',
    color: '#4D96FF',
    bgColor: '#F0F5FF',
    themes: [
      {
        id: 'momento-ansiedade',
        trailId: 'momentos',
        name: 'Ansiedade & Inquietude',
        subtitle: 'A paz que excede todo o entendimento',
        biblicalReference: 'Filipenses 4:6-7',
        duration: '3 min',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_ansiedade.mp3',
        audioVoice: 'nova',
        isFree: true, // 1º ITEM DA 1ª TRILHA É 100% GRATUITO
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
        trailId: 'momentos',
        name: 'Vencendo o Medo',
        subtitle: 'O Senhor é o meu refúgio e fortaleza',
        biblicalReference: 'Salmo 23:4 & Josué 1:9',
        duration: '3 min',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_medo.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: 'Salmo 23:4',
          biblicalTextQuote: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.',
          keyVerses: [
            { text: 'Não to mandei eu? Sê forte e corajoso; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.', reference: 'Josué 1:9' },
            { text: 'No amor não há medo; ao contrário o perfeito amor expulsa o medo.', reference: '1 João 4:18' }
          ],
          reflection: 'O medo nos paralisa quando olhamos para a tempestade em vez de olhar para Quem caminha sobre as águas. A presença de Deus não anula o vale, mas garante que nunca atravessaremos a escuridão sozinhos.',
          prayer: 'Pai celestial, quando o medo bater à minha porta, lembra-me de que Tua presença caminha ao meu lado. Tu és meu escudo e meu refúgio seguro. Em Ti confio. Amém.',
          applicationQuestion: 'Em qual área da sua vida você precisa dar um passo de coragem hoje?'
        }
      },
      {
        id: 'momento-gratidao',
        trailId: 'momentos',
        name: 'Coração Grato',
        subtitle: 'Bendize, ó minha alma, ao Senhor',
        biblicalReference: 'Salmo 103:1-5',
        duration: '2 min',
        imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_gratidao.mp3',
        audioVoice: 'nova',
        isFree: false,
        content: {
          biblicalReference: 'Salmo 103:1-2',
          biblicalTextQuote: 'Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome. Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.',
          keyVerses: [
            { text: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.', reference: '1 Tessalonicenses 5:18' }
          ],
          reflection: 'A gratidão transforma o que temos em suficiente. Quando cultivamos a memória das bondades de Deus, nossos olhos aprendem a enxergar milagres nos detalhes mais simples do cotidiano.',
          prayer: 'Senhor, obrigado pelo dom da vida, pelo fôlego deste dia e pelo Teu amor incondicional. Que meus lábios transbordem louvor em qualquer estação. Amém.',
          applicationQuestion: 'Quais são 3 bênçãos pelas quais você é profundamente grato hoje?'
        }
      },
      {
        id: 'momento-paz',
        trailId: 'momentos',
        name: 'Paz & Serenidade',
        subtitle: 'Acalma o teu coração no Senhor',
        biblicalReference: 'João 14:27 & Salmo 46:10',
        duration: '3 min',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_paz.mp3',
        audioVoice: 'nova',
        isFree: false,
        content: {
          biblicalReference: 'João 14:27',
          biblicalTextQuote: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.',
          keyVerses: [
            { text: 'Aquietai-vos e sabei que eu sou Deus; serei exaltado sobre as nações; serei exaltado sobre a terra.', reference: 'Salmo 46:10' }
          ],
          reflection: 'A paz bíblica não é a ausência de problemas, mas a certeza inabalável da presença de Cristo no meio da tempestade. Deixe o ruído do mundo do lado de fora e descanse na soberania de Deus.',
          prayer: 'Jesus, Príncipe da Paz, acalma as tempestades interiores e silencia as vozes de tumulto. Que Tua presença seja meu porto seguro hoje e sempre. Amém.',
          applicationQuestion: 'O que você precisa desacelerar hoje para ouvir a voz suave de Deus?'
        }
      },
      {
        id: 'momento-forca',
        trailId: 'momentos',
        name: 'Força no Cansaço',
        subtitle: 'Renovação para quem se sente esgotado',
        biblicalReference: 'Isaías 40:29-31',
        duration: '3 min',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_forca.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: 'Isaías 40:29-31',
          biblicalTextQuote: 'Ele dá força ao cansado, e multiplica as forças ao que não tem nenhum vigor. Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.',
          keyVerses: [
            { text: 'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.', reference: 'Mateus 11:28' }
          ],
          reflection: 'Quando nossas energias humanas se esgotam, abre-se o espaço para a força divina operar. Esperar no Senhor não é passividade, é depositar nossa confiança na fonte inesgotável da graça.',
          prayer: 'Senhor, sinto o cansaço do caminho, mas sei que Tua força se aperfeiçoa na minha fraqueza. Renova minhas energias e fortalece meu coração para perseverar. Amém.',
          applicationQuestion: 'Você tem tentado caminhar com suas próprias forças ou tem descansado no Senhor?'
        }
      },
      {
        id: 'momento-sabedoria',
        trailId: 'momentos',
        name: 'Sabedoria para Decisões',
        subtitle: 'Direção clara nos caminhos da vida',
        biblicalReference: 'Tiago 1:5 & Provérbios 3:5-6',
        duration: '2 min',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_sabedoria.mp3',
        audioVoice: 'nova',
        isFree: false,
        content: {
          biblicalReference: 'Provérbios 3:5-6',
          biblicalTextQuote: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
          keyVerses: [
            { text: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e o não lança em rosto, e ser-lhe-á dada.', reference: 'Tiago 1:5' }
          ],
          reflection: 'A verdadeira sabedoria não vem do acúmulo de informações humanas, mas do temor reverente e da consulta diária ao Pai. Diante de cada encruzilhada, peça que Ele ilumine os seus passos.',
          prayer: 'Deus de sabedoria, guia meus pensamentos, palavras e escolhas. Que cada decisão minha honre o Teu nome e construa algo eterno. Amém.',
          applicationQuestion: 'Qual escolha diante de você precisa de oração antes de uma resposta?'
        }
      },
      {
        id: 'momento-perdao',
        trailId: 'momentos',
        name: 'O Poder do Perdão',
        subtitle: 'Libertação das correntes da mágoa',
        biblicalReference: 'Colossenses 3:13 & Mateus 18:21-22',
        duration: '3 min',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_perdao.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: 'Colossenses 3:13',
          biblicalTextQuote: 'Suportando-vos uns aos outros, e perdoando-vos uns aos outros, se alguém tiver queixa contra outro; assim como Cristo vos perdoou, assim fazei vós também.',
          keyVerses: [
            { text: 'Antes sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.', reference: 'Efésios 4:32' }
          ],
          reflection: 'Perdoar não é justificar o erro do outro, mas abrir a cela do ressentimento para que nosso próprio coração fique livre. Fomos perdoados de uma dívida impagável na cruz; por isso, temos a graça de perdoar.',
          prayer: 'Jesus, ajuda-me a liberar perdão àqueles que me feriram. Cura as feridas do meu coração e substitui a amargura pela Tua compaixão curadora. Amém.',
          applicationQuestion: 'Há alguém que você precisa perdoar em oração hoje para ser verdadeiramente livre?'
        }
      },
      {
        id: 'momento-esperanca',
        trailId: 'momentos',
        name: 'Esperança no Futuro',
        subtitle: 'Planos de paz e um amanhã seguro',
        biblicalReference: 'Jeremias 29:11 & Romanos 15:13',
        duration: '2 min',
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/momento_esperanca.mp3',
        audioVoice: 'nova',
        isFree: false,
        content: {
          biblicalReference: 'Jeremias 29:11',
          biblicalTextQuote: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar um fim e uma esperança.',
          keyVerses: [
            { text: 'Ora o Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo.', reference: 'Romanos 15:13' }
          ],
          reflection: 'A esperança bíblica não é um desejo incerto, mas a âncora firme da alma baseada no caráter fiel de Deus. Ele já está no seu amanhã e cuida de cada detalhe da sua história.',
          prayer: 'Senhor da Esperança, firmo meus pés nas Tuas promessas. Guarda o meu coração na certeza de que o Teu futuro para mim é repleto de graça e propósito. Amém.',
          applicationQuestion: 'Como a promessa do cuidado de Deus renova seu ânimo para esta semana?'
        }
      }
    ]
  },

  // ==========================================
  // 2. TRILHA HISTÓRIAS DA BÍBLIA (2ª TRILHA)
  // ==========================================
  {
    id: 'historias',
    title: 'Histórias da Bíblia',
    badgeName: 'Narrativas',
    description: 'Grandes relatos de fé, coragem e aliança com Deus contados em atos.',
    color: '#FF6B6B',
    bgColor: '#FFF5F5',
    themes: [
      {
        id: 'historia-rute',
        trailId: 'historias',
        name: 'A História de Rute',
        subtitle: 'A fidelidade que redefiniu uma linhagem real',
        biblicalReference: 'Livro de Rute 1-4',
        duration: '4 min',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/historia_rute.mp3',
        audioVoice: 'nova',
        isFree: false,
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
      },
      {
        id: 'historia-abraao',
        trailId: 'historias',
        name: 'A Jornada de Abraão',
        subtitle: 'A fé inabalável e a promessa milenar',
        biblicalReference: 'Gênesis 12-22',
        duration: '4 min',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/historia_abraao.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: 'Gênesis 15:5-6',
          biblicalTextQuote: 'Então o levou fora, e disse: Olha agora para os céus, e conta as estrelas, se as podes contar. E disse-lhe: Assim será a tua semente. E creu ele no Senhor, e imputou-lhe isto por justiça.',
          acts: [
            { actNumber: 1, title: 'O Chamado para o Desconhecido', text: 'Aos 75 anos, Abraão ouve a voz de Deus ordenando que saia de sua terra e parentela rumo ao desconhecido. Sem mapa terreno, mas firmado na promessa divina, ele obedece e caminha.' },
            { actNumber: 2, title: 'As Estrelas do Céu e a Aliança', text: 'Passam-se anos sem filhos. Deus conduz Abraão para fora da tenda na calada da noite: "Conta as estrelas se fores capaz. Assim será a tua descendência". Abraão creu e foi justificado.' },
            { actNumber: 3, title: 'O Riso da Promessa Cumprida', text: 'Quando a razão dizia ser impossível, Sara dá à luz Isaque ("riso"). Deus transforma a espera em testemunho vivo de fidelidade absoluta.' },
            { actNumber: 4, title: 'O Monte Moriá e a Provisão', text: 'Provado no Monte Moriá, Abraão demonstra amar o Doador mais que a bênção. Deus intervém, provê o cordeiro e revela-se como Yahweh Jireh: O Senhor Proverá.' }
          ],
          reflection: 'A fé genuína caminha no escuro confiando na Luz da promessa. Quando colocamos tudo no altar de Deus, descobrimos que Ele nunca nos deixa sem provisão.',
          prayer: 'Pai, ensina-me a confiar em Ti mesmo quando o caminho parecer incerto. Que minha fé não vacile diante do impossível. Amém.',
          applicationQuestion: 'Você confia plenamente nas promessas de Deus para o seu futuro?'
        }
      },
      {
        id: 'historia-ester',
        trailId: 'historias',
        name: 'A Coragem de Ester',
        subtitle: 'Para um momento como este você nasceu',
        biblicalReference: 'Livro de Ester 1-8',
        duration: '4 min',
        imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/historia_ester.mp3',
        audioVoice: 'nova',
        isFree: false,
        content: {
          biblicalReference: 'Ester 4:14',
          biblicalTextQuote: 'Porque, se de todo te calares neste tempo, socorro e livramento de outra parte virá para os judeus, mas tu e a casa de teu pai perecereis; e quem sabe se para tal tempo como este chegaste a este reino?',
          acts: [
            { actNumber: 1, title: 'A Órfã Exilada no Trono da Pérsia', text: 'Hadassa, órfã judia criada por seu primo Mardoqueu em Susã, é escolhida pelo rei Assuero para ser a rainha da Pérsia, adotando o nome de Ester.' },
            { actNumber: 2, title: 'O Decreto Mortal de Hamã', text: 'O primeiro-ministro Hamã arquiteta o extermínio de todos os judeus do império. Mardoqueu envia um recado urgente: "Quem sabe se não foi para uma hora como esta que você chegou ao trono?".' },
            { actNumber: 3, title: 'Se Eu Perecer, Pereci', text: 'Ester convoca três dias de oração e jejum. Arriscando a própria vida por entrar na sala do trono sem ser chamada, ela declara com firmeza: "Se eu perecer, pereci". O rei estende o cetro de ouro.' },
            { actNumber: 4, title: 'O Banquete e o Livramento', text: 'No banquete preparado, Ester expõe com sabedoria a trama de Hamã. O rei decreta a salvação dos judeus, transformando luto em celebração e vitória histórica.' }
          ],
          reflection: 'Deus coloca Seus filhos em posições estratégicas não para conforto pessoal, mas para cumprir Seus propósitos soberanos. A coragem nasce da oração e da entrega total.',
          prayer: 'Senhor, dá-me discernimento e ousadia santa para me posicionar com verdade e amor nos desafios da minha geração. Amém.',
          applicationQuestion: 'Qual propósito maior Deus pode estar realizando através do lugar onde você está hoje?'
        }
      },
      {
        id: 'historia-jose',
        trailId: 'historias',
        name: 'José do Egito',
        subtitle: 'Da cova ao palácio: o perdão que salvou nações',
        biblicalReference: 'Gênesis 37-50',
        duration: '4 min',
        imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/historia_jose.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: 'Gênesis 50:20',
          biblicalTextQuote: 'Vós bem intentastes mal contra mim; porém Deus o intentou para bem, para fazer como se vê neste dia, para conservar muita gente com vida.',
          acts: [
            { actNumber: 1, title: 'A Túnica, os Sonhos e a Traição', text: 'Amado por Jacó e com sonhos divinos de liderança, José desperta o ciúme dos irmãos, que o lançam numa cova e o vendem como escravo para o Egito.' },
            { actNumber: 2, title: 'Integridade na Prisão Injusta', text: 'Mesmo falsamente acusado na casa de Potifar e encarcerado, José permanece íntegro e a Escritura ressalta: "O Senhor era com José".' },
            { actNumber: 3, title: 'Sabedoria Diante do Faraó', text: 'Após treze anos de provações, José interpreta os sonhos do Faraó e é nomeado governador do Egito, administrando celeiros para salvar o mundo da fome.' },
            { actNumber: 4, title: 'O Reencontro e o Perdão Redentor', text: 'Ao reencontrar os irmãos necessitados de pão, José chora e os abraça em perdão: "Vós planejastes o mal contra mim, mas Deus o transformou em bem".' }
          ],
          reflection: 'Nenhum sofrimento em Deus é desperdiçado. As feridas do passado se tornam instrumentos de salvação e graça quando permitimos que o perdão reine em nosso coração.',
          prayer: 'Pai bondoso, cura as dores do meu passado e ajuda-me a enxergar Tua mão providente tecendo o bem em cada detalhe da minha história. Amém.',
          applicationQuestion: 'Você consegue confiar que Deus pode transformar perdas antigas em propósitos maiores?'
        }
      },
      {
        id: 'historia-davi',
        trailId: 'historias',
        name: 'A Vida de Davi',
        subtitle: 'O pastor de ovelhas e o coração de Deus',
        biblicalReference: '1 e 2 Samuel',
        duration: '4 min',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/historia_davi.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: '1 Samuel 16:7',
          biblicalTextQuote: 'Porém o Senhor disse a Samuel: Não atentes para a sua aparência, nem para a grandeza da sua estatura, porque o tenho rejeitado; porque o Senhor não vê como vê o homem, pois o homem vê o que está diante dos olhos, porém o Senhor olha para o coração.',
          acts: [
            { actNumber: 1, title: 'O Menino Ungido nos Pastos', text: 'Esquecido cuidando das ovelhas em Belém, o jovem Davi é ungido pelo profeta Samuel como futuro rei de Israel: Deus olha para a sinceridade do coração.' },
            { actNumber: 2, title: 'A Funda, a Fé e o Gigante Golias', text: 'Enquanto o exército temia o gigante Golias, Davi avança com 5 pedras e convicção: "Eu vou contra ti em nome do Senhor dos Exércitos". O gigante caiu.' },
            { actNumber: 3, title: 'O Deserto e a Caverna de Adulão', text: 'Perseguido por Saul, Davi aprende a se refugiar no Senhor nas cavernas, compondo salmos sublimes e recusando vingar-se de seu perseguidor.' },
            { actNumber: 4, title: 'O Reinado e a Aliança Eterna', text: 'Coroado rei de todo o Israel, Davi estabelece Jerusalém e busca a presença de Deus com adoração contínua, recebendo uma aliança eterna que aponta para Cristo.' }
          ],
          reflection: 'Um coração segundo Deus não é um coração perfeito e isento de falhas, mas um coração sensível, arrependido, quebrantado e apaixonado pela presença do Criador.',
          prayer: 'Senhor, molda o meu coração para que busque a Tua vontade acima de tudo. Que minha adoração seja pura e verdadeira em todos os momentos. Amém.',
          applicationQuestion: 'O que você precisa entregar a Deus hoje para ter um coração mais alinhado ao dEle?'
        }
      },
      {
        id: 'historia-daniel',
        trailId: 'historias',
        name: 'Daniel na Babilônia',
        subtitle: 'Fidelidade e oração no coração do império',
        biblicalReference: 'Livro de Daniel 1-6',
        duration: '4 min',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        audioUrl: '/audio/historia_daniel.mp3',
        audioVoice: 'onyx',
        isFree: false,
        content: {
          biblicalReference: 'Daniel 6:10',
          biblicalTextQuote: 'Daniel, pois, quando soube que o edito estava assinado, entrou em sua casa (ora havia no seu quarto janelas abertas do lado de Jerusalém), e três vezes no dia se punha de joelhos, e orava, e dava graças diante do seu Deus, como também antes costumava fazer.',
          acts: [
            { actNumber: 1, title: 'Firmeza na Corte do Rei', text: 'Jovem exilado na Babilônia, Daniel decide no coração não se contaminar com a comida do rei. Deus lhe concede sabedoria e discernimento extraordinários.' },
            { actNumber: 2, title: 'O Sonho da Grande Estátua', text: 'Diante de decretos de morte, Daniel ora com seus amigos e Deus revela o sonho de Nabucodonosor, profetizando o Reino eterno de Deus que nunca terá fim.' },
            { actNumber: 3, title: 'A Fornalha e o Quarto Homem', text: 'Seus amigos Sadraque, Mesaque e Abednego recusam adorar a estátua de ouro. Lançados no fogo, andam ilesos ao lado do Filho de Deus.' },
            { actNumber: 4, title: 'A Cova dos Leões e o Livramento', text: 'Por manter o hábito de orar 3 vezes ao dia, Daniel é lançado aos leões. Pela manhã, o rei o encontra ileso: "O meu Deus enviou o Seu anjo e fechou a boca dos leões".' }
          ],
          reflection: 'A integridade não se negocia por conveniência. Aqueles que permanecem de joelhos em oração diante de Deus conseguem ficar de pé diante de qualquer pressão deste mundo.',
          prayer: 'Deus soberano, dá-me firmeza moral e perseverança na oração diária. Que minha fé permaneça inabalável mesmo em ambientes desafiadores. Amém.',
          applicationQuestion: 'Você mantém sua fidelidade a Deus quando as pressões do dia a dia tentam moldá-lo?'
        }
      }
    ]
  },

  // ==========================================
  // 3. TRILHA CRIANÇAS / BÍBLIA KIDS (3ª TRILHA)
  // ==========================================
  {
    id: 'kids',
    title: 'Bíblia Kids (Histórias Ilustradas)',
    badgeName: 'Kids',
    description: 'Histórias bíblicas em carrossel de cenas com lições práticas para os pequenos.',
    color: '#6BCB77',
    bgColor: '#F4FBF4',
    themes: [
      {
        id: 'kids-criacao',
        trailId: 'kids',
        name: 'A Criação do Mundo',
        subtitle: 'Como Deus fez esse mundo tão lindo',
        biblicalReference: 'Gênesis 1:1-31',
        duration: '3 min',
        imageUrl: '/images/bible_kids/kids_criacao_mundo.jpg',
        audioUrl: '/audio/kids_criacao.mp3',
        audioVoice: 'shimmer',
        isFree: false,
        content: {
          biblicalReference: 'Gênesis 1:1-31',
          biblicalTextQuote: 'No princípio criou Deus os céus e a terra... E viu Deus tudo quanto tinha feito, e eis que era muito bom.',
          moralLesson: 'Deus fez tudo com muito carinho e nos ama profundamente.',
          kidsPrayer: 'Papai do Céu, obrigado por criar esse mundo tão lindo, o céu azul e os animaizinhos! Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: A Luz no Escuro',
              imageUrl: '/images/bible_kids/kids_criacao_1_luz.jpg',
              text: 'No início de tudo, não havia nada além de escuridão. Então Deus olhou com amor e disse com Sua voz poderosa: "Haja Luz!" E uma luz brilhante e colorida surgiu iluminando todo o universo!'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: Céu, Mares e a Terra',
              imageUrl: '/images/bible_kids/kids_criacao_2_mares.jpg',
              text: 'Deus separou as águas azuis, criou o céu fofinho de nuvens e a terra firme com montanhas, florestas e flores de todas as cores do arco-íris.'
            },
            {
              sceneNumber: 3,
              title: 'Cena 3: O Sol, a Lua e os Bichinhos',
              imageUrl: '/images/bible_kids/kids_criacao_3_animais.jpg',
              text: 'Ele colocou um sol quentinho para o dia, uma lua prateada e milhares de estrelas para a noite. Depois encheu os mares com peixinhos e a terra com leões, passarinhos e cachorrinhos alegres!'
            },
            {
              sceneNumber: 4,
              title: 'Cena 4: O Grande Amor por Nós',
              imageUrl: '/images/bible_kids/kids_criacao_4_homem.jpg',
              text: 'Por fim, Deus criou as pessoas para cuidarem do mundo com muito amor e serem Suas amigas queridas. Deus olhou para tudo o que fez e sorriu feliz: "Ficou muito bom!"'
            }
          ]
        }
      },
      {
        id: 'kids-noe',
        trailId: 'kids',
        name: 'A Arca de Noé',
        subtitle: 'O grande barco e o lindo arco-íris',
        biblicalReference: 'Gênesis 6-9',
        duration: '3 min',
        imageUrl: '/images/bible_kids/kids_noe_ark.jpg',
        audioUrl: '/audio/kids_noe.mp3',
        audioVoice: 'shimmer',
        isFree: false,
        content: {
          biblicalReference: 'Gênesis 9:13',
          biblicalTextQuote: 'O meu arco tenho posto nas nuvens; este será por sinal da aliança entre mim e a terra.',
          moralLesson: 'Obedecer a Deus sempre nos traz segurança e paz.',
          kidsPrayer: 'Papai do Céu, obrigado por cuidar da minha família com tanto carinho. Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: Um Barco Gigante',
              imageUrl: '/images/bible_kids/kids_noe_1_construcao.jpg',
              text: 'Noé era um homem bom que conversava com Deus todos os dias. Deus disse: "Noé, construa um barco enorme, porque vai chover muito!" Noé obedeceu com alegria e começou a martelar madeira por madeira.'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: Animais de Dois em Dois',
              imageUrl: '/images/bible_kids/kids_noe_2_embarque.jpg',
              text: 'Aconteceu algo incrível: girafas, elefantinhos, macaquinhos e passarinhos começaram a chegar em fila, de dois em dois! Todos entraram na arca e Deus fechou a porta com amor.'
            },
            {
              sceneNumber: 3,
              title: 'Cena 3: A Pombinha e o Raminho',
              imageUrl: '/images/bible_kids/kids_noe_3_pomba.jpg',
              text: 'A chuva caiu lá fora, mas dentro do barco todos estavam quentinhos e protegidos. Quando a chuva parou, uma pombinha branca voltou trazendo uma folhinha verde no bico!'
            },
            {
              sceneNumber: 4,
              title: 'Cena 4: O Arco-Íris da Promessa',
              imageUrl: '/images/bible_kids/kids_noe_4_arcoiris.jpg',
              text: 'Todos saíram felizes da arca. No céu azul, Deus pintou um arco-íris brilhante e colorido, prometendo cuidar para sempre de todas as crianças e famílias da terra!'
            }
          ]
        }
      },
      {
        id: 'kids-davi',
        trailId: 'kids',
        name: 'Davi e o Gigante Golias',
        subtitle: 'Um coração corajoso e confiante em Deus',
        biblicalReference: '1 Samuel 17',
        duration: '3 min',
        imageUrl: '/images/bible_kids/kids_davi_golias.jpg',
        audioUrl: '/audio/kids_davi.mp3',
        audioVoice: 'shimmer',
        isFree: false,
        content: {
          biblicalReference: '1 Samuel 17:45',
          biblicalTextQuote: 'Davi, porém, disse ao filisteu: Tu vens a mim com espada, e com lança, e com escudo; porém eu venho a ti em nome do Senhor dos Exércitos.',
          moralLesson: 'Com Deus ao nosso lado, podemos vencer qualquer medo ou desafio.',
          kidsPrayer: 'Papai do Céu, faz o meu coração forte e corajoso como o do menino Davi! Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: O Pequeno Pastor',
              imageUrl: '/images/bible_kids/kids_davi_1_pastor.jpg',
              text: 'Davi era o irmão mais novo da família e cuidava das ovelhinhas nos campos com muito carinho. Ele tocava harpa, cantava canções bonitas e sabia que Deus sempre o protegia.'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: O Gigante Bravo',
              imageUrl: '/images/bible_kids/kids_davi_2_golias.jpg',
              text: 'Um dia, apareceu um gigante com armadura pesada chamado Golias, que gritava muito alto. Todos os soldados ficaram com medo, mas Davi disse: "Eu não tenho medo, porque o nosso Deus é muito maior!"'
            },
            {
              sceneNumber: 3,
              title: 'Cena 3: Cinco Pedrinhas e a Vitória',
              imageUrl: '/images/bible_kids/kids_davi_3_vitoria.jpg',
              text: 'Davi pegou 5 pedrinhas lisinhas no riacho e sua funda. Ele girou a funda com fé e soltou a pedrinha pelo ar: Plec! O gigante caiu no chão e todo o povo comemorou com muita alegria!'
            }
          ]
        }
      },
      {
        id: 'kids-daniel',
        trailId: 'kids',
        name: 'Daniel na Cova dos Leões',
        subtitle: 'A oração que fechou a boca dos leões',
        biblicalReference: 'Daniel 6',
        duration: '3 min',
        imageUrl: '/images/bible_kids/kids_daniel_lions.jpg',
        audioUrl: '/audio/kids_daniel.mp3',
        audioVoice: 'shimmer',
        isFree: false,
        content: {
          biblicalReference: 'Daniel 6:22',
          biblicalTextQuote: 'O meu Deus enviou o seu anjo, e fechou a boca dos leões, para que não me fizessem dano.',
          moralLesson: 'Nunca deixe de orar e conversar com Deus todos os dias.',
          kidsPrayer: 'Papai do Céu, obrigado por enviar Teus anjos protetores para cuidar de mim enquanto eu durmo. Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: A Janela Aberta e a Oração',
              imageUrl: '/images/bible_kids/kids_daniel_1_oracao.jpg',
              text: 'Daniel morava num castelo longe de casa, mas nunca se esquecia de Deus. Três vezes por dia, ele abria a janela do seu quarto, se ajoelhava e orava com muito amor.'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: A Cova com os Leões',
              imageUrl: '/images/bible_kids/kids_daniel_2_cova.jpg',
              text: 'Alguns homens com inveja criaram uma regra proibindo as pessoas de orar. Mas Daniel continuou conversando com Deus. Por isso, os guardas colocaram Daniel numa cova cheia de leões grandões.'
            },
            {
              sceneNumber: 3,
              title: 'Cena 3: O Anjo Amigo e os Leões Mansinhos',
              imageUrl: '/images/bible_kids/kids_daniel_3_anjo.jpg',
              text: 'Deus enviou um anjo brilhante que fez carinho nos leões e fechou a boquinha de cada um deles! Eles dormiram calminhos como gatinhos a noite toda ao lado de Daniel.'
            }
          ]
        }
      },
      {
        id: 'kids-jonas',
        trailId: 'kids',
        name: 'Jonas e o Grande Peixe',
        subtitle: 'Uma aventura no fundo do mar',
        biblicalReference: 'Jonas 1-3',
        duration: '3 min',
        imageUrl: '/images/bible_kids/kids_jonas_fish.jpg',
        audioUrl: '/audio/kids_jonas.mp3',
        audioVoice: 'shimmer',
        isFree: false,
        content: {
          biblicalReference: 'Jonas 2:9',
          biblicalTextQuote: 'Do Senhor vem a salvação... E o Senhor deu ordens ao peixe, e ele vomitou a Jonas na terra seca.',
          moralLesson: 'Deus sempre nos perdoa e nos dá uma nova chance quando pedimos desculpas.',
          kidsPrayer: 'Papai do Céu, me ajuda a obedecer sempre aos meus pais e a Você! Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: O Navio no Mar',
              imageUrl: '/images/bible_kids/kids_jonas_1_navio.jpg',
              text: 'Deus pediu para Jonas levar uma mensagem de amor a uma cidade. Jonas ficou com medo e fugiu num navio para o lado contrário. Uma tempestade forte começou a balançar o barco!'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: Um Mergulho e o Grande Peixe',
              imageUrl: '/images/bible_kids/kids_jonas_2_baleia.jpg',
              text: 'Jonas caiu na água, mas Deus, com todo o Seu cuidado, preparou um peixe gigante e bonzinho que engoliu Jonas sem machucá-lo. Lá dentro da barriga quentinha, Jonas orou e pediu perdão.'
            },
            {
              sceneNumber: 3,
              title: 'Cena 3: A Praia e a Cidade Salva',
              imageUrl: '/images/bible_kids/kids_jonas_3_praia.jpg',
              text: 'Três dias depois, o peixe nadou até a areia da praia e colocou Jonas em segurança. Jonas correu para a cidade, contou a todos sobre o amor de Deus e todos ficaram muito felizes!'
            }
          ]
        }
      },
      {
        id: 'kids-paes',
        trailId: 'kids',
        name: 'O Milagre dos Pães',
        subtitle: 'Um lanchinho compartilhado que alimentou milhares',
        biblicalReference: 'João 6:1-14',
        duration: '3 min',
        imageUrl: '/images/bible_kids/kids_paes_milagre.jpg',
        audioUrl: '/audio/kids_paes.mp3',
        audioVoice: 'shimmer',
        isFree: false,
        content: {
          biblicalReference: 'João 6:9-11',
          biblicalTextQuote: 'Está aqui um rapaz que tem cinco pães de cevada e dois peixinhos... E Jesus tomou os pães e, havendo dado graças, repartiu-os pelos discípulos.',
          moralLesson: 'Quando compartilhamos o que temos com amor, Jesus faz coisas maravilhosas.',
          kidsPrayer: 'Papai do Céu, me ensina a ser bondoso e a compartilhar meus brinquedos e lanches com meus amigos. Amém.',
          scenes: [
            {
              sceneNumber: 1,
              title: 'Cena 1: Uma Multidão com Fome',
              imageUrl: '/images/bible_kids/kids_paes_1_multidao.jpg',
              text: 'Milhares de famílias passaram o dia ouvindo as lindas palavras de Jesus perto do lago. Quando o sol começou a se pôr, a barriguinha de todo mundo começou a roncar de fome!'
            },
            {
              sceneNumber: 2,
              title: 'Cena 2: O Cestinho do Menino',
              imageUrl: '/images/bible_kids/kids_paes_2_menino.jpg',
              text: 'Um menininho bondoso estava ali com sua cestinha com 5 pãezinhos e 2 peixinhos. Ele entregou seu lanche nas mãos de Jesus com um sorriso generoso.'
            },
            {
              sceneNumber: 3,
              title: 'Cena 3: A Multiplicação dos Pães',
              imageUrl: '/images/bible_kids/kids_paes_3_cestos.jpg',
              text: 'Jesus agradeceu a Deus e começou a repartir os pães. E quanto mais repartia, mais comida aparecia! Todos comeram até ficarem satisfeitos e ainda sobraram 12 cestos cheios!'
            }
          ]
        }
      }
    ]
  }
];
