import asyncio
import os
import sys
import json
import edge_tts

# Set UTF-8 for console output on Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

VOICE = "pt-BR-AntonioNeural"
RATE = "-4%" # Natural, fluid, human cadence
PITCH = "-1Hz"

SCRIPT_PARTS = [
    {
        "id": 1,
        "phase": "1. Acolhimento e Postura",
        "focus": "breathing",
        "audio_text": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, sentado com a coluna ereta, porém relaxada. Feche suavemente os olhos ou mantenha o olhar suave em um ponto à frente. Permita-se pousar por inteiro no momento presente.",
        "text": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, sentado com a coluna ereta, porém relaxada. Feche suavemente os olhos ou mantenha o olhar suave em um ponto à frente. Permita-se pousar por inteiro no momento presente."
    },
    {
        "id": 2,
        "phase": "2. Ancoragem na Respiração",
        "focus": "breathing",
        "audio_text": "Traga agora toda a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, soltando os ombros e liberando todo o peso acumulado. Sinta o ar entrando com calma, e saindo com alívio.",
        "text": "Traga agora toda a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, soltando os ombros e liberando todo o peso acumulado. Sinta o ar entrando com calma, e saindo com alívio."
    },
    {
        "id": 3,
        "phase": "3. Desaceleração & Escaneamento",
        "focus": "awareness",
        "audio_text": "Observe as sensações do seu corpo agora. Sinta o apoio firme sob você. Solte qualquer tensão no maxilar, suavize a testa e ao redor dos olhos. Não há nada para resolver neste exato segundo. Este momento é um espaço seguro de quietude e clareza.",
        "text": "Observe as sensações do seu corpo agora. Sinta o apoio firme sob você. Solte qualquer tensão no maxilar, suavize a testa e ao redor dos olhos. Não há nada para resolver neste exato segundo. Este momento é um espaço seguro de quietude e clareza."
    },
    {
        "id": 4,
        "phase": "4. Observação Sem Julgamento (RAIN)",
        "focus": "awareness",
        "audio_text": "Se pensamentos, tarefas ou preocupações surgirem na mente, não tente lutar contra eles. Apenas reconheça a presença deles com gentileza, como quem observa nuvens passando pelo céu. Deixe-os passar no ritmo da sua respiração, retornando sempre ao centro do seu ser.",
        "text": "Se pensamentos, tarefas ou preocupações surgirem na mente, não tente lutar contra eles. Apenas reconheça a presença deles com gentileza, como quem observa nuvens passando pelo céu. Deixe-os passar no ritmo da sua respiração, retornando sempre ao centro do seu ser."
    },
    {
        "id": 5,
        "phase": "5. Reprogramação de Mindset",
        "focus": "mindset",
        "audio_text": "Agora, interiorize estas convicções com firmeza e serenidade: Eu escolho a calma no lugar da pressa. Minha mente tem clareza e discernimento. Eu tenho autogoverno sobre minhas reações e foco absoluto no que é essencial. Eu estou em paz no meu presente e seguro no meu caminho.",
        "text": "Agora, interiorize estas convicções com firmeza e serenidade: Eu escolho a calma no lugar da pressa. Minha mente tem clareza e discernimento. Eu tenho autogoverno sobre minhas reações e foco absoluto no que é essencial. Eu estou em paz no meu presente e seguro no meu caminho."
    },
    {
        "id": 6,
        "phase": "6. Integração & Retorno",
        "focus": "integration",
        "audio_text": "Faça mais uma respiração profunda e consciente. Sinta uma onda de energia limpa e renovadora percorrendo todo o seu corpo. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta mente serena, forte e focada para todas as suas escolhas de hoje.",
        "text": "Faça mais uma respiração profunda e consciente. Sinta uma onda de energia limpa e renovadora percorrendo todo o seu corpo. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta mente serena, forte e focada para todas as suas escolhas de hoje."
    }
]

async def generate():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)
    audio_path = os.path.join(output_dir, "meditacao_mindset.mp3")

    full_text = "\n\n".join([p["audio_text"] for p in SCRIPT_PARTS])
    
    print(f"🎙️ Gerando locução fluida e natural com {VOICE} a taxa {RATE}...")
    communicate = edge_tts.Communicate(full_text, voice=VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(audio_path)
    print(f"✅ Áudio salvo com sucesso em: {audio_path}")

    # Calculate timestamps
    current_sec = 0.0
    steps_with_timing = []
    
    for part in SCRIPT_PARTS:
        words_count = len(part["text"].split())
        # Approximately 2.1 words per second at natural rate + 2.5s gentle transition
        duration = round((words_count / 2.15) + 2.5, 1)
        start_sec = round(current_sec, 1)
        end_sec = round(current_sec + duration, 1)
        
        steps_with_timing.append({
            "id": part["id"],
            "phase": part["phase"],
            "focus": part["focus"],
            "startSeconds": start_sec,
            "endSeconds": end_sec,
            "text": part["text"]
        })
        current_sec = end_sec

    total_duration = round(current_sec)
    print(f"⏱️ Duração total estimada: {total_duration}s (~{total_duration // 60}m {total_duration % 60}s)")

    # Data export
    meditation_data = {
        "id": "mindfulness_mindset_1",
        "title": "Presença, Clareza & Foco",
        "subtitle": "Reprogramação de Mindset com Metodologia MBSR & RAIN",
        "methodology": "Mindfulness MBSR",
        "durationSeconds": total_duration,
        "audioUrl": "/audio/meditacao_mindset.mp3",
        "affirmation": "Minha mente está serena, meu discernimento está afiado e meu foco está ancorado no presente.",
        "reflectionPrompt": "Como sua mente se sente após esta sessão de ancoragem?",
        "scientificMethodology": {
            "title": "Base Científica: MBSR & Neuroplasticidade",
            "origin": "Desenvolvido pelo Dr. Jon Kabat-Zinn na UMass Medical School e validado em Harvard & Stanford.",
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
        },
        "steps": steps_with_timing
    }

    json_path = os.path.join(os.getcwd(), "src", "data", "mockMeditations.ts")
    ts_content = f"""export interface MeditationStep {{
  id: number;
  phase: string;
  focus: 'breathing' | 'awareness' | 'mindset' | 'integration';
  startSeconds: number;
  endSeconds: number;
  text: string;
}}

export interface ScientificMethodology {{
  title: string;
  origin: string;
  benefits: string[];
  stages: {{ stage: string; desc: string }}[];
}}

export interface MeditationSession {{
  id: string;
  title: string;
  subtitle: string;
  methodology: string;
  durationSeconds: number;
  audioUrl: string;
  affirmation: string;
  reflectionPrompt: string;
  scientificMethodology: ScientificMethodology;
  steps: MeditationStep[];
}}

export const GUIDED_MEDITATIONS: MeditationSession[] = [
  {json.dumps(meditation_data, indent=2, ensure_ascii=False)}
];
"""
    with open(json_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"💾 Dados da meditação salvos em: {json_path}")

if __name__ == "__main__":
    asyncio.run(generate())
