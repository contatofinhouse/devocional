"""
GERADOR UNIFICADO — Bíblia + Meditações
Usa gpt-4o-mini-tts com instructions de persona PT-BR
Speed: 0.83 | Volume: loudnorm | Silêncios reais via FFmpeg
"""
import os
import sys
import re
import requests
import subprocess
import time

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

OPENAI_API_KEY = os.environ.get("API_KEY")

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
TEMP_DIR   = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_unified")
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

try:
    import imageio_ffmpeg
    FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    FFMPEG_EXE = "ffmpeg"

# ─── Instruções de persona por tipo ──────────────────────────────────────────

INSTRUCTIONS = {
    "story_adult_female": (
        "Você é uma narradora brasileira calorosa e envolvente, com sotaque neutro de São Paulo. "
        "Narre histórias bíblicas com emoção genuína, pausas dramáticas naturais e tom acolhedor. "
        "Fale em português do Brasil. Não exagere na entonação — seja humana, não teatral."
    ),
    "story_adult_male": (
        "Você é um narrador brasileiro maduro, com voz grave e firme, sotaque neutro. "
        "Narre histórias bíblicas com autoridade e profundidade emocional, pausas naturais bem colocadas. "
        "Fale em português do Brasil. Tom sério mas acolhedor, nunca monótono."
    ),
    "story_kids": (
        "Você é a Tia Bia, uma contadora de histórias infantis brasileira, alegre, carinhosa e animada. "
        "Fale com crianças de 3 a 8 anos usando voz suave, calorosa e expressiva. "
        "Use entonação brasileira natural, faça pausas afetuosas, sorria com a voz. "
        "Nunca seja robótica — seja uma tia amada contando uma história na hora de dormir."
    ),
    "meditation_female": (
        "Você é uma guia de meditação brasileira com voz serena, pausada e acolhedora. "
        "Fale em português do Brasil com entonação natural de São Paulo. "
        "Faça pausas longas e respiradas entre as frases. Tom suave, quente, seguro. "
        "Nunca apressada — cada frase deve ter espaço para o ouvinte absorver."
    ),
    "meditation_male": (
        "Você é um guia de meditação brasileiro com voz grave, tranquila e reconfortante. "
        "Fale em português do Brasil com cadência lenta e pausas naturais entre as frases. "
        "Tom profundo e seguro, como um amigo confiável que conduz alguém ao relaxamento. "
        "Nunca robótico — seja humano, presente e calmo."
    ),
}

# ─── Roteiros ─────────────────────────────────────────────────────────────────
# Cada item: (filename, voice_openai, instruction_key, segments)
# segment = (texto, pausa_ms_depois)

