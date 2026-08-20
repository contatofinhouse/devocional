"""
Script de geração de áudios limpos para meditações PT-BR.
Gera 15 arquivos MP3 com pausas reais de silêncio utilizando edge-tts + ffmpeg concat.
Requer: edge-tts, imageio-ffmpeg
"""
import asyncio
import os
import sys
import subprocess
import shutil

# Ensure UTF-8 output on Windows console
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

import edge_tts
import imageio_ffmpeg

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
VOICE = "pt-BR-FranciscaNeural"  # Voz feminina PT-BR (Helena/Sofia/Beatriz)
VOICE_MALE = "pt-BR-AntonioNeural"  # Voz masculina PT-BR (Samuel/Gabriel)
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_audio")

# Cada sessão: (filename, voice, [(text, pause_after_ms), ...])
SESSIONS = {
    # ==========================================
    # MEDITAÇÕES TEMÁTICAS (7)
    # ==========================================
    "meditacao_mindset.mp3": {
        "voice": VOICE,
        "segments": [
            ("Encontre uma posição ereta e confortável.", 4000),
            ("Os pés bem apoiados no chão.", 4000),
            ("Feche os olhos para interromper o fluxo de estímulos visuais.", 5000),
            ("Inspire pelo nariz em quatro tempos. Um. Dois. Três. Quatro.", 4000),
            ("Retenha o ar. Um. Dois. Três. Quatro.", 4000),
            ("Expire devagar pela boca em seis tempos. Um. Dois. Três. Quatro. Cinco. Seis.", 3000),
            ("Mais uma vez. Inspire. Clareza e oxigênio.", 4000),
            ("Retenha.", 4000),
            ("E solte. Qualquer pressa ou dispersão.", 6000),
            ("E mais uma. Inspire.", 4000),
            ("Segure.", 4000),
            ("E solte devagar.", 8000),
            ("Solte a mandíbula. Relaxe a testa.", 6000),
            ("Sinta o coração desacelerar.", 10000),
            ("Se tarefas pendentes surgirem na mente, apenas observe.", 5000),
            ("São nuvens passageiras. Deixe-as passar.", 15000),
            ("Retorne ao fôlego.", 12000),
            ("Sinta a mente limpa, presente e disponível.", 15000),
            ("Faça mais uma respiração profunda.", 6000),
            ("Movimente os dedos.", 3000),
            ("E abra os olhos com foco e prontidão.", 0),
        ]
    },
    "meditacao_ansiedade.mp3": {
        "voice": VOICE,
        "segments": [
            ("Você está em segurança agora.", 4000),
            ("Este momento de ansiedade vai passar.", 5000),
            ("Feche os olhos, ou repouse o olhar em um ponto fixo.", 5000),
            ("Coloque uma mão sobre o peito e a outra sobre a barriga.", 6000),
            ("Sinta o apoio das suas próprias mãos.", 6000),
            ("Vamos respirar juntos.", 3000),
            ("Inspire pelo nariz em quatro tempos. Um. Dois. Três. Quatro.", 4000),
            ("Segure com calma. Um. Dois. Três. Quatro.", 4000),
            ("Expire devagar pela boca em seis tempos. Um. Dois. Três. Quatro. Cinco. Seis.", 3000),
            ("Mais uma vez. Inspire, enchendo o abdômen.", 4000),
            ("Retenha com suavidade.", 4000),
            ("E solte bem devagar. Sentindo os ombros descerem.", 8000),
            ("De novo. Inspire.", 4000),
            ("Segure.", 4000),
            ("Solte.", 10000),
            ("Agora deixe a respiração natural retornar.", 6000),
            ("Perceba os pés no chão. O peso das pernas. O apoio das costas.", 12000),
            ("Sinta a pressão da mão sobre o peito. O coração batendo ali embaixo.", 15000),
            ("O ritmo está diminuindo. O corpo está compreendendo que não há perigo agora.", 18000),
            ("Solte a mandíbula. Relaxe os punhos. Amoleça a barriga.", 15000),
            ("Tudo está bem neste instante.", 20000),
            ("Sinta a sua respiração ficando mais longa. Mais calma. Mais leve.", 20000),
            ("Faça uma respiração profunda.", 6000),
            ("Sinta o alívio no peito.", 5000),
            ("E abra os olhos com tranquilidade.", 0),
        ]
    },
    "meditacao_transito.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Esta sessão é para a sua condução segura. Mantenha os olhos na via.", 5000),
            ("Ajuste a postura no banco. Sinta o apoio das costas.", 5000),
            ("Perceba as mãos no volante.", 4000),
            ("Solte o aperto excessivo dos dedos.", 4000),
            ("Segure com firmeza, mas sem rigidez.", 8000),
            ("Relaxe os ombros. Deixe-os cair longe das orelhas.", 8000),
            ("Destranque os dentes. Solte a mandíbula.", 8000),
            ("Agora, aproveite o fluxo do trânsito ou uma parada para respirar.", 5000),
            ("Inspire pelo nariz, enchendo o abdômen.", 4000),
            ("E expire pela boca, soltando a pressa.", 6000),
            ("Mais uma vez. Inspire calma. Expire impaciência.", 10000),
            ("O trânsito tem o ritmo dele. A sua paz depende de você.", 12000),
            ("Mantenha a visão periférica, panorâmica, aberta.", 8000),
            ("Perceba os veículos ao redor sem tensão.", 12000),
            ("Se alguém fechar ou buzinar, note a reação no corpo.", 5000),
            ("Solte. Respire. Volte ao volante com serenidade.", 15000),
            ("Conduza com prudência, paciência e presença.", 15000),
            ("Siga o seu trajeto em paz.", 0),
        ]
    },
    "meditacao_trabalho.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Faça uma pausa onde está. Sente-se com a coluna ereta.", 4000),
            ("Os pés firmes no chão. As mãos sobre as pernas.", 5000),
            ("Feche os olhos por alguns instantes.", 5000),
            ("Inspire profundamente pelo nariz.", 4000),
            ("E ao soltar o ar, solte o acúmulo de telas, mensagens e urgências.", 8000),
            ("Mais uma vez. Inspire espaço. Expire ruído mental.", 10000),
            ("Relaxe os olhos por trás das pálpebras. Eles trabalham muito durante o dia.", 10000),
            ("Solte a tensão da testa. Do pescoço. Dos ombros.", 12000),
            ("Deixe as mãos se abrirem e descansarem.", 10000),
            ("Sinta o corpo desacelerar, mesmo que o ambiente continue agitado.", 15000),
            ("Agora, pergunte-se com calma: qual é a única coisa essencial para este próximo bloco de tempo?", 15000),
            ("Não tudo. Uma coisa.", 12000),
            ("Visualize-se fazendo essa tarefa com clareza e concentração.", 15000),
            ("Faça uma respiração profunda.", 6000),
            ("Sinta a mente mais leve e mais nítida.", 5000),
            ("Abra os olhos com energia e retome com foco.", 0),
        ]
    },
    "meditacao_despertar.mp3": {
        "voice": VOICE,
        "segments": [
            ("Bom dia.", 3000),
            ("Antes de começar o dia, dê a si mesmo este momento.", 4000),
            ("Sente-se. Alongue suavemente a coluna.", 4000),
            ("Abra o peito e os ombros.", 5000),
            ("Inspire pelo nariz com entusiasmo, enchendo os pulmões de ar.", 4000),
            ("E expire soltando qualquer resquício de sono.", 6000),
            ("Mais uma vez. Inspire disposição e energia.", 4000),
            ("Expire cansaço e peso.", 6000),
            ("E mais uma. Inspire. Sinta o corpo acordar.", 4000),
            ("Expire. Solte tudo o que é de ontem.", 8000),
            ("Sinta os pés no chão. O corpo sentado. A presença.", 8000),
            ("Agora, traga à mente três motivos reais de gratidão.", 5000),
            ("Pode ser algo simples. Alguém que você ama. Algo que tem. Algo que pode fazer.", 15000),
            ("Sinta o calor da gratidão no peito.", 15000),
            ("Este dia é uma oportunidade.", 5000),
            ("Você está vivo. Você pode agir. Você pode cuidar.", 10000),
            ("Sinta a energia se espalhando pelo corpo inteiro.", 10000),
            ("Faça uma respiração profunda.", 5000),
            ("Sorria suavemente.", 4000),
            ("E abra os olhos, pronto para o dia.", 0),
        ]
    },
    "meditacao_sono.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Deite-se confortavelmente.", 5000),
            ("Feche os olhos.", 5000),
            ("O dia terminou. Não há mais nada que precise ser feito agora.", 8000),
            ("Respire fundo pelo nariz. E solte o ar devagar pela boca.", 10000),
            ("A cada expiração, sinta o corpo afundar um pouco mais na cama.", 12000),
            ("Entregue as pendências do dia. Solte as preocupações. Elas estarão lá amanhã se precisarem de você.", 18000),
            ("Relaxe a testa. As pálpebras pesadas.", 12000),
            ("Solte os dentes. A mandíbula se abre levemente.", 12000),
            ("O pescoço e a garganta relaxam.", 15000),
            ("Os ombros afundam no colchão. Não há nada para carregar.", 18000),
            ("Os braços pesados e quentes ao lado do corpo.", 18000),
            ("As mãos se abrem e descansam.", 18000),
            ("O peito respirando devagar. Em ondas suaves.", 25000),
            ("O abdômen macio, sem esforço.", 20000),
            ("As pernas, pesadas e soltas, afundam na cama.", 25000),
            ("Os pés quentes e descansados.", 20000),
            ("O corpo inteiro repousa.", 8000),
            ("Confiante. Seguro. Acolhido.", 30000),
            ("A respiração se faz sozinha. Mais lenta. Mais suave.", 40000),
            ("Mergulhe no sono.", 30000),
            ("Durma em paz.", 0),
        ]
    },
    "meditacao_com_deus.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Bem-vindo a este momento de comunhão e descanso na presença de Deus.", 6000),
            ("Encontre uma posição confortável, com o coração aberto.", 5000),
            ("Feche os olhos em reverência e paz.", 8000),
            ("Faça uma respiração profunda.", 5000),
            ("Ao soltar o ar, entregue toda sobrecarga, toda ansiedade e todo temor nas mãos do Criador.", 15000),
            ("Medite na promessa do Salmo 23.", 5000),
            ("O Senhor é o meu pastor. Nada me faltará.", 12000),
            ("Ele me faz repousar em pastos verdejantes.", 10000),
            ("Leva-me para junto das águas de descanso.", 12000),
            ("Sinta essas águas tranquilas lavando a sua alma.", 6000),
            ("Toda pressa. Todo medo. Toda preocupação com o amanhã.", 15000),
            ("Deus cuida de você.", 18000),
            ("Ouça a voz de Deus no Salmo 46.", 5000),
            ("Aquietai-vos. E sabei que Eu sou Deus.", 18000),
            ("Aquietar-se é a decisão de soltar o controle e confiar na soberania do Pai.", 15000),
            ("Deus é o nosso refúgio e fortaleza. Socorro bem presente nas tribulações.", 18000),
            ("Como nos ensina Provérbios.", 5000),
            ("Confia no Senhor de todo o teu coração. E não te estribes no teu próprio entendimento.", 18000),
            ("Em oração silenciosa, deixe a paz de Deus guardar a sua mente e o seu espírito.", 45000),
            ("Eu não estou sozinho.", 8000),
            ("O Senhor é a minha paz e o meu refúgio.", 25000),
            ("Faça uma respiração profunda.", 6000),
            ("Ancore essa fé no coração.", 8000),
            ("E abra os olhos em graça e paz.", 0),
        ]
    },
    # ==========================================
    # TRILHA DE EVOLUÇÃO (8 Níveis)
    # ==========================================
    "jornada_fase_1.mp3": {
        "voice": VOICE,
        "segments": [
            ("Acomode-se onde você está.", 4000),
            ("Pode fechar os olhos. Ou repousar o olhar para baixo.", 5000),
            ("Sinta o contato do seu corpo com a superfície que o apoia.", 6000),
            ("O peso dos pés no chão. As mãos sobre as pernas.", 5000),
            ("Faça uma respiração longa e solta.", 6000),
            ("E agora, leve toda a sua atenção para o campo dos sons.", 5000),
            ("Você não precisa ir até os sons.", 4000),
            ("Deixe que eles venham até você.", 8000),
            ("Perceba os sons mais próximos. Os sons desta sala.", 10000),
            ("O som da sua própria respiração.", 8000),
            ("Algum som sutil que talvez você não tivesse notado antes.", 12000),
            ("Agora, expanda a escuta para os sons mais distantes.", 6000),
            ("Sons que vêm de longe. Sem se importar com o que são.", 14000),
            ("Note o volume. A textura. A duração de cada som.", 10000),
            ("E perceba o que existe entre um som e outro.", 6000),
            ("O silêncio de fundo.", 15000),
            ("Sons que surgem do silêncio. Duram um instante. E voltam ao silêncio.", 18000),
            ("Se a mente tentar criar histórias, apenas volte a escutar.", 15000),
            ("Descanse nessa escuta aberta por mais alguns instantes.", 12000),
            ("Traga a atenção de volta para o corpo inteiro.", 5000),
            ("Faça uma respiração profunda.", 6000),
            ("E quando estiver pronto. Abra suavemente os olhos.", 0),
        ]
    },
    "jornada_fase_2.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Traga a sua atenção para dentro do corpo.", 4000),
            ("Feche os olhos, se for confortável.", 4000),
            ("Perceba o corpo sentado. Onde quer que você esteja.", 5000),
            ("Sinta o peso do corpo sobre o assento. Sobre o chão.", 6000),
            ("Faça algumas respirações profundas.", 4000),
            ("E a cada inspiração, sinta o ar entrando e despertando o corpo.", 6000),
            ("A cada expiração, relaxe um pouco mais profundamente.", 8000),
            ("Leve a atenção para os pés no chão.", 5000),
            ("Sinta a sola dos pés em contato com o solo.", 4000),
            ("O peso. A pressão. A vibração. O calor.", 10000),
            ("Suba a atenção para as pernas apoiadas na cadeira.", 4000),
            ("Pressão. Pulsação. Peso. Leveza.", 10000),
            ("Sinta as costas encostadas no assento.", 8000),
            ("Traga a atenção para a área do abdômen.", 5000),
            ("Se a barriga estiver tensa ou contraída, deixe amolecer.", 4000),
            ("Respire.", 10000),
            ("Perceba as suas mãos.", 5000),
            ("As mãos estão tensas ou apertadas?", 4000),
            ("Veja se pode permitir que elas se soltem.", 10000),
            ("Sinta os braços.", 4000),
            ("Perceba qualquer sensação nos braços.", 8000),
            ("Deixe os ombros se soltarem.", 10000),
            ("Perceba o pescoço e a garganta.", 4000),
            ("Deixe-os macios. Relaxados.", 10000),
            ("Solte a mandíbula.", 4000),
            ("Deixe o rosto e os músculos faciais se suavizarem.", 12000),
            ("Agora, perceba o corpo inteiro, presente, aqui.", 8000),
            ("Faça mais uma respiração.", 6000),
            ("Esteja consciente do corpo inteiro. Da melhor forma que puder.", 8000),
            ("Respire.", 6000),
            ("E quando estiver pronto. Abra os olhos.", 0),
        ]
    },
    "jornada_fase_3.mp3": {
        "voice": VOICE,
        "segments": [
            ("Adote uma postura confortável, com a coluna naturalmente ereta.", 5000),
            ("Feche suavemente os olhos.", 5000),
            ("Permita que o corpo se acomode por completo.", 8000),
            ("Traga a atenção para a respiração natural.", 5000),
            ("Não mude nada no ritmo do fôlego.", 4000),
            ("Apenas observe o ar entrando. E o ar saindo.", 10000),
            ("Onde a respiração é mais nítida para você agora?", 6000),
            ("Pode ser o ar fresco entrando pelas narinas.", 8000),
            ("Pode ser a expansão suave do peito.", 8000),
            ("Ou o abdômen subindo na inspiração. E descendo na expiração.", 10000),
            ("Escolha esse ponto de maior nitidez.", 4000),
            ("Faça dele a sua âncora.", 12000),
            ("Acompanhe o ciclo completo de uma inspiração.", 4000),
            ("O início. O meio. O final da inspiração.", 12000),
            ("E o início da expiração. O meio. E o final da expiração.", 15000),
            ("Apenas isso. O ar que entra. O ar que sai.", 20000),
            ("Se a mente se distrair com um pensamento ou uma tarefa, isso é completamente normal.", 6000),
            ("Apenas note com gentileza. Pensando.", 4000),
            ("E traga a atenção de volta ao fôlego.", 15000),
            ("Cada retorno ao fôlego é uma repetição que fortalece o foco.", 6000),
            ("Não é um erro se distrair. O momento de notar é o momento da prática.", 18000),
            ("Vamos ficar em silêncio agora, acompanhando a respiração.", 60000),
            ("Sentindo o corpo respirar.", 30000),
            ("Faça uma respiração mais profunda.", 6000),
            ("Sinta o corpo inteiro presente.", 5000),
            ("E quando estiver pronto. Abra suavemente os olhos.", 0),
        ]
    },
    "jornada_fase_4.mp3": {
        "voice": VOICE,
        "segments": [
            ("Acomode-se de forma gentil e acolhedora.", 5000),
            ("Se desejar, coloque uma das mãos sobre o peito.", 4000),
            ("Feche os olhos.", 6000),
            ("Faça duas respirações longas e soltas, soltando o ar com alívio.", 12000),
            ("Primeiro, vamos encontrar o seu porto seguro no corpo.", 5000),
            ("Sinta os pés firmes no chão.", 6000),
            ("Sinta o calor da mão no peito.", 6000),
            ("Esse contato é o seu lugar de estabilidade. Sempre pode voltar a ele.", 10000),
            ("Agora, traga à mente alguma situação recente que tenha gerado tensão, preocupação ou aperto.", 5000),
            ("Não precisa ser algo enorme. Algo moderado.", 10000),
            ("Reconheça: o que está sentindo agora?", 5000),
            ("Pode nomear silenciosamente. Ansiedade. Frustração. Medo. Tristeza.", 12000),
            ("Não tente resolver. Apenas reconheça o que está aí.", 10000),
            ("Agora, acolha. Permita que a sensação exista sem julgamento.", 6000),
            ("Diga interiormente: sim, isso está aqui agora.", 15000),
            ("Investigue com cuidado: onde no corpo essa emoção se manifesta?", 8000),
            ("É um aperto no peito?", 6000),
            ("Uma pressão na garganta?", 6000),
            ("Um peso no estômago?", 6000),
            ("Um nó nos ombros?", 10000),
            ("Respire suavemente ao redor dessa área.", 12000),
            ("Não precisa resolver. Não precisa entender. Apenas dê espaço.", 18000),
            ("Se ficar intenso demais, volte ao porto seguro.", 5000),
            ("Os pés no chão. A mão no peito. A respiração.", 15000),
            ("E quando se sentir estável, olhe novamente para a sensação com gentileza.", 20000),
            ("As emoções são temporárias.", 5000),
            ("Elas chegam. Atingem um pico. E naturalmente se desfazem.", 20000),
            ("Agora, nutra esse lugar vulnerável com compaixão.", 5000),
            ("Imagine que está cuidando de si mesmo como cuidaria de alguém que ama.", 20000),
            ("Respire profundamente.", 8000),
            ("Solte o que puder ser solto.", 6000),
            ("Sinta a firmeza dos pés no chão.", 8000),
            ("E quando estiver pronto. Abra os olhos com serenidade.", 0),
        ]
    },
    "jornada_fase_5.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Acomode-se com o peito aberto e as mãos relaxadas.", 5000),
            ("Feche os olhos com tranquilidade.", 6000),
            ("Faça duas ou três respirações longas, soltando qualquer pressa.", 10000),
            ("Leve a atenção para a região do coração, no centro do peito.", 6000),
            ("Sinta o calor nessa área. A respiração sutil.", 10000),
            ("Permita que uma sensação de cuidado surja ali.", 12000),
            ("Traga à mente a imagem de alguém por quem você sinta um carinho espontâneo.", 5000),
            ("Pode ser uma pessoa, um animal, alguém que naturalmente faz você sorrir.", 10000),
            ("Veja o rosto dessa presença querida.", 8000),
            ("E envie silenciosamente os seguintes votos de coração:", 6000),
            ("Que você esteja seguro e protegido.", 12000),
            ("Que você tenha paz no coração.", 12000),
            ("Que você tenha saúde e bem-estar.", 12000),
            ("Que você viva com alegria.", 15000),
            ("Sinta o calor que nasce de desejar o bem a quem você ama.", 15000),
            ("Agora, com cuidado, traga esse mesmo carinho para dentro de você mesmo.", 8000),
            ("Que eu esteja seguro e guardado.", 12000),
            ("Que eu tenha paz e saúde.", 12000),
            ("Que eu me acolha com paciência e compaixão.", 20000),
            ("Se houver resistência, apenas note. Não force.", 15000),
            ("Agora, expanda esse círculo de afeto.", 6000),
            ("Inclua familiares. Amigos. Colegas.", 15000),
            ("E se sentir disponível, inclua pessoas com quem você teve dificuldades.", 6000),
            ("Sem forçar. Apenas permitindo, se for possível agora.", 20000),
            ("Que todos possamos viver com dignidade, compreensão e paz.", 30000),
            ("Sinta esse calor generoso no corpo inteiro.", 20000),
            ("Faça uma respiração profunda.", 6000),
            ("Permita um sorriso suave.", 5000),
            ("E abra os olhos, levando essa bondade para o seu dia.", 0),
        ]
    },
    "jornada_fase_6.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Assuma uma postura estável, digna e confortável.", 5000),
            ("Feche os olhos.", 6000),
            ("Faça três respirações longas e intencionais.", 15000),
            ("Fase um: a respiração.", 4000),
            ("Acompanhe o ritmo natural do fôlego.", 5000),
            ("O ar entrando. O ar saindo.", 20000),
            ("Sem controlar. Apenas observando.", 25000),
            ("Fase dois: os sons.", 4000),
            ("Mantendo o fôlego presente, expanda a atenção para o campo sonoro.", 8000),
            ("Sons próximos. Sons distantes. O silêncio de fundo.", 25000),
            ("Respiração e sons coexistindo na sua percepção.", 25000),
            ("Fase três: o corpo.", 4000),
            ("Agora inclua as sensações do corpo inteiro.", 6000),
            ("O peso. A postura. A temperatura da pele. Pulsações sutis.", 25000),
            ("Três âncoras simultâneas: fôlego, sons, corpo.", 10000),
            ("Tudo acontecendo ao mesmo tempo na sua consciência aberta.", 30000),
            ("Agora, solte todas as âncoras.", 6000),
            ("Não há mais nada específico para focar.", 5000),
            ("Seja apenas a testemunha silenciosa do que surge e passa.", 8000),
            ("Pensamentos vêm e vão como nuvens.", 6000),
            ("Sons surgem e desaparecem.", 6000),
            ("Sensações mudam continuamente.", 6000),
            ("Você é o espaço onde tudo isso acontece.", 40000),
            ("Descanse nesse espaço aberto.", 80000),
            ("Faça uma respiração profunda.", 6000),
            ("Sinta o corpo inteiro presente.", 5000),
            ("E quando estiver pronto. Abra os olhos.", 0),
        ]
    },
    "jornada_fase_7.mp3": {
        "voice": VOICE_MALE,
        "segments": [
            ("Deite-se confortavelmente, com o corpo estendido e os braços ao lado do tronco.", 8000),
            ("Feche os olhos.", 5000),
            ("Faça uma respiração profunda pelo nariz. E solte o ar devagar pela boca.", 10000),
            ("Mais uma vez. Inspire. E solte, sentindo o corpo afundar na cama.", 12000),
            ("O dia de hoje terminou.", 5000),
            ("Tudo o que pôde ser feito foi feito. Agora é hora de descansar.", 15000),
            ("Traga a atenção para o topo da cabeça.", 5000),
            ("Sinta o couro cabeludo relaxando.", 8000),
            ("A testa se abrindo. Se alisando.", 10000),
            ("As pálpebras pesadas e descansadas.", 10000),
            ("Solte a mandíbula. Separe levemente os dentes.", 5000),
            ("A língua solta na base da boca.", 10000),
            ("Sinta o pescoço relaxando. A garganta solta.", 12000),
            ("Os ombros afundam no travesseiro.", 5000),
            ("Não há nada para carregar agora.", 15000),
            ("Desça pelos braços. Os cotovelos. Os antebraços. Os pulsos.", 10000),
            ("As mãos e os dedos completamente soltos e pesados.", 15000),
            ("Sinta as costas recebendo o suporte completo do colchão.", 5000),
            ("Cada vértebra descansa sobre a superfície.", 15000),
            ("O peito respirando em ondas lentas.", 12000),
            ("O abdômen subindo e descendo, macio, sem esforço.", 18000),
            ("Solte o quadril. As coxas afundam na cama.", 15000),
            ("Os joelhos. As panturrilhas. Relaxando.", 15000),
            ("Os tornozelos soltos. Os pés pesados e quentes.", 15000),
            ("Os dedos dos pés completamente descansados.", 20000),
            ("O corpo inteiro afundando suavemente.", 8000),
            ("Como se a gravidade estivesse gentilmente puxando cada célula para o repouso.", 25000),
            ("Não há nada para fazer. Nada para resolver. Nada para planejar.", 8000),
            ("Apenas o corpo descansando. E a respiração se fazendo sozinha.", 40000),
            ("Deixe-se levar pelo ritmo suave do fôlego. Mergulhando no sono.", 60000),
            ("Durma em paz.", 0),
        ]
    },
    "jornada_fase_8.mp3": {
        "voice": VOICE,
        "segments": [
            ("Assuma a sua postura de prática. Coluna ereta, corpo relaxado.", 6000),
            ("Feche os olhos.", 8000),
            ("Faça três respirações lentas e conscientes.", 18000),
            ("Sinta a clareza que se instala quando o corpo está quieto.", 12000),
            ("Nesta prática, você não precisa fazer nada de especial.", 6000),
            ("Apenas repouse na sua própria presença.", 15000),
            ("Observe o que está acontecendo agora. Sem escolher.", 5000),
            ("O fôlego se move. Sons surgem e passam. Sensações mudam.", 20000),
            ("Pensamentos aparecem como eventos na mente.", 6000),
            ("Você não é os seus pensamentos.", 5000),
            ("Você é o espaço amplo e calmo onde os pensamentos passam.", 25000),
            ("Quando perceber que se perdeu em uma história, simplesmente note.", 6000),
            ("E retorne ao silêncio.", 20000),
            ("Vamos entrar agora em um período estendido de quietude.", 6000),
            ("Sem instrução. Apenas presença.", 120000),
            ("Sinta a respiração.", 90000),
            ("Descanse no ser.", 90000),
            ("Traga a atenção de volta para o corpo sentado.", 8000),
            ("Sinta os pés no chão. As mãos. A postura.", 10000),
            ("Faça uma respiração profunda.", 8000),
            ("E quando estiver pronto. Abra os olhos com lucidez.", 0),
        ]
    },
}


