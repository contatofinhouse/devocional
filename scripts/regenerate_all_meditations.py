import os
import sys
import re
import json
import requests
import subprocess
import time
from generate_full_length_meditations import SESSIONS_CONFIG

OPENAI_API_KEY = os.environ.get("API_KEY")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_temp_openai_all")

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
        "model": "tts-1-hd",
        "voice": voice,
        "input": text,
        "response_format": "mp3",
        "speed": 0.82
    }

    for attempt in range(retries):
        try:
            print(f"      -> Chamando OpenAI TTS (Voz: {voice})...", flush=True)
            r = requests.post(url, headers=headers, json=payload, timeout=60)
            if r.status_code != 200:
                print(f"      [ERRO] {r.status_code}: {r.text}", flush=True)
                time.sleep(2)
                continue
            
            with open(output_path, "wb") as f:
                f.write(r.content)
            return True
        except Exception as e:
            print(f"      [ERRO] {e}", flush=True)
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

def parse_text_with_breaks(text):
    # Regex to find <break time='XXXms'/>
    # The text looks like: "phrase 1<break time='3000ms'/>phrase 2<break time='5000ms'/>phrase 3"
    # Actually p() can generate multiple breaks in a row for > 5000ms.
    
    # We will split by <break time='...ms'/>
    segments = []
    pattern = r"<break time='(\d+)ms'/>"
    
    parts = re.split(pattern, text)
    # parts will be [text1, ms1, text2, ms2, ...]
    
    current_text = parts[0].strip()
    current_pause = 0
    
    for i in range(1, len(parts), 2):
        pause_val = int(parts[i])
        next_text = parts[i+1].strip()
        
        current_pause += pause_val
        
        if next_text != "":
            if current_text != "":
                segments.append((current_text, current_pause))
            current_text = next_text
            current_pause = 0
            
    if current_text != "":
        segments.append((current_text, current_pause))
        
    return segments

def main():
    print("="*60)
    print("GERANDO TODAS AS MEDITAÇÕES (OPENAI HD - LOUDNORM - SPEED 0.82)")
    print("="*60)
    
    for session in SESSIONS_CONFIG:
        filename = session["filename"]
        if filename == "meditacao_mindset.mp3":
            print(f"Pulando {filename} (já gerado).")
            continue
            
        old_voice = session["voice"]
        # Convert edge-tts voices to OpenAI voices
        # female_serene = pt-BR-FranciscaNeural -> shimmer
        # female_calm = pt-BR-ThalitaNeural -> shimmer
        # male_deep = pt-BR-AntonioNeural -> onyx
        if "Francisca" in old_voice or "Thalita" in old_voice:
            voice = "shimmer"
        else:
            voice = "onyx"

        story_temp_dir = os.path.join(TEMP_DIR, os.path.splitext(filename)[0])
        os.makedirs(story_temp_dir, exist_ok=True)

        print(f"\n[GERANDO] {filename} (Voz: {voice})")

        file_list = []
        global_seg_idx = 0
        
        for step in session["steps"]:
            raw_text = step["text"]
            # Removendo qualquer artefato "Claro, vamos começar" se por acaso tiver escapado
            raw_text = re.sub(r"Claro,\s*vamos\s*começar\.*", "", raw_text, flags=re.IGNORECASE).strip()
            
            parsed_segments = parse_text_with_breaks(raw_text)
            
            for text, pause_ms in parsed_segments:
                seg_mp3 = os.path.join(story_temp_dir, f"seg_{global_seg_idx:02d}.mp3")
                
                if not os.path.exists(seg_mp3):
                    if not generate_tts_segment(text, voice, seg_mp3):
                        print("FALHA NA GERAÇÃO!")
                        continue
                
                file_list.append(seg_mp3)

                if pause_ms > 0:
                    sil_mp3 = os.path.join(story_temp_dir, f"sil_{global_seg_idx:02d}.mp3")
                    if not os.path.exists(sil_mp3):
                        generate_silence_segment(pause_ms, sil_mp3)
                    file_list.append(sil_mp3)
                    
                global_seg_idx += 1

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
            "-af", "loudnorm=I=-14:TP=-1.0:LRA=11",
            "-y",
            output_path
        ]
        print("      -> Concatenando e normalizando (loudnorm)...", flush=True)
        subprocess.run(concat_cmd, check=True, capture_output=True)
        print(f"  [CONCLUIDO] {filename}", flush=True)

    print("\nPROCESSO CONCLUIDO COM SUCESSO!")

if __name__ == "__main__":
    main()
