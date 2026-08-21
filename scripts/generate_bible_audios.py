"""
Script para geração dos áudios das Histórias Bíblicas e Bíblia Kids via OpenRouter (OpenAI GPT-Audio-Mini / TTS).
Gera arquivos de áudio fluidos e expressivos para os modais BibleStoryModal e BibleKidsStoryModal.
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
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_bible_audio")

# Prompts de Personalidade
PROMPT_HELENA_STORY = (
    "Você é Helena, uma narradora experiente de audiolivros e histórias bíblicas épicas. "
    "Fale em português do Brasil com voz doce, clara, emotiva, calorosa e com ritmo narrativo envolvente. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

PROMPT_SAMUEL_STORY = (
    "Você é Samuel, um narrador experiente de documentários históricos e biografias bíblicas. "
    "Fale em português do Brasil com voz masculina grave, calorosa, profunda, solene e inspiradora. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

PROMPT_KIDS_STORY = (
    "Você é a Tia Bia, uma contadora de histórias infantis e professora carinhosa. "
    "Fale em português do Brasil com voz alegre, afetuosa, doce, expressiva e acolhedora, perfeita para crianças ouvirem antes de dormir. "
    "Repita EXATAMENTE o texto a seguir, sem inventar comentários adicionais."
)

BIBLE_STORIES_AUDIO = {
    # ==========================================
    # HISTÓRIAS BÍBLICAS ADULTAS / STORYTELLING
    # ==========================================
    "historia_rute.mp3": {
        "voice": "nova",
        "system_prompt": PROMPT_HELENA_STORY,
        "segments": [
            ("A história de Rute. A fidelidade que redefiniu uma linhagem real.", 3000),
            ("Ato 1: O Vazio e o Pacto Inquebrável. Após perder o marido e os dois filhos em terra estrangeira, Noemi decide voltar para Belém, desolada e de mãos vazias. Ela pede que suas noras voltem para suas famílias.", 2000),
            ("Porém, Rute recusa a partida e pronuncia uma das declarações de lealdade mais eternas da história: Aonde quer que fores, irei eu; onde pousares, ali pousarei; o teu povo é o meu povo, o teu Deus é o meu Deus.", 3500),
            ("Ato 2: A Graça no Campo de Boaz. Chegando a Belém no início da colheita da cevada, Rute sai para recolher espigas deixadas pelos ceifeiros para alimentar sua sogra. Ela chega por providência ao campo de Boaz, homem íntegro e bondoso.", 2000),
            ("Boaz reconhece a nobreza e o amor abnegado de Rute por Noemi e ordena proteção e fartura para ela em seus campos.", 3500),
            ("Ato 3: A Eira e o Pedido de Redenção. Seguindo a sábia orientação de Noemi, Rute vai à eira à noite e pede que Boaz estenda sua capa sobre ela — solicitando o resgate como parente remidor.", 2000),
            ("Boaz honra a virtude de Rute e assume publicamente o compromisso de redimi-la perante os anciãos da cidade.", 3500),
            ("Ato 4: A Restauração e a Linhagem Eterna. Boaz casa-se com Rute e eles têm um filho chamado Obede. O bebê é colocado no colo de Noemi, transformando o luto em riso e celebração.", 2000),
            ("Obede gerou a Jessé, que gerou o Rei Davi, de cuja linhagem nasceu Jesus Cristo, o Salvador do mundo. O amor leal sempre floresce.", 0),
        ]
    },
    "historia_abraao.mp3": {
        "voice": "onyx",
        "system_prompt": PROMPT_SAMUEL_STORY,
        "segments": [
            ("A jornada de Abraão. A fé inabalável e a promessa que atravessou milênios.", 3000),
            ("Ato 1: O Chamado para o Desconhecido. Aos setenta e cinco anos, Abrão ouve a voz soberana de Deus ordenando que deixe sua terra, sua parentela e a casa de seu pai, marchando rumo a uma terra desconhecida.", 2000),
            ("Sem mapa, mas firmado na promessa de que seria pai de uma grande nação, ele obedece e parte com Sara e sua família.", 3500),
            ("Ato 2: As Estrelas do Céu e a Aliança. Anos se passam sem que o casal tenha filhos. Deus conduz Abrão para fora da tenda na calada da noite e diz: Olha para o céu e conta as estrelas, se fores capaz. Assim será a tua descendência.", 2000),
            ("Abrão creu no Senhor, e isso lhe foi imputado para justiça em um pacto eterno.", 3500),
            ("Ato 3: O Riso da Promessa Cumprida. No tempo estabelecido por Deus, quando a razão humana dizia ser impossível, Sara concebe e dá à luz Isaque, cujo nome significa riso.", 2000),
            ("Deus transforma o impossível em testemunho vivo de fidelidade absoluta.", 3500),
            ("Ato 4: O Monte Moriá e o Cordeiro da Provisão. Levado à prova máxima no Monte Moriá, Abraão demonstra que amava o Doador mais do que a própria bênção recebida.", 2000),
            ("No momento decisivo, Deus intervém e provê um carneiro substituto, revelando-se como Yahweh Jireh: O Senhor Proverá.", 0),
        ]
    },
    "historia_ester.mp3": {
        "voice": "nova",
        "system_prompt": PROMPT_HELENA_STORY,
        "segments": [
            ("A história de Ester. Coragem para uma hora como esta.", 3000),
            ("Ato 1: A Órfã Exilada no Palácio Real. Hadassa, uma jovem judia órfã criada por seu primo Mardoqueu em Susã, é escolhida pelo rei Assuero para ser a nova rainha da Pérsia, adotando o nome de Ester.", 2000),
            ("Ato 2: O Decreto Mortal de Hamã. Hamã, o primeiro-ministro do império, arquiteta um plano maligno para exterminar todos os judeus do reino em um único dia, convencendo o rei a selar o decreto de morte.", 2000),
            ("Mardoqueu envia um recado urgente a Ester: Quem sabe se não foi para um momento como este que você chegou à posição de rainha?", 3500),
            ("Ato 3: Se Eu Perecer, Pereci. Ester convoca todo o povo a jejuar e orar por três dias. Mesmo sob risco de morte por entrar na presença do rei sem ser chamada, ela declara com firmeza: Se eu perecer, pereci.", 2000),
            ("O rei estende o cetro de ouro em sinal de favor e clemência.", 3500),
            ("Ato 4: O Banquete e a Salvação de uma Nação. No banquete que preparou, Ester revela com sabedoria e coragem a trama assassina de Hamã. O rei desfaz a opressão e permite aos judeus se defenderem.", 2000),
            ("O luto transforma-se no grande dia de celebração do Purim. Onde o silêncio parecia reinar, a providência de Deus triunfou.", 0),
        ]
    },
    "historia_jose.mp3": {
        "voice": "onyx",
        "system_prompt": PROMPT_SAMUEL_STORY,
        "segments": [
            ("A história de José do Egito. Da cova ao palácio: o perdão que preservou vidas.", 3000),
            ("Ato 1: A Túnica, os Sonhos e a Traição. Amado por seu pai Jacó e agraciado com sonhos divinos de liderança, José desperta a inveja ardente de seus irmãos.", 2000),
            ("Eles o jogam em uma cova no deserto e o vendem como escravo para uma caravana rumo ao Egito.", 3500),
            ("Ato 2: A Casa de Potifar e a Prisão Injusta. No Egito, José serve com integridade exemplar na casa de Potifar. Caluniado falsamente, é lançado nas masmorras reais.", 2000),
            ("Contudo, o texto sagrado repete: Mas o Senhor era com José, e tudo o que ele fazia prosperava.", 3500),
            ("Ato 3: A Sabedoria no Trono do Faraó. Treze anos após a traição, José é chamado para interpretar os sonhos enigmáticos do Faraó sobre a grande fome.", 2000),
            ("Reconhecido como homem sábio e cheio do Espírito de Deus, é nomeado governador de todo o Egito, administrando celeiros para salvar o mundo antigo.", 3500),
            ("Ato 4: O Reencontro e o Perdão Redentor. Quando seus irmãos chegam ao Egito em busca de trigo, José não busca vingança. Ele chora de compaixão e declara:", 2000),
            ("Vós planejastes o mal contra mim, mas Deus o tornou em bem, para salvar muitas vidas. O perdão cura todas as feridas.", 0),
        ]
    },
    "historia_davi.mp3": {
        "voice": "onyx",
        "system_prompt": PROMPT_SAMUEL_STORY,
        "segments": [
            ("A vida de Davi. O pastor de ovelhas e o coração segundo o coração de Deus.", 3000),
            ("Ato 1: O Menino dos Campos de Belém. Esquecido por sua família nos pastos enquanto cuidava das ovelhas, o jovem Davi é ungido pelo profeta Samuel como futuro rei de Israel.", 2000),
            ("Deus declara: O homem vê o exterior, mas o Senhor olha para o coração.", 3500),
            ("Ato 2: A Funda, a Fé e o Gigante Golias. Enquanto todo o exército de Israel tremia de pavor diante do gigante Golias, Davi avança com uma funda, cinco pedras e convicção inabalável.", 2000),
            ("Ele proclama: Tu vens contra mim com espada e lança, mas eu vou contra ti em nome do Senhor dos Exércitos. E o gigante cai.", 3500),
            ("Ato 3: O Deserto da Formação e a Caverna de Adulão. Perseguido injustamente pelo rei Saul, Davi aprende a refugiar-se no Senhor nas cavernas do deserto, compondo salmos de confiança e recusando vingar-se de seu perseguidor.", 3500),
            ("Ato 4: O Reinado, o Quebrantamento e a Graça. Estabelecido como o maior rei de Israel e conquistador de Jerusalém, Davi experimenta quedas dolorosas, mas destaca-se por seu arrependimento genuíno e busca apaixonada pela presença de Deus.", 2000),
            ("Deus firma com ele uma aliança eterna que culmina no Reino de Cristo.", 0),
        ]
    },
    "historia_daniel.mp3": {
        "voice": "onyx",
        "system_prompt": PROMPT_SAMUEL_STORY,
        "segments": [
            ("A história de Daniel. Fidelidade inegociável na corte da Babilônia.", 3000),
            ("Ato 1: Firmeza na Mesa do Rei. Jovem exilado na suntuosa corte da Babilônia, Daniel toma uma decisão firme em seu coração: não se contaminar com os manjares do rei.", 2000),
            ("Deus concede a ele e a seus amigos sabedoria, discernimento e honra diante do império.", 3500),
            ("Ato 2: Revelador de Mistérios Ocultos. Quando Nabucodonosor exige que seus sábios decifrem um sonho esquecido sob ameaça de morte, Daniel busca o Deus dos céus em oração.", 2000),
            ("Deus revela o segredo e a visão da grande estátua, profetizando o Reino eterno que jamais será destruído.", 3500),
            ("Ato 3: A Fornalha Ardente e o Quarto Homem. Sadraque, Mesaque e Abednego recusam curvar-se diante da estátua de ouro. Lançados na fornalha ardente, caminham ilesos ao lado do Filho de Deus.", 3500),
            ("Ato 4: A Cova dos Leões e o Deus que Livra. Por manter o hábito de orar três vezes ao dia de joelhos em direção a Jerusalém, Daniel é jogado na cova dos leões famintos.", 2000),
            ("Pela manhã, o rei corre e encontra Daniel vivo: O meu Deus enviou o Seu anjo e fechou a boca dos leões. A integridade tem a proteção dos céus.", 0),
        ]
    },
    "historia_malaquias.mp3": {
        "voice": "onyx",
        "system_prompt": PROMPT_SAMUEL_STORY,
        "segments": [
            ("A mensagem do profeta Malaquias. O Sol da Justiça e a promessa do novo amanhecer.", 3000),
            ("Ato 1: O Amor de Deus Reafirmado. Após o retorno do exílio babilônico e a reconstrução do templo, o povo cai na frieza espiritual e no ceticismo. Deus abre o livro com uma declaração contundente: Eu vos tenho amado, diz o Senhor.", 3500),
            ("Ato 2: O Confronto com a Apatia e a Honra. Malaquias confronta sacerdotes e líderes que ofereciam sacrifícios defeituosos e quebravam alianças conjugais. O profeta chama o povo de volta à adoração sincera e reverente.", 3500),
            ("Ato 3: O Livro de Memoriais e o Ouro Provado. Para aqueles que ainda temiam a Deus em tempos difíceis, um livro de memoriais era escrito no céu. Deus promete: Eles serão para mim o Meu tesouro particular.", 3500),
            ("Ato 4: O Sol da Justiça e o Fim do Silêncio. Concluindo o Antigo Testamento, Malaquias anuncia que para os que temem o Senhor, nascerá o Sol da Justiça trazendo cura e restauração em Suas asas.", 2000),
            ("Quatrocentos anos depois, essa profecia se cumpriu com o nascimento de Jesus, a Luz que ilumina todo homem.", 0),
        ]
    },

    # ==========================================
    # HISTÓRIAS DA BÍBLIA KIDS (TIA BIA)
    # ==========================================
    "kids_criacao.mp3": {
        "voice": "shimmer",
        "system_prompt": PROMPT_KIDS_STORY,
        "segments": [
            ("Oi amiguinho! Hoje vamos conhecer uma história linda e cheia de cores: A Criação do Mundo!", 3000),
            ("Cena 1: A Luz no Escuro. No início de tudo, não havia nada além de escuridão. Então Papai do Céu olhou com amor e disse: Haja Luz! E uma luz brilhante e colorida surgiu iluminando todo o universo!", 3000),
            ("Cena 2: Céu, Mares e a Terra. Deus separou as águas azuis, criou o céu fofinho de nuvens e a terra firme com montanhas, florestas e flores de todas as cores do arco-íris.", 3000),
            ("Cena 3: O Sol, a Lua e os Bichinhos. Ele colocou um sol quentinho para o dia, uma lua prateada e milhares de estrelas para a noite. Depois encheu os mares com peixinhos e a terra com leões, passarinhos e cachorrinhos alegres!", 3000),
            ("Cena 4: O Grande Amor por Nós. Por fim, Deus criou as pessoas para cuidarem do mundo com muito amor e serem Suas amigas queridas. Deus olhou para tudo o que fez e sorriu feliz: Ficou muito bom!", 2000),
            ("Deus fez tudo com muito carinho e ama muito você!", 0),
        ]
    },
    "kids_noe.mp3": {
        "voice": "shimmer",
        "system_prompt": PROMPT_KIDS_STORY,
        "segments": [
            ("Oi amiguinho! Hoje vamos ouvir uma história cheia de aventura: A Arca de Noé e o Grande Arco-Íris!", 3000),
            ("Parte 1: Um Barco Gigante no Meio do Nada. Era uma vez um homem muito bom chamado Noé, que amava conversar com Deus todos os dias.", 2000),
            ("Um dia, Deus disse a Noé: Construa um barco enorme, do tamanho de um prédio, porque vai chover muito! As pessoas achavam estranho, mas Noé obedeceu com um sorriso no rosto e começou a martelar madeira por madeira.", 3000),
            ("Parte 2: Animais de Dois em Dois! Quando o barco ficou pronto, aconteceu algo incrível: leões, girafas, elefantinhos, macaquinhos e passarinhos começaram a chegar em fila, de dois em dois!", 2000),
            ("Noé abriu a grande porta da arca e todos entraram quentinhos e seguros. Deus mesmo fechou a porta com todo o Seu cuidado.", 3000),
            ("Parte 3: A Chuva e o Grande Arco-Íris. A chuva caiu lá fora por muitos dias, mas dentro do barco todos estavam protegidos e em paz. Quando a água baixou, uma pombinha voltou trazendo uma folha de oliveira no bico!", 2000),
            ("Todos saíram felizes no chão seco. E Deus pintou um arco-íris lindo e brilhante no céu, prometendo cuidar para sempre de todos nós!", 3000),
            ("Gostou da historinha? Deus sempre cuida de você com muito amor!", 0),
        ]
    },
    "kids_davi.mp3": {
        "voice": "shimmer",
        "system_prompt": PROMPT_KIDS_STORY,
        "segments": [
            ("Olá pequeno corajoso! Hoje vamos conhecer: O Menino Davi e o Gigante Golias!", 3000),
            ("Parte 1: O Pequeno Pastor de Ovelhas. Davi era o irmão mais novo da sua família e passava o dia cuidando das ovelhinhas nos campos. Ele tocava harpa, cantava canções bonitas e confiava que Deus sempre o protegia.", 3000),
            ("Parte 2: Um Gigante que Dava Medo. Um dia, apareceu um gigante muito bravo chamado Golias. Ele usava uma armadura pesada e gritava tão alto que os soldados tinham muito medo de chegar perto.", 2000),
            ("Davi olhou para o gigante e disse com toda a certeza: Eu não tenho medo, porque o nosso Deus é muito maior do que qualquer gigante!", 3000),
            ("Parte 3: Cinco Pedrinhas e uma Vitória Gigante! Davi pegou cinco pedrinhas lisinhas no riacho e a sua funda. Ele girou, girou e soltou a pedrinha pelo ar.", 2000),
            ("Plec! A pedra acertou a testa de Golias e o gigante caiu no chão! Todo o povo comemorou com muita alegria.", 3000),
            ("Viu só? Quando confiamos em Deus, o nosso coração fica forte e corajoso!", 0),
        ]
    },
    "kids_daniel.mp3": {
        "voice": "shimmer",
        "system_prompt": PROMPT_KIDS_STORY,
        "segments": [
            ("Oi querido! Vamos ouvir uma história emocionante: Daniel e a Noite com os Leões!", 3000),
            ("Parte 1: O Hábito de Orar com Amor. Daniel morava em um castelo bem longe de casa, mas nunca se esquecia de Deus. Três vezes por dia, ele abria a janela do seu quarto, se ajoelhava e orava com muito carinho.", 3000),
            ("Parte 2: A Cova dos Leões Famintos. Homens invejosos criaram uma regra proibindo as pessoas de orar. Mas Daniel continuou conversando com Deus fielmente. Por isso, os guardas o jogaram em uma cova cheia de leões grandões.", 3000),
            ("Parte 3: Um Anjo Amigo e Leões Calminhos! Deus enviou um anjo brilhante que fez carinho nos leões e fechou a boquinha de cada um deles! Eles dormiram mansinhos como gatinhos ao lado de Daniel a noite toda.", 3000),
            ("Pela manhã, o rei correu até a cova e ficou muito feliz ao ver Daniel são e salvo!", 2000),
            ("Deus nunca nos abandona e sempre envia Seus anjos para nos guardar!", 0),
        ]
    },
    "kids_jonas.mp3": {
        "voice": "shimmer",
        "system_prompt": PROMPT_KIDS_STORY,
        "segments": [
            ("Olá! Hoje temos uma história no fundo do mar: Jonas e o Peixe Amigo de Deus!", 3000),
            ("Parte 1: Um Barco na Direção Errada. Deus pediu para Jonas levar uma mensagem de amor para a cidade de Nínive. Mas Jonas ficou com medo e fugiu para o lado oposto em um navio grande.", 3000),
            ("Parte 2: Um Mergulho e uma Casa na Barriga do Peixe! Uma tempestade balançou o navio e Jonas caiu no mar. Mas Deus, com todo o Seu cuidado, preparou um peixe gigante que engoliu Jonas sem machucá-lo!", 3000),
            ("Lá dentro da barriga quentinha, Jonas orou, pediu desculpas e agradeceu a Deus. Três dias depois, o peixe nadou até a praia e colocou Jonas em segurança na areia.", 3000),
            ("Parte 3: Uma Cidade Inteira Transformada! Jonas foi correndo para Nínive e contou a todos sobre o amor de Deus. Todas as famílias se arrependeram e a cidade foi salva com muita alegria!", 3000),
            ("Como é bom obedecer a Deus e saber que Ele sempre nos dá uma nova chance!", 0),
        ]
    },
    "kids_paes.mp3": {
        "voice": "shimmer",
        "system_prompt": PROMPT_KIDS_STORY,
        "segments": [
            ("Oi amiguinho! Nossa história de hoje é: O Lanchinho do Menino e o Grande Banquete!", 3000),
            ("Parte 1: Uma Multidão com Muita Fome. Milhares de pessoas passaram o dia inteiro ouvindo as lindas histórias de Jesus perto do lago. Quando o sol começou a se pôr, a barriguinha de todo mundo começou a roncar de fome!", 3000),
            ("Parte 2: Um Pequeno Lanche Compartilhado. Um menininho bondoso estava ali com a sua cestinha que tinha apenas cinco pãezinhos e dois peixinhos. Ele poderia ter guardado para si, mas entregou o seu lanche para Jesus com amor.", 3000),
            ("Parte 3: O Grande Milagre da Multiplicação! Jesus olhou para o céu, agradeceu a Deus e começou a repartir os pães. E quanto mais Ele repartia, mais pão e peixe apareciam!", 2000),
            ("Mais de cinco mil pessoas comeram até ficarem satisfeitas, e ainda sobraram doze cestos cheios!", 3000),
            ("Quando compartilhamos o pouco que temos com amor, Jesus faz coisas maravilhosas!", 0),
        ]
    }
}


def synthesize_segment_audio(text: str, voice: str, system_prompt: str, output_mp3_path: str, retries: int = 3):
    """Chama a API do OpenRouter para sintetizar um segmento com streaming PCM16 e converter para MP3."""
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://devocional.app",
        "X-Title": "Lecti Bible Hub App"
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
                time.sleep(1.5)
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
            time.sleep(2.0)


def generate_silence_segment(duration_ms: int, output_path: str):
    """Gera um arquivo de silêncio limpo em MP3."""
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


def generate_story_audio(filename: str, story_data: dict):
    """Gera a faixa de áudio completa de uma história bíblica."""
    voice = story_data["voice"]
    system_prompt = story_data["system_prompt"]
    segments = story_data["segments"]

    story_temp_dir = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
    os.makedirs(story_temp_dir, exist_ok=True)

    print(f"\n[INICIANDO] {filename} (Voz: {voice}, {len(segments)} blocos)", flush=True)

    file_list = []
    for i, (text, pause_ms) in enumerate(segments):
        seg_mp3 = os.path.join(story_temp_dir, f"seg_{i:02d}.mp3")
        synthesize_segment_audio(text, voice, system_prompt, seg_mp3)
        file_list.append(seg_mp3)

        if pause_ms > 0:
            sil_mp3 = os.path.join(story_temp_dir, f"sil_{i:02d}.mp3")
            generate_silence_segment(pause_ms, sil_mp3)
            file_list.append(sil_mp3)

        print(f"  Bloco [{i+1}/{len(segments)}] sintetizado", flush=True)

    # Concat manifest
    concat_txt = os.path.join(story_temp_dir, "concat.txt")
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
    print("GERADOR DE ÁUDIOS DO HUB BÍBLICO (HISTÓRIAS & KIDS)", flush=True)
    print("=" * 60, flush=True)

    results = []
    for filename, story_data in BIBLE_STORIES_AUDIO.items():
        try:
            res = generate_story_audio(filename, story_data)
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
    print("RESUMO FINAL ÁUDIOS DO HUB BÍBLICO:", flush=True)
    print("=" * 60, flush=True)
    for fname, size_kb in results:
        print(f"  {fname:35s} -> {size_kb:8.1f} KB", flush=True)
    print(f"\nTotal: {len(results)}/{len(BIBLE_STORIES_AUDIO)} áudios gerados em {OUTPUT_DIR}", flush=True)


if __name__ == "__main__":
    main()