BIBLE_STORIES = [
    ("historia_rute.mp3", "nova", "story_adult_female", [
        ("A história de Rute. Onde o recomeço floresce no terreno da lealdade.", 3000),
        ("Imagine viver no mundo antigo, onde a seca implacável transformava o solo em pó e obrigava famílias inteiras a deixarem tudo para trás em busca de pão. Foi assim que Noemi e sua família deixaram Belém para sobreviver em Moabe. Mas lá, longe de casa, Noemi perdeu o marido e seus dois filhos. Sem homens para prover, no mundo daquela época, uma viúva ficava absolutamente vulnerável, à margem da sociedade, sem futuro e sem sustento. É nesse cenário de dor, de luto que parece não ter fim, que Noemi, de mãos vazias e coração amargurado, decide retornar para sua terra natal.", 2500),
        ("Ela aconselha suas noras a buscarem segurança em suas terras. Mas Rute, contrariando toda a lógica de autopreservação, faz uma escolha baseada puramente no amor: 'Aonde quer que fores, irei eu. O teu povo será o meu povo, e o teu Deus será o meu Deus.'", 3500),
        ("Chegando a Belém, a fome era real. Rute vai aos campos debaixo do sol quente para recolher espigas caídas da colheita — um direito das pessoas mais pobres e vulneráveis. Lá, a providência divina a guia até as terras de Boaz, um fazendeiro de profunda integridade que não vê apenas uma estrangeira suada e exausta, mas uma mulher de caráter inabalável.", 2500),
        ("Seguindo um costume antigo sugerido por Noemi, Rute pede que Boaz seja o seu redentor. Ele honra o pedido, resgatando não apenas as terras da família, mas a dignidade e a alegria daquelas duas viúvas.", 3500),
        ("Do casamento de Rute e Boaz nasce Obede. E dessa linhagem de amor leal, que superou a miséria extrema e a viuvez, nasceria o Rei Davi e, mais tarde, Jesus Cristo. A história de Rute nos abraça hoje com uma certeza: Deus tece belos propósitos até mesmo através dos fios mais escuros da nossa dor e perda.", 0),
    ]),
    ("historia_abraao.mp3", "onyx", "story_adult_male", [
        ("A jornada de Abraão. Quando a fé exige que deixemos nosso porto seguro.", 3000),
        ("Na antiga Mesopotâmia, viver na cidade de Ur dos Caldeus era estar no centro da civilização. Havia comércio pujante, escrita, prosperidade e casas confortáveis de tijolos. A segurança estava em estar no seu clã. Mas, aos setenta e cinco anos, Abrão escuta uma voz que mudaria a rota da humanidade. Deus o chama para deixar absolutamente toda essa segurança. Ele precisava abandonar sua casa, sua cultura e sua família para caminhar em direção a uma terra que ele nunca tinha visto.", 2500),
        ("Sem um mapa, apenas com uma promessa, ele obedece. Abrão e Sara trocam o conforto de uma grande cidade pela poeira das estradas e a vida nômade em tendas no deserto.", 3500),
        ("Os anos se arrastam, pesados, e a maior angústia do casal permanece: eles não podiam ter filhos, o que na época era visto como uma vergonha e o fim de uma família. Numa noite estrelada, Deus leva Abrão para fora da tenda e diz: 'Conta as estrelas, se fores capaz. Assim será a tua descendência'. Mesmo com a idade avançada e todas as impossibilidades biológicas, Abrão escolheu acreditar.", 2500),
        ("E no tempo perfeito de Deus, quando a medicina e a lógica não viam mais esperança, o impossível se tornou um choro de bebê em sua tenda. Isaque nasceu.", 3500),
        ("Mas a provação não havia acabado. No Monte Moriá, Abraão demonstra que seu coração pertencia ao Criador, e não apenas ao filho tão esperado. Ele nos ensina que a verdadeira paz e segurança não vêm de onde moramos, do que possuímos ou das nossas garantias, mas da confiança absoluta Naquele que promete, pois o Seu agir é sempre perfeito.", 0),
    ]),
    ("historia_ester.mp3", "nova", "story_adult_female", [
        ("A história de Ester. Uma órfã coroada para um tempo como este.", 3000),
        ("Na grandiosa capital de Susã, o Império Persa era o dono do mundo conhecido. O palácio era um lugar de banquetes intermináveis, tecidos de ouro e leis que ninguém podia revogar, nem mesmo o rei. Nesse cenário onde as mulheres muitas vezes não tinham voz, vivia Hadassa, uma jovem judia que cresceu órfã e no exílio, cuidada pelo primo Mardoqueu. Quando o rei ordena a busca por uma nova rainha, Hadassa é levada, escondendo sua fé e adotando o nome de Ester.", 2500),
        ("O luxo dos aposentos reais, no entanto, disfarçava um perigo aterrorizante. Hamã, o segundo homem mais poderoso do império, consumido pelo ódio e pela vaidade, consegue aprovar uma lei para aniquilar todos os judeus em um único dia. Homens, mulheres e crianças estavam condenados à morte sem aviso prévio.", 3500),
        ("Desesperado, Mardoqueu envia uma mensagem à rainha: 'Não pense que por estar no palácio você escapará... Quem sabe se não foi para um momento como este que você chegou à realeza?'", 2500),
        ("Ester enfrentava um dilema mortal: a lei dizia que se alguém, até a rainha, entrasse no pátio do rei sem ser chamado, o destino seria a execução sumária. Mas, movida por compaixão e coragem pela vida do seu povo, ela decide jejuar e agir, dizendo: 'Se eu perecer, pereci'.", 3500),
        ("Ela entrou no salão. O rei estendeu o cetro dourado para ela. Com sabedoria, ela desmascarou o complô de Hamã e salvou a nação. Aonde o medo poderia ter silenciado e a orfandade poderia tê-la feito sentir-se inútil, a coragem de Ester, dirigida por Deus, mudou a história do seu povo.", 0),
    ]),
    ("historia_jose.mp3", "onyx", "story_adult_male", [
        ("A história de José do Egito. O perdão que reconstrói o que o ciúme destruiu.", 3000),
        ("Na cultura patriarcal antiga, a sobrevivência de um clã dependia da união dos irmãos. Mas ser o filho favorito, aquele que ganhava túnicas coloridas de presente do pai, despertou uma inveja mortal nos irmãos mais velhos de José. Numa tarde desolada no campo, a crueldade tomou conta. José foi jogado num buraco escuro e depois vendido como escravo por algumas moedas, sendo arrancado da sua família e levado acorrentado para o Egito.", 2500),
        ("Imagine a dor e a solidão. Em uma terra estrangeira, José reconstrói sua vida na casa de um oficial. Quando as coisas pareciam se ajeitar, ele se recusa a quebrar seus princípios morais com a esposa do chefe, sendo falsamente acusado e atirado no calabouço real. Treze anos de traições, esquecimento e prisões injustas. E no meio de todo esse silêncio, a Bíblia repete com doçura: 'O Senhor estava com José'.", 3500),
        ("Até que, num piscar de olhos, ele é chamado ao trono para interpretar o sonho do Faraó sobre catorze vacas, que avisavam de sete anos de fome global que se aproximavam. Pela sua sabedoria divina, o prisioneiro esquecido tornou-se governador de todo o Egito em um só dia.", 2500),
        ("Mas o maior teste estava por vir. Anos mais tarde, seus irmãos aparecem, famintos, implorando por trigo sem reconhecê-lo. Tendo o poder da vingança total nas mãos, José chora. Ele não humilha quem o destruiu, mas os abraça dizendo: 'Não fiquem tristes... Vocês planejaram o mal contra mim, mas Deus o tornou em bem, para salvar muitas vidas'. Nenhuma traição e nenhuma cova podem enterrar o propósito que Deus desenhou para sua vida.", 0),
    ]),
    ("historia_davi.mp3", "onyx", "story_adult_male", [
        ("A vida de Davi. O coração humilde que conquistou as batalhas de Deus.", 3000),
        ("Para os exércitos da antiguidade, não havia nada mais valioso que um soldado alto, forte e bem equipado. Por isso, quando o profeta Samuel foi em busca do novo rei para a nação de Israel, ninguém sequer lembrou do adolescente esquecido no campo, pastoreando as ovelhas da família. Ele não tinha cara de rei, mas Deus declarou a Samuel: 'As pessoas vêem a aparência, mas eu enxergo o coração'.", 2500),
        ("Lá no campo, enfrentando ursos e leões sozinho para defender o rebanho, a fé e a coragem de Davi foram forjadas. Quando um gigante filisteu chamado Golias aterrorizou todos os soldados adultos de Israel, zombando do Deus vivo, Davi não recuou. Ele dispensou a armadura pesada do rei. Pegou cinco pedras lisas do rio e declarou: 'Você vem contra mim com espada e lança, mas eu vou contra ti em nome do Senhor dos Exércitos'. E com um único arremesso de funda, o gigante de mais de dois metros e meio desabou.", 3500),
        ("Mas a glória veio com dor. Davi viveu anos fugindo pelo deserto de um rei invejoso que queria matá-lo. Naquelas cavernas escuras e empoeiradas, ele cantava salmos, desabafava sua angústia e aprendia que só o Senhor era sua rocha. E mesmo podendo se vingar de seus inimigos, recusou-se a fazer justiça com as próprias mãos.", 2500),
        ("Quando finalmente reinou, Davi foi o maior conquistador de Israel, mas também falhou e cometeu pecados muito graves. Sua grandeza, porém, nunca esteve em ser perfeito, mas na profundidade da sua dependência de Deus. Quando caiu, ele se arrependeu de joelhos, quebrado, pedindo perdão verdadeiro. E é por essa busca apaixonada que Deus o amou, e é da sua semente que um dia nasceu o Salvador.", 0),
    ]),
    ("historia_daniel.mp3", "onyx", "story_adult_male", [
        ("A história de Daniel. A paz que enfrenta os leões do medo.", 3000),
        ("Imagine seu país sendo invadido por um império violento, seus muros destruídos e você, sendo um adolescente, arrancado de casa e levado como prisioneiro para uma das maiores e mais deslumbrantes cidades do mundo: a Babilônia. O império queria reprogramar a mente daqueles jovens prodígios. Deram-lhes novos nomes, ensinaram-lhes magias, e os encheram com a comida mais luxuosa da mesa real.", 2500),
        ("Mas no meio de tanta pressão para abandonar quem ele era, Daniel tomou uma decisão firme no coração. Ele, com muita educação e respeito, decidiu não se misturar com os banquetes do rei que feriam as leis de Deus. Essa pequena atitude de obediência diária não o prejudicou, ao contrário, lhe rendeu uma sabedoria brilhante e paz inabalável, muito maior que todos os mágicos e sábios dali.", 3500),
        ("Os anos passaram, impérios mudaram, mas a inveja dos políticos em volta de Daniel cresceu ao ver seu sucesso. Eles armaram um plano infalível e aprovaram uma lei onde a oração estava banida. Todo pedido devia ser feito apenas ao Rei. Sabendo da lei de morte, Daniel não se desesperou, nem reclamou, ele foi para o seu quarto, ajoelhou-se calmamente em direção à sua terra, abriu as janelas e continuou conversando com o Pai Celestial.", 2500),
        ("O preço dessa lealdade foi a cova, um buraco escuro cheio de leões famintos babando por comida. Naquela noite aterrorizante, enquanto o rei que assinou a lei não conseguiu dormir de remorso, Daniel encontrou repouso ao lado das feras. De manhãzinha o rei corre e o chama. E, lá do fundo, a voz tranquila ecoa: 'Rei, vive para sempre! O meu Deus enviou o Seu anjo e fechou as bocas dos leões'. A vida não fica sem problemas quando andamos com Deus, mas ganhamos o Seu abraço bem na hora do medo.", 0),
    ]),
    ("historia_malaquias.mp3", "onyx", "story_adult_male", [
        ("A mensagem de Malaquias. O abraço do Pai para um povo que esfriou.", 3000),
        ("Israel havia finalmente voltado do exílio, reconstruído os muros e o templo de Deus. Havia tanta esperança! Mas as décadas foram passando e a vida real no campo era dura. O chão não dava tanto fruto, a economia estava difícil e as outras nações ricas prosperavam, enquanto eles pareciam patinar. Essa frustração gerou algo perigoso: o cinismo e o tédio nas coisas espirituais.", 2500),
        ("Eles começaram a tratar a adoração como um dever pesado e chato. Levavam ao altar animais doentes, qualquer coisa servia. Nos casamentos e amizades, eles quebravam promessas e espalhavam palavras duras. É no meio desse povo amargurado e apático, que duvidava da justiça, que Deus envia Sua última mensagem profética antes de um longo silêncio, através do profeta Malaquias.", 3500),
        ("Deus não chega gritando para assustá-los, a primeira frase que ecoa é carregada de saudade e afeto: 'Eu sempre amei vocês, desde o princípio'. O povo revida e murmura: 'E de que jeito tu nos tens amado?'. Com paciência firme, Deus usa Malaquias para mostrar que o amor verdadeiro não é conivente com o erro e a falsidade.", 2500),
        ("Deus adverte os sacerdotes negligentes, chama a atenção para a desonestidade, mas faz uma promessa calorosa para a minoria que ainda O buscava. Ele diz: 'Há um livro de memória sendo escrito diante de mim. Vocês serão a minha propriedade peculiar, o Meu tesouro'. E o livro de Malaquias encerra com a mais bela promessa: Para aqueles que temem ao Seu nome, não virá o fim, mas o sol da justiça irá nascer, trazendo cura em suas asas. A última palavra de Deus nunca é o silêncio do desespero, é o nascimento do Salvador.", 0),
    ]),
    # Kids
    ("kids_criacao.mp3", "shimmer", "story_kids", [
        ("Oi, amiguinho! Que bom que você está aqui pertinho. Respira fundo, solta o ar devagarzinho... Vamos ouvir uma história que começou antes de existir qualquer outra coisa. A Criação do Nosso Mundo!", 3000),
        ("Você sabia que há muuuito tempo não existia pracinha, nem passarinhos, nem sol, nem nada? Era só uma grande escuridão no vazio. Mas Papai do Céu estava lá. E com a voz dEle, cheia de amor, Ele falou bem alto: 'Haja Luz!'. E num piscar de olhos, uma luz linda, brilhante e quentinha acendeu o universo todinho!", 2500),
        ("Deus olhou para aquela água toda e disse: 'Vamos fazer lugares secos'. E surgiram praias com areia fofinha. Depois, Ele usou como se fosse um lápis mágico verde, e desenhou montanhas altíssimas, florestas gostosas e encheu os campos com florzinhas de todas as cores imagináveis.", 3000),
        ("Ele pendurou no alto aquele sol amarelo grandão para aquecer a gente de dia, e para a noite, colocou a lua prateada e milhares de estrelinhas que ficam piscando pra você na hora de dormir. Depois, chamou para brincar os peixinhos azuis, os passarinhos que assobiam e os cachorrinhos peludos abanando o rabo!", 2500),
        ("Mas sabe o que faltava para ficar perfeito? Pessoas para Ele amar. Papai do Céu pegou o barro e formou as pessoas com todo o Seu carinho. Ele deu vida a elas. Ele olhou para tudo o que tinha feito e sorriu bem largo: 'Isso é muito, muito bom!'.", 3000),
        ("E quer saber um segredo? Quando Ele desenhou o seu rostinho e pensou no seu sorriso, Ele também falou: 'Isso é muito bom!'. Deus cuida do mundo, dos passarinhos, e de você também.", 0),
    ]),
    ("kids_noe.mp3", "shimmer", "story_kids", [
        ("Oi, meu pequeno! Você já brincou de pular em pocinhas d'água? Hoje vamos viajar no tempo e conhecer um vovô que construiu o maior barco da história! A aventura de Noé e o Arco-Íris!", 3000),
        ("Naquela época as pessoas não queriam ser amigas umas das outras, elas só brigavam e deixavam Papai do Céu triste. Mas existia um vovô bom chamado Noé. Ele era amigo de Deus e cuidava bem da sua família.", 2500),
        ("Um dia, Deus avisou Noé: 'Vai chover muita água, Noé. Quero que você construa um barco gigante, maior do que a sua escola! Ele vai proteger todos vocês'. Lá onde Noé morava nem tinha mar, mas ele pegou madeira, seus pregos, e fez o barco bem caprichado, confiando em Deus sem medo.", 3000),
        ("Quando a Arca ficou grandona e pronta, olha que surpresa! Vieram marchando girafas compridas, pinguins batendo pezinho, gatinhos ronronando, elefantes pesadões e até os leõezinhos, de dois em dois, entrando bem arrumadinhos naquele barco. Todos entraram e Deus mesmo fechou a porta bem devagar.", 2500),
        ("E então, o céu ficou escuro e, chuá! A chuva desceu forte. Fora da arca tinha um tempão de assustar, mas lá dentro, todos estavam sequinhos e seguros, ouvindo o barulhinho da chuva no telhado. Quando a tempestade acabou, uma pombinha trouxe uma folhinha no bico. A terra estava sequinha!", 3000),
        ("Sabe o que Deus pintou no céu? Um arco-íris gigantão, com vermelho, amarelo, azul... Papai do Céu desenhou para prometer que sempre, não importa o tamanho da chuva na vida, Ele vai proteger as pessoas. Boa noite, durma no amor do Pai.", 0),
    ]),
    ("kids_davi.mp3", "shimmer", "story_kids", [
        ("Olá, meu coraçãozinho corajoso! Hoje a nossa história não é sobre monstros, é sobre um menino que teve que enfrentar um gigante de verdade. A história de Davi!", 3000),
        ("Davi não era soldado e nem usava roupas de rei. Ele era só um adolescente que passava o dia todo lá no mato cuidando de ovelhinhas, que faziam bééé. Ele tocava harpa, cantava músicas lindas e não se sentia sozinho, porque ele sempre orava dizendo: 'O Senhor é o meu pastor'.", 2500),
        ("Um dia, Davi foi entregar lanchinhos pros irmãos mais velhos que eram soldados, mas estava um silêncio assustador no acampamento deles. O motivo era que do outro lado do morro, tinha um homem filisteu, um gigante muito, muito alto chamado Golias! Ele andava batendo a lança no chão, tremendo tudo e xingando o povo de Deus.", 3000),
        ("Todo mundo lá estava tremendo de medo. Mas Davi, mesmo baixinho, foi no riacho de águas calmas e pegou cinco pedrinhas bem lisinhas, colocou na bolsinha e pegou sua atiradeira.", 2500),
        ("O gigante deu risada do menino e sua pedrinha. Mas Davi falou forte: 'Você vem de espada e lança, mas eu venho em nome de Deus!'. Davi girou, girou, zun!!! A pedrinha voou pelos ares e puf, bateu bem na testa de Golias e aquele grandalhão desmaiou de cara no chão! Todo mundo pulou de alegria!", 3000),
        ("Não importa quão grande seja o gigante, o escuro ou o problema... Deus é infinitamente maior e nos dá coragem.", 0),
    ]),
    ("kids_daniel.mp3", "shimmer", "story_kids", [
        ("Oi, anjinho. Chegou a hora de acalmar o coração e escutar sobre um lugar que dá muito medo, mas que virou um lugar de soninho gostoso! A história de Daniel nos leões!", 3000),
        ("Lá na Babilônia, uma cidade longe e muito barulhenta, morava um rapaz muito comportado e inteligente chamado Daniel. O segredo de Daniel era que, três vezes todos os dias, de manhã, de tarde e à noite, ele parava tudo, se ajoelhava de frente para a janela e orava. Ele amava conversar com Deus.", 2500),
        ("Alguns homens bravos e invejosos ficaram com raiva da obediência de Daniel. Eles bolaram um plano malvado e convenceram o rei a criar uma lei muito estranha: ninguém poderia orar mais! Mas Daniel não teve medo de ficar sem a oração e continuou agradecendo a Deus em seu quartinho.", 3000),
        ("Os homens malvados avisaram o rei, e os guardas foram lá buscar Daniel. A pena era ser jogado num buraco escuro de pedra, que estava cheio de leões famintos mostrando os dentões! Rrrrr!", 2500),
        ("Mas Daniel confiou no Papai do Céu. Naquela noite aterrorizante, enquanto o rei chorava de preocupação, Deus enviou um anjo forte, que fez carinho na cabecinha de todos os leões. Eles ficaram calminhos, viraram gatinhos fofos e dormiram em paz do ladinho de Daniel.", 3000),
        ("Pela manhã, o rei chamou lá de cima, e o menino estava são e salvo. Deus manda Seus anjos nos guardar, até no escuro.", 0),
    ]),
    ("kids_jonas.mp3", "shimmer", "story_kids", [
        ("Olá, meu bem! Vamos navegar para bem longe? Nossa historinha de hoje é molhada e cheia de aventuras, com Jonas e o Peixe Amigo!", 3000),
        ("Deus queria ajudar as pessoas de uma cidade perigosa chamada Nínive e falou para o profeta Jonas: 'Vá até lá e entregue meu amor a eles'. Mas Jonas cruzou os braços e disse: 'Ah, eu não quero ir, não!'. Ele pegou suas malinhas, correu pro cais e comprou passagem num navio de madeira que ia exatamente para a direção contrária.", 2500),
        ("Mas não dá pra brincar de esconde-esconde com Deus. Enquanto o navio balançava no mar verde, o vento uivou, o céu ficou cinza, cabrum! Os raios começaram a cair. Jonas percebeu que era por causa de sua teimosia e disse pros marinheiros jogarem ele no mar para o barco ficar seguro.", 3000),
        ("Splash! Jonas caiu nas águas frias, mas Deus já estava de olho nele e preparou algo especial. De repente, uma sombra gigante apareceu... era um peixe imenso! Glup! O peixe engoliu Jonas de uma vez, só que sem nem um arranhão.", 2500),
        ("Lá na barriga escura, Jonas teve muito tempo pra pensar. Ele orou e pediu desculpas por fugir, prometendo obedecer de vez. O Papai do Céu escutou, e depois de três dias lá dentro, o peixe nadou perto de uma prainha e bleah, cuspiu Jonas na areia branquinha.", 3000),
        ("Jonas dessa vez correu para Nínive, as pessoas ouviram a Deus e ficaram felizes. Quando a gente erra, Deus tem sempre uma chance pra nos trazer de volta com muito carinho. Boa noite, durma bem.", 0),
    ]),
    ("kids_paes.mp3", "shimmer", "story_kids", [
        ("Oi, queridinho! Imagina a maior festa ou piquenique que você já viu. Foi pouco perto da festa da nossa história de hoje: O Lanchinho Abençoado de Jesus!", 3000),
        ("Estava um fim de tarde lindo com brisa fresca. Num campo imenso, com matinho macio, tinha muita, mas muita gente. Milhares de pessoas que vieram a pé para ouvir as coisas bonitas que Jesus falava, e elas nem queriam ir embora. Mas o sol começou a baixar e as barriguinhas também! O pessoal estava com muita fome.", 2500),
        ("Os amigos de Jesus disseram: 'Jesus, a gente não tem dinheiro pra comprar pãozinho pra toda essa multidão e não tem padaria aqui!'. Mas aí vem a surpresa. Perto de Jesus estava um menino igual a você, e ele trazia uma lancheirinha gostosa. Tinha nela só cinco pãezinhos redondos de cevada e dois peixinhos que a mamãe dele fritou.", 3000),
        ("O menininho podia ter dito: 'É só meu, tô com fome!'. Mas, com o coração cheio de amor, ele esticou a cestinha para Jesus. Jesus pegou aqueles pãezinhos nas Suas mãos gentis. Ele olhou pro céu azul, e orou agradecendo a Deus.", 2500),
        ("Então Ele começou a partir o pãozinho no meio. Sabe o que aconteceu? Quanto mais pão Ele cortava, mais pão surgia ali! E peixe também! Apareceu tanta comida que os ajudantes iam levando os cestinhos lotados de pão e peixe. Mais de cinco mil famílias comeram muito até falarem: 'Ai, tô cheio!', e os discípulos encheram doze caixas grandes com o que sobrou!", 3000),
        ("Sabe o que isso significa? Quando a gente dá com alegria aquilo pouquinho que a gente tem, Jesus faz o milagre e transforma em muita alegria pra todo mundo. Que Ele multiplique amor e bons soninhos na sua vida hoje.", 0),
    ]),
]