async def generate_speech_segment(text: str, voice: str, output_path: str):
    """Generate speech for a single text segment using edge-tts."""
    communicate = edge_tts.Communicate(text, voice, rate="-15%")
    await communicate.save(output_path)


def generate_silence_segment(duration_ms: int, output_path: str):
    """Generate a silent MP3 matching edge-tts audio properties."""
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


async def generate_session(filename: str, session_data: dict):
    """Generate a complete meditation session MP3 with real silence pauses."""
    voice = session_data["voice"]
    segments = session_data["segments"]
    
    session_temp_dir = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
    os.makedirs(session_temp_dir, exist_ok=True)
    
    print(f"\n[INICIANDO] {filename} ({len(segments)} segmentos)")
    
    file_list = []
    
    for i, (text, pause_ms) in enumerate(segments):
        seg_mp3 = os.path.join(session_temp_dir, f"seg_{i:03d}.mp3")
        await generate_speech_segment(text, voice, seg_mp3)
        file_list.append(seg_mp3)
        
        if pause_ms > 0:
            sil_mp3 = os.path.join(session_temp_dir, f"sil_{i:03d}.mp3")
            generate_silence_segment(pause_ms, sil_mp3)
            file_list.append(sil_mp3)
        
        if (i + 1) % 5 == 0 or i == len(segments) - 1:
            print(f"  Progresso: [{i+1}/{len(segments)}] segmentos sintetizados")
    
    # Write concat manifest
    concat_txt = os.path.join(session_temp_dir, "concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for fpath in file_list:
            # Escape path for ffmpeg concat
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
    print(f"  [CONCLUIDO] {filename} ({file_size_kb:.1f} KB)")
    
    return filename, file_size_kb


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)
    
    print("=" * 60)
    print("GERADOR DE AUDIOS DE MEDITACAO PT-BR (EDGE-TTS + FFMPEG)")
    print("=" * 60)
    
    results = []
    for filename, session_data in SESSIONS.items():
        try:
            res = await generate_session(filename, session_data)
            results.append(res)
        except Exception as e:
            print(f"  [ERRO] em {filename}: {e}")
    
    # Cleanup temp directory
    if os.path.exists(TEMP_DIR):
        try:
            shutil.rmtree(TEMP_DIR)
        except Exception:
            pass
    
    print("\n" + "=" * 60)
    print("RESUMO FINAL:")
    print("=" * 60)
    for fname, size_kb in results:
        print(f"  {fname:35s} -> {size_kb:8.1f} KB")
    print(f"\nTotal: {len(results)}/{len(SESSIONS)} audios gerados com sucesso em {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
