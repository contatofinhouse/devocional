import os
import re

def normalize(name):
    name = name.lower()
    accents = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','â':'a','ê':'e','ô':'o','ã':'a','õ':'o','ç':'c','í':'i','ü':'u','ñ':'n'}
    for k, v in accents.items():
        name = name.replace(k, v)
    return name.strip().replace(' ', '_')

try:
    books = []
    with open(r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\src\App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
        match = re.search(r'const BIBLE_BOOKS = \[(.*?)\];', content, re.DOTALL)
        if match:
            block = match.group(1)
            for line in block.split('\n'):
                m = re.search(r"name:\s*'(.+?)'", line)
                if m:
                    books.append(m.group(1))

    files = {os.path.splitext(f)[0] for f in os.listdir(r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\public\bible') if f.endswith('.json')}

    print("Total books listed:", len(books))
    print("Total json files:", len(files))
    
    for b in books:
        nb = normalize(b)
        if nb not in files:
            print(f"Mismatch: Book '{b}' normalizes to '{nb}.json' (not found).")
            # See if we can find close match in files
            for f in files:
                if nb in f or f in nb:
                    print(f"  Did you mean file '{f}.json'?")
except Exception as e:
    print("Error:", str(e))
