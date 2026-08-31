import requests

ELEVEN_API_KEY = os.environ.get("API_KEY")

print(f"Chave: {ELEVEN_API_KEY}")
print(f"Comprimento: {len(ELEVEN_API_KEY)} chars")
print()

print(f"Chave: {ELEVEN_API_KEY}")
print(f"Comprimento: {len(ELEVEN_API_KEY)} chars")
print()

# Testa listando vozes (nao precisa de user_read)
r = requests.get(
    "https://api.elevenlabs.io/v1/voices",
    headers={"xi-api-key": ELEVEN_API_KEY}
)
print(f"Status /v1/voices: {r.status_code}")
if r.status_code == 200:
    voices = r.json()["voices"]
    TARGET = ["davi", "andrei", "luana", "carlos", "carla", "jon", "oliveira", "eliel"]
    print(f"Total de vozes: {len(voices)}\n")
    print("=== VOZES ALVO ===")
    for v in sorted(voices, key=lambda x: x["name"].lower()):
        if any(t in v["name"].lower() for t in TARGET):
            print(f"  {v['name']:35s} | {v['voice_id']}")
    print("\n=== TODAS ===")
    for v in sorted(voices, key=lambda x: x["name"].lower()):
        print(f"  {v['name']:35s} | {v['voice_id']}")
else:
    print(f"Erro: {r.text}")
