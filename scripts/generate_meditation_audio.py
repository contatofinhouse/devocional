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
RATE = "-18%"
PITCH = "-3Hz"

SCRIPT_PARTS = [
    {
        "id": 1,
        "phase": "Acolhimento & Postura",
        "focus": "breathing",
        "text": "Bem-vindo a este momento de pausa e renovação. Encontre uma posição confortável, sentado com as costas eretas, porém relaxadas. Feche suavemente os olhos ou suavize o seu olhar para um ponto à frente. Permita-se pousar completamente no momento presente."
    },
    {
        "id": 2,
        "phase": "Ancoragem na Respiração",
        "focus": "breathing",
        "text": "Traga agora toda a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, soltando os ombros e liberando todo o peso do dia. Sinta o ar entrando com calma e saindo com alívio."
    },
    {
        "id": 3,
        "phase": "Presença & Desaceleração",
        "focus": "awareness",
        "text": "Observe as sensações do seu corpo. Sinta o apoio firme sob você. Solte qualquer tensão no maxilar, suavize a testa e os olhos. Não há nada para resolver neste exato segundo. Este momento é um espaço seguro de quietude e clareza."
    },
    {
        "id": 4,
        "phase": "Observação Sem Julgamento (Mindfulness)",
        "focus": "awareness",
        "text": "Se pensamentos, tarefas ou preocupações surgirem na mente, não tente lutar contra eles. Apenas reconheça a presença deles com gentileza, como quem observa nuvens passando pelo céu. Deixe-os ir embora no ritmo da sua respiração, retornando sempre ao centro do seu ser."
    },
    {
        "id": 5,
        "phase": "Reprogramação de Mindset",
        "focus": "mindset",
        "text": "Agora, interiorize estas convicções com firmeza e serenidade: Eu escolho a calma no lugar da pressa. Minha mente tem clareza e discernimento. Eu tenho autogoverno sobre minhas reações e foco absoluto no que é essencial. Eu estou em paz no meu presente e seguro no meu caminho."
    },
    {
        "id": 6,
        "phase": "Integração & Retorno",
        "focus": "integration",
        "text": "Faça mais uma respiração profunda e consciente. Sinta uma onda de energia limpa e renovadora percorrendo todo o seu corpo. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta mente serena, forte e focada para todas as suas escolhas de hoje."
    }
]

async def generate():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)
    audio_path = os.path.join(output_dir, "meditacao_mindset.mp3")

    full_text = " ".join([p["text"] for p in SCRIPT_PARTS])
    
    # Generate full audio with edge-tts
    print(f"🎙️ Gerando áudio de meditação com a voz neural {VOICE}...")
    communicate = edge_tts.Communicate(full_text, voice=VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(audio_path)
    print(f"✅ Áudio completo salvo em: {audio_path}")

    # Estimate timing per part for synchronized UI highlighting
    total_words = sum(len(p["text"].split()) for p in SCRIPT_PARTS)
    
    # We can measure audio duration
    import wave
    # Since it's mp3, we estimate duration based on speaking rate (~110 words per minute with rate -18%)
    # Let's compute realistic timestamps
    current_sec = 0.0
    steps_with_timing = []
    
    for part in SCRIPT_PARTS:
        words_count = len(part["text"].split())
        # Approximately 1.8 words per second at -18% rate + 3s pause between sections
        duration = round((words_count / 1.75) + 3.0, 1)
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

    meditation_data = {
        "id": "mindfulness_mindset_1",
        "title": "Presença, Clareza & Foco",
        "subtitle": "Reprogramação de Mindset com Mindfulness MBSR",
        "methodology": "Mindfulness Tradicional (MBSR / RAIN)",
        "durationSeconds": total_duration,
        "audioUrl": "/audio/meditacao_mindset.mp3",
        "affirmation": "Minha mente está serena, meu discernimento está afiado e meu foco está alinhado no presente.",
        "reflectionPrompt": "Como você se sente após esta pausa para reprogramar seu foco?",
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

export interface MeditationSession {{
  id: string;
  title: string;
  subtitle: string;
  methodology: string;
  durationSeconds: number;
  audioUrl: string;
  affirmation: string;
  reflectionPrompt: string;
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
