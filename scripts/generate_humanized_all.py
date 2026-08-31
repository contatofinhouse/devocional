import os
import sys
import json
import requests
import subprocess
import time
from urllib.error import HTTPError

# Chave OpenAI fornecida pelo usuário
OPENAI_API_KEY = os.environ.get("API_KEY")

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_openai_audio")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

try:
    import imageio_ffmpeg
    FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    # Tenta usar o ffmpeg do sistema se o pacote não estiver disponível
    FFMPEG_EXE = "ffmpeg"


def generate_tts_segment(text: str, voice: str, output_path: str, retries: int = 3):
    url = "https://api.openai.com/v1/audio/speech"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "tts-1",  # Usando tts-1 para maior fluidez e velocidade na geração
        "voice": voice,
        "input": text,
        "response_format": "mp3",
        "speed": 0.95 # Velocidade levemente reduzida para mais harmonia e suavidade
    }

    for attempt in range(retries):
        try:
            print(f"      -> Chamando OpenAI TTS (Voz: {voice})...")
            r = requests.post(url, headers=headers, json=payload, timeout=60)
            if r.status_code != 200:
                print(f"      [ERRO] {r.status_code}: {r.text}")
                time.sleep(2)
                continue
            
            with open(output_path, "wb") as f:
                f.write(r.content)
            return True
        except Exception as e:
            print(f"      [ERRO] {e}")
            time.sleep(2)
    return False

def generate_silence_segment(duration_ms: int, output_path: str):
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


