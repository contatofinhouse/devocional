import os
import sys
import json
import requests
import subprocess
import time

OPENAI_API_KEY = os.environ.get("API_KEY")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_openai_audio")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

try:
    import imageio_ffmpeg
    FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    FFMPEG_EXE = "ffmpeg"

def generate_tts_segment(text: str, voice: str, output_path: str, retries: int = 3):
    url = "https://api.openai.com/v1/audio/speech"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "tts-1-hd",  # HD for less metallic, more natural sound
        "voice": voice,
        "input": text,
        "response_format": "mp3",
        "speed": 0.82 # Slower for meditation
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

MEDITATIONS = {
    "meditacao_mindset.mp3": {
        "voice": "shimmer",
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

def main():
    print("Regenerando meditacao_mindset.mp3...")
    for filename, data in MEDITATIONS.items():
        voice = data["voice"]
        segments = data["segments"]

        story_temp_dir = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
        os.makedirs(story_temp_dir, exist_ok=True)

        file_list = []
        for i, (text, pause_ms) in enumerate(segments):
            seg_mp3 = os.path.join(story_temp_dir, f"seg_{i:02d}.mp3")
            if os.path.exists(seg_mp3):
                os.remove(seg_mp3) # Force regenerate for new voice
            
            generate_tts_segment(text, voice, seg_mp3)
            file_list.append(seg_mp3)

            if pause_ms > 0:
                sil_mp3 = os.path.join(story_temp_dir, f"sil_{i:02d}.mp3")
                if not os.path.exists(sil_mp3):
                    generate_silence_segment(pause_ms, sil_mp3)
                file_list.append(sil_mp3)

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
            "-af", "loudnorm=I=-14:TP=-1.0:LRA=11",  # Normalização agressiva para podcast/voz
            "-y",
            output_path
        ]
        subprocess.run(concat_cmd, check=True, capture_output=True)
        print(f"  [CONCLUIDO] {filename}")

if __name__ == "__main__":
    main()
