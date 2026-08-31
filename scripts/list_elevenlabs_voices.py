"""
Lista vozes disponíveis no ElevenLabs e procura as solicitadas
"""
import requests
import json

import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))
ELEVEN_API_KEY = os.environ.get("ELEVENLABS_API_KEY")

# Tenta com prefixo sk_ primeiro, depois sem
for key in [ELEVEN_API_KEY, ELEVEN_API_KEY.replace("sk_", "")]:
    r = requests.get(
        "https://api.elevenlabs.io/v1/voices",
        headers={"xi-api-key": key}
    )
    if r.status_code == 200:
        print(f"Autenticado com chave: {key[:20]}...")
        break
    else:
        print(f"Erro {r.status_code} com chave {key[:20]}... -> {r.text[:100]}")

if r.status_code != 200:
    print("Falha na autenticação. Encerrando.")
    exit(1)

voices = r.json()["voices"]
print(f"\nTotal de vozes disponíveis: {len(voices)}\n")

# Busca pelos nomes solicitados
TARGET_NAMES = ["davi", "andrei", "luana", "carlos", "carla", "jon", "oliveira", "eliel", "lair"]

print("=== VOZES ENCONTRADAS ===")
found = []
for v in sorted(voices, key=lambda x: x["name"].lower()):
    name_lower = v["name"].lower()
    if any(t in name_lower for t in TARGET_NAMES):
        labels = v.get("labels", {})
        lang = labels.get("language", labels.get("accent", "?"))
        desc = labels.get("description", "")
        use_case = labels.get("use_case", "")
        print(f"  NAME: {v['name']}")
        print(f"  ID:   {v['voice_id']}")
        print(f"  Lang: {lang} | Desc: {desc} | Use: {use_case}")
        print()
        found.append(v)

print(f"\n=== TODAS AS VOZES (para referência) ===")
for v in sorted(voices, key=lambda x: x["name"].lower()):
    labels = v.get("labels", {})
    lang = labels.get("language", labels.get("accent", ""))
    print(f"  {v['name']:35s} | {v['voice_id']} | {lang}")