BIBLE_STORIES = {
    # ==========================================
    # HISTÓRIAS ADULTAS (Contextualizadas e Humanizadas)
    # ==========================================
    "historia_rute.mp3": {
        "voice": "nova",
        "segments": [
            ("A história de Rute. Onde o recomeço floresce no terreno da lealdade.", 3000),
            ("Imagine viver no mundo antigo, onde a seca implacável transformava o solo em pó e obrigava famílias inteiras a deixarem tudo para trás em busca de pão. Foi assim que Noemi e sua família deixaram Belém para sobreviver em Moabe. Mas lá, longe de casa, Noemi perdeu o marido e seus dois filhos. Sem homens para prover, no mundo daquela época, uma viúva ficava absolutamente vulnerável, à margem da sociedade, sem futuro e sem sustento. É nesse cenário de dor, de luto que parece não ter fim, que Noemi, de mãos vazias e coração amargurado, decide retornar para sua terra natal.", 2500),
            ("Ela aconselha suas noras a buscarem segurança em suas terras. Mas Rute, contrariando toda a lógica de autopreservação, faz uma escolha baseada puramente no amor: 'Aonde quer que fores, irei eu. O teu povo será o meu povo, e o teu Deus será o meu Deus.'", 3500),
            ("Chegando a Belém, a fome era real. Rute vai aos campos debaixo do sol quente para recolher espigas caídas da colheita — um direito das pessoas mais pobres e vulneráveis. Lá, a providência divina a guia até as terras de Boaz, um fazendeiro de profunda integridade que não vê apenas uma estrangeira suada e exausta, mas uma mulher de caráter inabalável.", 2500),
            ("Seguindo um costume antigo sugerido por Noemi, Rute pede que Boaz seja o seu redentor. Ele honra o pedido, resgatando não apenas as terras da família, mas a dignidade e a alegria daquelas duas viúvas.", 3500),
            ("Do casamento de Rute e Boaz nasce Obede. E dessa linhagem de amor leal, que superou a miséria extrema e a viuvez, nasceria o Rei Davi e, mais tarde, Jesus Cristo. A história de Rute nos abraça hoje com uma certeza: Deus tece belos propósitos até mesmo através dos fios mais escuros da nossa dor e perda.", 0),
        ]
    },
    "historia_abraao.mp3": {
        "voice": "onyx",
        "segments": [
            ("A jornada de Abraão. Quando a fé exige que deixemos nosso porto seguro.", 3000),
            ("Na antiga Mesopotâmia, viver na cidade de Ur dos Caldeus era estar no centro da civilização. Havia comércio pujante, escrita, prosperidade e casas confortáveis de tijolos. A segurança estava em estar no seu clã. Mas, aos setenta e cinco anos, Abrão escuta uma voz que mudaria a rota da humanidade. Deus o chama para deixar absolutamente toda essa segurança. Ele precisava abandonar sua casa, sua cultura e sua família para caminhar em direção a uma terra que ele nunca tinha visto.", 2500),
            ("Sem um mapa, apenas com uma promessa, ele obedece. Abrão e Sara trocam o conforto de uma grande cidade pela poeira das estradas e a vida nômade em tendas no deserto.", 3500),
            ("Os anos se arrastam, pesados, e a maior angústia do casal permanece: eles não podiam ter filhos, o que na época era visto como uma vergonha e o fim de uma família. Numa noite estrelada, Deus leva Abrão para fora da tenda e diz: 'Conta as estrelas, se fores capaz. Assim será a tua descendência'. Mesmo com a idade avançada e todas as impossibilidades biológicas, Abrão escolheu acreditar.", 2500),
            ("E no tempo perfeito de Deus, quando a medicina e a lógica não viam mais esperança, o impossível se tornou um choro de bebê em sua tenda. Isaque nasceu.", 3500),
            ("Mas a provação não havia acabado. No Monte Moriá, Abraão demonstra que seu coração pertencia ao Criador, e não apenas ao filho tão esperado. Ele nos ensina que a verdadeira paz e segurança não vêm de onde moramos, do que possuímos ou das nossas garantias, mas da confiança absoluta Naquele que promete, pois o Seu agir é sempre perfeito.", 0),
        ]
    },
    "historia_ester.mp3": {
        "voice": "nova",
        "segments": [
            ("A história de Ester. Uma órfã coroada para um tempo como este.", 3000),
            ("Na grandiosa capital de Susã, o Império Persa era o dono do mundo conhecido. O palácio era um lugar de banquetes intermináveis, tecidos de ouro e leis que ninguém podia revogar, nem mesmo o rei. Nesse cenário onde as mulheres muitas vezes não tinham voz, vivia Hadassa, uma jovem judia que cresceu órfã e no exílio, cuidada pelo primo Mardoqueu. Quando o rei ordena a busca por uma nova rainha, Hadassa é levada, escondendo sua fé e adotando o nome de Ester.", 2500),
            ("O luxo dos aposentos reais, no entanto, disfarçava um perigo aterrorizante. Hamã, o segundo homem mais poderoso do império, consumido pelo ódio e pela vaidade, consegue aprovar uma lei para aniquilar todos os judeus em um único dia. Homens, mulheres e crianças estavam condenados à morte sem aviso prévio.", 3500),
            ("Desesperado, Mardoqueu envia uma mensagem à rainha: 'Não pense que por estar no palácio você escapará... Quem sabe se não foi para um momento como este que você chegou à realeza?'", 2500),
            ("Ester enfrentava um dilema mortal: a lei dizia que se alguém, até a rainha, entrasse no pátio do rei sem ser chamado, o destino seria a execução sumária. Mas, movida por compaixão e coragem pela vida do seu povo, ela decide jejuar e agir, dizendo: 'Se eu perecer, pereci'.", 3500),
            ("Ela entrou no salão. O rei estendeu o cetro dourado para ela. Com sabedoria, ela desmascarou o complô de Hamã e salvou a nação. Aonde o medo poderia ter silenciado e a orfandade poderia tê-la feito sentir-se inútil, a coragem de Ester, dirigida por Deus, mudou a história do seu povo.", 0),
        ]
    },
    "historia_jose.mp3": {
        "voice": "onyx",
        "segments": [
            ("A história de José do Egito. O perdão que reconstrói o que o ciúme destruiu.", 3000),
            ("Na cultura patriarcal antiga, a sobrevivência de um clã dependia da união dos irmãos. Mas ser o filho favorito, aquele que ganhava túnicas coloridas de presente do pai, despertou uma inveja mortal nos irmãos mais velhos de José. Numa tarde desolada no campo, a crueldade tomou conta. José foi jogado num buraco escuro e depois vendido como escravo por algumas moedas, sendo arrancado da sua família e levado acorrentado para o Egito.", 2500),
            ("Imagine a dor e a solidão. Em uma terra estrangeira, José reconstrói sua vida na casa de um oficial. Quando as coisas pareciam se ajeitar, ele se recusa a quebrar seus princípios morais com a esposa do chefe, sendo falsamente acusado e atirado no calabouço real. Treze anos de traições, esquecimento e prisões injustas. E no meio de todo esse silêncio, a Bíblia repete com doçura: 'O Senhor estava com José'.", 3500),
            ("Até que, num piscar de olhos, ele é chamado ao trono para interpretar o sonho do Faraó sobre catorze vacas, que avisavam de sete anos de fome global que se aproximavam. Pela sua sabedoria divina, o prisioneiro esquecido tornou-se governador de todo o Egito em um só dia.", 2500),
            ("Mas o maior teste estava por vir. Anos mais tarde, seus irmãos aparecem, famintos, implorando por trigo sem reconhecê-lo. Tendo o poder da vingança total nas mãos, José chora. Ele não humilha quem o destruiu, mas os abraça dizendo: 'Não fiquem tristes... Vocês planejaram o mal contra mim, mas Deus o tornou em bem, para salvar muitas vidas'. Nenhuma traição e nenhuma cova podem enterrar o propósito que Deus desenhou para sua vida.", 0),
        ]
    },
    "historia_davi.mp3": {
        "voice": "onyx",
        "segments": [
            ("A vida de Davi. O coração humilde que conquistou as batalhas de Deus.", 3000),
            ("Para os exércitos da antiguidade, não havia nada mais valioso que um soldado alto, forte e bem equipado. Por isso, quando o profeta Samuel foi em busca do novo rei para a nação de Israel, ninguém sequer lembrou do adolescente esquecido no campo, pastoreando as ovelhas da família. Ele não tinha cara de rei, mas Deus declarou a Samuel: 'As pessoas vêem a aparência, mas eu enxergo o coração'.", 2500),
            ("Lá no campo, enfrentando ursos e leões sozinho para defender o rebanho, a fé e a coragem de Davi foram forjadas. Quando um gigante filisteu chamado Golias aterrorizou todos os soldados adultos de Israel, zombando do Deus vivo, Davi não recuou. Ele dispensou a armadura pesada do rei. Pegou cinco pedras lisas do rio e declarou: 'Você vem contra mim com espada e lança, mas eu vou contra ti em nome do Senhor dos Exércitos'. E com um único arremesso de funda, o gigante de mais de dois metros e meio desabou.", 3500),
            ("Mas a glória veio com dor. Davi viveu anos fugindo pelo deserto de um rei invejoso que queria matá-lo. Naquelas cavernas escuras e empoeiradas, ele cantava salmos, desabafava sua angústia e aprendia que só o Senhor era sua rocha. E mesmo podendo se vingar de seus inimigos, recusou-se a fazer justiça com as próprias mãos.", 2500),
            ("Quando finalmente reinou, Davi foi o maior conquistador de Israel, mas também falhou e cometeu pecados muito graves. Sua grandeza, porém, nunca esteve em ser perfeito, mas na profundidade da sua dependência de Deus. Quando caiu, ele se arrependeu de joelhos, quebrado, pedindo perdão verdadeiro. E é por essa busca apaixonada que Deus o amou, e é da sua semente que um dia nasceu o Salvador.", 0),
        ]
    },
    "historia_daniel.mp3": {
        "voice": "onyx",
        "segments": [
            ("A história de Daniel. A paz que enfrenta os leões do medo.", 3000),
            ("Imagine seu país sendo invadido por um império violento, seus muros destruídos e você, sendo um adolescente, arrancado de casa e levado como prisioneiro para uma das maiores e mais deslumbrantes cidades do mundo: a Babilônia. O império queria reprogramar a mente daqueles jovens prodígios. Deram-lhes novos nomes, ensinaram-lhes magias, e os encheram com a comida mais luxuosa da mesa real.", 2500),
            ("Mas no meio de tanta pressão para abandonar quem ele era, Daniel tomou uma decisão firme no coração. Ele, com muita educação e respeito, decidiu não se misturar com os banquetes do rei que feriam as leis de Deus. Essa pequena atitude de obediência diária não o prejudicou, ao contrário, lhe rendeu uma sabedoria brilhante e paz inabalável, muito maior que todos os mágicos e sábios dali.", 3500),
            ("Os anos passaram, impérios mudaram, mas a inveja dos políticos em volta de Daniel cresceu ao ver seu sucesso. Eles armaram um plano infalível e aprovaram uma lei onde a oração estava banida. Todo pedido devia ser feito apenas ao Rei. Sabendo da lei de morte, Daniel não se desesperou, nem reclamou, ele foi para o seu quarto, ajoelhou-se calmamente em direção à sua terra, abriu as janelas e continuou conversando com o Pai Celestial.", 2500),
            ("O preço dessa lealdade foi a cova, um buraco escuro cheio de leões famintos babando por comida. Naquela noite aterrorizante, enquanto o rei que assinou a lei não conseguiu dormir de remorso, Daniel encontrou repouso ao lado das feras. De manhãzinha o rei corre e o chama. E, lá do fundo, a voz tranquila ecoa: 'Rei, vive para sempre! O meu Deus enviou o Seu anjo e fechou as bocas dos leões'. A vida não fica sem problemas quando andamos com Deus, mas ganhamos o Seu abraço bem na hora do medo.", 0),
        ]
    },
    "historia_malaquias.mp3": {
        "voice": "onyx",
        "segments": [
            ("A mensagem de Malaquias. O abraço do Pai para um povo que esfriou.", 3000),
            ("Israel havia finalmente voltado do exílio, reconstruído os muros e o templo de Deus. Havia tanta esperança! Mas as décadas foram passando e a vida real no campo era dura. O chão não dava tanto fruto, a economia estava difícil e as outras nações ricas prosperavam, enquanto eles pareciam patinar. Essa frustração gerou algo perigoso: o cinismo e o tédio nas coisas espirituais.", 2500),
            ("Eles começaram a tratar a adoração como um dever pesado e chato. Levavam ao altar animais doentes, qualquer coisa servia. Nos casamentos e amizades, eles quebravam promessas e espalhavam palavras duras. É no meio desse povo amargurado e apático, que duvidava da justiça, que Deus envia Sua última mensagem profética antes de um longo silêncio, através do profeta Malaquias.", 3500),
            ("Deus não chega gritando para assustá-los, a primeira frase que ecoa é carregada de saudade e afeto: 'Eu sempre amei vocês, desde o princípio'. O povo revida e murmura: 'E de que jeito tu nos tens amado?'. Com paciência firme, Deus usa Malaquias para mostrar que o amor verdadeiro não é conivente com o erro e a falsidade.", 2500),
            ("Deus adverte os sacerdotes negligentes, chama a atenção para a desonestidade, mas faz uma promessa calorosa para a minoria que ainda O buscava. Ele diz: 'Há um livro de memória sendo escrito diante de mim. Vocês serão a minha propriedade peculiar, o Meu tesouro'. E o livro de Malaquias encerra com a mais bela promessa: Para aqueles que temem ao Seu nome, não virá o fim, mas o sol da justiça irá nascer, trazendo cura em suas asas. A última palavra de Deus nunca é o silêncio do desespero, é o nascimento do Salvador.", 0),
        ]
    },

    # ==========================================
    # HISTÓRIAS KIDS (Tia Bia - Suave, afetuosa)
    # ==========================================
    "kids_criacao.mp3": {
        "voice": "shimmer",
        "segments": [
            ("Oi, amiguinho! Que bom que você está aqui pertinho. Respira fundo, solta o ar devagarzinho... Vamos ouvir uma história que começou antes de existir qualquer outra coisa. A Criação do Nosso Mundo!", 3000),
            ("Você sabia que há muuuito tempo não existia pracinha, nem passarinhos, nem sol, nem nada? Era só uma grande escuridão no vazio. Mas Papai do Céu estava lá. E com a voz dEle, cheia de amor, Ele falou bem alto: 'Haja Luz!'. E num piscar de olhos, uma luz linda, brilhante e quentinha acendeu o universo todinho!", 2500),
            ("Deus olhou para aquela água toda e disse: 'Vamos fazer lugares secos'. E surgiram praias com areia fofinha. Depois, Ele usou como se fosse um lápis mágico verde, e desenhou montanhas altíssimas, florestas gostosas e encheu os campos com florzinhas de todas as cores imagináveis.", 3000),
            ("Ele pendurou no alto aquele sol amarelo grandão para aquecer a gente de dia, e para a noite, colocou a lua prateada e milhares de estrelinhas que ficam piscando pra você na hora de dormir. Depois, chamou para brincar os peixinhos azuis, os passarinhos que assobiam e os cachorrinhos peludos abanando o rabo!", 2500),
            ("Mas sabe o que faltava para ficar perfeito? Pessoas para Ele amar. Papai do Céu pegou o barro e formou as pessoas com todo o Seu carinho. Ele deu vida a elas. Ele olhou para tudo o que tinha feito e sorriu bem largo: 'Isso é muito, muito bom!'.", 3000),
            ("E quer saber um segredo? Quando Ele desenhou o seu rostinho e pensou no seu sorriso, Ele também falou: 'Isso é muito bom!'. Deus cuida do mundo, dos passarinhos, e de você também.", 0),
        ]
    },
    "kids_noe.mp3": {
        "voice": "shimmer",
        "segments": [
            ("Oi, meu pequeno! Você já brincou de pular em pocinhas d'água? Hoje vamos viajar no tempo e conhecer um vovô que construiu o maior barco da história! A aventura de Noé e o Arco-Íris!", 3000),
            ("Naquela época as pessoas não queriam ser amigas umas das outras, elas só brigavam e deixavam Papai do Céu triste. Mas existia um vovô bom chamado Noé. Ele era amigo de Deus e cuidava bem da sua família.", 2500),
            ("Um dia, Deus avisou Noé: 'Vai chover muita água, Noé. Quero que você construa um barco gigante, maior do que a sua escola! Ele vai proteger todos vocês'. Lá onde Noé morava nem tinha mar, mas ele pegou madeira, seus pregos, e fez o barco bem caprichado, confiando em Deus sem medo.", 3000),
            ("Quando a Arca ficou grandona e pronta, olha que surpresa! Vieram marchando girafas compridas, pinguins batendo pezinho, gatinhos ronronando, elefantes pesadões e até os leõezinhos, de dois em dois, entrando bem arrumadinhos naquele barco. Todos entraram e Deus mesmo fechou a porta bem devagar.", 2500),
            ("E então, o céu ficou escuro e, chuá! A chuva desceu forte. Fora da arca tinha um tempão de assustar, mas lá dentro, todos estavam sequinhos e seguros, ouvindo o barulhinho da chuva no telhado. Quando a tempestade acabou, uma pombinha trouxe uma folhinha no bico. A terra estava sequinha!", 3000),
            ("Sabe o que Deus pintou no céu? Um arco-íris gigantão, com vermelho, amarelo, azul... Papai do Céu desenhou para prometer que sempre, não importa o tamanho da chuva na vida, Ele vai proteger as pessoas. Boa noite, durma no amor do Pai.", 0),
        ]
    },
    "kids_davi.mp3": {
        "voice": "shimmer",
        "segments": [
            ("Olá, meu coraçãozinho corajoso! Hoje a nossa história não é sobre monstros, é sobre um menino que teve que enfrentar um gigante de verdade. A história de Davi!", 3000),
            ("Davi não era soldado e nem usava roupas de rei. Ele era só um adolescente que passava o dia todo lá no mato cuidando de ovelhinhas, que faziam bééé. Ele tocava harpa, cantava músicas lindas e não se sentia sozinho, porque ele sempre orava dizendo: 'O Senhor é o meu pastor'.", 2500),
            ("Um dia, Davi foi entregar lanchinhos pros irmãos mais velhos que eram soldados, mas estava um silêncio assustador no acampamento deles. O motivo era que do outro lado do morro, tinha um homem filisteu, um gigante muito, muito alto chamado Golias! Ele andava batendo a lança no chão, tremendo tudo e xingando o povo de Deus.", 3000),
            ("Todo mundo lá estava tremendo de medo. Mas Davi, mesmo baixinho, foi no riacho de águas calmas e pegou cinco pedrinhas bem lisinhas, colocou na bolsinha e pegou sua atiradeira.", 2500),
            ("O gigante deu risada do menino e sua pedrinha. Mas Davi falou forte: 'Você vem de espada e lança, mas eu venho em nome de Deus!'. Davi girou, girou, zun!!! A pedrinha voou pelos ares e puf, bateu bem na testa de Golias e aquele grandalhão desmaiou de cara no chão! Todo mundo pulou de alegria!", 3000),
            ("Não importa quão grande seja o gigante, o escuro ou o problema... Deus é infinitamente maior e nos dá coragem.", 0),
        ]
    },
    "kids_daniel.mp3": {
        "voice": "shimmer",
        "segments": [
            ("Oi, anjinho. Chegou a hora de acalmar o coração e escutar sobre um lugar que dá muito medo, mas que virou um lugar de soninho gostoso! A história de Daniel nos leões!", 3000),
            ("Lá na Babilônia, uma cidade longe e muito barulhenta, morava um rapaz muito comportado e inteligente chamado Daniel. O segredo de Daniel era que, três vezes todos os dias, de manhã, de tarde e à noite, ele parava tudo, se ajoelhava de frente para a janela e orava. Ele amava conversar com Deus.", 2500),
            ("Alguns homens bravos e invejosos ficaram com raiva da obediência de Daniel. Eles bolaram um plano malvado e convenceram o rei a criar uma lei muito estranha: ninguém poderia orar mais! Mas Daniel não teve medo de ficar sem a oração e continuou agradecendo a Deus em seu quartinho.", 3000),
            ("Os homens malvados avisaram o rei, e os guardas foram lá buscar Daniel. A pena era ser jogado num buraco escuro de pedra, que estava cheio de leões famintos mostrando os dentões! Rrrrr!", 2500),
            ("Mas Daniel confiou no Papai do Céu. Naquela noite aterrorizante, enquanto o rei chorava de preocupação, Deus enviou um anjo forte, que fez carinho na cabecinha de todos os leões. Eles ficaram calminhos, viraram gatinhos fofos e dormiram em paz do ladinho de Daniel.", 3000),
            ("Pela manhã, o rei chamou lá de cima, e o menino estava são e salvo. Deus manda Seus anjos nos guardar, até no escuro.", 0),
        ]
    },
    "kids_jonas.mp3": {
        "voice": "shimmer",
        "segments": [
            ("Olá, meu bem! Vamos navegar para bem longe? Nossa historinha de hoje é molhada e cheia de aventuras, com Jonas e o Peixe Amigo!", 3000),
            ("Deus queria ajudar as pessoas de uma cidade perigosa chamada Nínive e falou para o profeta Jonas: 'Vá até lá e entregue meu amor a eles'. Mas Jonas cruzou os braços e disse: 'Ah, eu não quero ir, não!'. Ele pegou suas malinhas, correu pro cais e comprou passagem num navio de madeira que ia exatamente para a direção contrária.", 2500),
            ("Mas não dá pra brincar de esconde-esconde com Deus. Enquanto o navio balançava no mar verde, o vento uivou, o céu ficou cinza, cabrum! Os raios começaram a cair. Jonas percebeu que era por causa de sua teimosia e disse pros marinheiros jogarem ele no mar para o barco ficar seguro.", 3000),
            ("Splash! Jonas caiu nas águas frias, mas Deus já estava de olho nele e preparou algo especial. De repente, uma sombra gigante apareceu... era um peixe imenso! Glup! O peixe engoliu Jonas de uma vez, só que sem nem um arranhão.", 2500),
            ("Lá na barriga escura, Jonas teve muito tempo pra pensar. Ele orou e pediu desculpas por fugir, prometendo obedecer de vez. O Papai do Céu escutou, e depois de três dias lá dentro, o peixe nadou perto de uma prainha e bleah, cuspiu Jonas na areia branquinha.", 3000),
            ("Jonas dessa vez correu para Nínive, as pessoas ouviram a Deus e ficaram felizes. Quando a gente erra, Deus tem sempre uma barriga de peixe... quer dizer, uma chance pra nos trazer de volta com muito carinho. Boa noite, durma bem.", 0),
        ]
    },
    "kids_paes.mp3": {
        "voice": "shimmer",
        "segments": [
            ("Oi, queridinho! Imagina a maior festa ou piquenique que você já viu. Foi pouco perto da festa da nossa história de hoje: O Lanchinho Abençoado de Jesus!", 3000),
            ("Estava um fim de tarde lindo com brisa fresca. Num campo imenso, com matinho macio, tinha muita, mas muita gente. Milhares de pessoas que vieram a pé para ouvir as coisas bonitas que Jesus falava, e elas nem queriam ir embora. Mas o sol começou a baixar e as barriguinhas também! Ronc... o pessoal tava com muita fome.", 2500),
            ("Os amigos de Jesus disseram: 'Jesus, a gente não tem dinheiro pra comprar pãozinho pra toda essa multidão e não tem padaria aqui!'. Mas aí vem a surpresa. Perto de Jesus estava um menino igual a você, e ele trazia uma lancheirinha gostosa. Tinha nela só cinco pãezinhos redondos de cevada e dois peixinhos que a mamãe dele fritou.", 3000),
            ("O menininho podia ter dito: 'É só meu, tô com fome!'. Mas, com o coração cheio de amor, ele esticou a cestinha para Jesus. Jesus pegou aqueles pãezinhos nas Suas mãos gentis. Ele olhou pro céu azul, e orou agradecendo a Deus.", 2500),
            ("Então Ele começou a partir o pãozinho no meio. Sabe o que aconteceu? Quanto mais pão Ele cortava, mais pão surgia ali! E peixe também! Apareceu tanta comida que os ajudantes iam levando os cestinhos lotados de pão e peixe. Mais de cinco mil famílias comeram muito até falarem 'Ai, tô cheio!', e os discípulos encheram doze caixas grandes com o que sobrou!", 3000),
            ("Sabe o que isso significa? Quando a gente dá com alegria aquilo pouquinho que a gente tem, Jesus faz o milagre e transforma em muita alegria pra todo mundo. Que Ele multiplique amor e bons soninhos na sua vida hoje.", 0),
        ]
    },
}

