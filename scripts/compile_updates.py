import json

progress_path = r'C:\Users\rafae\.gemini\antigravity-ide\scratch\progress_rewrite.json'
output_path = r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\store-assets\dev_lessons_updates.sql'

def escape_sql(val):
    if val is None:
        return "NULL"
    # Use dollar-quoting to handle any single quotes, double quotes or newlines safely in Postgres
    return f"$${val}$$"

try:
    with open(progress_path, 'r', encoding='utf-8') as f:
        progress = json.load(f)
    
    entries = []
    for lesson_id, info in progress.items():
        updated = info.get('updated', {})
        if not updated:
            continue
        
        title = escape_sql(updated.get('title', ''))
        story = escape_sql(updated.get('biblical_story', ''))
        reflection = escape_sql(updated.get('reflection', ''))
        challenge = escape_sql(updated.get('challenge', ''))
        final_message = escape_sql(updated.get('final_message', ''))
        
        entries.append(f"  ('{lesson_id}'::uuid, {title}, {story}, {reflection}, {challenge}, {final_message})")
    
    if not entries:
        print("No completed updates found in progress_rewrite.json.")
        exit(0)
        
    sql = []
    sql.append('UPDATE "public"."dev_lessons" AS t SET')
    sql.append('  "title" = tmp.title,')
    sql.append('  "biblical_story" = tmp.biblical_story,')
    sql.append('  "reflection" = tmp.reflection,')
    sql.append('  "challenge" = tmp.challenge,')
    sql.append('  "final_message" = tmp.final_message')
    sql.append('FROM (VALUES')
    sql.append(",\n".join(entries))
    sql.append(') AS tmp(id, title, biblical_story, reflection, challenge, final_message)')
    sql.append('WHERE t.id = tmp.id;')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(sql))
        
    print(f"Successfully compiled {len(entries)} updates into single statement.")
except Exception as e:
    print("Error:", str(e))
