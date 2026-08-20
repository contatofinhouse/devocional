import os
import sys
import io
import urllib.request
from pypdf import PdfReader

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PDF_URLS = [
    ("BodyandSound", "https://www.uclahealth.org/sites/default/files/documents/BodyandSound_Transcript.pdf?f=2265e0d9"),
    ("BodyScan", "https://www.uclahealth.org/sites/default/files/documents/BodyScanMeditation_Transcript.pdf?f=2dd830c0"),
    ("Breathing", "https://www.uclahealth.org/sites/default/files/documents/Breathing%20Meditation_Transcript.pdf?f=3eb15568"),
    ("Difficulties", "https://www.uclahealth.org/sites/default/files/documents/MeditationForWorkingWithDifficulties_Transcript.pdf?f=2537bc3b"),
    ("LovingKindness", "https://www.uclahealth.org/sites/default/files/documents/LovingKindnessMeditation_Transcript.pdf?f=96778ae4"),
    ("BreathSoundBody", "https://www.uclahealth.org/sites/default/files/documents/BreathSoundBody_Transcript.pdf?f=3e5391d7"),
    ("BodyScanForSleep", "https://www.uclahealth.org/sites/default/files/documents/BodyScanForSleep_Transcript.pdf?f=22ffff6a"),
    ("CompleteMeditation", "https://www.uclahealth.org/sites/default/files/documents/CompleteMeditation_Transcript.pdf?f=b090cf20")
]

os.makedirs("scratch/transcripts", exist_ok=True)

for name, url in PDF_URLS:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            reader = PdfReader(io.BytesIO(data))
            text = "\n".join([page.extract_text() or "" for page in reader.pages])
            out_file = f"scratch/transcripts/{name}.txt"
            with open(out_file, "w", encoding="utf-8") as f:
                f.write(text)
            print(f"Extracted {name}: {len(text)} chars ({len(reader.pages)} pages)")
    except Exception as e:
        print(f"Error {name}: {e}")
