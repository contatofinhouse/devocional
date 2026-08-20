import json
import os

with open("scripts/meditation_timings.json", "r", encoding="utf-8") as f:
    timings = json.load(f)

# Base metadata for sessions
sessions_meta = [
  {
    "id": "mindfulness_mindset_1",
    "title": "Presença, Clareza & Foco",
    "subtitle": "Reprogramação de Mindset com Metodologia MBSR & RAIN",
    "category": "thematic",
    "themeLabel": "Presença",
    "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "methodology": "Mindfulness MBSR",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Harmônicos Theta 432Hz",
    "isPremium": False,
    "affirmation": "Minha mente está serena, meu discernimento está afiado e meu foco está ancorado no presente.",
    "reflectionPrompt": "Como sua mente se sente após esta sessão de ancoragem?",
    "scientificMethodology": {
      "title": "Base Científica: MBSR & Neuroplasticidade",
      "origin": "Desenvolvido na UMass Medical School e validado em Harvard & Stanford.",
      "benefits": [
        "Redução mensurável do cortisol e desativação da amígdala cerebral (centro do estresse).",
        "Desativação da Rede em Modo Padrão (DMN), eliminando ruído mental e pensamentos ruminantes.",
        "Protocolo RAIN: Reconhecer, Permitir, Investigar com gentileza e Nutrir o autocuidado.",
        "Estímulo à neuroplasticidade para ancoragem de clareza, autogoverno e foco intencional."
      ],
      "stages": [
        { "stage": "1. Ancoragem Respiratória", "desc": "Coerência cardíaca com ritmo 4-4-6 para estabilizar o sistema nervoso autônomo." },
        { "stage": "2. Escaneamento Corporal", "desc": "Liberação da tensão física somatizada no maxilar, ombros e testa." },
        { "stage": "3. Observador Imparcial (RAIN)", "desc": "Observação de pensamentos intrusivos como nuvens passageiras, sem julgamento." },
        { "stage": "4. Reprogramação Cognitiva", "desc": "Ancoragem neural de convicções de serenidade, autogoverno e firmeza de propósito." }
      ]
    }
  },
  {
    "id": "meditacao_transito",
    "title": "Calma & Foco no Trânsito",
    "subtitle": "Paz no Volante, Respiração Diafragmática & Proteção (Salmo 121:8)",
    "category": "thematic",
    "themeLabel": "Trânsito",
    "imageUrl": "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80",
    "methodology": "Atenção Plena de Olhos Abertos & Regulação do Estresse Viário",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "nature_432hz",
    "ambientTitle": "Estrada Serena & Frequência 432Hz",
    "isPremium": True,
    "isOpenEyesMode": True,
    "affirmation": "O Senhor guarda a minha saída e a minha entrada. Eu dirijo com paciência, calma e discernimento.",
    "reflectionPrompt": "Como você pode transformar o trajeto no trânsito em uma oportunidade de oração e calma?",
    "scientificMethodology": {
      "title": "Base Científica: Regulação Autonômica em Situações de Estresse Viário",
      "origin": "Protocolos de Atenção Plena Situacional & Teoria Polivagal.",
      "benefits": [
        "Desativação imediata da resposta de irritabilidade e raiva ao volante (road rage).",
        "Redução da hipervigilância tensa, convertendo-a em atenção panorâmica segura.",
        "Soltura da pegada excessiva no volante e da musculatura cervical.",
        "Aumento da paciência diante de imprevistos e retenções de fluxo."
      ],
      "stages": [
        { "stage": "1. Atenção na Pista (Olhos Abertos)", "desc": "Manutenção do foco na via com postura confortável e sem rigidez." },
        { "stage": "2. Soltura do Volante & Ombros", "desc": "Alívio da pressão nas mãos, maxilar e trapézio." },
        { "stage": "3. Respiração Diafragmática", "desc": "Inspiração nasal calma desacelerando batimentos cardíacos." },
        { "stage": "4. Salmo 121:8 & Proteção", "desc": "Entrega do trajeto e paz de espírito em cada quilômetro." }
      ]
    }
  },
  {
    "id": "meditacao_sono",
    "title": "Sono Profundo & Repouso",
    "subtitle": "Descompressão Neuromuscular & Entrega Noturna (Salmo 4:8)",
    "category": "thematic",
    "themeLabel": "Dormir",
    "imageUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    "methodology": "Relaxamento Neuromuscular & Frequência Delta",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "night_432hz",
    "ambientTitle": "Chuva Serena & Frequência 432Hz Noturna",
    "isPremium": True,
    "affirmation": "Em paz me deito e logo pego no sono, pois só Tu, Senhor, me fazes repousar em perfeita segurança.",
    "reflectionPrompt": "O que você entrega nas mãos de Deus esta noite para dormir em paz?",
    "scientificMethodology": {
      "title": "Base Científica: Indução de Ondas Delta & Desativação Somática",
      "origin": "Protocolos de Higiene do Sono e Relaxamento Progressivo (Harvard Medical School).",
      "benefits": [
        "Transição acelerada do estado de alerta (Beta) para o relaxamento pré-sono (Alpha/Theta).",
        "Redução do tônus muscular somatizado nas costas, pescoço e mandíbula.",
        "Queda na frequência cardíaca preparando o corpo para o sono REM restaurador.",
        "Silenciamento cognitivo de preocupações com o dia de amanhã."
      ],
      "stages": [
        { "stage": "1. Desligamento do Dia", "desc": "Reconhecimento de que o dia terminou e entrega das pendências." },
        { "stage": "2. Respiração 4-7-8", "desc": "Método comprovado para indução de sonolência natural." },
        { "stage": "3. Soltura Muscular Noturna", "desc": "Pesagem progressiva do corpo sobre o colchão." },
        { "stage": "4. Repouso Seguro", "desc": "Ancoragem na proteção divina para um sono sem pesadelos ou despertares." }
      ]
    }
  },
  {
    "id": "meditacao_ansiedade",
    "title": "Alívio da Ansiedade & Pânico",
    "subtitle": "Desativação da Amígdala & Respiração 4-4-6 (Fl 4:6-7)",
    "category": "thematic",
    "themeLabel": "Ansiedade",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "methodology": "Estimulação Vagal & Ancoragem Somática",
    "voiceGender": "female",
    "speakerName": "Sofia",
    "ambientType": "ocean_432hz",
    "ambientTitle": "Ondas do Mar & Harmônicos 432Hz",
    "isPremium": True,
    "affirmation": "A paz de Deus, que excede todo o entendimento humano, guarda o meu coração e a minha mente neste instante.",
    "reflectionPrompt": "Sinta a tensão deixando seu peito. Que promessa traz descanso à sua alma agora?",
    "scientificMethodology": {
      "title": "Base Científica: Estimulação do Nervo Vago & Regulação Autonômica",
      "origin": "Teoria Polivagal e Biofeedback Respiratório (Stanford Medicine).",
      "benefits": [
        "Ativação do sistema nervoso parassimpático, interrompendo a resposta de 'luta ou fuga'.",
        "Normalização do ritmo cardíaco e alívio imediato da sensação de aperto ou taquicardia.",
        "Restauração do fluxo sanguíneo no córtex pré-frontal para recuperação do discernimento.",
        "Sensação profunda de refúgio e ancoragem no momento presente."
      ],
      "stages": [
        { "stage": "1. Aterrissagem no Presente", "desc": "Contato dos pés com o chão e desengate de pensamentos catastróficos." },
        { "stage": "2. Expiração Prolongada", "desc": "Ativação do freio vagal para desacelerar o coração." },
        { "stage": "3. Dissolução do Aperto", "desc": "Abertura do peito e relaxamento do diafragma." },
        { "stage": "4. Paz Inabalável", "desc": "Ancoragem na soberania divina sobre todas as circunstâncias." }
      ]
    }
  },
  {
    "id": "meditacao_trabalho",
    "title": "Clareza Mental no Trabalho",
    "subtitle": "Foco Intencional & Sabedoria em Momentos de Pressão (Tg 1:5)",
    "category": "thematic",
    "themeLabel": "Trabalho",
    "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    "methodology": "Controle Executivo & Atenção Focada",
    "voiceGender": "male",
    "speakerName": "Gabriel",
    "ambientType": "piano_432hz",
    "ambientTitle": "Piano Acústico & Frequência 432Hz para Foco",
    "isPremium": True,
    "affirmation": "Recebo sabedoria do Alto para tomar decisões certas, agir com paciência e manter meu foco inabalável.",
    "reflectionPrompt": "Qual decisão ou tarefa requer sua maior atenção e calma hoje?",
    "scientificMethodology": {
      "title": "Base Científica: Otimização da Rede de Atenção Dorsal (DAN)",
      "origin": "Neurociência Cognitiva da Atenção Plena (MIT Sloan & Oxford).",
      "benefits": [
        "Eliminação do custo de troca multitarefa, restaurando o foco sustentado.",
        "Redução da reatividade emocional em reuniões e conversas desafiadoras.",
        "Aumento da velocidade de processamento cognitivo e discernimento estratégico.",
        "Equilíbrio entre produtividade e serenidade interior."
      ],
      "stages": [
        { "stage": "1. Pausa Consciente", "desc": "Interrupção do piloto automático e desaceleração do ritmo frenético." },
        { "stage": "2. Clareza de Intenção", "desc": "Definição da prioridade essencial do momento." },
        { "stage": "3. Sabedoria Prática", "desc": "Busca de direção bíblica para decisões éticas e firmes." },
        { "stage": "4. Execução Serena", "desc": "Retorno ao trabalho com postura centrada e propósito." }
      ]
    }
  },
  {
    "id": "meditacao_despertar",
    "title": "Despertar com Propósito",
    "subtitle": "Ativação Energética, Gratidão & Direcionamento (Sl 143:8)",
    "category": "thematic",
    "themeLabel": "Despertar",
    "imageUrl": "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80",
    "methodology": "Neuroativação Positiva & Gratidão Matinal",
    "voiceGender": "female",
    "speakerName": "Beatriz",
    "ambientType": "nature_432hz",
    "ambientTitle": "Brisa da Manhã & Ressonância 432Hz",
    "isPremium": True,
    "affirmation": "Faze-me ouvir do Teu amor pela manhã, pois em Ti confio. Mostra-me o caminho que devo seguir.",
    "reflectionPrompt": "Pelo que você é grato ao abrir os olhos nesta manhã?",
    "scientificMethodology": {
      "title": "Base Científica: Resposta do Cortisol ao Despertar (CAR) & Gratidão",
      "origin": "Psicologia Positiva e Neurobiologia da Gratidão (UC Berkeley).",
      "benefits": [
        "Liberação de dopamina e serotonina para iniciar o dia com disposição genuína.",
        "Regulação do ciclo circadiano e aumento da energia mental sem agitação.",
        "Blindagem emocional contra o estresse matinal e o pessimismo.",
        "Alinhamento do coração com o propósito de Deus para as próximas horas."
      ],
      "stages": [
        { "stage": "1. Despertar Consciente", "desc": "Reconhecimento do dom da vida e da nova oportunidade de recomeço." },
        { "stage": "2. Respiração Revigorante", "desc": "Oxigenação profunda dos tecidos cerebrais." },
        { "stage": "3. Gratidão Ativa", "desc": "Mapeamento neural de bênçãos para elevar a vibração mental." },
        { "stage": "4. Consagração do Dia", "desc": "Entrega dos passos, conversas e planos nas mãos do Criador." }
      ]
    }
  },

  # 8 FASES DA JORNADA
  {
    "id": "jornada_fase_1_ancoragem_sonora",
    "title": "Fase 1: Ancoragem Sonora & Presença",
    "subtitle": "Conexão Sensorial Rápida & Desengate do Piloto Automático",
    "category": "journey",
    "phaseNumber": 1,
    "themeLabel": "Fase 1 • Básico",
    "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "methodology": "Ancoragem Sensorial & Atenção Plena",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Ondas Alpha 432Hz & Sons Presentes",
    "isPremium": False,
    "affirmation": "Eu me ancoro no presente. Cada som me lembra de que Deus sustenta a vida agora.",
    "reflectionPrompt": "Quais sons ao seu redor você percebeu pela primeira vez hoje?",
    "scientificMethodology": {
      "title": "Base Científica: Ancoragem Sensorial & Atenção Externa",
      "origin": "Protocolo Clínico de Atenção Plena e Redução do Ruído Mental.",
      "benefits": [
        "Desativação imediata do piloto automático e da ruminação mental.",
        "Estabilização da atenção periférica sem sobrecarga sensorial.",
        "Preparação do sistema nervoso para práticas meditativas mais profundas."
      ],
      "stages": [
        { "stage": "1. Postura & Repouso", "desc": "Acomodação estável do corpo e abertura da percepção auditiva." },
        { "stage": "2. Escuta sem Julgamento", "desc": "Recepção dos sons ambientes como ondas sonoras neutras." },
        { "stage": "3. Retorno ao Silêncio Interior", "desc": "Integração sensorial e presença plena." }
      ]
    }
  },
  {
    "id": "jornada_fase_2_escaneamento_rapido",
    "title": "Fase 2: Alívio Físico & Escaneamento",
    "subtitle": "Soltura de Tensão Muscular no Maxilar, Pescoço e Ombros",
    "category": "journey",
    "phaseNumber": 2,
    "themeLabel": "Fase 2 • Básico",
    "imageUrl": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80",
    "methodology": "Escaneamento Somático Expresso (MBSR)",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "nature_432hz",
    "ambientTitle": "Brisa Serena & Ressonância 432Hz",
    "isPremium": True,
    "affirmation": "Eu libero a tensão acumulada no meu corpo e acolho o descanso que Deus preparou para mim.",
    "reflectionPrompt": "Qual região do seu corpo relaxou mais visivelmente nesta sessão?",
    "scientificMethodology": {
      "title": "Base Científica: Desativação Somática & Propriocepção",
      "origin": "Protocolo de Relaxamento Progressivo e Escaneamento Corporal MBSR.",
      "benefits": [
        "Redução do tônus muscular involuntário provocado por estresse diário.",
        "Diminuição da cefaleia tensional e do bruxismo diurno.",
        "Fortalecimento da conexão cérebro-corpo (ínsula anterior)."
      ],
      "stages": [
        { "stage": "1. Cabeça e Face", "desc": "Soltura dos músculos da testa, olhos e mandíbula." },
        { "stage": "2. Pescoço e Ombros", "desc": "Liberação do peso carregado no trapézio e escápulas." },
        { "stage": "3. Tronco e Membros", "desc": "Fluidez corporal completa." }
      ]
    }
  },
  {
    "id": "jornada_fase_3_respiracao_serena",
    "title": "Fase 3: Respiração Serena & Clareza",
    "subtitle": "Foco Atencional Sustentado & Regulação Cardíaca",
    "category": "journey",
    "phaseNumber": 3,
    "themeLabel": "Fase 3 • Básico",
    "imageUrl": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "methodology": "Controle da Respiração Diafragmática & Foco Sustentado",
    "voiceGender": "female",
    "speakerName": "Sofia",
    "ambientType": "ocean_432hz",
    "ambientTitle": "Ondas do Mar & Harmônicos 432Hz",
    "isPremium": True,
    "affirmation": "Minha respiração é uma âncora de paz. Eu descanso no cuidado soberano do Senhor.",
    "reflectionPrompt": "Como você se sente ao manter o foco na respiração?",
    "scientificMethodology": {
      "title": "Base Científica: Coerência Cardiorrespiratória & Foco Dorsal",
      "origin": "Biofeedback de Variabilidade da Frequência Cardíaca (HRV).",
      "benefits": [
        "Aumento da variabilidade cardíaca indicando resiliência ao estresse.",
        "Treinamento do córtex pré-frontal para sustentação atencional prolongada.",
        "Queda progressiva da frequência de pensamentos intrusivos."
      ],
      "stages": [
        { "stage": "1. Ancoragem no Abdômen", "desc": "Percepção do movimento natural do diafragma." },
        { "stage": "2. Contagem Serena", "desc": "Ciclos conscientes sem forçar a respiração." },
        { "stage": "3. Retorno Gentil", "desc": "Recondução da mente ao ar sempre que ela divagar." }
      ]
    }
  },
  {
    "id": "jornada_fase_4_superando_desafios",
    "title": "Fase 4: Superando Momentos Difíceis",
    "subtitle": "Regulação Emocional & Acolhimento sem Julgamento",
    "category": "journey",
    "phaseNumber": 4,
    "themeLabel": "Fase 4 • Intermediário",
    "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "methodology": "Tolerância ao Desconforto Emocional & MBSR",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Harmonia Profunda 432Hz",
    "isPremium": True,
    "affirmation": "Em meio às tempestades, eu sei em Quem tenho crido. Minhas emoções não definem meu destino.",
    "reflectionPrompt": "Qual sentimento desafiador você conseguiu acolher com compaixão e serenidade?",
    "scientificMethodology": {
      "title": "Base Científica: Regulação Afetiva e Desativação da Reatividade",
      "origin": "Neurociência Afetiva da Universidade de Wisconsin-Madison.",
      "benefits": [
        "Quebra da reatividade automática de fuga ou luta diante de frustrações.",
        "Desenvolvimento de flexibilidade psicológica e resiliência emocional.",
        "Fortalecimento da rede executiva central contra o pânico."
      ],
      "stages": [
        { "stage": "1. Identificação do Desconforto", "desc": "Localização da sensação física no corpo (peito, garganta, estômago)." },
        { "stage": "2. Espaço e Acolhimento", "desc": "Respirar ao redor da sensação sem tentar reprimi-la à força." },
        { "stage": "3. Dissolução e Paz", "desc": "Constatação de que toda sensação é impermanente e passa." }
      ]
    }
  },
  {
    "id": "jornada_fase_5_bondade_amorosa",
    "title": "Fase 5: Bondade Amorosa, Perdão & Empatia",
    "subtitle": "Cultivo da Compaixão, Saúde Cardiovascular & Paz Interior",
    "category": "journey",
    "phaseNumber": 5,
    "themeLabel": "Fase 5 • Intermediário",
    "imageUrl": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
    "methodology": "Meditação da Compaixão & Benevolência",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "piano_432hz",
    "ambientTitle": "Piano Devocional & Frequência 432Hz",
    "isPremium": True,
    "affirmation": "Eu amo porque Ele me amou primeiro. Meu coração transborda perdão, generosidade e paz.",
    "reflectionPrompt": "Para quem você direcionou votos sinceros de paz e bem durante a prática?",
    "scientificMethodology": {
      "title": "Base Científica: Neurobiologia do Afeto Positivo e Ocitocina",
      "origin": "Stanford Center for Compassion and Altruism Research (CCARE).",
      "benefits": [
        "Aumento expressivo na liberação de ocitocina e redução de marcadores inflamatórios.",
        "Dissolução de ressentimentos, mágoas e hostilidade crônica.",
        "Fortalecimento da empatia e restauração dos laços familiares e comunitários."
      ],
      "stages": [
        { "stage": "1. Autocompaixão", "desc": "Envio de bênçãos e acolhimento para si mesmo." },
        { "stage": "2. Pessoas Queridas", "desc": "Extensão de votos de saúde, segurança e paz para a família." },
        { "stage": "3. Pessoas Difíceis", "desc": "Exercício do perdão ativo e liberação de julgamentos." },
        { "stage": "4. Todos os Seres", "desc": "Expansão universal do amor divino." }
      ]
    }
  },
  {
    "id": "jornada_fase_6_harmonia_plena",
    "title": "Fase 6: Harmonia Plena: Respiração, Som & Corpo",
    "subtitle": "Integração Multissensorial & Silenciamento da Ruminação (DMN)",
    "category": "journey",
    "phaseNumber": 6,
    "themeLabel": "Fase 6 • Avançado",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "methodology": "Integração Multissensorial MBSR",
    "voiceGender": "male",
    "speakerName": "Gabriel",
    "ambientType": "nature_432hz",
    "ambientTitle": "Floresta Serena & Frequência 432Hz",
    "isPremium": True,
    "affirmation": "Em Deus minha alma descansa em perfeita harmonia; Nele meu corpo, mente e espírito se alinham.",
    "reflectionPrompt": "Como foi a transição fluida entre respiração, audição e sensações corporais?",
    "scientificMethodology": {
      "title": "Base Científica: Integração das Redes Atencionais Dorsal e Ventral",
      "origin": "Pesquisas de Neuroimagem Funcional da Universidade de Harvard.",
      "benefits": [
        "Capacidade avançada de alternar o foco sem perder a estabilidade interior.",
        "Silenciamento quase total da rede de modo padrão (DMN), eliminando ansiedades futuras.",
        "Aumento da densidade de substância cinzenta no hipocampo (memória e aprendizado)."
      ],
      "stages": [
        { "stage": "1. Ancoragem Tripla", "desc": "Sincronização simultânea da respiração, audição e corpo." },
        { "stage": "2. Espaço Aberto de Consciência", "desc": "Observação panorâmica de toda a experiência presente." },
        { "stage": "3. Descanso na Presença", "desc": "Quietude profunda sem necessidade de controle." }
      ]
    }
  },
  {
    "id": "jornada_fase_7_sono_restaurador",
    "title": "Fase 7: Descompressão Noturna & Sono Profundo",
    "subtitle": "Relaxamento Somático Completo para Indução a Ondas Teta",
    "category": "journey",
    "phaseNumber": 7,
    "themeLabel": "Fase 7 • Noite",
    "imageUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    "methodology": "Desativação Somática & Higiene do Sono",
    "voiceGender": "deep_calm",
    "speakerName": "Samuel",
    "ambientType": "night_432hz",
    "ambientTitle": "Chuva Suave & Harmônicos Delta 432Hz",
    "isPremium": True,
    "affirmation": "Eu entrego este dia nas mãos de Deus. Meu sono será doce, reparador e protegido.",
    "reflectionPrompt": "Sinta seu corpo afundando no colchão. Qual peso você soltou antes de dormir?",
    "scientificMethodology": {
      "title": "Base Científica: Transição Neuroelétrica para Ondas Delta e REM",
      "origin": "Medicina do Sono e Cronobiologia da Johns Hopkins University.",
      "benefits": [
        "Eliminação da latência prolongada do sono (dificuldade de adormecer).",
        "Relaxamento muscular global, prevenindo microdespertares no meio da noite.",
        "Consolidação da memória e restauração imunológica celular durante o repouso."
      ],
      "stages": [
        { "stage": "1. Entrega do Dia", "desc": "Liberação de pendências mentais e encerramento cognitivo." },
        { "stage": "2. Escaneamento dos Pés à Cabeça", "desc": "Pesagem gradual de cada grupo muscular." },
        { "stage": "3. Transição para o Sono", "desc": "Respiração lenta conduzindo diretamente ao adormecer." }
      ]
    }
  },
  {
    "id": "jornada_fase_8_imersao_plena",
    "title": "Fase 8: Imersão Plena & Quietude Contemplativa",
    "subtitle": "Instruções Completas de Meditação & Autorregulação Autônoma",
    "category": "journey",
    "phaseNumber": 8,
    "themeLabel": "Fase 8 • Mestre",
    "imageUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    "methodology": "Maestria Contemplativa & Atenção Aberta",
    "voiceGender": "female",
    "speakerName": "Helena",
    "ambientType": "deep_432hz",
    "ambientTitle": "Harmonia Cósmica 432Hz & Silêncio Sagrado",
    "isPremium": True,
    "affirmation": "Eu habito no esconderijo do Altíssimo e descanso à sombra do Onipotente. Minha serenidade é inabalável.",
    "reflectionPrompt": "Como você percebe a transformação da sua mente e do seu espírito após completar as 8 fases?",
    "scientificMethodology": {
      "title": "Base Científica: Maestria da Autorregulação Emocional e Estados Alfa Sustentados",
      "origin": "Estudos de Neurociência da Meditação Avançada (Max Planck & Harvard).",
      "benefits": [
        "Acesso voluntário e estável ao estado de quietude neural sob qualquer condição externa.",
        "Espessamento cortical comprovado em áreas de empatia, foco e lucidez executiva.",
        "Maturidade espiritual e ancoragem inquebrantável nos valores eternos."
      ],
      "stages": [
        { "stage": "1. Entrada Autônoma", "desc": "Acomodação em silêncio pleno em menos de 1 minuto." },
        { "stage": "2. Prática Aberta", "desc": "Navegação por períodos estendidos de silêncio e autorreflexão." },
        { "stage": "3. Consagração da Jornada", "desc": "Integração definitiva da paz como estilo contínuo de vida." }
      ]
    }
  }
]

# Merge metadata with timings
full_sessions = []
for s in sessions_meta:
    sid = s["id"]
    t = timings.get(sid, {})
    s["audioUrl"] = t.get("audioUrl", f"/audio/{sid}.mp3")
    s["durationSeconds"] = t.get("durationSeconds", 180)
    s["steps"] = t.get("steps", [])
    full_sessions.append(s)

ts_content = """export interface MeditationStep {
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
  category: 'thematic' | 'journey';
  phaseNumber?: number;
  themeLabel: string;
  imageUrl: string;
  methodology: string;
  durationSeconds: number;
  audioUrl: string;
  transcriptUrl?: string;
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

export const GUIDED_MEDITATIONS: MeditationSession[] = """ + json.dumps(full_sessions, ensure_ascii=False, indent=2) + ";\n"

with open("src/data/mockMeditations.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("src/data/mockMeditations.ts atualizado com sucesso!")
