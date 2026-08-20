import asyncio
import os
import sys
import json
import edge_tts

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

VOICES = {
    "female_serene": "pt-BR-FranciscaNeural",
    "female_calm": "pt-BR-ThalitaNeural",
    "male_deep": "pt-BR-AntonioNeural",
}

def p(ms=3000):
    """Helper to generate SSML breaks. Max per tag is 5000ms."""
    breaks = []
    remaining = ms
    while remaining > 0:
        chunk = min(5000, remaining)
        breaks.append(f"<break time='{chunk}ms'/>")
        remaining -= chunk
    return "".join(breaks)

# Comprehensive, natural, adapted PT-BR scripts with breathing silences
SESSIONS_CONFIG = [
    # -------------------------------------------------------------
    # 1. ENTRADA: Presença, Clareza & Foco (Mindset) (~3 min)
    # -------------------------------------------------------------
    {
        "id": "mindfulness_mindset_1",
        "filename": "meditacao_mindset.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-14%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acolhimento & Postura",
                "focus": "breathing",
                "text": "Bem-vindo a este momento de pausa e renovação da sua mente." + p(2500) +
                        "Encontre uma posição confortável, com a coluna alinhada, ereta e os ombros totalmente relaxados." + p(3000) +
                        "Feche suavemente os olhos ou suavize o seu olhar para um ponto à sua frente." + p(3000) +
                        "Permita-se pousar completamente no momento presente, deixando o mundo lá fora por alguns instantes." + p(5000)
            },
            {
                "id": 2,
                "phase": "2. Ancoragem Respiratória",
                "focus": "breathing",
                "text": "Traga agora toda a sua atenção para o ar que entra e sai." + p(3000) +
                        "Inspire profundamente pelo nariz em quatro tempos... um... dois... três... quatro..." + p(3000) +
                        "Segure o ar suavemente..." + p(3000) +
                        "E solte devagar pela boca em seis tempos... soltando o peso dos ombros e do peito." + p(6000)
            },
            {
                "id": 3,
                "phase": "3. Respiração de Alívio",
                "focus": "breathing",
                "text": "Mais uma vez... puxe o ar com serenidade, preenchendo o abdômen..." + p(4000) +
                        "Retenha o ar por instantes..." + p(3000) +
                        "E expire lentamente, liberando qualquer pressa, cobrança ou ansiedade acumulada." + p(6000) +
                        "Sinta o ritmo natural do seu corpo se harmonizar com a tranquilidade." + p(6000)
            },
            {
                "id": 4,
                "phase": "4. Desaceleração & Escaneamento",
                "focus": "awareness",
                "text": "Observe as sensações do seu corpo." + p(3000) +
                        "Solte a tensão do maxilar, destranque os dentes, suavize a testa e ao redor dos olhos." + p(4000) +
                        "Não há nada urgente para resolver neste segundo." + p(4000) +
                        "Este é o seu espaço seguro de clareza e paz interior." + p(6000)
            },
            {
                "id": 5,
                "phase": "5. Observador Sem Julgamento",
                "focus": "awareness",
                "text": "Se pensamentos ou tarefas surgirem na sua mente, não tente lutar contra eles." + p(3500) +
                        "Apenas observe-os como nuvens passando em um céu aberto e limpo." + p(4000) +
                        "Reconheça o pensamento e, sem se apegar, volte suavemente sua atenção para a respiração." + p(6000)
            },
            {
                "id": 6,
                "phase": "6. Reprogramação de Mindset",
                "focus": "mindset",
                "text": "Interiorize agora estas convicções com firmeza e serenidade:" + p(3000) +
                        "Eu escolho a calma no lugar da agitação." + p(3500) +
                        "Minha mente tem clareza, discernimento e autogoverno." + p(3500) +
                        "Eu repouso na certeza da paz e confio nos propósitos de Deus para a minha vida." + p(5000)
            },
            {
                "id": 7,
                "phase": "7. Integração & Retorno",
                "focus": "integration",
                "text": "Respire fundo uma última vez." + p(4000) +
                        "Sinta uma energia limpa e renovada percorrendo todo o seu corpo." + p(3500) +
                        "Comece a movimentar suavemente os dedos das mãos e dos pés..." + p(3500) +
                        "E quando se sentir pronto, abra os olhos, levando este foco e esta paz para todo o seu dia." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 2. TEMÁTICA: Calma & Foco no Trânsito (Olhos Abertos) (~3 min)
    # -------------------------------------------------------------
    {
        "id": "meditacao_transito",
        "filename": "meditacao_transito.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-14%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura & Olhos Abertos na Via",
                "focus": "awareness",
                "text": "Esta é uma prática de atenção plena para motoristas. Mantenha os olhos bem abertos e totalmente focados na pista." + p(3500) +
                        "Ajuste sua postura no banco, apoie bem as costas no encosto e sinta a firmeza dos pedais sob os pés." + p(4000) +
                        "Afrouxe o aperto excessivo das mãos no volante. Você pode segurar o volante com firmeza, mas sem rigidez." + p(5000)
            },
            {
                "id": 2,
                "phase": "2. Respiração no Fluxo do Trânsito",
                "focus": "breathing",
                "text": "Aproveite uma parada no semáforo ou o ritmo da pista para respirar com consciência." + p(3500) +
                        "Inspire profundamente pelo nariz, expandindo suavemente o abdômen..." + p(4000) +
                        "E solte o ar devagar pela boca, liberando a pressa, a impaciência e a sensação de urgência." + p(5000) +
                        "O trânsito tem seu próprio ritmo. A sua tranquilidade é uma escolha pessoal." + p(5000)
            },
            {
                "id": 3,
                "phase": "3. Desarme de Irritabilidade",
                "focus": "awareness",
                "text": "Observe se você está contraindo o maxilar ou franzindo a testa." + p(3500) +
                        "Destranque os dentes, relaxe os ombros e a face." + p(4000) +
                        "Se outro motorista cometer um erro, escolha não reagir com raiva. Escolha o discernimento e a prudência." + p(5000)
            },
            {
                "id": 4,
                "phase": "4. Salmo 121 & Proteção",
                "focus": "mindset",
                "text": "Ancore seu coração na promessa do Salmo 121:" + p(3000) +
                        "O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre." + p(4000) +
                        "Você está guardado, conduzindo com responsabilidade, paciência e sabedoria." + p(5000)
            },
            {
                "id": 5,
                "phase": "5. Direção Serena e Segura",
                "focus": "integration",
                "text": "Faça mais uma respiração calma e profunda." + p(3500) +
                        "Mantenha a atenção panorâmica e segura ao redor do seu veículo." + p(3500) +
                        "Siga a sua jornada em paz, sabendo que a serenidade é a sua maior proteção ao volante." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 3. TEMÁTICA: Sono Profundo & Repouso (~4 min)
    # -------------------------------------------------------------
    {
        "id": "meditacao_sono",
        "filename": "meditacao_sono.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-4Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Desligamento do Dia",
                "focus": "breathing",
                "text": "Deite-se confortavelmente em sua cama. Feche suavemente os olhos e permita-se pousar no repouso." + p(4000) +
                        "Tudo o que aconteceu hoje já terminou. Não há nada mais que você precise resolver ou planejar esta noite." + p(4000) +
                        "Este é o momento de soltar o peso do dia e descansar." + p(6000)
            },
            {
                "id": 2,
                "phase": "2. Respiração Desacelerada (4-7-8)",
                "focus": "breathing",
                "text": "Vamos desacelerar os batimentos cardíacos com a respiração profunda." + p(3000) +
                        "Inspire suavemente pelo nariz em quatro tempos... um... dois... três... quatro..." + p(3000) +
                        "Segure o ar por sete tempos com serenidade..." + p(4000) +
                        "E solte lentamente pela boca em oito tempos... esvaziando todo o ar..." + p(6000) +
                        "Mais uma vez... puxe o ar com leveza... retenha..." + p(3500) +
                        "E solte bem devagar, sentindo o corpo afundar no colchão." + p(8000)
            },
            {
                "id": 3,
                "phase": "3. Soltura Muscular Noturna",
                "focus": "awareness",
                "text": "Sinta os ombros se soltarem sobre o travesseiro." + p(3500) +
                        "Desarme os punhos, relaxe os dedos das mãos." + p(3500) +
                        "Solte a mandíbula, a língua e os músculos ao redor dos olhos." + p(4000) +
                        "Sinta as pernas pesadas e aconchegadas. Deixe a gravidade cuidar do seu corpo." + p(7000)
            },
            {
                "id": 4,
                "phase": "4. Entrega das Preocupações",
                "focus": "mindset",
                "text": "Coloque cada preocupação nas mãos de Deus." + p(3500) +
                        "O que ficou pendente, amanhã terá o seu momento. Deus cuida de tudo enquanto você dorme." + p(4000) +
                        "Nada ameaça a sua paz esta noite." + p(6000)
            },
            {
                "id": 5,
                "phase": "5. Salmo 4:8 & Sono Restaurador",
                "focus": "integration",
                "text": "Em paz me deito e logo pego no sono, pois só Tu, Senhor, me fazes repousar em perfeita segurança." + p(4000) +
                        "Deixe a sua respiração ficar cada vez mais sutil, suave e silenciosa..." + p(5000) +
                        "Deixe o sono restaurador envolver o seu corpo e a sua alma. Durma em perfeita paz." + p(5000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 4. TEMÁTICA: Alívio da Ansiedade & Pânico (~4 min)
    # -------------------------------------------------------------
    {
        "id": "meditacao_ansiedade",
        "filename": "meditacao_ansiedade.mp3",
        "voice": VOICES["female_calm"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acolhimento da Emoção",
                "focus": "breathing",
                "text": "Coloque uma mão suavemente sobre o seu peito e a outra sobre o seu abdômen." + p(3500) +
                        "Sinta o calor das suas mãos tocando o seu corpo." + p(3500) +
                        "Você está em um lugar seguro agora. Você não está sozinho e nada de mal vai acontecer." + p(5000)
            },
            {
                "id": 2,
                "phase": "2. Respiração de Emergência Vagal",
                "focus": "breathing",
                "text": "Vamos ativar o sistema de calma do seu corpo." + p(3000) +
                        "Puxe o ar suavemente pelo nariz, sentindo a barriga empurrar a sua mão para fora..." + p(4000) +
                        "Segure o ar por um instante..." + p(2500) +
                        "E sopre bem devagar pelos lábios entreabertos, como se esfriasse suavemente uma vela sem apagá-la..." + p(6000) +
                        "Mais uma vez... inspire calma..." + p(3500) +
                        "E expire soltando todo o aperto do peito e da garganta." + p(7000)
            },
            {
                "id": 3,
                "phase": "3. Dissolução do Aperto",
                "focus": "awareness",
                "text": "Permita que o ritmo cardíaco se normalize no seu próprio tempo." + p(3500) +
                        "Repita internamente com compaixão:" + p(3000) +
                        "Eu estou seguro. Esta sensação desconfortável é passageira e já está diminuindo. O controle pertence a Deus." + p(6000)
            },
            {
                "id": 4,
                "phase": "4. Filipenses 4:6-7",
                "focus": "mindset",
                "text": "A Palavra nos lembra:" + p(3000) +
                        "Não andem ansiosos por coisa alguma, mas em tudo apresentem seus pedidos a Deus com ação de graças." + p(4000) +
                        "E a paz de Deus, que excede todo o entendimento humano, guardará os seus corações e as suas mentes." + p(6000)
            },
            {
                "id": 5,
                "phase": "5. Firmeza e Calmaria",
                "focus": "integration",
                "text": "Respire com naturalidade e sinta a estabilidade dos seus pés apoiados no chão." + p(4000) +
                        "Sinta a calma retornando ao seu ser." + p(3500) +
                        "Abra os olhos suavemente, sabendo que você superou este momento com graça e fortaleza." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 5. TEMÁTICA: Clareza Mental no Trabalho (~4 min)
    # -------------------------------------------------------------
    {
        "id": "meditacao_trabalho",
        "filename": "meditacao_trabalho.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-14%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pausa Consciente na Rotina",
                "focus": "breathing",
                "text": "Afaste os olhos da tela por um instante. Descanse as mãos sobre as pernas ou sobre a mesa." + p(3500) +
                        "Sinta o contato dos pés com o chão e alinhe a sua coluna." + p(3500) +
                        "Esta pausa intencional de poucos minutos vai multiplicar a sua clareza e produtividade." + p(5000)
            },
            {
                "id": 2,
                "phase": "2. Limpeza do Ruído Mental",
                "focus": "breathing",
                "text": "Inspire profundamente pelo nariz, trazendo foco e oxigênio para a sua mente..." + p(4000) +
                        "E ao expirar, solte a sobrecarga de tarefas, a pressa e a sensação de urgência." + p(5000) +
                        "Você não precisa fazer tudo ao mesmo tempo. Você só precisa fazer a próxima coisa certa com presença." + p(6000)
            },
            {
                "id": 3,
                "phase": "3. Sabedoria e Discernimento",
                "focus": "awareness",
                "text": "A sabedoria bíblica em Tiago 1:5 nos orienta:" + p(3000) +
                        "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente." + p(4000) +
                        "Você não precisa agir por impulso ou pressão. Você tem a serenidade para discernir a melhor decisão." + p(6000)
            },
            {
                "id": 4,
                "phase": "4. Propósito no Fazer",
                "focus": "mindset",
                "text": "Tudo o que fizerem, façam de todo o coração, como para o Senhor." + p(3500) +
                        "O seu trabalho é um meio de servir, edificar e exercer seus dons com dignidade." + p(4000) +
                        "Sua mente é organizada, firme e focada no essencial." + p(5000)
            },
            {
                "id": 5,
                "phase": "5. Retorno com Foco Renovado",
                "focus": "integration",
                "text": "Faça mais uma respiração profunda e consciente." + p(3500) +
                        "Abra os olhos com determinação e paz, pronto para executar suas tarefas com excelência e serenidade." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 6. TEMÁTICA: Despertar com Propósito (~3 min)
    # -------------------------------------------------------------
    {
        "id": "meditacao_despertar",
        "filename": "meditacao_despertar.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-14%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acolhimento do Novo Dia",
                "focus": "breathing",
                "text": "Bom dia. Sente-se com as costas retas, sinta a luz da manhã e acolha este novo começo com gratidão." + p(3500) +
                        "As misericórdias do Senhor se renovam a cada manhã. Este é um dia inédito e cheio de oportunidades." + p(5000)
            },
            {
                "id": 2,
                "phase": "2. Oxigenação & Energia Limpa",
                "focus": "breathing",
                "text": "Inspire vigorosamente pelo nariz, expandindo o peito e enchendo os pulmões de ar puro..." + p(4000) +
                        "E expire com um sorriso sereno nos lábios, despertando cada célula do seu corpo com disposição." + p(5000) +
                        "Mais uma vez... puxe energia e ânimo..." + p(3500) +
                        "E solte qualquer resquício de sono ou cansaço." + p(5000)
            },
            {
                "id": 3,
                "phase": "3. O Dom da Gratidão",
                "focus": "awareness",
                "text": "Traga à mente três bênçãos pelas quais você é verdadeiramente grato hoje." + p(3500) +
                        "Agradeça pela saúde, pelo fôlego de vida e pela proteção que te acompanhou até aqui." + p(5000)
            },
            {
                "id": 4,
                "phase": "4. Salmo 143:8 & Direcionamento",
                "focus": "mindset",
                "text": "Faze-me ouvir da Tua fidelidade pela manhã, pois em Ti confio." + p(3500) +
                        "Mostra-me o caminho em que devo andar, guarda a minha boca de palavras vãs e abençoa as minhas mãos no trabalho." + p(5000)
            },
            {
                "id": 5,
                "phase": "5. Pronto para o Dia",
                "focus": "integration",
                "text": "Abra os olhos com alegria, determinação e esperança." + p(3000) +
                        "O seu dia será iluminado, produtivo e cheio da paz de Deus. Vá em frente!" + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 7. JORNADA - FASE 1: Ancoragem Sonora & Presença (Baseada no PDF Body & Sound - 3 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_1_ancoragem_sonora",
        "filename": "jornada_fase_1.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Percepção Postural & Consciência",
                "focus": "breathing",
                "text": "Iniciamos a Fase 1 da sua jornada de meditação." + p(3000) +
                        "Comece observando a postura em que você se encontra agora." + p(3000) +
                        "Você pode estar sentado, em pé ou deitado." + p(3000) +
                        "Perceba o seu corpo exatamente como ele está neste instante." + p(4000) +
                        "Veja se consegue se sintonizar com qualquer sensação presente no seu corpo físico agora." + p(4000) +
                        "Pode haver sensação de peso ou leveza... pressão... apoio..." + p(4000) +
                        "Pode haver calor, frescor, vibração ou movimento sutil." + p(4000) +
                        "Tudo o que você precisa fazer é notar essas sensações com curiosidade e gentileza." + p(6000)
            },
            {
                "id": 2,
                "phase": "2. Respiração de Abertura",
                "focus": "breathing",
                "text": "Faça uma respiração profunda..." + p(4000) +
                        "E ao expirar, relaxe." + p(4000) +
                        "Não há nada de complicado a fazer, apenas estar plenamente presente e atento." + p(6000)
            },
            {
                "id": 3,
                "phase": "3. Escuta Aberta dos Sons",
                "focus": "awareness",
                "text": "Agora, solte as sensações do corpo e volte a sua atenção para os sons ao seu redor." + p(4000) +
                        "Sons dentro do ambiente ou vindos do lado de fora." + p(4000) +
                        "Podem ser sons mais altos, ou quase imperceptíveis..." + p(4000) +
                        "Você também pode perceber o silêncio que existe entre um som e outro." + p(5000) +
                        "Os sons surgem, ecoam e desaparecem no seu próprio tempo." + p(6000) +
                        "Uma tendência natural da nossa mente é querer criar histórias sobre o que ouvimos, ou julgar se gostamos ou não do barulho." + p(4000) +
                        "Veja se você consegue apenas escutar o som de forma neutra, como uma vibração no ar." + p(6000)
            },
            {
                "id": 4,
                "phase": "4. Integração do Corpo e Retorno",
                "focus": "integration",
                "text": "Agora, volte novamente a atenção para o seu corpo aqui presente." + p(3500) +
                        "Sinta o contato firme com o chão ou com a cadeira." + p(3500) +
                        "Faça mais uma respiração profunda... suavize o rosto..." + p(4000) +
                        "E quando se sentir pronto, você pode abrir suavemente os olhos." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 8. JORNADA - FASE 2: Alívio Físico & Escaneamento Rápido (Baseada no PDF Body Scan - 3 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_2_escaneamento_rapido",
        "filename": "jornada_fase_2.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pousando no Corpo Físico",
                "focus": "breathing",
                "text": "Bem-vindo à Fase 2: Escaneamento Corporal Rápido." + p(3000) +
                        "Comece trazendo sua atenção para dentro do corpo. Feche os olhos se isso for confortável para você." + p(3500) +
                        "Perceba o peso do corpo apoiado na cadeira ou no chão." + p(4000) +
                        "Faça algumas respirações profundas." + p(3500) +
                        "Ao inspirar, traga oxigênio renovando todo o seu organismo." + p(4000) +
                        "E ao expirar, tenha a sensação de relaxar em um nível mais profundo." + p(6000)
            },
            {
                "id": 2,
                "phase": "2. Pés, Pernas e Costas",
                "focus": "awareness",
                "text": "Traga a atenção para os seus pés apoiados no chão." + p(3500) +
                        "Sinta a pressão, a temperatura, o toque com o chão." + p(4000) +
                        "Suba a atenção pelas pernas e pelas coxas apoiadas na cadeira... perceba o peso e o repouso." + p(4000) +
                        "Sinta as suas costas encostadas no assento, soltando a musculatura lombar." + p(5000)
            },
            {
                "id": 3,
                "phase": "3. Abdômen, Mãos e Ombros",
                "focus": "awareness",
                "text": "Leve a atenção para a área do estômago e do abdômen." + p(3500) +
                        "Se houver rigidez ou aperto, permita que a barriga se solte e amoleça." + p(4000) +
                        "Respire..." + p(3000) +
                        "Note as suas mãos. Elas estão contraídas? Deixe as mãos e os dedos relaxarem completamente." + p(4000) +
                        "Suba pelos braços até os ombros. Deixe os ombros caírem e se soltarem com leveza." + p(5000)
            },
            {
                "id": 4,
                "phase": "4. Pescoço, Rosto e Conclusão",
                "focus": "integration",
                "text": "Sinta o pescoço e a garganta relaxados." + p(3000) +
                        "Destranque o maxilar, solte a língua e suavize os músculos faciais e a testa." + p(4000) +
                        "Agora, sinta todo o seu corpo integrado em presença e calma." + p(4000) +
                        "Faça uma última respiração completa... e quando quiser, abra os olhos com tranquilidade." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 9. JORNADA - FASE 3: Respiração Serena & Clareza (Baseada no PDF Breathing - 5 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_3_respiracao_serena",
        "filename": "jornada_fase_3.mp3",
        "voice": VOICES["female_calm"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura Confortável & Firme",
                "focus": "breathing",
                "text": "Bem-vindo à Fase 3: Meditação da Respiração Consciente." + p(3000) +
                        "Encontre uma posição confortável e relaxada, sentado em uma cadeira ou sobre uma almofada." + p(3500) +
                        "Mantenha a coluna ereta, sem rigidez. As mãos repousando sobre as pernas." + p(4000) +
                        "Observe o seu corpo a partir de dentro: o formato, o peso, o contato com o chão." + p(4000) +
                        "Permita-se relaxar e sinta curiosidade sobre a sua experiência aqui e agora." + p(6000)
            },
            {
                "id": 2,
                "phase": "2. Sintonizando o Fluxo da Respiração",
                "focus": "breathing",
                "text": "Agora, comece a se sintonizar com a sua respiração natural." + p(3500) +
                        "Você não precisa mudar ou forçar nada. Apenas sinta o fluxo orgânico do ar." + p(4000) +
                        "Perceba onde a sensação do ar é mais nítida no seu corpo:" + p(3500) +
                        "Pode ser no movimento suave do abdômen subindo e descendo..." + p(4000) +
                        "Pode ser na expansão do peito..." + p(4000) +
                        "Ou no toque fresco do ar entrando e saindo pelas narinas." + p(6000) +
                        "Acompanhe uma respiração de cada vez. Quando uma termina, a próxima começa naturalmente." + p(8000)
            },
            {
                "id": 3,
                "phase": "3. Reconduzindo a Mente Gentilmente",
                "focus": "awareness",
                "text": "Enquanto você faz isso, é absolutamente natural que sua mente comece a divagar para pensamentos, memórias ou listas de afazeres." + p(4000) +
                        "Isso não é um erro ou problema. Apenas note que a mente viajou." + p(4000) +
                        "Você pode dizer baixinho internamente: 'pensamento' ou 'divagando'..." + p(3500) +
                        "E com muita gentileza, traga o foco de volta para o ar que entra e sai." + p(8000) +
                        "Vamos permanecer agora em alguns instantes de silêncio e presença, acolhendo cada respiração." + p(15000)
            },
            {
                "id": 4,
                "phase": "4. Apreciação e Retorno",
                "focus": "integration",
                "text": "Mais uma vez, sinta todo o seu corpo sentado aqui." + p(3500) +
                        "Relaxe ainda mais profundamente." + p(4000) +
                        "Ofereça a si mesmo um sentimento de gratidão por ter dedicado esses cinco minutos ao seu cuidado e equilíbrio mental." + p(4000) +
                        "Respire fundo... e abra os olhos com calma, levando essa clareza para o seu dia." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 10. JORNADA - FASE 4: Superando Momentos Difíceis (Baseada no PDF Difficulties - 7 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_4_superando_desafios",
        "filename": "jornada_fase_4.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Localizando um Porto Seguro no Corpo",
                "focus": "awareness",
                "text": "Bem-vindo à Fase 4: Prática para Lidar com Emoções e Sensações Difíceis." + p(3500) +
                        "Encontre uma postura estável e confortável." + p(3000) +
                        "Primeiro, faça um escaneamento interno e localize uma parte do seu corpo que se sinta neutra, segura ou agradável agora." + p(4000) +
                        "Pode ser a palma das mãos, os pés apoiados no chão ou as pernas." + p(4000) +
                        "Deixe a sua atenção descansar nesse ponto de estabilidade por alguns instantes." + p(6000) +
                        "Sinta essa âncora de segurança... respire com tranquilidade." + p(8000)
            },
            {
                "id": 2,
                "phase": "2. Olhando para o Desconforto com Gentileza",
                "focus": "awareness",
                "text": "Agora, se houver alguma emoção difícil ou desconforto físico presente — como tristeza, ansiedade, aperto no peito ou tensão nos ombros — permita que sua atenção se aproxime suavemente dessa área." + p(4500) +
                        "Onde exatamente você sente esse peso no corpo?" + p(4000) +
                        "Apenas observe por um instante. Não tente lutar ou empurrar o sentimento para longe." + p(5000) +
                        "Respire suavemente ao redor dessa sensação..." + p(6000) +
                        "E agora, retorne a atenção para o seu porto seguro: suas mãos ou seus pés bem apoiados." + p(6000) +
                        "Dê a si mesmo essa pausa reconfortante, sentindo a estabilidade do chão." + p(8000)
            },
            {
                "id": 3,
                "phase": "3. O Olhar Panorâmico sem Julgamento",
                "focus": "mindset",
                "text": "Mais uma vez, com calma, volte a perceber a região de tensão ou preocupação." + p(4000) +
                        "Mantenha 70% da sua atenção na área segura e tranquila, enquanto lança um olhar gentil e sem medo sobre o desconforto." + p(5000) +
                        "Observe: a sensação está aumentando, diminuindo ou mudando de lugar?" + p(5000) +
                        "Toda emoção e toda dor física são como ondas que sobem, atingem o ápice e depois recuam." + p(6000) +
                        "Você não é a tempestade; você é o espaço amplo onde ela passa." + p(10000)
            },
            {
                "id": 4,
                "phase": "4. Autocompaixão & Conclusão",
                "focus": "integration",
                "text": "Traga agora um sentimento profundo de bondade e acolhimento para consigo mesmo." + p(3500) +
                        "Muitas pessoas passam por momentos difíceis como este. Você não está sozinho." + p(4000) +
                        "Que possamos todos encontrar alívio, paz e discernimento em meio aos desafios." + p(4000) +
                        "Respire fundo, sinta a sua força restaurada e abra os olhos com serenidade." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 11. JORNADA - FASE 5: Bondade Amorosa, Perdão & Empatia (Baseada no PDF Loving Kindness - 9 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_5_bondade_amorosa",
        "filename": "jornada_fase_5.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Abertura do Coração",
                "focus": "awareness",
                "text": "Bem-vindo à Fase 5: Meditação da Bondade Amorosa e Compaixão." + p(3500) +
                        "Acomode-se confortavelmente. Esta prática cultiva emoções nobres que fortalecem o coração e a saúde emocional." + p(4000) +
                        "A bondade amorosa é o desejo sincero de bem-estar, paz e proteção para si e para os outros." + p(4000) +
                        "Perceba como seu corpo se sente agora, deixando o peito se abrir com suavidade." + p(6000)
            },
            {
                "id": 2,
                "phase": "2. Conectando com Alguém Querido",
                "focus": "mindset",
                "text": "Traga à sua mente a imagem de alguém que, ao lembrar, você sente um carinho espontâneo e imediato." + p(4000) +
                        "Pode ser um filho, um grande amigo, um mentor ou até mesmo um animal de estimação querido." + p(4000) +
                        "Imagine essa pessoa na sua frente agora. Sinta a presença dela." + p(4000) +
                        "Perceba o calor agradável que surge no seu peito e o leve sorriso no seu rosto." + p(5000) +
                        "Comece a direcionar a ela estes votos sinceros:" + p(3500) +
                        "Que você esteja seguro e protegido de todo perigo." + p(4000) +
                        "Que você seja verdadeiramente feliz e viva em paz." + p(4000) +
                        "Que você tenha saúde, força e bem-estar em todos os seus dias." + p(6000) +
                        "Sinta essa intenção pura alcançando e envolvendo essa pessoa querida." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Recebendo e Estendendo a Bondade",
                "focus": "mindset",
                "text": "Agora, imagine essa pessoa olhando para você e retribuindo todo esse amor e bênção." + p(4000) +
                        "Permita-se receber essas palavras em seu próprio coração:" + p(3500) +
                        "Que eu esteja seguro e em paz." + p(4000) +
                        "Que eu tenha saúde e ânimo renovado." + p(4000) +
                        "Que eu acolha a mim mesmo com graça e misericórdia." + p(6000) +
                        "Em seguida, expanda essa luz para as pessoas ao seu redor, sua família, seus vizinhos..." + p(4000) +
                        "E até mesmo para aqueles com quem você teve divergências, liberando todo ressentimento." + p(8000) +
                        "Que todos possam encontrar a paz e o perdão que transformam a vida." + p(10000)
            },
            {
                "id": 4,
                "phase": "4. Consolidação da Paz Interior",
                "focus": "integration",
                "text": "Sinta o alívio e a leveza de um coração livre de amarras." + p(3500) +
                        "O amor é o vínculo perfeito da unidade e da paz." + p(4000) +
                        "Respire fundo, guarde essa calmaria generosa dentro de você e abra os olhos com amor e renovação." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 12. JORNADA - FASE 6: Harmonia Plena: Respiração, Som & Corpo (Baseada no PDF Breath, Sound, Body - 12 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_6_harmonia_plena",
        "filename": "jornada_fase_6.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. A Âncora da Respiração",
                "focus": "breathing",
                "text": "Bem-vindo à Fase 6: Integração de Respiração, Som e Consciência Corporal." + p(3500) +
                        "Encontre sua postura meditativa: coluna alinhada, postura digna e relaxada." + p(4000) +
                        "Comece sintonizando a respiração no abdômen ou no fluxo das narinas." + p(4000) +
                        "A respiração é a sua âncora constante — o porto seguro para onde você sempre pode retornar." + p(6000) +
                        "Sinta o subir e descer suave do peito e do abdômen por alguns instantes." + p(12000)
            },
            {
                "id": 2,
                "phase": "2. Ampliação para o Campo Auditivo",
                "focus": "awareness",
                "text": "Agora, suavemente, abra sua consciência para os sons do ambiente." + p(4000) +
                        "Sons próximos na sala, ou distantes lá fora." + p(4000) +
                        "Ouça sem classificar ou criar narrativas. Apenas receba os sons como ondas que chegam e partem." + p(5000) +
                        "Perceba também os intervalos de silêncio entre os ruídos." + p(8000) +
                        "Descanse na simples experiência de escutar com clareza e quietude." + p(15000)
            },
            {
                "id": 3,
                "phase": "3. Sensações do Corpo e Integração",
                "focus": "awareness",
                "text": "Solte a audição e traga a atenção para as sensações corporais." + p(4000) +
                        "Perceba a temperatura, o pulsar sutil, a sensação de contato com o chão." + p(5000) +
                        "Se surgir uma sensação intensa, apenas observe-a com calma, sem tensão." + p(6000) +
                        "Quando a sensação diminuir, retorne tranquilamente para a sua âncora: o ar que entra e sai." + p(8000) +
                        "Vamos praticar essa alternância serena durante alguns momentos de silêncio e presença." + p(20000)
            },
            {
                "id": 4,
                "phase": "4. Conclusão da Fase 6",
                "focus": "integration",
                "text": "Perceba a harmonia completa entre sua respiração, seu corpo e o ambiente ao redor." + p(4000) +
                        "Deseje a si mesmo paz, saúde e lucidez." + p(4000) +
                        "Respire fundo, movimente suavemente as extremidades e abra os olhos com tranquilidade e autogoverno." + p(3000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 13. JORNADA - FASE 7: Escaneamento para o Sono Profundo (Baseada no PDF Body Scan for Sleep - 14 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_7_sono_restaurador",
        "filename": "jornada_fase_7.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-4Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Preparação Noturna & Cabeça",
                "focus": "breathing",
                "text": "Esta é uma meditação de escaneamento corporal profundo para preparar você para uma noite de sono reparador." + p(4000) +
                        "Se você adormecer durante a prática, isso é perfeitamente natural." + p(4000) +
                        "Se pensamentos sobre o dia surgirem, apenas solte-os e retorne a atenção ao corpo." + p(4000) +
                        "Comece sentindo o topo da sua cabeça e o couro cabeludo apoiado no travesseiro." + p(4000) +
                        "Sinta o peso suave da cabeça se entregando ao descanso..." + p(6000) +
                        "Solte a testa, suavize as pálpebras, relaxe as bochechas e a mandíbula." + p(8000)
            },
            {
                "id": 2,
                "phase": "2. Ombros, Braços e Mãos",
                "focus": "awareness",
                "text": "Desça a atenção para o pescoço e para os ombros." + p(4000) +
                        "Sinta todo o peso carregado durante o dia se dissipando dos ombros." + p(4000) +
                        "Siga pelo braço esquerdo... cotovelo... antebraço... mão e dedos esquerdos..." + p(5000) +
                        "Sinta a mão esquerda pesada, quente e relaxada..." + p(6000) +
                        "Agora leve a atenção para o ombro direito... descendo pelo braço... cotovelo... antebraço... mão e dedos direitos..." + p(6000) +
                        "Ambos os braços descansando completamente soltos na cama." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Costas, Peito e Abdômen",
                "focus": "awareness",
                "text": "Traga a consciência para as costas." + p(4000) +
                        "Sinta a parte superior das costas afundando no colchão... o meio das costas... a região lombar..." + p(5000) +
                        "Sinta o peito respirando em ondas lentas e tranquilas..." + p(5000) +
                        "Sinta o abdômen subindo e descendo com suavidade, sem esforço algum..." + p(8000)
            },
            {
                "id": 4,
                "phase": "4. Pernas, Pés e Entrega ao Sono",
                "focus": "integration",
                "text": "Leve a atenção para o quadril, coxas, joelhos e panturrilhas..." + p(5000) +
                        "Sinta as pernas pesadas, relaxadas e aquecidas..." + p(5000) +
                        "Até a sola dos pés e cada um dos dedos..." + p(5000) +
                        "Todo o seu corpo agora repousa em perfeita harmonia e paz." + p(6000) +
                        "Entregue-se com confiança ao sono restaurador que Deus preparou para você. Durma em paz." + p(8000)
            }
        ]
    },

    # -------------------------------------------------------------
    # 14. JORNADA - FASE 8: Instruções Completas de Meditação & Maestria (Baseada no PDF Complete Meditation - 18-19 min)
    # -------------------------------------------------------------
    {
        "id": "jornada_fase_8_imersao_plena",
        "filename": "jornada_fase_8.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura Digna & A Âncora Central",
                "focus": "breathing",
                "text": "Bem-vindo à Fase 8: A prática formal completa de meditação e presença contemplativa." + p(4000) +
                        "Encontre sua postura com a coluna ereta, aberta e relaxada." + p(4000) +
                        "Sinta o peso do corpo a partir de dentro, acolhendo o silêncio que se estabelece." + p(4000) +
                        "Deixe a sua atenção descansar na respiração natural." + p(4000) +
                        "A respiração é a sua base firme — onde você sempre encontra quietude e discernimento." + p(6000) +
                        "Acompanhe uma respiração de cada vez, com curiosidade e entrega." + p(15000)
            },
            {
                "id": 2,
                "phase": "2. Navegando por Sons, Sensações e Emoções",
                "focus": "awareness",
                "text": "Agora, permita que sua atenção observe o que surgir com maior intensidade:" + p(4000) +
                        "Se um som exterior chamar a atenção, apenas escute-o até que passe, e retorne à respiração." + p(5000) +
                        "Se uma sensação corporal ou desconforto se destacar, sinta-a sem julgamento até que se dissipe, voltando em seguida para a âncora." + p(6000) +
                        "Se uma emoção se fizer presente — seja alegria, cansaço ou preocupação — nomeie a emoção com gentileza e sinta onde ela repercute no corpo." + p(6000) +
                        "Reconheça e volte sempre para a simplicidade de respirar." + p(15000)
            },
            {
                "id": 3,
                "phase": "3. Espaço de Silêncio e Contemplação",
                "focus": "mindset",
                "text": "Quando pensamentos começarem a se formar, apenas observe-os sem se envolver na história." + p(4000) +
                        "Diga mentalmente: 'pensamento'... e solte." + p(4000) +
                        "No silêncio profundo, experimentamos a verdadeira liberdade e a presença de Deus sustentando cada batimento." + p(6000) +
                        "Permaneceremos agora em silêncio pleno, descansando na quietude do ser." + p(25000)
            },
            {
                "id": 4,
                "phase": "4. Consagração das 8 Fases e Retorno",
                "focus": "integration",
                "text": "Sinta todo o seu corpo integrado em profunda paz e equilíbrio." + p(4000) +
                        "Você completou a jornada das 8 fases de evolução meditativa." + p(4000) +
                        "Essa serenidade não termina aqui; ela é uma fonte contínua dentro de você para todas as decisões da sua vida." + p(5000) +
                        "Faça uma respiração profunda, agradeça por este momento e abra os olhos com clareza, força e propósito!" + p(3000)
            }
        ]
    }
]

async def generate_all_full_length():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)

    timing_results = {}

    for session in SESSIONS_CONFIG:
        filename = session["filename"]
        audio_path = os.path.join(output_dir, filename)
        voice = session["voice"]
        rate = session["rate"]
        pitch = session["pitch"]

        # Build full SSML text
        ssml_body = ""
        for step in session["steps"]:
            ssml_body += step["text"] + " "

        full_ssml = f"""<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='pt-BR'>
<voice name='{voice}'>
{ssml_body}
</voice>
</speak>"""

        print(f"🎙️ Gerando {filename} em PT-BR com pausas de respiração...")
        communicate = edge_tts.Communicate(full_ssml, voice=voice, rate=rate, pitch=pitch)
        await communicate.save(audio_path)
        
        # Calculate real duration based on MP3 size (~16000 bytes/sec at 128kbps)
        file_size = os.path.getsize(audio_path)
        actual_duration_secs = round(file_size / 16000)
        print(f"  ✅ Salvo: {audio_path} ({file_size:,} bytes, ~{actual_duration_secs}s / {actual_duration_secs//60}m {actual_duration_secs%60}s)")

        # Distribute timing across steps proportionally to text+pause length
        total_weight = 0
        step_weights = []
        for step in session["steps"]:
            # Weight = character length + count of breaks
            break_count = step["text"].count("<break")
            w = len(step["text"]) + (break_count * 80)
            step_weights.append(w)
            total_weight += w

        current_sec = 0.0
        calculated_steps = []
        for i, step in enumerate(session["steps"]):
            step_dur = (step_weights[i] / total_weight) * actual_duration_secs
            start_sec = round(current_sec, 1)
            end_sec = round(min(actual_duration_secs, current_sec + step_dur), 1)
            
            # Clean text for UI display (strip SSML tags)
            import re
            clean_text = re.sub(r"<[^>]+>", " ", step["text"])
            clean_text = " ".join(clean_text.split())

            calculated_steps.append({
                "id": step["id"],
                "phase": step["phase"],
                "focus": step["focus"],
                "startSeconds": start_sec,
                "endSeconds": end_sec,
                "text": clean_text
            })
            current_sec = end_sec

        timing_results[session["id"]] = {
            "audioUrl": f"/audio/{filename}",
            "durationSeconds": actual_duration_secs,
            "steps": calculated_steps
        }

    timing_file = os.path.join(os.getcwd(), "scripts", "meditation_timings.json")
    with open(timing_file, "w", encoding="utf-8") as f:
        json.dump(timing_results, f, ensure_ascii=False, indent=2)
    print(f"\n🎉 Todas as 14 locuções em PT-BR geradas com durações completas e pausas de respiração!")

if __name__ == "__main__":
    asyncio.run(generate_all_full_length())
