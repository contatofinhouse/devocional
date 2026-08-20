import asyncio
import os
import sys
import json
import re
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
    """Helper to generate SSML breaks. Max per tag in SSML is 5000ms."""
    breaks = []
    remaining = ms
    while remaining > 0:
        chunk = min(5000, remaining)
        breaks.append(f"<break time='{chunk}ms'/>")
        remaining -= chunk
    return "".join(breaks)

# 14 calibrated sessions (3m to 8m max)
CADENCED_SESSIONS = [
    # 1. Presença, Clareza & Foco (~3:00 min)
    {
        "id": "mindfulness_mindset_1",
        "filename": "meditacao_mindset.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-14%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pousando no Momento Presente",
                "focus": "breathing",
                "text": "Comece trazendo suavemente sua atenção para o momento presente." + p(2500) +
                        "Você pode fechar os olhos, se for confortável para você." + p(2500) +
                        "Perceba o seu corpo sentado... sentindo o peso sobre a cadeira e sobre o chão." + p(3000) +
                        "E respire fundo algumas vezes." + p(3000) +
                        "Ao inspirar... traga mais oxigênio, renovando e despertando o corpo." + p(3500) +
                        "E ao expirar... relaxe mais profundamente." + p(8000)
            },
            {
                "id": 2,
                "phase": "2. Escaneamento e Soltura",
                "focus": "awareness",
                "text": "Traga a atenção para os pés no chão... sinta o toque firme com o solo." + p(3000) +
                        "Perceba as pernas apoiadas na cadeira... e as costas encostadas no assento." + p(3000) +
                        "Traga a atenção para a área do abdômen... se houver tensão, deixe amolecer." + p(3500) +
                        "Note as suas mãos... permita que os dedos se soltem e relaxem." + p(3000) +
                        "Deixe os ombros caírem... destranque os dentes... suavize a testa." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Observação & Mindset de Paz",
                "focus": "mindset",
                "text": "Se pensamentos surgirem, apenas observe-os como nuvens passando no céu aberto." + p(3500) +
                        "E volte suavemente a atenção para a respiração." + p(3000) +
                        "Interiorize com calma em seu coração:" + p(2500) +
                        "Eu escolho a serenidade." + p(3000) +
                        "Minha mente é clara, lúcida e governada por Deus." + p(3000) +
                        "Eu descanso no presente." + p(10000)
            },
            {
                "id": 4,
                "phase": "4. Integração e Retorno",
                "focus": "integration",
                "text": "Perceba todo o seu corpo aqui presente." + p(3000) +
                        "Faça mais uma respiração consciente." + p(4000) +
                        "E quando se sentir pronto... abra suavemente os olhos." + p(3000)
            }
        ]
    },

    # 2. Calma & Foco no Trânsito (~3:00 min)
    {
        "id": "meditacao_transito",
        "filename": "meditacao_transito.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-14%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura & Olhos na Via",
                "focus": "awareness",
                "text": "Mantenha os olhos bem abertos e totalmente atentos na via." + p(3000) +
                        "Ajuste a sua postura no banco... sinta o apoio firme das costas." + p(3000) +
                        "Perceba as mãos no volante... solte o aperto exagerado dos dedos." + p(3000) +
                        "Segure com firmeza, mas sem rigidez nos punhos." + p(8000)
            },
            {
                "id": 2,
                "phase": "2. Respiração no Fluxo & Desarme",
                "focus": "breathing",
                "text": "Aproveite o fluxo da rua ou uma parada no semáforo para respirar." + p(3000) +
                        "Inspire suavemente pelo nariz... enchendo o abdômen..." + p(3500) +
                        "E solte o ar devagar pela boca... liberando a pressa e a impaciência." + p(4000) +
                        "O trânsito tem o seu ritmo externo; sua paz interior depende de você." + p(3500) +
                        "Destranque os dentes... solte o maxilar... relaxe os ombros." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Salmo 121 & Proteção",
                "focus": "mindset",
                "text": "Lembre-se da promessa do Salmo 121:" + p(2500) +
                        "O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre." + p(3500) +
                        "Você está guardado... conduzindo com calma, prudência e sabedoria." + p(10000)
            },
            {
                "id": 4,
                "phase": "4. Direção Segura e Serena",
                "focus": "integration",
                "text": "Faça mais uma respiração profunda." + p(3500) +
                        "Mantenha a visão panorâmica e segura ao redor do seu veículo." + p(3500) +
                        "E siga o seu trajeto em perfeita paz." + p(3000)
            }
        ]
    },

    # 3. Sono Profundo & Repouso (~5:00 min)
    {
        "id": "meditacao_sono",
        "filename": "meditacao_sono.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-4Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pouso no Descanso Noturno",
                "focus": "breathing",
                "text": "Deite-se confortavelmente em sua cama e feche suavemente os olhos." + p(3500) +
                        "Sinta o peso do seu corpo acolhido pelo colchão e pelo travesseiro." + p(4000) +
                        "Tudo o que aconteceu hoje já terminou... nada mais precisa ser resolvido esta noite." + p(12000)
            },
            {
                "id": 2,
                "phase": "2. Respiração Desacelerada (4-7-8)",
                "focus": "breathing",
                "text": "Inspire suavemente pelo nariz em quatro tempos... um... dois... três... quatro..." + p(3000) +
                        "Segure o ar por instantes com calma..." + p(3500) +
                        "E solte lentamente pela boca em oito tempos... esvaziando todo o peso do dia." + p(5000) +
                        "Mais uma vez... inspire com leveza... retenha..." + p(3000) +
                        "E expire bem devagar, sentindo o corpo afundar no acolhimento da cama." + p(15000)
            },
            {
                "id": 3,
                "phase": "3. Soltura Muscular dos Pés à Cabeça",
                "focus": "awareness",
                "text": "Sinta o couro cabeludo e o crânio repousando no travesseiro." + p(3500) +
                        "Suavize a testa... relaxe as pálpebras... solte as bochechas e a mandíbula." + p(4000) +
                        "Deixe os ombros caírem... solte os braços, as mãos e os dedos." + p(4000) +
                        "Sinta as costas inteiras tocando o leito... o peito e o abdômen respirando com calma." + p(4500) +
                        "Sinta as pernas pesadas, aquecidas e relaxadas... até a sola dos pés." + p(20000)
            },
            {
                "id": 4,
                "phase": "4. Entrega Segura & Sono Restaurador",
                "focus": "integration",
                "text": "Entregue cada pensamento nas mãos de Deus." + p(3500) +
                        "Em paz me deito e logo pego no sono, pois só Tu, Senhor, me fazes repousar em segurança." + p(4000) +
                        "Deixe a respiração ficar cada vez mais sutil e silenciosa." + p(5000) +
                        "Deixe o sono restaurador acolher você... Durma em perfeita paz." + p(30000)
            }
        ]
    },

    # 4. Alívio da Ansiedade & Pânico (~3:30 min)
    {
        "id": "meditacao_ansiedade",
        "filename": "meditacao_ansiedade.mp3",
        "voice": VOICES["female_calm"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pouso Seguro & Toque Acolhedor",
                "focus": "breathing",
                "text": "Coloque uma mão sobre o seu peito e a outra sobre o seu abdômen." + p(3000) +
                        "Sinta o calor do seu próprio toque." + p(3000) +
                        "Você está em um lugar seguro agora... nada de mal vai acontecer." + p(3500) +
                        "Permita-se apenas pausar e respirar." + p(10000)
            },
            {
                "id": 2,
                "phase": "2. Respiração de Alívio Vagal",
                "focus": "breathing",
                "text": "Puxe o ar suavemente pelo nariz, sentindo a barriga empurrar a sua mão..." + p(3500) +
                        "Segure o ar por um instante..." + p(2500) +
                        "E sopre bem devagar pelos lábios entreabertos, como se soprasse uma vela sem apagá-la." + p(4500) +
                        "Mais uma vez... inspire serenidade... segure..." + p(3000) +
                        "E sopre devagar... soltando o aperto no peito e na garganta." + p(4000) +
                        "Sinta o coração se acalmar no seu próprio ritmo." + p(12000)
            },
            {
                "id": 3,
                "phase": "3. Âncora de Firmeza & Paz",
                "focus": "mindset",
                "text": "Sinta a firmeza dos seus pés apoiados no chão." + p(3000) +
                        "Diga com carinho para si mesmo:" + p(2500) +
                        "Eu estou seguro... Esta sensação é temporária e já está passando." + p(3500) +
                        "O controle de todas as coisas pertence a Deus." + p(12000)
            },
            {
                "id": 4,
                "phase": "4. Retorno Restaurado",
                "focus": "integration",
                "text": "A paz de Deus, que excede todo o entendimento, guarda o seu coração agora." + p(3500) +
                        "Respire fundo... e abra os olhos com calma, sentindo-se amparado e renovado." + p(3000)
            }
        ]
    },

    # 5. Clareza Mental no Trabalho (~3:30 min)
    {
        "id": "meditacao_trabalho",
        "filename": "meditacao_trabalho.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-14%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pausa Consciente & Postura",
                "focus": "breathing",
                "text": "Afaste os olhos da tela por alguns momentos." + p(2500) +
                        "Apoie os pés no chão, repouse as mãos sobre as pernas e alinhe a postura." + p(3000) +
                        "Esta pausa consciente restaura a sua lucidez e equilíbrio." + p(8000)
            },
            {
                "id": 2,
                "phase": "2. Oxigenação & Limpeza Mental",
                "focus": "breathing",
                "text": "Inspire profundamente pelo nariz, trazendo oxigênio puro para a mente..." + p(3500) +
                        "E expire pela boca, liberando a sobrecarga e a pressa." + p(3500) +
                        "Você não precisa fazer tudo de uma vez; apenas foque na próxima tarefa certa com calma." + p(4000) +
                        "Solte os ombros... destranque os dentes." + p(12000)
            },
            {
                "id": 3,
                "phase": "3. Sabedoria em Tiago 1:5",
                "focus": "mindset",
                "text": "A Palavra nos lembra:" + p(2500) +
                        "Se alguém precisa de sabedoria, peça a Deus, que a todos concede generosamente." + p(3500) +
                        "Você tem serenidade para discernir e capacidade para realizar com excelência." + p(12000)
            },
            {
                "id": 4,
                "phase": "4. Retorno com Foco",
                "focus": "integration",
                "text": "Faça mais uma respiração profunda." + p(3000) +
                        "Abra os olhos com determinação e paz, pronto para produzir com equilíbrio." + p(3000)
            }
        ]
    },

    # 6. Despertar com Propósito (~3:00 min)
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
                "text": "Bom dia! Sente-se com a coluna ereta e o peito aberto." + p(2500) +
                        "Acolha a luz do novo dia com gratidão... As misericórdias do Senhor se renovaram hoje." + p(8000)
            },
            {
                "id": 2,
                "phase": "2. Respiração Revigorante",
                "focus": "breathing",
                "text": "Inspire com vigor pelo nariz, expandindo o peito de ar puro..." + p(3500) +
                        "E expire com um sorriso sereno, despertando todo o seu organismo com ânimo." + p(4000) +
                        "Mais uma vez... puxe vitalidade e disposição... e solte qualquer resquício de sono." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Oração Matinal & Salmo 143",
                "focus": "mindset",
                "text": "Traga à mente três bênçãos reais da sua vida... e agradeça." + p(3000) +
                        "Faze-me ouvir da Tua fidelidade pela manhã, pois em Ti confio." + p(3000) +
                        "Mostra-me o caminho em que devo andar hoje." + p(12000)
            },
            {
                "id": 4,
                "phase": "4. Partida com Propósito",
                "focus": "integration",
                "text": "Abra os olhos com alegria e coragem." + p(2500) +
                        "O seu dia será iluminado, produtivo e cheio de paz!" + p(3000)
            }
        ]
    },

    # 7. JORNADA - FASE 1: Ancoragem Sonora & Presença (~3:00 min)
    {
        "id": "jornada_fase_1_ancoragem_sonora",
        "filename": "jornada_fase_1.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Percepção Postural & Sensações",
                "focus": "breathing",
                "text": "Inicie percebendo a postura em que você se encontra agora." + p(2500) +
                        "Sentado... de pé... ou deitado." + p(2500) +
                        "Perceba o seu corpo exatamente como ele está neste instante." + p(3000) +
                        "Sintonize-se com as sensações físicas: peso, leveza, apoio, calor ou frescor." + p(3500) +
                        "Tudo o que você precisa fazer é notá-las com curiosidade e gentileza." + p(10000)
            },
            {
                "id": 2,
                "phase": "2. Respiração de Abertura",
                "focus": "breathing",
                "text": "Respire fundo... e ao soltar o ar, relaxe." + p(3500) +
                        "Apenas esteja plenamente presente e consciente." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Escuta Neutra dos Sons",
                "focus": "awareness",
                "text": "Agora, solte as sensações do corpo e volte a atenção para os sons ao redor." + p(3000) +
                        "Sons dentro do ambiente ou do lado de fora." + p(3000) +
                        "Sons mais altos ou quase imperceptíveis." + p(3000) +
                        "Perceba também o silêncio entre os sons." + p(3500) +
                        "Note os sons surgindo, ecoando e partindo... sem julgar ou criar histórias... apenas ouvindo." + p(15000)
            },
            {
                "id": 4,
                "phase": "4. Retorno e Abertura dos Olhos",
                "focus": "integration",
                "text": "Volte novamente a atenção para o seu corpo aqui presente." + p(3000) +
                        "Faça mais uma respiração profunda... suavize a expressão." + p(3500) +
                        "E quando estiver pronto... abra suavemente os olhos." + p(3000)
            }
        ]
    },

    # 8. JORNADA - FASE 2: Escaneamento Corporal Rápido (~3:00 min)
    {
        "id": "jornada_fase_2_escaneamento_rapido",
        "filename": "jornada_fase_2.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pousando no Corpo",
                "focus": "breathing",
                "text": "Comece trazendo a atenção para dentro do seu corpo." + p(2500) +
                        "Feche os olhos se for confortável... perceba o peso do corpo sobre a cadeira e o chão." + p(3000) +
                        "Faça algumas respirações profundas." + p(3000) +
                        "Inspirando oxigênio renovador... e expirando relaxamento profundo." + p(10000)
            },
            {
                "id": 2,
                "phase": "2. Pés, Pernas, Costas e Abdômen",
                "focus": "awareness",
                "text": "Note os pés no chão: a pressão, o toque, a temperatura." + p(3000) +
                        "Note as pernas e coxas na cadeira... e as costas encostadas no assento." + p(3000) +
                        "Leve a atenção ao abdômen... se estiver tenso, deixe amolecer." + p(3000) +
                        "Respire..." + p(10000)
            },
            {
                "id": 3,
                "phase": "3. Mãos, Ombros e Face",
                "focus": "awareness",
                "text": "Note as suas mãos... permita que os dedos se soltem e relaxem." + p(3000) +
                        "Deixe os ombros caírem... solte o pescoço e a garganta." + p(3000) +
                        "Destranque o maxilar... suavize os músculos do rosto e a testa." + p(12000)
            },
            {
                "id": 4,
                "phase": "4. Consciência Global e Conclusão",
                "focus": "integration",
                "text": "Sinta todo o seu corpo integrado em calma e presença." + p(3000) +
                        "Faça mais uma respiração... e abra os seus olhos." + p(3000)
            }
        ]
    },

    # 9. JORNADA - FASE 3: Respiração Consciente & Foco (~4:00 min)
    {
        "id": "jornada_fase_3_respiracao_serena",
        "filename": "jornada_fase_3.mp3",
        "voice": VOICES["female_calm"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura & Acomodação",
                "focus": "breathing",
                "text": "Encontre uma posição confortável, com a coluna ereta e sem tensão." + p(3000) +
                        "Mãos repousando sobre as pernas." + p(2500) +
                        "Perceba o corpo a partir de dentro: o peso, o apoio, o toque." + p(3000) +
                        "Permita-se relaxar com curiosidade e presença." + p(12000)
            },
            {
                "id": 2,
                "phase": "2. Sintonizando o Fluxo da Respiração",
                "focus": "breathing",
                "text": "Comece a sintonizar o fluxo natural da respiração." + p(3000) +
                        "Não precisa mudar nada; apenas sinta o ar entrando e saindo." + p(3500) +
                        "Perceba onde é mais nítido: no abdômen subindo e descendo... no peito... ou no ar fresco nas narinas." + p(4000) +
                        "Acompanhe uma respiração de cada vez." + p(20000)
            },
            {
                "id": 3,
                "phase": "3. Reconduzindo a Mente Gentilmente",
                "focus": "awareness",
                "text": "Se a mente divagar com pensamentos ou lembranças, não tem problema." + p(3000) +
                        "Apenas note que viajou, diga baixinho 'pensamento'... e com gentileza retorne ao fôlego." + p(3500) +
                        "Ficaremos alguns instantes em silêncio notando a respiração." + p(35000)
            },
            {
                "id": 4,
                "phase": "4. Gratidão e Retorno",
                "focus": "integration",
                "text": "Sinta todo o seu corpo presente." + p(3000) +
                        "Ofereça a si mesmo gratidão por esta pausa de equilíbrio." + p(3500) +
                        "Respire fundo e abra os olhos com serenidade." + p(3000)
            }
        ]
    },

    # 10. JORNADA - FASE 4: Superando Desafios & Emoções (~5:00 min)
    {
        "id": "jornada_fase_4_superando_desafios",
        "filename": "jornada_fase_4.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. O Porto Seguro no Corpo",
                "focus": "awareness",
                "text": "Esta prática fortalece a serenidade diante de emoções ou sensações difíceis." + p(3000) +
                        "Acomode-se confortavelmente." + p(2500) +
                        "Primeiro, localize um ponto seguro e confortável no corpo: as mãos apoiadas ou os pés no chão." + p(3500) +
                        "Deixe a atenção descansar nessa âncora estável por alguns instantes." + p(15000)
            },
            {
                "id": 2,
                "phase": "2. Olhando para o Desconforto com Calma",
                "focus": "awareness",
                "text": "Agora, se houver alguma emoção desafiadora presente (tristeza, ansiedade ou aperto no peito)..." + p(3500) +
                        "Deixe a atenção ir suavemente até onde essa sensação repercute no corpo." + p(3500) +
                        "Observe por um instante, sem lutar contra ela... respire ao redor do desconforto." + p(4000) +
                        "E retorne a atenção para o seu ponto de segurança nas mãos ou nos pés... dando-se uma pausa de alívio." + p(20000)
            },
            {
                "id": 3,
                "phase": "3. O Olhar Panorâmico & Impermanência",
                "focus": "mindset",
                "text": "Mais uma vez, observe a área difícil mantendo a maior parte do foco no porto seguro." + p(3500) +
                        "Perceba: a sensação está mudando? Ela é temporária e já está diminuindo." + p(4000) +
                        "Você é maior do que qualquer sentimento passageiro." + p(25000)
            },
            {
                "id": 4,
                "phase": "4. Autocompaixão & Paz",
                "focus": "integration",
                "text": "Acolha a si mesmo com profunda compaixão e carinho." + p(3000) +
                        "Que possamos todos encontrar paz, amparo e fortaleza interior." + p(3500) +
                        "Respire fundo e abra os olhos com calma." + p(3000)
            }
        ]
    },

    # 11. JORNADA - FASE 5: Bondade Amorosa & Perdão (~5:30 min)
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
                "text": "Acomode-se com tranquilidade... Nesta prática cultivamos a bondade amorosa e o perdão sincero." + p(3000) +
                        "Perceba seu corpo, deixando o peito se abrir com suavidade." + p(12000)
            },
            {
                "id": 2,
                "phase": "2. Enviando Votos a um Ser Querido",
                "focus": "mindset",
                "text": "Traga à mente a imagem de alguém querido — um filho, amigo ou animal de estimação." + p(3500) +
                        "Sinta a presença calorosa dessa pessoa na sua frente... e comece a enviar-lhe votos sinceros:" + p(3000) +
                        "Que você esteja seguro de todo perigo." + p(3000) +
                        "Que você seja verdadeiramente feliz e viva em paz." + p(3000) +
                        "Que você tenha saúde, vitalidade e bem-estar." + p(25000)
            },
            {
                "id": 3,
                "phase": "3. Recebendo & Enviando a Si Mesmo",
                "focus": "mindset",
                "text": "Agora imagine essa pessoa retribuindo todo esse carinho para você... receba no seu coração:" + p(3500) +
                        "Que eu esteja seguro e guardado em paz." + p(3000) +
                        "Que eu tenha saúde e discernimento." + p(3000) +
                        "Que eu me acolha com paciência e graça." + p(25000)
            },
            {
                "id": 4,
                "phase": "4. Expansão Universal & Retorno",
                "focus": "integration",
                "text": "Expanda esse amor para seus familiares, amigos e inclusive para pessoas com quem teve divergências, liberando o perdão." + p(3500) +
                        "Que todos nós possamos viver em harmonia e paz." + p(3500) +
                        "Respire fundo, ancore essa ternura e abra os olhos com renovação." + p(3000)
            }
        ]
    },

    # 12. JORNADA - FASE 6: Harmonia: Respiração, Som & Corpo (~6:00 min)
    {
        "id": "jornada_fase_6_harmonia_plena",
        "filename": "jornada_fase_6.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. A Âncora Respiratória",
                "focus": "breathing",
                "text": "Acomode-se na postura: coluna alinhada, ombros relaxados." + p(3000) +
                        "Sintonize a respiração no abdômen ou nas narinas... Ela é sua âncora constante." + p(3000) +
                        "Sinta o fluxo do ar entrando e saindo com naturalidade." + p(20000)
            },
            {
                "id": 2,
                "phase": "2. Ampliação para o Campo Auditivo",
                "focus": "awareness",
                "text": "Abra a consciência para os sons ao redor... dentro e fora da sala." + p(3000) +
                        "Ouça sem rotular... perceba também o silêncio entre os sons." + p(25000)
            },
            {
                "id": 3,
                "phase": "3. Sensações Corporais & Integração",
                "focus": "awareness",
                "text": "Solte a audição e traga a atenção para as sensações corporais: calor, pulsar, peso ou formigamento." + p(3500) +
                        "Observe o corpo com curiosidade... e retorne à respiração." + p(30000)
            },
            {
                "id": 4,
                "phase": "4. Silêncio Integrado & Conclusão",
                "focus": "integration",
                "text": "Unificamos agora a respiração, os sons e o corpo em uma presença integrada." + p(3000) +
                        "Ficaremos em silêncio contemplativo por alguns momentos." + p(50000) +
                        "Sinta a harmonia plena do seu ser." + p(3000) +
                        "Deseje a si mesmo paz e saúde." + p(3000) +
                        "Respire fundo e abra os olhos em perfeito equilíbrio." + p(3000)
            }
        ]
    },

    # 13. JORNADA - FASE 7: Descompressão & Sono Profundo (~7:00 min)
    {
        "id": "jornada_fase_7_sono_restaurador",
        "filename": "jornada_fase_7.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-4Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Preparação & Cabeça",
                "focus": "breathing",
                "text": "Deite-se confortavelmente para preparar o corpo para o sono." + p(3000) +
                        "Se adormecer durante a prática, isso é perfeitamente natural." + p(3500) +
                        "Sinta a cabeça pesada e acolhida no travesseiro." + p(3000) +
                        "Solte o couro cabeludo, a testa, as pálpebras, as bochechas e a mandíbula." + p(20000)
            },
            {
                "id": 2,
                "phase": "2. Ombros e Braços",
                "focus": "awareness",
                "text": "Sinta os ombros liberando todo o cansaço." + p(3000) +
                        "Desça pelo braço esquerdo até os dedos... e pelo braço direito até os dedos." + p(3500) +
                        "Ambos os braços repousando totalmente soltos." + p(25000)
            },
            {
                "id": 3,
                "phase": "3. Tronco, Pernas e Pés",
                "focus": "awareness",
                "text": "Sinta as costas afundando no colchão." + p(3000) +
                        "O peito e o abdômen respirando em ondas suaves e calmas." + p(3500) +
                        "Desça a atenção pelas pernas e pés... pesados, aquecidos e relaxados." + p(35000)
            },
            {
                "id": 4,
                "phase": "4. Entrega ao Sono Seguro",
                "focus": "integration",
                "text": "Todo o seu corpo agora descansa em segurança." + p(3500) +
                        "Entregue-se com confiança ao sono restaurador... Durma em profunda paz." + p(60000)
            }
        ]
    },

    # 14. JORNADA - FASE 8: Imersão & Maestria da Presença (~8:00 min)
    {
        "id": "jornada_fase_8_imersao_plena",
        "filename": "jornada_fase_8.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura & A Âncora Central",
                "focus": "breathing",
                "text": "Encontre sua postura meditativa: coluna ereta, peito aberto e relaxado." + p(3000) +
                        "Deixe a atenção pousar na respiração como sua âncora firme." + p(3000) +
                        "Acompanhe uma respiração de cada vez com curiosidade." + p(25000)
            },
            {
                "id": 2,
                "phase": "2. Navegando por Sons, Sensações e Emoções",
                "focus": "awareness",
                "text": "Abra a consciência para o que se destacar no momento presente:" + p(3000) +
                        "Se for um som, escute com atenção e volte ao fôlego." + p(3500) +
                        "Se for uma sensação corporal, sinta-a sem lutar e retorne à respiração." + p(3500) +
                        "Se for uma emoção, rotule-a com gentileza e volte para a âncora." + p(35000)
            },
            {
                "id": 3,
                "phase": "3. Silêncio & Quietude Interior",
                "focus": "mindset",
                "text": "Quando pensamentos surgirem, diga baixinho 'pensamento'... e solte." + p(3500) +
                        "Permaneceremos agora em um espaço sereno de silêncio pleno e quietude interior." + p(80000)
            },
            {
                "id": 4,
                "phase": "4. Consagração das 8 Fases e Retorno",
                "focus": "integration",
                "text": "Sinta todo o seu ser unificado nesta presença serena e inabalável." + p(3000) +
                        "Você completou com louvor as 8 fases da trilha de evolução." + p(3500) +
                        "Respire fundo, agradeça por este momento de restauração e abra os olhos com clareza e propósito." + p(3000)
            }
        ]
    }
]

async def generate_cadenced():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)

    timing_results = {}

    for session in CADENCED_SESSIONS:
        filename = session["filename"]
        audio_path = os.path.join(output_dir, filename)
        voice = session["voice"]
        rate = session["rate"]
        pitch = session["pitch"]

        ssml_body = ""
        for step in session["steps"]:
            ssml_body += step["text"] + " "

        full_ssml = f"""<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='pt-BR'>
<voice name='{voice}'>
{ssml_body}
</voice>
</speak>"""

        print(f"🎙️ Gravando {filename} (Voz: {voice})...")
        communicate = edge_tts.Communicate(full_ssml, voice=voice, rate=rate, pitch=pitch)
        await communicate.save(audio_path)
        
        file_size = os.path.getsize(audio_path)
        actual_duration_secs = round(file_size / 16000)
        print(f"  ✅ Concluído: {filename} ({file_size:,} bytes | {actual_duration_secs}s / {actual_duration_secs//60}m {actual_duration_secs%60}s)")

        total_weight = 0
        step_weights = []
        for step in session["steps"]:
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
    print("\n🎉 Todas as 14 meditações foram geradas com durações ideais (3m a 8m)!")

if __name__ == "__main__":
    asyncio.run(generate_cadenced())
