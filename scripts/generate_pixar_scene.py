import requests
import urllib.parse
import os
import time

out_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'images', 'bible_kids')
os.makedirs(out_dir, exist_ok=True)

brain_dir = 'C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb'
os.makedirs(brain_dir, exist_ok=True)

def generate_pixar_scene(filename, prompt, seed=42):
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=768&model=flux&seed={seed}&nologo=true"
    
    print(f"Generating Pixar image for {filename} (seed {seed})...")
    for attempt in range(3):
        try:
            r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=60)
            if r.status_code == 200 and len(r.content) > 10000:
                pub_path = os.path.join(out_dir, filename)
                with open(pub_path, 'wb') as f:
                    f.write(r.content)
                
                brain_path = os.path.join(brain_dir, filename)
                with open(brain_path, 'wb') as f:
                    f.write(r.content)
                    
                print(f"  -> Successfully generated and saved {filename} ({len(r.content)} bytes)")
                return True
            else:
                print(f"  -> Attempt {attempt+1} failed with status {r.status_code}")
        except Exception as e:
            print(f"  -> Attempt {attempt+1} exception: {e}")
        time.sleep(2)
    return False

if __name__ == '__main__':
    # Test generation for Cena 1
    prompt = "3D Disney Pixar animated movie style scene of the Biblical Creation of Light, God saying Let there be light, spectacular radiant golden and warm colorful cosmic light rays bursting through deep dark blue space with sparkling golden stardust particles, whimsical, comforting, Disney Pixar 3D animation movie quality, cinematic lighting, cute, vibrant, 8k, masterpiece, no text"
    generate_pixar_scene("kids_criacao_1_luz.jpg", prompt, seed=777)
