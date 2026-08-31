import sys, os, re
sys.path.insert(0, 'scripts')
from generate_full_length_meditations import SESSIONS_CONFIG

print("=== DIAGNOSTICO AS IS ===")
print(f"Total de sessoes: {len(SESSIONS_CONFIG)}\n")
for s in SESSIONS_CONFIG:
    print(f"FILENAME: {s['filename']}")
    print(f"VOICE (edge-tts): {s['voice']}")
    all_text = ""
    for step in s['steps']:
        text = step['text']
        clean = re.sub(r"<break time='\d+ms'/>", '', text)
        all_text += clean + " "
    # Exibir primeiros 300 chars para ver se tem artefatos
    print(f"INICIO DO ROTEIRO: {all_text[:300]}")
    print("---")
