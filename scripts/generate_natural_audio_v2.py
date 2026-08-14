import asyncio
import os
import sys
import json
import edge_tts
import numpy as np
import wave

# Set UTF-8 for console output on Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

VOICE = "pt-BR-ThalitaMultilingualNeural" # Voz neural de última geração com entonação humana e suave
RATE = "+0%"
PITCH = "+0Hz"

SCRIPT_PARTS = [
    {
        "id": 1,
        "phase": "1. Acolhimento e Postura",
        "focus": "breathing",
        "audio_text": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos. Permita-se estar presente, aqui e agora.",
        "text": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos. Permita-se estar presente, aqui e agora."
    },
    {
        "id": 2,
        "phase": "2. Ancoragem na Respiração",
        "focus": "breathing",
        "audio_text": "Traga a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um breve instante... E solte o ar devagar pela boca, relaxando os ombros e liberando todo o cansaço acumulado. Sinta a calma entrando a cada respiração.",
        "text": "Traga a sua atenção para a respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um breve instante... E solte o ar devagar pela boca, relaxando os ombros e liberando todo o cansaço acumulado. Sinta a calma entrando a cada respiração."
    },
    {
        "id": 3,
        "phase": "3. Desaceleração & Escaneamento",
        "focus": "awareness",
        "audio_text": "Observe o seu corpo neste momento. Solte a tensão do maxilar, relaxe a testa e os olhos. Não há nada para resolver neste segundo. Este é o seu espaço de quietude, clareza e paz interior.",
        "text": "Observe o seu corpo neste momento. Solte a tensão do maxilar, relaxe a testa e os olhos. Não há nada para resolver neste segundo. Este é o seu espaço de quietude, clareza e paz interior."
    },
    {
        "id": 4,
        "phase": "4. Observação Sem Julgamento (RAIN)",
        "focus": "awareness",
        "audio_text": "Se pensamentos ou preocupações surgirem, não lute contra eles. Apenas observe cada pensamento como uma nuvem passando no céu, e gentilmente traga o foco de volta para a sua respiração.",
        "text": "Se pensamentos ou preocupações surgirem, não lute contra eles. Apenas observe cada pensamento como uma nuvem passando no céu, e gentilmente traga o foco de volta para a sua respiração."
    },
    {
        "id": 5,
        "phase": "5. Reprogramação de Mindset",
        "focus": "mindset",
        "audio_text": "Agora, sinta esta verdade em sua mente: Eu escolho a serenidade. Minha mente é clara, focada e consciente. Eu tenho autogoverno sobre minhas escolhas e estou em paz no meu caminho.",
        "text": "Agora, sinta esta verdade em sua mente: Eu escolho a serenidade. Minha mente é clara, focada e consciente. Eu tenho autogoverno sobre minhas escolhas e estou em paz no meu caminho."
    },
    {
        "id": 6,
        "phase": "6. Integração & Retorno",
        "focus": "integration",
        "audio_text": "Faça mais uma respiração profunda. Movimente suavemente as mãos e os pés. Quando se sentir pronto, abra os olhos, levando esta clareza e tranquilidade para todo o seu dia.",
        "text": "Faça mais uma respiração profunda. Movimente suavemente as mãos e os pés. Quando se sentir pronto, abra os olhos, levando esta clareza e tranquilidade para todo o seu dia."
    }
]

async def generate():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)
    audio_path = os.path.join(output_dir, "meditacao_mindset.mp3")

    full_text = "\n\n".join([p["audio_text"] for p in SCRIPT_PARTS])
    
    print(f"🎙️ Gerando locução fluida e natural com {VOICE}...")
    communicate = edge_tts.Communicate(full_text, voice=VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(audio_path)
    print(f"✅ Áudio da locução salvo em: {audio_path}")

    # Generate very soft ambient wav loop
    ambient_path = os.path.join(output_dir, "ambient_432hz.wav")
    print("🌊 Gerando trilha ambiente suave em 432Hz...")
    sample_rate = 44100
    duration = 60
    t = np.linspace(0, duration, int(sample_rate * duration), False)

    freqs = [108.0, 216.0, 271.8, 432.0, 540.0]
    left = np.zeros_like(t)
    right = np.zeros_like(t)

    for i, f in enumerate(freqs):
        mod = 0.5 + 0.5 * np.sin(2 * np.pi * 0.05 * t + i)
        left += (0.08 / (i + 1)) * np.sin(2 * np.pi * f * t) * mod
        right += (0.08 / (i + 1)) * np.sin(2 * np.pi * (f + 2.0) * t) * mod

    # Soft loop fade
    fade_len = int(sample_rate * 4)
    fade_in = np.linspace(0, 1, fade_len)
    fade_out = np.linspace(1, 0, fade_len)
    left[:fade_len] *= fade_in
    left[-fade_len:] *= fade_out
    right[:fade_len] *= fade_in
    right[-fade_len:] *= fade_out

    # Normalize to very delicate soft bed (max 0.15)
    max_val = max(np.max(np.abs(left)), np.max(np.abs(right)))
    left = (left / max_val) * 0.12
    right = (right / max_val) * 0.12

    audio_data = np.zeros(len(t) * 2)
    audio_data[0::2] = left
    audio_data[1::2] = right
    pcm_data = (audio_data * 32767).astype(np.int16)

    with wave.open(ambient_path, 'w') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(pcm_data.tobytes())

    print(f"✅ Trilha ambiente suave salva em: {ambient_path}")

    # Timing calculation
    current_sec = 0.0
    steps_with_timing = []
    
    for part in SCRIPT_PARTS:
        words_count = len(part["text"].split())
        duration = round((words_count / 2.3) + 2.2, 1)
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
    print(f"⏱️ Duração total: {total_duration}s (~{total_duration // 60}m {total_duration % 60}s)")

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
    print(f"💾 Dados salvos em: {json_path}")

if __name__ == "__main__":
    asyncio.run(generate())
