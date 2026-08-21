import requests
import urllib.parse
import os
import time

out_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'images', 'bible_kids')
os.makedirs(out_dir, exist_ok=True)

brain_dir = 'C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb'
os.makedirs(brain_dir, exist_ok=True)

all_scenes = [
    # 1. A Criação do Mundo
    ("kids_criacao_mundo.jpg", "3D Disney Pixar animated movie style scene panorama of the Creation of the World, warm golden sun in clear pastel blue sky, lush green rolling mountains with colorful blooming flowers, crystal clear turquoise blue ocean with friendly playful jumping dolphins and baby animals on the shore, Pixar animation studio masterpiece 3D render, cinematic lighting, vibrant, 8k, no text", 101),
    ("kids_criacao_1_luz.jpg", "3D Disney Pixar animated movie style scene of the Biblical Creation of Light, God saying Let there be light, spectacular radiant golden and warm colorful cosmic light rays bursting through deep dark blue space with sparkling golden stardust particles, whimsical, comforting, Disney Pixar 3D animation movie quality, cinematic lighting, cute, vibrant, 8k, masterpiece, no text", 777),
    ("kids_criacao_2_mares.jpg", "3D Disney Pixar animated movie style scene of the Creation of oceans and sky, crystal clear turquoise blue ocean with gentle splashing waves and happy jumping cartoon dolphins, fluffy white clouds in a bright blue sunny sky, rolling lush green hills with blooming flowers and waterfalls, Pixar animation studio 3D render, 8k, no text", 103),
    ("kids_criacao_3_animais.jpg", "3D Disney Pixar animated movie style scene of cute baby animals, adorable fluffy baby lion cubs, cute baby bunnies, playful puppy, and colorful parrots playing together happily on lush green grass with flowers under warm sunny sky, Pixar 3D characters, 8k, no text", 104),
    ("kids_criacao_4_homem.jpg", "3D Disney Pixar animated movie style scene of the Garden of Eden, kind smiling people and friendly gentle animals living happily together under warm golden sunlight, lush fruit trees and blooming flowers, Pixar studio 3D render, 8k, no text", 105),

    # 2. A Arca de Noé (Cena 2 mantida pois o usuário aprovou!)
    ("kids_noe_ark.jpg", "3D Disney Pixar animated movie style scene of the majestic wooden Noah's Ark resting on a lush green hill under a clear sunny blue sky with fluffy white clouds, warm natural lighting, Pixar studio render, 8k, no text", 201),
    ("kids_noe_1_construcao.jpg", "3D Disney Pixar animated movie style scene of kind elderly Noah with gentle smiling face and white beard, wearing traditional tunic, and his cheerful sons building a huge wooden ark with wooden planks and hammers on a sunny green hill with forest background, warm golden sunlight, Pixar 3D character design, 8k, no text", 202),
    # kids_noe_2_embarque.jpg é a referência aprovada! Não sobrescrever.
    ("kids_noe_3_pomba.jpg", "3D Disney Pixar animated movie style scene of a cute friendly white dove holding a fresh green olive branch in its beak, flying towards kind elderly Noah smiling at the wooden ark window over calm blue waters under soft sunny skies, Pixar lighting and 3D render, 8k, no text", 204),
    ("kids_noe_4_arcoiris.jpg", "3D Disney Pixar animated movie style scene of kind elderly Noah and his family celebrating on a lush green hill with all the happy cute animals under a magnificent glowing vibrant rainbow in a bright blue sky, Pixar animation movie quality, 8k, no text", 205),

    # 3. Davi e Golias
    ("kids_davi_golias.jpg", "3D Disney Pixar animated movie style scene of brave young boy David holding his wooden shepherd staff and leather sling, standing confidently in a sunny green valley with cute fluffy sheep, giant Goliath in ornate bronze armor visible in the background, Pixar animation movie render, 8k, no text", 301),
    ("kids_davi_1_pastor.jpg", "3D Disney Pixar animated movie style scene of cute young shepherd boy David with friendly smiling face playing a small wooden harp happily in a sunlit green meadow surrounded by cute fluffy white sheep and wildflowers, warm golden hour lighting, Pixar 3D character design, 8k, no text", 302),
    ("kids_davi_2_golias.jpg", "3D Disney Pixar animated movie style scene of giant Goliath in shiny ornate bronze armor with helmet looking surprised and clumsy, as brave cute young boy David stands confidently looking at him in a sunny green valley with distant hills, Pixar animated movie scene, 8k, no text", 303),
    ("kids_davi_3_vitoria.jpg", "3D Disney Pixar animated movie style scene of brave young boy David smiling joyfully, raising his leather sling with cheering happy soldiers and families celebrating victory on the sunlit green hillside, warm daylight, Pixar 3D render, 8k, no text", 304),

    # 4. Daniel na Cova dos Leões
    ("kids_daniel_lions.jpg", "3D Disney Pixar animated movie style scene of kind smiling young boy Daniel gently hugging a big fluffy friendly lion inside a warm stone chamber with soft golden divine light beams coming from above, Pixar 3D animation quality, 8k, no text", 401),
    ("kids_daniel_1_oracao.jpg", "3D Disney Pixar animated movie style scene of kind young boy Daniel kneeling beside an open arched stone window in his cozy bedroom, praying peacefully with closed eyes at sunset with warm amber glow, starry sky visible outside, Pixar 3D character design, 8k, no text", 402),
    ("kids_daniel_2_cova.jpg", "3D Disney Pixar animated movie style scene of guards looking into a stone room in awe as large majestic fluffy lions lie down calmly and peacefully sleeping like big kittens beside young Daniel, warm torchlight, Pixar animation scene, 8k, no text", 403),
    ("kids_daniel_3_anjo.jpg", "3D Disney Pixar animated movie style scene of a glowing cute golden 3D guardian angel with radiant wings gently petting big fluffy lions sleeping peacefully next to smiling boy Daniel in a warm stone room, Pixar render, 8k, no text", 404),

    # 5. Jonas e o Grande Peixe
    ("kids_jonas_fish.jpg", "3D Disney Pixar animated movie style scene of kind Jonah inside the cozy glowing belly of a giant friendly blue whale looking out into the turquoise sea with colorful coral reefs and tropical fish, Pixar 3D animated movie render, 8k, no text", 501),
    ("kids_jonas_1_navio.jpg", "3D Disney Pixar animated movie style scene of a wooden sailing ship sailing through dynamic turquoise blue ocean waves under stylized fluffy clouds with warm sunlight breaking through, Pixar cinematic lighting, 8k, no text", 502),
    ("kids_jonas_2_baleia.jpg", "3D Disney Pixar animated movie style underwater scene of a giant friendly smiling blue cartoon whale gently protecting Jonah in the crystal clear turquoise sea with colorful sea turtles and tropical fish, Pixar lighting and 3D render, 8k, no text", 503),
    ("kids_jonas_3_praia.jpg", "3D Disney Pixar animated movie style scene of cheerful smiling Jonah standing on a sunny tropical white sand beach with palm trees, waving warmly to joyful townspeople welcoming him, Pixar movie render, 8k, no text", 504),

    # 6. O Milagre dos Pães
    ("kids_paes_milagre.jpg", "3D Disney Pixar animated movie style scene of kind smiling Jesus with warm welcoming face sitting on a green hill with a cute young boy holding a wicker basket of breads and fish, warm afternoon sunlight, Pixar 3D render, 8k, no text", 601),
    ("kids_paes_1_multidao.jpg", "3D Disney Pixar animated movie style scene of a large crowd of cheerful cartoon children and families sitting on a sunny green hillside with wildflowers listening intently to kind Jesus near a calm blue lake, warm golden sunlight, Pixar animation scene, 8k, no text", 602),
    ("kids_paes_2_menino.jpg", "3D Disney Pixar animated movie style scene of a cute joyful young boy with glowing expressive eyes offering a small wicker basket with five small golden breads and two fish to kind smiling Jesus, close-up warm character interaction, Pixar render, 8k, no text", 603),
    ("kids_paes_3_cestos.jpg", "3D Disney Pixar animated movie style scene of twelve woven wicker baskets overflowing with warm golden freshly baked breads and fish, with happy children and families eating joyfully on a sunny green meadow, Pixar lighting and 3D character design, 8k, no text", 604)
]

def generate_scene(filename, prompt, seed):
    pub_path = os.path.join(out_dir, filename)
    if os.path.exists(pub_path):
        print(f"Skipping {filename} (already exists)")
        return True

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
                    
                print(f"  -> [OK] {filename} saved ({len(r.content)} bytes)")
                return True
            else:
                print(f"  -> Attempt {attempt+1} status {r.status_code}")
        except Exception as e:
            print(f"  -> Attempt {attempt+1} error: {e}")
        time.sleep(2)
    return False

if __name__ == '__main__':
    for filename, prompt, seed in all_scenes:
        generate_scene(filename, prompt, seed)
        time.sleep(1)
    print("\nAll 3D Pixar scenes generated successfully!")
