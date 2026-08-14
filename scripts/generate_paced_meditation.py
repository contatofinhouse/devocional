import asyncio
import os
import sys
import json
import edge_tts

# Set UTF-8 for console output on Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

VOICE = "pt-BR-ThalitaMultilingualNeural" # Voz neural de última geração com alta naturalidade

# Roteiro do Instrutor de Meditação com Pausas Reais de Prática
PHASES = [
    {
        "id": 1,
        "phase": "1. Acolhimento e Postura",
        "focus": "breathing",
        "speech": "Bem-vindo a este momento de pausa e renovação mental. Encontre uma posição confortável, com a coluna ereta, porém relaxada. Feche suavemente os olhos... Permita-se pousar por inteiro no momento presente.",
        "silence_sec": 6, # 6s de silêncio para ajustar a postura e fechar os olhos
        "text": "Encontre uma posição confortável, com a coluna ereta e relaxada. Feche suavemente os olhos e permita-se estar presente."
    },
    {
        "id": 2,
        "phase": "2. Ancoragem Respiratória (Ciclo 1)",
        "focus": "breathing",
        "speech": "Traga agora toda a atenção para a sua respiração. Inspire profundamente pelo nariz, expandindo o abdômen... Segure o ar por um instante... E solte o ar devagar pela boca, relaxando os ombros e liberando todo o peso acumulado.",
        "silence_sec": 12, # 12s de silêncio para 1 ciclo completo 4-4-6
        "text": "Inspire profundamente pelo nariz... Segure... E solte o ar devagar pela boca, soltando os ombros e relaxando."
    },
    {
        "id": 3,
        "phase": "3. Respiração de Alívio (Ciclo 2)",
        "focus": "breathing",
        "speech": "Mais uma vez, puxe o ar com calma e profundidade... Segure a presença... E solte todo o ar, sentindo o corpo descompressar por inteiro.",
        "silence_sec": 10, # 10s para segundo ciclo respiratório
        "text": "Puxe o ar com calma e profundidade... e solte devagar, sentindo o alívio e a descompressão em todo o corpo."
    },
    {
        "id": 4,
        "phase": "4. Desaceleração & Escaneamento",
        "focus": "awareness",
        "speech": "Observe agora as sensações do seu corpo. Solte qualquer tensão no maxilar, suavize a testa e a área ao redor dos olhos. Não há nada para resolver neste segundo. Apenas sinta a quietude.",
        "silence_sec": 10, # 10s para escaneamento corporal real
        "text": "Solte a tensão do maxilar, relaxe a testa e os ombros. Sinta seu corpo pousar em quietude e paz."
    },
    {
        "id": 5,
        "phase": "5. Observador Sem Julgamento (RAIN)",
        "focus": "awareness",
        "speech": "Se pensamentos ou preocupações surgirem, não lute contra eles. Apenas observe cada pensamento como uma nuvem passando pelo céu... e gentilmente retorne a sua atenção para o ritmo natural da respiração.",
        "silence_sec": 12, # 12s de observação silenciosa
        "text": "Apenas observe seus pensamentos como nuvens passando no céu, sem julgamento, retornando à respiração."
    },
    {
        "id": 6,
        "phase": "6. Reprogramação de Mindset",
        "focus": "mindset",
        "speech": "Agora, interiorize esta verdade com firmeza e calma: Eu escolho a serenidade. Minha mente é clara, focada e consciente. Eu tenho autogoverno sobre minhas reações e foco no que é essencial.",
        "silence_sec": 8, # 8s para assimilação da convicção
        "text": "Eu escolho a serenidade. Minha mente é clara, focada e consciente. Tenho autogoverno e clareza no meu caminho."
    },
    {
        "id": 7,
        "phase": "7. Integração & Retorno",
        "focus": "integration",
        "speech": "Faça mais uma respiração consciente. Comece a movimentar suavemente as mãos e os pés. E quando se sentir pronto, abra os olhos, levando esta clareza e paz para todas as suas escolhas de hoje.",
        "silence_sec": 5, # 5s de retorno
        "text": "Respire fundo, movimente suavemente as mãos e abra os olhos, levando esta clareza para o seu dia."
    }
]

def make_breaks(seconds: int) -> str:
    """Creates chained SSML break tags (max 5000ms each)"""
    breaks = []
    rem = seconds * 1000
    while rem > 0:
        chunk = min(5000, rem)
        breaks.append(f"<break time='{chunk}ms'/>")
        rem -= chunk
    return "".join(breaks)

async def main():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)
    audio_path = os.path.join(output_dir, "meditacao_mindset.mp3")

    # Build SSML with chained breaks
    ssml_parts = []
    ssml_parts.append(f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='pt-BR'>")
    ssml_parts.append(f"<voice name='{VOICE}'>")

    for p in PHASES:
        ssml_parts.append(p["speech"])
        ssml_parts.append(make_breaks(p["silence_sec"]))

    ssml_parts.append("</voice></speak>")
    full_ssml = "\n".join(ssml_parts)

    print(f"🎙️ Gerando sessão completa com voz {VOICE} e pausas reais de instrutor...")
    communicate = edge_tts.Communicate(full_ssml, voice=VOICE)
    await communicate.save(audio_path)
    print(f"✅ Áudio salvo em: {audio_path}")

    # Precise timing estimation based on speech words + silence pauses
    current_sec = 0.0
    steps = []

    for p in PHASES:
        words = len(p["speech"].split())
        # Word speech duration + silence duration
        speech_duration = round(words / 2.35, 1)
        total_phase_duration = round(speech_duration + p["silence_sec"], 1)
        
        start_sec = round(current_sec, 1)
        end_sec = round(current_sec + total_phase_duration, 1)

        steps.append({
            "id": p["id"],
            "phase": p["phase"],
            "focus": p["focus"],
            "startSeconds": start_sec,
            "endSeconds": end_sec,
            "text": p["text"]
        })
        current_sec = end_sec

    total_duration = round(current_sec)
    print(f"⏱️ Duração total da sessão: {total_duration}s (~{total_duration // 60}m {total_duration % 60}s)")

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
        "steps": steps
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
