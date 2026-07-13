import json
import re

def normalize_book(name):
    name = name.lower()
    accents = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','â':'a','ê':'e','ô':'o','ã':'a','õ':'o','ç':'c','í':'i','ü':'u','ñ':'n'}
    for k, v in accents.items():
        name = name.replace(k, v)
    return name.strip().replace(' ', '_')

try:
    with open(r'C:\Users\rafae\.gemini\antigravity-ide\scratch\lessons.json', 'r', encoding='utf-8') as f:
        lessons = json.load(f)

    bible_map = {}

    for lesson in lessons:
        ref = lesson.get('biblical_reference', '')
        theme = lesson.get('theme_name', '')
        if not ref or not theme:
            continue
        
        match = re.match(r'^(.+?)\s+(\d+):', ref)
        if match:
            book = match.group(1).strip()
            chapter = int(match.group(2))
            
            norm_book = normalize_book(book)
            if norm_book not in bible_map:
                bible_map[norm_book] = {}
            if chapter not in bible_map[norm_book]:
                bible_map[norm_book][chapter] = set()
            
            bible_map[norm_book][chapter].add(theme)

    print('const BIBLE_THEME_MAP: Record<string, Record<number, string[]>> = {')
    for book, chapters in sorted(bible_map.items()):
        print(f'  "{book}": {{')
        for chap, themes in sorted(chapters.items()):
            themes_list = list(themes)
            # format as javascript array representation
            themes_js = ", ".join([f"'{t}'" for t in themes_list])
            print(f'    {chap}: [{themes_js}],')
        print('  },')
    print('};')

except Exception as e:
    print("Error:", str(e))