MEDITATIONS = [
    ("meditacao_mindset.mp3", "shimmer", "meditation_female", [
        ("Bem-vindo a este momento de pausa e renovação da sua mente.", 2500),
        ("Encontre uma posição confortável, com a coluna alinhada, ereta e os ombros totalmente relaxados.", 3000),
        ("Feche suavemente os olhos ou suavize o seu olhar para um ponto à sua frente.", 3000),
        ("Permita-se pousar completamente no momento presente, deixando o mundo lá fora por alguns instantes.", 5000),
        ("Traga agora toda a sua atenção para o ar que entra e sai.", 3000),
        ("Inspire profundamente pelo nariz em quatro tempos... um... dois... três... quatro...", 3000),
        ("Segure o ar suavemente...", 3000),
        ("E solte devagar pela boca em seis tempos... soltando o peso dos ombros e do peito.", 6000),
        ("Mais uma vez... puxe o ar com serenidade, preenchendo o abdômen...", 4000),
        ("Retenha o ar por instantes...", 3000),
        ("E expire lentamente, liberando qualquer pressa, cobrança ou ansiedade acumulada.", 6000),
        ("Sinta o ritmo natural do seu corpo se harmonizar com a tranquilidade.", 6000),
        ("Observe as sensações do seu corpo.", 3000),
        ("Solte a tensão do maxilar, destranque os dentes, suavize a testa e ao redor dos olhos.", 4000),
        ("Não há nada urgente para resolver neste segundo. Este é o seu espaço seguro de clareza e paz interior.", 6000),
        ("Se pensamentos ou tarefas surgirem na sua mente, não tente lutar contra eles.", 3500),
        ("Apenas observe-os como nuvens passando em um céu aberto e limpo.", 4000),
        ("Reconheça o pensamento e, sem se apegar, volte suavemente sua atenção para a respiração.", 6000),
        ("Eu escolho a calma no lugar da agitação.", 3500),
        ("Minha mente tem clareza, discernimento e autogoverno.", 3500),
        ("Eu repouso na certeza da paz e confio nos propósitos de Deus para a minha vida.", 5000),
        ("Respire fundo uma última vez.", 4000),
        ("Sinta uma energia limpa e renovada percorrendo todo o seu corpo.", 3500),
        ("Comece a movimentar suavemente os dedos das mãos e dos pés...", 3500),
        ("E quando se sentir pronto, abra os olhos, levando este foco e esta paz para todo o seu dia.", 0),
    ]),
    ("meditacao_transito.mp3", "onyx", "meditation_male", [
        ("Esta é uma prática de atenção plena para motoristas. Mantenha os olhos bem abertos e totalmente focados na pista.", 3500),
        ("Ajuste sua postura no banco, apoie bem as costas no encosto e sinta a firmeza dos pedais sob os pés.", 4000),
        ("Afrouxe o aperto excessivo das mãos no volante. Você pode segurar o volante com firmeza, mas sem rigidez.", 5000),
        ("Aproveite uma parada no semáforo ou o ritmo da pista para respirar com consciência.", 3500),
        ("Inspire profundamente pelo nariz, expandindo suavemente o abdômen...", 4000),
        ("E solte o ar devagar pela boca, liberando a pressa, a impaciência e a sensação de urgência.", 5000),
        ("O trânsito tem seu próprio ritmo. A sua tranquilidade é uma escolha pessoal.", 5000),
        ("Observe se você está contraindo o maxilar ou franzindo a testa.", 3500),
        ("Destranque os dentes, relaxe os ombros e a face.", 4000),
        ("Se outro motorista cometer um erro, escolha não reagir com raiva. Escolha o discernimento e a prudência.", 5000),
        ("Ancore seu coração na promessa do Salmo 121: O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre.", 4000),
        ("Você está guardado, conduzindo com responsabilidade, paciência e sabedoria.", 5000),
        ("Faça mais uma respiração calma e profunda.", 3500),
        ("Mantenha a atenção panorâmica e segura ao redor do seu veículo.", 3500),
        ("Siga a sua jornada em paz, sabendo que a serenidade é a sua maior proteção ao volante.", 0),
    ]),
    ("meditacao_sono.mp3", "onyx", "meditation_male", [
        ("Deite-se confortavelmente em sua cama. Feche suavemente os olhos e permita-se pousar no repouso.", 4000),
        ("Tudo o que aconteceu hoje já terminou. Não há nada mais que você precise resolver ou planejar esta noite.", 4000),
        ("Este é o momento de soltar o peso do dia e descansar.", 6000),
        ("Inspire suavemente pelo nariz em quatro tempos... um... dois... três... quatro...", 3000),
        ("Segure o ar por sete tempos com serenidade...", 4000),
        ("E solte lentamente pela boca em oito tempos... esvaziando todo o ar...", 6000),
        ("Mais uma vez... puxe o ar com leveza... retenha...", 3500),
        ("E solte bem devagar, sentindo o corpo afundar no colchão.", 8000),
        ("Sinta os ombros se soltarem sobre o travesseiro.", 3500),
        ("Desarme os punhos, relaxe os dedos das mãos.", 3500),
        ("Solte a mandíbula, a língua e os músculos ao redor dos olhos.", 4000),
        ("Sinta as pernas pesadas e aconchegadas. Deixe a gravidade cuidar do seu corpo.", 7000),
        ("Coloque cada preocupação nas mãos de Deus.", 3500),
        ("O que ficou pendente, amanhã terá o seu momento. Deus cuida de tudo enquanto você dorme.", 4000),
        ("Nada ameaça a sua paz esta noite.", 6000),
        ("Em paz me deito e logo pego no sono, pois só Tu, Senhor, me fazes repousar em perfeita segurança.", 4000),
        ("Deixe a sua respiração ficar cada vez mais sutil, suave e silenciosa...", 5000),
        ("Deixe o sono restaurador envolver o seu corpo e a sua alma. Durma em perfeita paz.", 0),
    ]),
    ("meditacao_ansiedade.mp3", "shimmer", "meditation_female", [
        ("Coloque uma mão suavemente sobre o seu peito e a outra sobre o seu abdômen.", 3500),
        ("Sinta o calor das suas mãos tocando o seu corpo.", 3500),
        ("Você está em um lugar seguro agora. Você não está sozinho e nada de mal vai acontecer.", 5000),
        ("Puxe o ar suavemente pelo nariz, sentindo a barriga empurrar a sua mão para fora...", 4000),
        ("Segure o ar por um instante...", 2500),
        ("E sopre bem devagar pelos lábios entreabertos, como se esfriasse suavemente uma vela sem apagá-la...", 6000),
        ("Mais uma vez... inspire calma...", 3500),
        ("E expire soltando todo o aperto do peito e da garganta.", 7000),
        ("Permita que o ritmo cardíaco se normalize no seu próprio tempo.", 3500),
        ("Repita internamente com compaixão: Eu estou seguro. Esta sensação desconfortável é passageira e já está diminuindo. O controle pertence a Deus.", 6000),
        ("Não andem ansiosos por coisa alguma, mas em tudo apresentem seus pedidos a Deus com ação de graças.", 4000),
        ("E a paz de Deus, que excede todo o entendimento humano, guardará os seus corações e as suas mentes.", 6000),
        ("Respire com naturalidade e sinta a estabilidade dos seus pés apoiados no chão.", 4000),
        ("Sinta a calma retornando ao seu ser.", 3500),
        ("Abra os olhos suavemente, sabendo que você superou este momento com graça e fortaleza.", 0),
    ]),
    ("meditacao_trabalho.mp3", "onyx", "meditation_male", [
        ("Afaste os olhos da tela por um instante. Descanse as mãos sobre as pernas ou sobre a mesa.", 3500),
        ("Sinta o contato dos pés com o chão e alinhe a sua coluna.", 3500),
        ("Esta pausa intencional de poucos minutos vai multiplicar a sua clareza e produtividade.", 5000),
        ("Inspire profundamente pelo nariz, trazendo foco e oxigênio para a sua mente...", 4000),
        ("E ao expirar, solte a sobrecarga de tarefas, a pressa e a sensação de urgência.", 5000),
        ("Você não precisa fazer tudo ao mesmo tempo. Você só precisa fazer a próxima coisa certa com presença.", 6000),
        ("Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente.", 4000),
        ("Você não precisa agir por impulso ou pressão. Você tem a serenidade para discernir a melhor decisão.", 6000),
        ("Tudo o que fizerem, façam de todo o coração, como para o Senhor.", 3500),
        ("O seu trabalho é um meio de servir, edificar e exercer seus dons com dignidade.", 4000),
        ("Sua mente é organizada, firme e focada no essencial.", 5000),
        ("Faça mais uma respiração profunda e consciente.", 3500),
        ("Abra os olhos com determinação e paz, pronto para executar suas tarefas com excelência e serenidade.", 0),
    ]),
    ("meditacao_despertar.mp3", "shimmer", "meditation_female", [
        ("Bom dia. Sente-se com as costas retas, sinta a luz da manhã e acolha este novo começo com gratidão.", 3500),
        ("As misericórdias do Senhor se renovam a cada manhã. Este é um dia inédito e cheio de oportunidades.", 5000),
        ("Inspire vigorosamente pelo nariz, expandindo o peito e enchendo os pulmões de ar puro...", 4000),
        ("E expire com um sorriso sereno nos lábios, despertando cada célula do seu corpo com disposição.", 5000),
        ("Mais uma vez... puxe energia e ânimo...", 3500),
        ("E solte qualquer resquício de sono ou cansaço.", 5000),
        ("Traga à mente três bênçãos pelas quais você é verdadeiramente grato hoje.", 3500),
        ("Agradeça pela saúde, pelo fôlego de vida e pela proteção que te acompanhou até aqui.", 5000),
        ("Faze-me ouvir da Tua fidelidade pela manhã, pois em Ti confio.", 3500),
        ("Mostra-me o caminho em que devo andar, guarda a minha boca de palavras vãs e abençoa as minhas mãos no trabalho.", 5000),
        ("Abra os olhos com alegria, determinação e esperança.", 3000),
        ("O seu dia será iluminado, produtivo e cheio da paz de Deus.", 0),
    ]),
    ("jornada_fase_1.mp3", "shimmer", "meditation_female", [
        ("Vamos juntos neste primeiro momento de conexão com o presente.", 3000),
        ("Comece observando a postura em que você se encontra agora.", 3000),
        ("Você pode estar sentado, em pé ou deitado.", 3000),
        ("Perceba o seu corpo exatamente como ele está neste instante.", 4000),
        ("Veja se consegue se sintonizar com qualquer sensação presente no seu corpo físico agora.", 4000),
        ("Pode haver sensação de peso ou leveza... pressão... apoio...", 4000),
        ("Pode haver calor, frescor, vibração ou movimento sutil.", 4000),
        ("Tudo o que você precisa fazer é notar essas sensações com curiosidade e gentileza.", 6000),
        ("Faça uma respiração profunda...", 4000),
        ("E ao expirar, relaxe.", 4000),
        ("Não há nada de complicado a fazer, apenas estar plenamente presente e atento.", 6000),
        ("Agora, solte as sensações do corpo e volte a sua atenção para os sons ao seu redor.", 4000),
        ("Sons dentro do ambiente ou vindos do lado de fora.", 4000),
        ("Podem ser sons mais altos, ou quase imperceptíveis...", 4000),
        ("Você também pode perceber o silêncio que existe entre um som e outro.", 5000),
        ("Os sons surgem, ecoam e desaparecem no seu próprio tempo.", 6000),
        ("Veja se você consegue apenas escutar o som de forma neutra, como uma vibração no ar.", 6000),
        ("Agora, volte novamente a atenção para o seu corpo aqui presente.", 3500),
        ("Sinta o contato firme com o chão ou com a cadeira.", 3500),
        ("Faça mais uma respiração profunda... suavize o rosto...", 4000),
        ("E quando se sentir pronto, você pode abrir suavemente os olhos.", 0),
    ]),
    ("jornada_fase_2.mp3", "onyx", "meditation_male", [
        ("Vamos cuidar do seu corpo agora, com atenção e presença.", 3000),
        ("Comece trazendo sua atenção para dentro do corpo. Feche os olhos se isso for confortável para você.", 3500),
        ("Perceba o peso do corpo apoiado na cadeira ou no chão.", 4000),
        ("Faça algumas respirações profundas.", 3500),
        ("Ao inspirar, traga oxigênio renovando todo o seu organismo.", 4000),
        ("E ao expirar, tenha a sensação de relaxar em um nível mais profundo.", 6000),
        ("Traga a atenção para os seus pés apoiados no chão.", 3500),
        ("Sinta a pressão, a temperatura, o toque com o chão.", 4000),
        ("Suba a atenção pelas pernas e pelas coxas apoiadas na cadeira... perceba o peso e o repouso.", 4000),
        ("Sinta as suas costas encostadas no assento, soltando a musculatura lombar.", 5000),
        ("Leve a atenção para a área do estômago e do abdômen.", 3500),
        ("Se houver rigidez ou aperto, permita que a barriga se solte e amoleça.", 4000),
        ("Respire...", 3000),
        ("Note as suas mãos. Deixe as mãos e os dedos relaxarem completamente.", 4000),
        ("Suba pelos braços até os ombros. Deixe os ombros caírem e se soltarem com leveza.", 5000),
        ("Sinta o pescoço e a garganta relaxados.", 3000),
        ("Destranque o maxilar, solte a língua e suavize os músculos faciais e a testa.", 4000),
        ("Agora, sinta todo o seu corpo integrado em presença e calma.", 4000),
        ("Faça uma última respiração completa... e quando quiser, abra os olhos com tranquilidade.", 0),
    ]),
    ("jornada_fase_3.mp3", "shimmer", "meditation_female", [
        ("Encontre uma posição confortável e relaxada, sentado em uma cadeira ou sobre uma almofada.", 3500),
        ("Mantenha a coluna ereta, sem rigidez. As mãos repousando sobre as pernas.", 4000),
        ("Observe o seu corpo a partir de dentro: o formato, o peso, o contato com o chão.", 4000),
        ("Permita-se relaxar e sinta curiosidade sobre a sua experiência aqui e agora.", 6000),
        ("Agora, comece a se sintonizar com a sua respiração natural.", 3500),
        ("Você não precisa mudar ou forçar nada. Apenas sinta o fluxo orgânico do ar.", 4000),
        ("Perceba onde a sensação do ar é mais nítida no seu corpo:", 3500),
        ("Pode ser no movimento suave do abdômen subindo e descendo...", 4000),
        ("Pode ser na expansão do peito...", 4000),
        ("Ou no toque fresco do ar entrando e saindo pelas narinas.", 6000),
        ("Acompanhe uma respiração de cada vez. Quando uma termina, a próxima começa naturalmente.", 8000),
        ("É absolutamente natural que sua mente comece a divagar para pensamentos ou listas de afazeres.", 4000),
        ("Isso não é um erro ou problema. Apenas note que a mente viajou.", 4000),
        ("E com muita gentileza, traga o foco de volta para o ar que entra e sai.", 8000),
        ("Vamos permanecer agora em alguns instantes de silêncio e presença, acolhendo cada respiração.", 15000),
        ("Mais uma vez, sinta todo o seu corpo sentado aqui.", 3500),
        ("Relaxe ainda mais profundamente.", 4000),
        ("Ofereça a si mesmo um sentimento de gratidão por ter dedicado este tempo ao seu cuidado e equilíbrio mental.", 4000),
        ("Respire fundo... e abra os olhos com calma, levando essa clareza para o seu dia.", 0),
    ]),
    ("jornada_fase_4.mp3", "shimmer", "meditation_female", [
        ("Encontre uma postura estável e confortável.", 3000),
        ("Faça um escaneamento interno e localize uma parte do seu corpo que se sinta neutra, segura ou agradável agora.", 4000),
        ("Pode ser a palma das mãos, os pés apoiados no chão ou as pernas.", 4000),
        ("Deixe a sua atenção descansar nesse ponto de estabilidade por alguns instantes.", 6000),
        ("Sinta essa âncora de segurança... respire com tranquilidade.", 8000),
        ("Se houver alguma emoção difícil ou desconforto físico presente, permita que sua atenção se aproxime suavemente dessa área.", 4500),
        ("Onde exatamente você sente esse peso no corpo?", 4000),
        ("Apenas observe por um instante. Não tente lutar ou empurrar o sentimento para longe.", 5000),
        ("Respire suavemente ao redor dessa sensação...", 6000),
        ("E agora, retorne a atenção para o seu porto seguro: suas mãos ou seus pés bem apoiados.", 6000),
        ("Dê a si mesmo essa pausa reconfortante, sentindo a estabilidade do chão.", 8000),
        ("Mais uma vez, com calma, volte a perceber a região de tensão ou preocupação.", 4000),
        ("Observe: a sensação está aumentando, diminuindo ou mudando de lugar?", 5000),
        ("Toda emoção e toda dor física são como ondas que sobem, atingem o ápice e depois recuam.", 6000),
        ("Você não é a tempestade; você é o espaço amplo onde ela passa.", 10000),
        ("Traga agora um sentimento profundo de bondade e acolhimento para consigo mesmo.", 3500),
        ("Muitas pessoas passam por momentos difíceis como este. Você não está sozinho.", 4000),
        ("Que possamos todos encontrar alívio, paz e discernimento em meio aos desafios.", 4000),
        ("Respire fundo, sinta a sua força restaurada e abra os olhos com serenidade.", 0),
    ]),
    ("jornada_fase_5.mp3", "onyx", "meditation_male", [
        ("Acomode-se confortavelmente. Esta prática cultiva emoções nobres que fortalecem o coração e a saúde emocional.", 4000),
        ("A bondade amorosa é o desejo sincero de bem-estar, paz e proteção para si e para os outros.", 4000),
        ("Perceba como seu corpo se sente agora, deixando o peito se abrir com suavidade.", 6000),
        ("Traga à sua mente a imagem de alguém que, ao lembrar, você sente um carinho espontâneo e imediato.", 4000),
        ("Pode ser um filho, um grande amigo, um mentor ou até mesmo um animal de estimação querido.", 4000),
        ("Imagine essa pessoa na sua frente agora. Sinta a presença dela.", 4000),
        ("Perceba o calor agradável que surge no seu peito e o leve sorriso no seu rosto.", 5000),
        ("Que você esteja seguro e protegido de todo perigo.", 4000),
        ("Que você seja verdadeiramente feliz e viva em paz.", 4000),
        ("Que você tenha saúde, força e bem-estar em todos os seus dias.", 6000),
        ("Sinta essa intenção pura alcançando e envolvendo essa pessoa querida.", 10000),
        ("Agora, imagine essa pessoa olhando para você e retribuindo todo esse amor e bênção.", 4000),
        ("Que eu esteja seguro e em paz.", 4000),
        ("Que eu tenha saúde e ânimo renovado.", 4000),
        ("Que eu acolha a mim mesmo com graça e misericórdia.", 6000),
        ("Em seguida, expanda essa luz para as pessoas ao seu redor, sua família, seus vizinhos...", 4000),
        ("E até mesmo para aqueles com quem você teve divergências, liberando todo ressentimento.", 8000),
        ("Que todos possam encontrar a paz e o perdão que transformam a vida.", 10000),
        ("Sinta o alívio e a leveza de um coração livre de amarras.", 3500),
        ("O amor é o vínculo perfeito da unidade e da paz.", 4000),
        ("Respire fundo, guarde essa calmaria dentro de você e abra os olhos com amor e renovação.", 0),
    ]),
    ("jornada_fase_6.mp3", "onyx", "meditation_male", [
        ("Encontre sua postura meditativa: coluna alinhada, postura digna e relaxada.", 4000),
        ("Comece sintonizando a respiração no abdômen ou no fluxo das narinas.", 4000),
        ("A respiração é a sua âncora constante, o porto seguro para onde você sempre pode retornar.", 6000),
        ("Sinta o subir e descer suave do peito e do abdômen por alguns instantes.", 12000),
        ("Agora, suavemente, abra sua consciência para os sons do ambiente.", 4000),
        ("Sons próximos na sala, ou distantes lá fora.", 4000),
        ("Ouça sem classificar ou criar narrativas. Apenas receba os sons como ondas que chegam e partem.", 5000),
        ("Perceba também os intervalos de silêncio entre os ruídos.", 8000),
        ("Descanse na simples experiência de escutar com clareza e quietude.", 15000),
        ("Solte a audição e traga a atenção para as sensações corporais.", 4000),
        ("Perceba a temperatura, o pulsar sutil, a sensação de contato com o chão.", 5000),
        ("Se surgir uma sensação intensa, apenas observe-a com calma, sem tensão.", 6000),
        ("Quando a sensação diminuir, retorne tranquilamente para a sua âncora: o ar que entra e sai.", 8000),
        ("Perceba a harmonia completa entre sua respiração, seu corpo e o ambiente ao redor.", 4000),
        ("Deseje a si mesmo paz, saúde e lucidez.", 4000),
        ("Respire fundo, movimente suavemente as extremidades e abra os olhos com tranquilidade.", 0),
    ]),
    ("jornada_fase_7.mp3", "onyx", "meditation_male", [
        ("Esta é uma meditação de escaneamento corporal profundo para preparar você para uma noite de sono reparador.", 4000),
        ("Se você adormecer durante a prática, isso é perfeitamente natural.", 4000),
        ("Se pensamentos sobre o dia surgirem, apenas solte-os e retorne a atenção ao corpo.", 4000),
        ("Comece sentindo o topo da sua cabeça e o couro cabeludo apoiado no travesseiro.", 4000),
        ("Sinta o peso suave da cabeça se entregando ao descanso...", 6000),
        ("Solte a testa, suavize as pálpebras, relaxe as bochechas e a mandíbula.", 8000),
        ("Desça a atenção para o pescoço e para os ombros.", 4000),
        ("Sinta todo o peso carregado durante o dia se dissipando dos ombros.", 4000),
        ("Siga pelo braço esquerdo... cotovelo... antebraço... mão e dedos esquerdos...", 5000),
        ("Sinta a mão esquerda pesada, quente e relaxada...", 6000),
        ("Agora leve a atenção para o ombro direito... descendo pelo braço... cotovelo... antebraço... mão e dedos direitos...", 6000),
        ("Ambos os braços descansando completamente soltos na cama.", 10000),
        ("Sinta a parte superior das costas afundando no colchão... o meio das costas... a região lombar...", 5000),
        ("Sinta o peito respirando em ondas lentas e tranquilas...", 5000),
        ("Sinta o abdômen subindo e descendo com suavidade, sem esforço algum...", 8000),
        ("Leve a atenção para o quadril, coxas, joelhos e panturrilhas...", 5000),
        ("Sinta as pernas pesadas, relaxadas e aquecidas...", 5000),
        ("Até a sola dos pés e cada um dos dedos...", 5000),
        ("Todo o seu corpo agora repousa em perfeita harmonia e paz.", 6000),
        ("Entregue-se com confiança ao sono restaurador que Deus preparou para você. Durma em paz.", 0),
    ]),
    ("jornada_fase_8.mp3", "shimmer", "meditation_female", [
        ("Encontre sua postura com a coluna ereta, aberta e relaxada.", 4000),
        ("Sinta o peso do corpo a partir de dentro, acolhendo o silêncio que se estabelece.", 4000),
        ("Deixe a sua atenção descansar na respiração natural.", 4000),
        ("A respiração é a sua base firme, onde você sempre encontra quietude e discernimento.", 6000),
        ("Acompanhe uma respiração de cada vez, com curiosidade e entrega.", 15000),
        ("Agora, permita que sua atenção observe o que surgir com maior intensidade.", 4000),
        ("Se um som externo chamar sua atenção, receba-o como um evento neutro.", 4000),
        ("Se uma sensação corporal se tornar evidente, note-a sem se contrair.", 5000),
        ("Se uma emoção surgir, reconheça-a com gentileza e retorne à respiração.", 6000),
        ("Você é o espaço onde tudo isso acontece, não o conteúdo que passa por esse espaço.", 8000),
        ("A mente vai divagar. Isso é absolutamente normal.", 4000),
        ("Cada vez que você perceber e retornar à respiração, é um momento de sabedoria e prática real.", 5000),
        ("Continue nessa presença serena por mais alguns instantes.", 20000),
        ("Sinta todo o seu corpo integrado em profunda paz e equilíbrio.", 4000),
        ("Essa serenidade não termina aqui; ela é uma fonte contínua dentro de você.", 4000),
        ("Faça uma respiração profunda, agradeça por este momento e abra os olhos com clareza e propósito.", 0),
    ]),
]

