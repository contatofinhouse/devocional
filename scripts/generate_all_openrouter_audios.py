"""
Script de geração de áudios de meditação via OpenRouter (OpenAI GPT-Audio-Mini).
Com pausas explícitas e quebras de silêncio reais (3000ms a 4000ms) em todos os comandos respiratórios.
"""
import os
import sys
import json
import base64
import time
import subprocess
import shutil
import requests
import dotenv

# Ensure UTF-8 output on Windows console
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

dotenv.load_dotenv()
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    print("ERRO: OPENROUTER_API_KEY nao encontrada no .env")
    sys.exit(1)

import imageio_ffmpeg
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_openrouter_breathing")

SYSTEM_PROMPT_HELENA = (
    "Você é Helena, uma locutora profissional de meditação guiada e mindfulness. "
    "Fale em português do Brasil com voz doce, serena, calma e tom suavemente pausado. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

SYSTEM_PROMPT_SOFIA = (
    "Você é Sofia, uma terapeuta e instrutora de meditação para alívio de ansiedade. "
    "Fale em português do Brasil com voz acolhedora, calorosa, doce e tom profundamente relaxante. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

SYSTEM_PROMPT_BEATRIZ = (
    "Você é Beatriz, uma locutora matinal de meditação e gratidão. "
    "Fale em português do Brasil com voz suave, luminosa, alegre e tranquila. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

SYSTEM_PROMPT_SAMUEL = (
    "Você é Samuel, um locutor de meditação contemplativa e devocionais. "
    "Fale em português do Brasil com voz masculina grave, calorosa, profunda, acolhedora e serena. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

SYSTEM_PROMPT_GABRIEL = (
    "Você é Gabriel, um instrutor de foco e clareza mental. "
    "Fale em português do Brasil com voz masculina lúcida, calma, centrada e equilibrada. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

# Sessões com quebras respiratórias dedicadas (pausas de 3000ms a 4000ms entre inspire, retenha e solte)
SESSIONS = {
    # ==========================================
    # MEDITAÇÕES TEMÁTICAS (7)
    # ==========================================
    "meditacao_mindset.mp3": {
        "voice": "nova",
        "system_prompt": SYSTEM_PROMPT_HELENA,
        "segments": [
            ("Encontre uma posição ereta e confortável.", 4000),
            ("Os pés bem apoiados no chão.", 4000),
            ("Feche os olhos para interromper o fluxo de estímulos visuais.", 5000),
            ("Inspire pelo nariz em quatro tempos: um... dois... três... quatro.", 4000),
            ("Retenha o ar: um... dois... três... quatro.", 4000),
            ("Expire devagar pela boca em seis tempos: um... dois... três... quatro... cinco... seis.", 3000),
            ("Mais uma vez. Inspire clareza e oxigênio.", 4000),
            ("Retenha.", 4000),
            ("E solte qualquer pressa ou dispersão.", 4000),
            ("E mais uma. Inspire.", 4000),
            ("Segure.", 4000),
            ("E solte devagar.", 6000),
            ("Solte a mandíbula. Relaxe a testa.", 5000),
            ("Sinta o coração desacelerar.", 8000),
            ("Se tarefas pendentes surgirem na mente, apenas observe: são nuvens passageiras. Deixe-as passar.", 10000),
            ("Retorne ao fôlego. Sinta a mente limpa, presente e disponível.", 12000),
            ("Faça mais uma respiração profunda.", 5000),
            ("Movimente os dedos. E abra os olhos com foco e prontidão.", 0),
        ]
    },
    "meditacao_ansiedade.mp3": {
        "voice": "nova",
        "system_prompt": SYSTEM_PROMPT_SOFIA,
        "segments": [
            ("Você está em segurança agora. Este momento de ansiedade vai passar.", 5000),
            ("Feche os olhos, ou repouse o olhar em um ponto fixo.", 4000),
            ("Coloque uma mão sobre o peito e a outra sobre a barriga. Sinta o apoio das suas próprias mãos.", 6000),
            ("Vamos respirar juntos.", 3000),
            ("Inspire pelo nariz em quatro tempos: um... dois... três... quatro.", 4000),
            ("Segure com calma: um... dois... três... quatro.", 4000),
            ("Expire devagar pela boca em seis tempos: um... dois... três... quatro... cinco... seis.", 3000),
            ("Mais uma vez. Inspire, enchendo o abdômen.", 4000),
            ("Retenha com suavidade.", 4000),
            ("E solte bem devagar, sentindo os ombros descerem.", 5000),
            ("De novo. Inspire.", 4000),
            ("Segure.", 4000),
            ("Solte.", 8000),
            ("Agora deixe a respiração natural retornar.", 5000),
            ("Perceba os pés no chão, o peso das pernas, o apoio das costas.", 8000),
            ("Sinta a pressão da mão sobre o peito, o coração batendo ali embaixo. O ritmo está diminuindo.", 10000),
            ("O corpo está compreendendo que não há perigo agora.", 6000),
            ("Solte a mandíbula, relaxe os punhos, amoleça a barriga. Tudo está bem neste instante.", 12000),
            ("Sinta a sua respiração ficando mais longa... mais calma... mais leve.", 15000),
            ("Faça uma respiração profunda. Sinta o alívio no peito.", 5000),
            ("E abra os olhos com tranquilidade.", 0),
        ]
    },
    "meditacao_transito.mp3": {
        "voice": "onyx",
        "system_prompt": SYSTEM_PROMPT_SAMUEL,
        "segments": [
            ("Esta sessão é para a sua condução segura. Mantenha os olhos na via.", 4000),
            ("Ajuste a postura no banco, sinta o apoio das costas.", 4000),
            ("Perceba as mãos no volante: solte o aperto excessivo dos dedos.", 4000),
            ("Segure com firmeza, mas sem rigidez.", 6000),
            ("Relaxe os ombros, deixe-os cair longe das orelhas.", 5000),
            ("Destranque os dentes, solte a mandíbula.", 5000),
            ("Agora, aproveite o fluxo do trânsito ou uma parada para respirar.", 3000),
            ("Inspire pelo nariz, enchendo o abdômen.", 4000),
            ("E expire pela boca, soltando a pressa.", 4000),
            ("Mais uma vez: inspire calma.", 4000),
            ("Expire impaciência.", 6000),
            ("O trânsito tem o ritmo dele. A sua paz depende de você.", 8000),
            ("Mantenha a visão periférica, panorâmica, aberta. Perceba os veículos ao redor sem tensão.", 10000),
            ("Se alguém fechar ou buzinar, note a reação no corpo: solte, respire, volte ao volante com serenidade.", 12000),
            ("Conduza com prudência, paciência e presença. Siga o seu trajeto em paz.", 0),
        ]
    },
    "meditacao_trabalho.mp3": {
        "voice": "echo",
        "system_prompt": SYSTEM_PROMPT_GABRIEL,
        "segments": [
            ("Faça uma pausa onde está. Sente-se com a coluna ereta, os pés firmes no chão, as mãos sobre as pernas.", 4000),
            ("Feche os olhos por alguns instantes.", 4000),
            ("Inspire profundamente pelo nariz.", 4000),
            ("E ao soltar o ar, solte o acúmulo de telas, mensagens e urgências.", 4000),
            ("Mais uma vez: inspire espaço.", 4000),
            ("Expire ruído mental.", 6000),
            ("Relaxe os olhos por trás das pálpebras; eles trabalham muito durante o dia.", 6000),
            ("Solte a tensão da testa, do pescoço, dos ombros. Deixe as mãos se abrirem e descansarem.", 8000),
            ("Sinta o corpo desacelerar, mesmo que o ambiente continue agitado.", 8000),
            ("Agora, pergunte-se com calma: qual é a única coisa essencial para este próximo bloco de tempo?", 10000),
            ("Não tudo. Uma coisa.", 8000),
            ("Visualize-se fazendo essa tarefa com clareza e concentração.", 10000),
            ("Faça uma respiração profunda. Sinta a mente mais leve e mais nítida.", 5000),
            ("Abra os olhos com energia e retome com foco.", 0),
        ]
    },
    "meditacao_despertar.mp3": {
        "voice": "shimmer",
        "system_prompt": SYSTEM_PROMPT_BEATRIZ,
        "segments": [
            ("Bom dia. Antes de começar o dia, dê a si mesmo este momento.", 4000),
            ("Sente-se, alongue suavemente a coluna, abra o peito e os ombros.", 4000),
            ("Inspire pelo nariz com entusiasmo, enchendo os pulmões de ar.", 4000),
            ("E expire soltando qualquer resquício de sono.", 3000),
            ("Mais uma vez: inspire disposição e energia.", 4000),
            ("Expire cansaço e peso.", 3000),
            ("E mais uma: inspire, sinta o corpo acordar.", 4000),
            ("Expire, solte tudo o que é de ontem.", 6000),
            ("Sinta os pés no chão, o corpo sentado, a presença.", 6000),
            ("Agora, traga à mente três motivos reais de gratidão.", 5000),
            ("Pode ser algo simples: alguém que você ama, algo que tem, algo que pode fazer.", 10000),
            ("Sinta o calor da gratidão no peito.", 8000),
            ("Este dia é uma oportunidade: você está vivo, você pode agir, você pode cuidar.", 8000),
            ("Sinta a energia se espalhando pelo corpo inteiro.", 6000),
            ("Faça uma respiração profunda, sorria suavemente e abra os olhos, pronto para o dia.", 0),
        ]
    },
    "meditacao_sono.mp3": {
        "voice": "onyx",
        "system_prompt": SYSTEM_PROMPT_SAMUEL,
        "segments": [
            ("Deite-se confortavelmente. Feche os olhos.", 5000),
            ("O dia terminou: não há mais nada que precise ser feito agora.", 6000),
            ("Respire fundo pelo nariz.", 4000),
            ("E solte o ar devagar pela boca.", 4000),
            ("A cada expiração, sinta o corpo afundar um pouco mais na cama.", 8000),
            ("Entregue as pendências do dia, solte as preocupações. Elas estarão lá amanhã se precisarem de você.", 12000),
            ("Relaxe a testa, as pálpebras pesadas.", 8000),
            ("Solte os dentes, a mandíbula se abre levemente. O pescoço e a garganta relaxam.", 10000),
            ("Os ombros afundam no colchão; não há nada para carregar.", 12000),
            ("Os braços pesados e quentes ao lado do corpo; as mãos se abrem e descansam.", 12000),
            ("O peito respirando devagar, em ondas suaves.", 15000),
            ("O abdômen macio, sem esforço.", 15000),
            ("As pernas, pesadas e soltas, afundam na cama. Os pés quentes e descansados.", 18000),
            ("O corpo inteiro repousa: confiante, seguro, acolhido.", 20000),
            ("A respiração se faz sozinha: mais lenta... mais suave.", 25000),
            ("Mergulhe no sono. Durma em paz.", 0),
        ]
    },
    "meditacao_com_deus.mp3": {
        "voice": "onyx",
        "system_prompt": SYSTEM_PROMPT_SAMUEL,
        "segments": [
            ("Bem-vindo a este momento de comunhão e descanso na presença de Deus.", 5000),
            ("Encontre uma posição confortável, com o coração aberto. Feche os olhos em reverência e paz.", 6000),
            ("Faça uma respiração profunda.", 4000),
            ("Ao soltar o ar, entregue toda sobrecarga, toda ansiedade e todo temor nas mãos do Criador.", 10000),
            ("Medite na promessa do Salmo 23: O Senhor é o meu pastor; nada me faltará.", 8000),
            ("Ele me faz repousar em pastos verdejantes; leva-me para junto das águas de descanso.", 10000),
            ("Sinta essas águas tranquilas lavando a sua alma: toda pressa, todo medo, toda preocupação com o amanhã.", 12000),
            ("Deus cuida de você.", 15000),
            ("Ouça a voz de Deus no Salmo 46: Aquietai-vos... e sabei que Eu sou Deus.", 15000),
            ("Aquietar-se é a decisão de soltar o controle e confiar na soberania do Pai.", 10000),
            ("Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações.", 12000),
            ("Como nos ensina Provérbios: Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.", 15000),
            ("Em oração silenciosa, deixe a paz de Deus guardar a sua mente e o seu espírito.", 30000),
            ("Eu não estou sozinho. O Senhor é a minha paz e o meu refúgio.", 15000),
            ("Faça uma respiração profunda, ancore essa fé no coração e abra os olhos em graça e paz.", 0),
        ]
    },
    # ==========================================
    # TRILHA DE EVOLUÇÃO (8 Níveis)
    # ==========================================
    "jornada_fase_1.mp3": {
        "voice": "nova",
        "system_prompt": SYSTEM_PROMPT_HELENA,
        "segments": [
            ("Acomode-se onde você está. Pode fechar os olhos, ou repousar o olhar para baixo.", 4000),
            ("Sinta o contato do seu corpo com a superfície que o apoia: o peso dos pés no chão, as mãos sobre as pernas.", 5000),
            ("Faça uma respiração longa e solta.", 4000),
            ("E agora, leve toda a sua atenção para o campo dos sons. Você não precisa ir até os sons; deixe que eles venham até você.", 8000),
            ("Perceba os sons mais próximos: os sons desta sala, o som da sua própria respiração, algum som sutil que talvez você não tivesse notado antes.", 10000),
            ("Agora, expanda a escuta para os sons mais distantes: sons que vêm de longe, sem se importar com o que são.", 10000),
            ("Note o volume, a textura, a duração de cada som. E perceba o que existe entre um som e outro: o silêncio de fundo.", 12000),
            ("Sons que surgem do silêncio, duram um instante e voltam ao silêncio. Se a mente tentar criar histórias, apenas volte a escutar.", 15000),
            ("Descanse nessa escuta aberta por mais alguns instantes.", 15000),
            ("Traga a atenção de volta para o corpo inteiro. Faça uma respiração profunda.", 5000),
            ("E quando estiver pronto, abra suavemente os olhos.", 0),
        ]
    },
    "jornada_fase_2.mp3": {
        "voice": "onyx",
        "system_prompt": SYSTEM_PROMPT_SAMUEL,
        "segments": [
            ("Traga a sua atenção para dentro do corpo. Feche os olhos, se for confortável.", 4000),
            ("Perceba o corpo sentado onde quer que você esteja. Sinta o peso do corpo sobre o assento, sobre o chão.", 5000),
            ("Faça algumas respirações profundas.", 3000),
            ("E a cada inspiração, sinta o ar entrando e despertando o corpo.", 4000),
            ("A cada expiração, relaxe um pouco mais profundamente.", 5000),
            ("Leve a atenção para os pés no chão. Sinta a sola dos pés em contato com o solo: o peso, a pressão, a vibração, o calor.", 8000),
            ("Suba a atenção para as pernas apoiadas na cadeira: pressão, pulsação, peso, leveza. Sinta as costas encostadas no assento.", 8000),
            ("Traga a atenção para a área do abdômen: se a barriga estiver tensa ou contraída, deixe amolecer.", 4000),
            ("Respire.", 4000),
            ("Perceba as suas mãos: as mãos estão tensas ou apertadas? Veja se pode permitir que elas se soltem.", 8000),
            ("Sinta os braços; perceba qualquer sensação nos braços. Deixe os ombros se soltarem.", 8000),
            ("Perceba o pescoço e a garganta; deixe-os macios, relaxados. Solte a mandíbula, deixe o rosto e os músculos faciais se suavizarem.", 10000),
            ("Agora, perceba o corpo inteiro, presente, aqui.", 6000),
            ("Faça mais uma respiração.", 4000),
            ("Esteja consciente do corpo inteiro, da melhor forma que puder. Respire.", 6000),
            ("E quando estiver pronto, abra os olhos.", 0),
        ]
    },
    "jornada_fase_3.mp3": {
        "voice": "nova",
        "system_prompt": SYSTEM_PROMPT_SOFIA,
        "segments": [
            ("Adote uma postura confortável, com a coluna naturalmente ereta. Feche suavemente os olhos.", 4000),
            ("Permita que o corpo se acomode por completo.", 6000),
            ("Traga a atenção para a respiração natural. Não mude nada no ritmo do fôlego; apenas observe o ar entrando e o ar saindo.", 8000),
            ("Onde a respiração é mais nítida para você agora?", 4000),
            ("Pode ser o ar fresco entrando pelas narinas, a expansão suave do peito, ou o abdômen subindo na inspiração e descendo na expiração.", 8000),
            ("Escolha esse ponto de maior nitidez; faça dele a sua âncora.", 8000),
            ("Acompanhe o ciclo completo de uma inspiração.", 3000),
            ("O início, o meio, o final da inspiração.", 4000),
            ("E o início da expiração, o meio e o final da expiração.", 4000),
            ("Apenas isso: o ar que entra, o ar que sai.", 8000),
            ("Se a mente se distrair com um pensamento ou uma tarefa, isso é completamente normal.", 4000),
            ("Apenas note com gentileza: pensando... e traga a atenção de volta ao fôlego.", 10000),
            ("Cada retorno ao fôlego é uma repetição que fortalece o foco. Não é um erro se distrair; o momento de notar é o momento da prática.", 12000),
            ("Vamos ficar em silêncio agora, acompanhando a respiração.", 30000),
            ("Sentindo o corpo respirar.", 15000),
            ("Faça uma respiração mais profunda. Sinta o corpo inteiro presente.", 5000),
            ("E quando estiver pronto, abra suavemente os olhos.", 0),
        ]
    },
    "jornada_fase_4.mp3": {
        "voice": "nova",
        "system_prompt": SYSTEM_PROMPT_HELENA,
        "segments": [
            ("Acomode-se de forma gentil e acolhedora. Se desejar, coloque uma das mãos sobre o peito. Feche os olhos.", 5000),
            ("Faça duas respirações longas e soltas, soltando o ar com alívio.", 5000),
            ("Primeiro, vamos encontrar o seu porto seguro no corpo: sinta os pés firmes no chão, sinta o calor da mão no peito.", 6000),
            ("Esse contato é o seu lugar de estabilidade; sempre pode voltar a ele.", 8000),
            ("Agora, traga à mente alguma situação recente que tenha gerado tensão, preocupação ou aperto. Não precisa ser algo enorme; algo moderado.", 8000),
            ("Reconheça: o que está sentindo agora? Pode nomear silenciosamente: ansiedade... frustração... medo... tristeza.", 10000),
            ("Não tente resolver; apenas reconheça o que está aí.", 6000),
            ("Agora, acolha: permita que a sensação exista sem julgamento. Diga interiormente: sim, isso está aqui agora.", 12000),
            ("Investigue com cuidado: onde no corpo essa emoção se manifesta? É um aperto no peito? Uma pressão na garganta? Um peso no estômago? Um nó nos ombros?", 10000),
            ("Respire suavemente ao redor dessa área.", 4000),
            ("Não precisa resolver, não precisa entender; apenas dê espaço.", 12000),
            ("Se ficar intenso demais, volte ao porto seguro: os pés no chão, a mão no peito, a respiração.", 12000),
            ("As emoções são temporárias: elas chegam, atingem um pico e naturalmente se desfazem.", 12000),
            ("Agora, nutra esse lugar vulnerável com compaixão: imagine que está cuidando de si mesmo como cuidaria de alguém que ama.", 15000),
            ("Respire profundamente.", 4000),
            ("Solte o que puder ser solto. Sinta a firmeza dos pés no chão.", 6000),
            ("E quando estiver pronto, abra os olhos com serenidade.", 0),
        ]
    },
    "jornada_fase_5.mp3": {
        "voice": "onyx",
        "system_prompt": SYSTEM_PROMPT_SAMUEL,
        "segments": [
            ("Acomode-se com o peito aberto e as mãos relaxadas. Feche os olhos com tranquilidade.", 5000),
            ("Faça duas ou três respirações longas, soltando qualquer pressa.", 5000),
            ("Leve a atenção para a região do coração, no centro do peito. Sinta o calor nessa área, a respiração sutil.", 8000),
            ("Permita que uma sensação de cuidado surja ali.", 8000),
            ("Traga à mente a imagem de alguém por quem você sinta um carinho espontâneo. Pode ser uma pessoa, um animal, alguém que naturalmente faz você sorrir.", 8000),
            ("Veja o rosto dessa presença querida. E envie silenciosamente os seguintes votos de coração:", 5000),
            ("Que você esteja seguro e protegido.", 8000),
            ("Que você tenha paz no coração.", 8000),
            ("Que você tenha saúde e bem-estar.", 8000),
            ("Que você viva com alegria.", 10000),
            ("Sinta o calor que nasce de desejar o bem a quem você ama.", 10000),
            ("Agora, com cuidado, traga esse mesmo carinho para dentro de você mesmo:", 5000),
            ("Que eu esteja seguro e guardado.", 8000),
            ("Que eu tenha paz e saúde.", 8000),
            ("Que eu me acolha com paciência e compaixão.", 12000),
            ("Se houver resistência, apenas note; não force. Agora, expanda esse círculo de afeto: inclua familiares, amigos, colegas.", 12000),
            ("E se sentir disponível, inclua pessoas com quem você teve dificuldades: sem forçar, apenas permitindo, se for possível agora.", 15000),
            ("Que todos possamos viver com dignidade, compreensão e paz.", 20000),
            ("Sinta esse calor generoso no corpo inteiro. Faça uma respiração profunda, permita um sorriso suave e abra os olhos, levando essa bondade para o seu dia.", 0),
        ]
    },
    "jornada_fase_6.mp3": {
        "voice": "echo",
        "system_prompt": SYSTEM_PROMPT_GABRIEL,
        "segments": [
            ("Assuma uma postura estável, digna e confortável. Feche os olhos.", 4000),
            ("Faça três respirações longas e intencionais.", 6000),
            ("Fase um: a respiração. Acompanhe o ritmo natural do fôlego: o ar entrando, o ar saindo.", 8000),
            ("Sem controlar; apenas observando.", 12000),
            ("Fase dois: os sons. Mantendo o fôlego presente, expanda a atenção para o campo sonoro: sons próximos, sons distantes, o silêncio de fundo.", 15000),
            ("Respiração e sons coexistindo na sua percepção.", 12000),
            ("Fase três: o corpo. Agora inclua as sensações do corpo inteiro: o peso, a postura, a temperatura da pele, pulsações sutis.", 15000),
            ("Três âncoras simultâneas: fôlego, sons, corpo. Tudo acontecendo ao mesmo tempo na sua consciência aberta.", 20000),
            ("Agora, solte todas as âncoras. Não há mais nada específico para focar: seja apenas a testemunha silenciosa do que surge e passa.", 15000),
            ("Pensamentos vêm e vão como nuvens; sons surgem e desaparecem; sensações mudam continuamente.", 15000),
            ("Você é o espaço onde tudo isso acontece. Descanse nesse espaço aberto.", 30000),
            ("Faça uma respiração profunda. Sinta o corpo inteiro presente. E quando estiver pronto, abra os olhos.", 0),
        ]
    },
    "jornada_fase_7.mp3": {
        "voice": "onyx",
        "system_prompt": SYSTEM_PROMPT_SAMUEL,
        "segments": [
            ("Deite-se confortavelmente, com o corpo estendido e os braços ao lado do tronco. Feche os olhos.", 5000),
            ("Faça uma respiração profunda pelo nariz.", 4000),
            ("E solte o ar devagar pela boca.", 4000),
            ("Mais uma vez: inspire.", 4000),
            ("E solte, sentindo o corpo afundar na cama.", 6000),
            ("O dia de hoje terminou: tudo o que pôde ser feito foi feito. Agora é hora de descansar.", 10000),
            ("Traga a atenção para o topo da cabeça. Sinta o couro cabeludo relaxando. A testa se abrindo, se alisando. As pálpebras pesadas e descansadas.", 10000),
            ("Solte a mandíbula, separe levemente os dentes; a língua solta na base da boca. Sinta o pescoço relaxando, a garganta solta.", 10000),
            ("Os ombros afundam no travesseiro; não há nada para carregar agora.", 12000),
            ("Desça pelos braços: os cotovelos, os antebraços, os pulsos. As mãos e os dedos completamente soltos e pesados.", 12000),
            ("Sinta as costas recebendo o suporte completo do colchão; cada vértebra descansa sobre a superfície.", 12000),
            ("O peito respirando em ondas lentas; o abdômen subindo e descendo, macio, sem esforço.", 15000),
            ("Solte o quadril, as coxas afundam na cama. Os joelhos, as panturrilhas relaxando.", 15000),
            ("Os tornozelos soltos, os pés pesados e quentes. Os dedos dos pés completamente descansados.", 15000),
            ("O corpo inteiro afundando suavemente, como se a gravidade estivesse gentilmente puxando cada célula para o repouso.", 18000),
            ("Não há nada para fazer, nada para resolver, nada para planejar: apenas o corpo descansando e a respiração se fazendo sozinha.", 25000),
            ("Deixe-se levar pelo ritmo suave do fôlego, mergulhando no sono. Durma em paz.", 0),
        ]
    },
    "jornada_fase_8.mp3": {
        "voice": "nova",
        "system_prompt": SYSTEM_PROMPT_HELENA,
        "segments": [
            ("Assuma a sua postura de prática: coluna ereta, corpo relaxado. Feche os olhos.", 5000),
            ("Faça três respirações lentas e conscientes.", 8000),
            ("Sinta a clareza que se instala quando o corpo está quieto.", 8000),
            ("Nesta prática, você não precisa fazer nada de especial: apenas repouse na sua própria presença.", 10000),
            ("Observe o que está acontecendo agora, sem escolher: o fôlego se move, sons surgem e passam, sensações mudam.", 15000),
            ("Pensamentos aparecem como eventos na mente. Você não é os seus pensamentos; você é o espaço amplo e calmo onde os pensamentos passam.", 15000),
            ("Quando perceber que se perdeu em uma história, simplesmente note: e retorne ao silêncio.", 15000),
            ("Vamos entrar agora em um período estendido de quietude. Sem instrução. Apenas presença.", 20000),
            ("Sinta a respiração. Descanse no ser.", 40000),
            ("Traga a atenção de volta para o corpo sentado: sinta os pés no chão, as mãos, a postura.", 8000),
            ("Faça uma respiração profunda. E quando estiver pronto, abra os olhos com lucidez.", 0),
        ]
    },
}


def synthesize_segment_audio(text: str, voice: str, system_prompt: str, output_mp3_path: str, retries: int = 3):
    """Call OpenRouter gpt-audio-mini with streaming PCM16 and convert to MP3 via ffmpeg."""
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://devocional.app",
        "X-Title": "Devocional Mindfulness App"
    }
    payload = {
        "model": "openai/gpt-audio-mini",
        "modalities": ["text", "audio"],
        "audio": {"voice": voice, "format": "pcm16"},
        "stream": True,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
        ]
    }

    for attempt in range(retries):
        try:
            r = requests.post(url, headers=headers, json=payload, stream=True, timeout=45)
            if r.status_code != 200:
                print(f"    [WARN] Status {r.status_code}: {r.text[:120]}", flush=True)
                time.sleep(1)
                if attempt < retries - 1:
                    continue
                raise RuntimeError(f"OpenRouter status {r.status_code}")

            pcm_chunks = []
            for line in r.iter_lines():
                if line and line.startswith(b"data: "):
                    d = line[6:].strip()
                    if d == b"[DONE]":
                        break
                    try:
                        chunk = json.loads(d)
                        delta_audio = chunk.get("choices", [{}])[0].get("delta", {}).get("audio", {}).get("data")
                        if delta_audio:
                            pcm_chunks.append(base64.b64decode(delta_audio))
                    except Exception:
                        pass

            combined_pcm = b"".join(pcm_chunks)
            if len(combined_pcm) == 0:
                raise ValueError("Nenhum dado PCM retornado pela API")

            temp_pcm = output_mp3_path.replace(".mp3", ".pcm")
            with open(temp_pcm, "wb") as f:
                f.write(combined_pcm)

            conv_cmd = [
                FFMPEG_EXE,
                "-f", "s16le",
                "-ar", "24000",
                "-ac", "1",
                "-i", temp_pcm,
                "-acodec", "libmp3lame",
                "-ar", "24000",
                "-ac", "1",
                "-y",
                output_mp3_path
            ]
            subprocess.run(conv_cmd, check=True, capture_output=True)

            if os.path.exists(temp_pcm):
                os.remove(temp_pcm)

            return True

        except Exception as err:
            if attempt == retries - 1:
                raise err
            time.sleep(1.5)


def generate_silence_segment(duration_ms: int, output_path: str):
    """Generate a silent MP3 matching audio properties."""
    duration_sec = duration_ms / 1000.0
    cmd = [
        FFMPEG_EXE,
        "-f", "lavfi",
        "-i", "anullsrc=r=24000:cl=mono",
        "-t", str(duration_sec),
        "-acodec", "libmp3lame",
        "-ar", "24000",
        "-ac", "1",
        "-y",
        output_path
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def generate_session(filename: str, session_data: dict):
    """Generate a complete meditation session MP3 with real silence pauses."""
    voice = session_data["voice"]
    system_prompt = session_data["system_prompt"]
    segments = session_data["segments"]

    session_temp_dir = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
    os.makedirs(session_temp_dir, exist_ok=True)

    print(f"\n[INICIANDO] {filename} (Voz: {voice}, {len(segments)} comandos)", flush=True)

    file_list = []

    for i, (text, pause_ms) in enumerate(segments):
        seg_mp3 = os.path.join(session_temp_dir, f"seg_{i:02d}.mp3")
        t0 = time.time()
        synthesize_segment_audio(text, voice, system_prompt, seg_mp3)
        file_list.append(seg_mp3)

        if pause_ms > 0:
            sil_mp3 = os.path.join(session_temp_dir, f"sil_{i:02d}.mp3")
            generate_silence_segment(pause_ms, sil_mp3)
            file_list.append(sil_mp3)

        if (i + 1) % 4 == 0 or i == len(segments) - 1:
            print(f"  Progresso: [{i+1}/{len(segments)}] comandos sintetizados", flush=True)

    # Concat manifest
    concat_txt = os.path.join(session_temp_dir, "concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for fpath in file_list:
            normalized = fpath.replace("\\", "/")
            f.write(f"file '{normalized}'\n")

    # Run ffmpeg concat
    output_path = os.path.join(OUTPUT_DIR, filename)
    concat_cmd = [
        FFMPEG_EXE,
        "-f", "concat",
        "-safe", "0",
        "-i", concat_txt,
        "-c", "copy",
        "-y",
        output_path
    ]
    subprocess.run(concat_cmd, check=True, capture_output=True)

    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"  [CONCLUIDO] {filename} ({file_size_kb:.1f} KB)", flush=True)

    return filename, file_size_kb


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)

    print("=" * 60, flush=True)
    print("GERADOR DE AUDIOS VIA OPENROUTER COM PAUSAS RESPIRATÓRIAS", flush=True)
    print("=" * 60, flush=True)

    results = []
    for filename, session_data in SESSIONS.items():
        try:
            res = generate_session(filename, session_data)
            results.append(res)
        except Exception as e:
            print(f"  [ERRO] em {filename}: {e}", flush=True)

    # Cleanup temp directory
    if os.path.exists(TEMP_DIR):
        try:
            shutil.rmtree(TEMP_DIR)
        except Exception:
            pass

    print("\n" + "=" * 60, flush=True)
    print("RESUMO FINAL OPENROUTER:", flush=True)
    print("=" * 60, flush=True)
    for fname, size_kb in results:
        print(f"  {fname:35s} -> {size_kb:8.1f} KB", flush=True)
    print(f"\nTotal: {len(results)}/{len(SESSIONS)} audios gerados com sucesso em {OUTPUT_DIR}", flush=True)


if __name__ == "__main__":
    main()