MEDITATIONS = {
    # ==========================================
    # MEDITAÇÕES (Roteiro Original Preservado, Voz Nova)
    # ==========================================
    "meditacao_mindset.mp3": {
        "voice": "nova",
        "segments": [
            ("Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos. Permita-se estar presente, aqui e agora.", 3000),
            ("Traga a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um breve instante... E solte o ar devagar pela boca, relaxando os ombros e liberando todo o cansaço acumulado. Sinta a calma entrando a cada respiração.", 4000),
            ("Observe o seu corpo neste momento. Solte a tensão do maxilar, relaxe a testa e os olhos. Não há nada para resolver neste segundo. Este é o seu espaço de quietude, clareza e paz interior.", 3500),
            ("Se pensamentos ou preocupações surgirem, não lute contra eles. Apenas observe cada pensamento como uma nuvem passando no céu, e gentilmente traga o foco de volta para a sua respiração.", 3500),
            ("Agora, sinta esta verdade em sua mente: Eu escolho a serenidade. Minha mente é clara, focada e consciente. Eu tenho autogoverno sobre minhas escolhas e estou em paz no meu caminho.", 3500),
            ("Faça mais uma respiração profunda. Movimente suavemente as mãos e os pés. Quando se sentir pronto, abra os olhos, levando esta clareza e tranquilidade para todo o seu dia.", 0),
        ]
    }
}


