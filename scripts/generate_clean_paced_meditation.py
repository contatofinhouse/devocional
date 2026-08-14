import asyncio
import os
import sys
import json
import miniaudio
import numpy as np
import wave
import edge_tts

# Set UTF-8 for console output on Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

VOICE = "pt-BR-ThalitaMultilingualNeural"

# Roteiro do Instrutor de Meditação: Texto PURO em Português sem nenhuma tag ou código
PHASES = [
    {
        "id": 1,
        "phase": "1. Acolhimento e Postura",
        "focus": "breathing",
        "speech": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, com a coluna ereta, porém relaxada. Feche suavemente os olhos e permita-se pousar por inteiro no momento presente.",
        "silence_sec": 6.0,
        "text": "Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos e permita-se estar presente."
    },
    {
        "id": 2,
        "phase": "2. Ancoragem Respiratória (Ciclo 1)",
        "focus": "breathing",
        "speech": "Traga agora toda a atenção para a sua respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, relaxando os ombros e liberando todo o peso acumulado.",
        "silence_sec": 10.0,
        "text": "Inspire profundamente pelo nariz... Segure... E solte o ar devagar pela boca, soltando os ombros e relaxando."
    },
    {
        "id": 3,
        "phase": "3. Respiração de Alívio (Ciclo 2)",
        "focus": "breathing",
        "speech": "Mais uma vez, puxe o ar com calma e profundidade... Segure a presença... E solte todo o ar, sentindo o corpo descompressar por inteiro.",
        "silence_sec": 10.0,
        "text": "Puxe o ar com calma e profundidade... e solte devagar, sentindo o alívio e a descompressão em todo o corpo."
    },
    {
        "id": 4,
        "phase": "4. Desaceleração & Escaneamento",
        "focus": "awareness",
        "speech": "Observe agora as sensações do seu corpo. Solte qualquer tensão no maxilar, suavize a testa e a área ao redor dos olhos. Não há nada para resolver neste segundo. Apenas sinta a quietude.",
        "silence_sec": 10.0,
        "text": "Solte a tensão do maxilar, relaxe a testa e os ombros. Sinta seu corpo pousar em quietude e paz."
    },
    {
        "id": 5,
        "phase": "5. Observador Sem Julgamento (RAIN)",
        "focus": "awareness",
        "speech": "Se pensamentos ou preocupações surgirem, não lute contra eles. Apenas observe cada pensamento como uma nuvem passando pelo céu... e gentilmente retorne a sua atenção para o ritmo natural da respiração.",
        "silence_sec": 10.0,
        "text": "Apenas observe seus pensamentos como nuvens passando no céu, sem julgamento, retornando à respiração."
    },
    {
        "id": 6,
        "phase": "6. Reprogramação de Mindset",
        "focus": "mindset",
        "speech": "Agora, interiorize esta verdade com firmeza e calma: Eu escolho a serenidade. Minha mente é clara, focada e consciente. Eu tenho autogoverno sobre minhas reações e foco no que é essencial.",
        "silence_sec": 8.0,
        "text": "Eu escolho a serenidade. Minha mente é clara, focada e consciente. Tenho autogoverno e clareza no meu caminho."
    },
    {
        "id": 7,
        "phase": "7. Integração & Retorno",
        "focus": "integration",
        "speech": "Faça mais uma respiração consciente. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta clareza e paz para todas as suas escolhas de hoje.",
        "silence_sec": 4.0,
        "text": "Respire fundo, movimente suavemente as mãos e abra os olhos, levando esta clareza para o seu dia."
    }
]

async def main():
    temp_dir = os.path.join(os.getcwd(), "scratch", "tts_parts")
    os.makedirs(temp_dir, exist_ok=True)
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)

    pcm_chunks = []
    target_sample_rate = 24000 # Standard edge-tts rate
    target_channels = 1
    
    current_time_sec = 0.0
    steps_data = []

    print("🎙️ Gerando falas individuais em Português puro...")
    for idx, p in enumerate(PHASES):
        part_path = os.path.join(temp_dir, f"part_{idx}.mp3")
        
        # Pure text generation (no SSML tags to avoid any code being read aloud!)
        comm = edge_tts.Communicate(p["speech"], voice=VOICE)
        await comm.save(part_path)

        # Decode MP3 to raw PCM using miniaudio
        decoded = miniaudio.decode_file(part_path)
        samples = np.frombuffer(decoded.samples, dtype=np.int16)
        
        # Convert stereo to mono if needed
        if decoded.nchannels == 2:
            samples = ((samples[0::2].astype(np.int32) + samples[1::2].astype(np.int32)) // 2).astype(np.int16)

        target_sample_rate = decoded.sample_rate
        speech_duration_sec = len(samples) / target_sample_rate
        
        # Add speech PCM
        pcm_chunks.append(samples)

        # Generate exact silence samples
        silence_samples_count = int(p["silence_sec"] * target_sample_rate)
        silence_chunk = np.zeros(silence_samples_count, dtype=np.int16)
        pcm_chunks.append(silence_chunk)

        phase_total_sec = round(speech_duration_sec + p["silence_sec"], 2)
        start_sec = round(current_time_sec, 2)
        end_sec = round(current_time_sec + phase_total_sec, 2)

        steps_data.append({
            "id": p["id"],
            "phase": p["phase"],
            "focus": p["focus"],
            "startSeconds": start_sec,
            "endSeconds": end_sec,
            "text": p["text"]
        })
        current_time_sec = end_sec
        print(f"  ✓ Fase {p['id']}: fala={speech_duration_sec:.1f}s + pausa={p['silence_sec']}s -> {start_sec}s até {end_sec}s")

    # Combine all PCM chunks into a single WAV file
    full_pcm = np.concatenate(pcm_chunks)
    total_duration_sec = round(len(full_pcm) / target_sample_rate)
    
    # Save as standard WAV (100% universal support in browsers and capacitor)
    final_wav_path = os.path.join(output_dir, "meditacao_mindset.wav")
    with wave.open(final_wav_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2) # 16-bit
        wf.setframerate(target_sample_rate)
        wf.writeframes(full_pcm.tobytes())

    print(f"\n✅ Áudio final puro salvo em: {final_wav_path}")
    print(f"⏱️ Duração total: {total_duration_sec}s (~{total_duration_sec // 60}m {total_duration_sec % 60}s)")

    # Export mockMeditations.ts
    meditation_data = {
        "id": "mindfulness_mindset_1",
        "title": "Presença, Clareza & Foco",
        "subtitle": "Reprogramação de Mindset com Metodologia MBSR & RAIN",
        "methodology": "Mindfulness MBSR",
        "durationSeconds": total_duration_sec,
        "audioUrl": "/audio/meditacao_mindset.wav",
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
        "steps": steps_data
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
    print(f"💾 mockMeditations.ts atualizado em: {json_path}")

if __name__ == "__main__":
    asyncio.run(main())