# ─── Funções de geração ───────────────────────────────────────────────────────

def call_tts(text: str, voice: str, instruction_key: str, out_path: str, retries=3):
    url = "https://api.openai.com/v1/audio/speech"
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": "gpt-4o-mini-tts",
        "voice": voice,
        "input": text,
        "instructions": INSTRUCTIONS[instruction_key],
        "response_format": "mp3",
        "speed": 0.83,
    }
    for attempt in range(retries):
        try:
            r = requests.post(url, headers=headers, json=payload, timeout=90)
            if r.status_code == 200:
                with open(out_path, "wb") as f:
                    f.write(r.content)
                return True
            print(f"      [HTTP {r.status_code}] {r.text[:120]}", flush=True)
        except Exception as e:
            print(f"      [ERRO] {e}", flush=True)
        time.sleep(2)
    return False

def make_silence(ms: int, out_path: str):
    cmd = [FFMPEG_EXE, "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
           "-t", str(ms / 1000.0), "-acodec", "libmp3lame", "-ar", "24000", "-ac", "1", "-y", out_path]
    subprocess.run(cmd, check=True, capture_output=True)

def build_audio(filename, voice, instruction_key, segments, overwrite=True):
    tmp = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
    os.makedirs(tmp, exist_ok=True)
    out = os.path.join(OUTPUT_DIR, filename)

    if not overwrite and os.path.exists(out):
        print(f"  [PULANDO] {filename} já existe.", flush=True)
        return

    print(f"\n[GERANDO] {filename}  voz={voice}  instrução={instruction_key}", flush=True)

    file_list = []
    for i, (text, pause_ms) in enumerate(segments):
        seg = os.path.join(tmp, f"seg_{i:03d}.mp3")
        if not os.path.exists(seg):
            print(f"  seg {i+1}/{len(segments)}: {text[:60]}...", flush=True)
            if not call_tts(text, voice, instruction_key, seg):
                print(f"  [FALHA] segmento {i+1} ignorado.", flush=True)
                continue
        file_list.append(seg)

        if pause_ms > 0:
            sil = os.path.join(tmp, f"sil_{i:03d}.mp3")
            if not os.path.exists(sil):
                make_silence(pause_ms, sil)
            file_list.append(sil)

    concat_txt = os.path.join(tmp, "concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for fp in file_list:
            f.write(f"file '{fp.replace(chr(92), '/')}'\n")

    cmd = [FFMPEG_EXE, "-f", "concat", "-safe", "0", "-i", concat_txt,
           "-af", "loudnorm=I=-14:TP=-1.0:LRA=11", "-y", out]
    subprocess.run(cmd, check=True, capture_output=True)
    size_kb = os.path.getsize(out) / 1024
    print(f"  [OK] {filename}  ({size_kb:.0f} KB)", flush=True)

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("=" * 65)
    print("GERAÇÃO UNIFICADA — Bíblia + Meditações (gpt-4o-mini-tts)")
    print("=" * 65)

    print("\n--- HISTORIAS BIBLICAS ---")
    for filename, voice, instr, segs in BIBLE_STORIES:
        build_audio(filename, voice, instr, segs, overwrite=True)

    print("\n--- MEDITACOES GUIADAS ---")
    for filename, voice, instr, segs in MEDITATIONS:
        build_audio(filename, voice, instr, segs, overwrite=True)

    print("\n" + "=" * 65)
    print("TUDO CONCLUÍDO! Arquivos salvos em public/audio/")
    print("=" * 65)

if __name__ == "__main__":
    main()