def process_audio_items(items_dict):
    results = []
    for filename, data in items_dict.items():
        voice = data["voice"]
        segments = data["segments"]

        story_temp_dir = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
        os.makedirs(story_temp_dir, exist_ok=True)

        print(f"\n[GERANDO] {filename} (Voz OpenAI: {voice})", flush=True)

        file_list = []
        success_all = True
        for i, (text, pause_ms) in enumerate(segments):
            seg_mp3 = os.path.join(story_temp_dir, f"seg_{i:02d}.mp3")
            
            # Gera o TTS do bloco se não existir
            if not os.path.exists(seg_mp3):
                if not generate_tts_segment(text, voice, seg_mp3):
                    success_all = False
                    break
            
            file_list.append(seg_mp3)

            # Gera a pausa
            if pause_ms > 0:
                sil_mp3 = os.path.join(story_temp_dir, f"sil_{i:02d}.mp3")
                if not os.path.exists(sil_mp3):
                    generate_silence_segment(pause_ms, sil_mp3)
                file_list.append(sil_mp3)

            print(f"      OK -> Bloco [{i+1}/{len(segments)}]", flush=True)

        if not success_all:
            print(f"    [FALHA] Falha ao gerar {filename}")
            continue

        # Concat files
        concat_txt = os.path.join(story_temp_dir, "concat.txt")
        with open(concat_txt, "w", encoding="utf-8") as f:
            for fpath in file_list:
                normalized = fpath.replace("\\", "/")
                f.write(f"file '{normalized}'\n")

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
        results.append((filename, file_size_kb))
    
    return results

def main():
    print("=" * 60)
    print("GERADOR DE ÁUDIOS HUMANIZADOS (OPENAI TTS)")
    print("=" * 60)
    
    # 1. Gerar Histórias
    print("\n--- HISTÓRIAS BÍBLICAS ---")
    results_stories = process_audio_items(BIBLE_STORIES)
    
    # 2. Gerar Meditações
    print("\n--- MEDITAÇÕES GUIADAS ---")
    results_med = process_audio_items(MEDITATIONS)
    
    # Cleanup
    import shutil
    if os.path.exists(TEMP_DIR):
        try:
            shutil.rmtree(TEMP_DIR)
        except Exception:
            pass

    print("\n" + "=" * 60)
    print("RESUMO FINAL")
    print("=" * 60)
    for fname, size_kb in (results_stories + results_med):
        print(f"  {fname:35s} -> {size_kb:8.1f} KB")
    
    total = len(results_stories) + len(results_med)
    print(f"\nSucesso! {total} arquivos gerados na pasta {OUTPUT_DIR}.")

if __name__ == "__main__":
    main()
