"""
Teste rapido do gpt-4o-mini-tts com instructions em PT-BR
"""
import requests
import os

OPENAI_API_KEY = "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"

# Teste com 3 vozes + instructions diferentes
TESTS = [
    {
        "voice": "shimmer",
        "instructions": "Você é uma narradora de meditação guiada em português do Brasil. Fale de forma extremamente suave, pausada e acolhedora, com entonação brasileira natural. Respire entre as frases. Sua voz deve trazer calma e serenidade.",
        "output": "test_shimmer_instructions.mp3"
    },
    {
        "voice": "onyx",
        "instructions": "Você é um narrador de meditação em português do Brasil, com voz grave e serena. Fale devagar, com pausas entre as frases, tom acolhedor e reconfortante. Entonação brasileira, sotaque neutro.",
        "output": "test_onyx_instructions.mp3"
    },
    {
        "voice": "nova",
        "instructions": "Você é uma guia de meditação brasileira. Fale em português do Brasil com voz calma, pausada, suave como uma brisa. Dê pausas naturais entre as orações. Tom sereno e humano.",
        "output": "test_nova_instructions.mp3"
    }
]

TEST_TEXT = """Bem-vindo a este momento de pausa e cuidado com você mesmo.

Encontre uma posição confortável, com a coluna levemente ereta e os ombros soltos.

Feche suavemente os olhos, e permita que o corpo todo comece a pousar no presente.

Inspire devagar pelo nariz... segure o ar por um instante... e solte pela boca bem devagar, soltando qualquer tensão do dia."""

url = "https://api.openai.com/v1/audio/speech"
headers = {
    "Authorization": f"Bearer {OPENAI_API_KEY}",
    "Content-Type": "application/json"
}

for test in TESTS:
    print(f"Testando voz: {test['voice']}...")
    payload = {
        "model": "gpt-4o-mini-tts",
        "voice": test["voice"],
        "input": TEST_TEXT,
        "instructions": test["instructions"],
        "response_format": "mp3",
        "speed": 0.85
    }
    r = requests.post(url, headers=headers, json=payload, timeout=60)
    if r.status_code == 200:
        out = os.path.join("public", "audio", test["output"])
        with open(out, "wb") as f:
            f.write(r.content)
        print(f"  OK -> {out} ({len(r.content)//1024} KB)")
    else:
        print(f"  ERRO {r.status_code}: {r.text[:200]}")

print("\nTeste concluido! Ouça os 3 arquivos em public/audio/test_*.mp3")
