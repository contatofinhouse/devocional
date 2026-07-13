import re
import json
import os

sql_input_path = r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\store-assets\dev_lessons_rows_2.sql'
progress_path = r'C:\Users\rafae\.gemini\antigravity-ide\scratch\progress_rewrite.json'
output_dir = r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\store-assets'

def parse_sql_values(sql):
    values_start = sql.find("VALUES")
    if values_start == -1:
        return []
    values_str = sql[values_start + 6:].strip()
    
    rows = []
    current_row = []
    current_val = []
    in_quotes = False
    in_tuple = False
    
    i = 0
    n = len(values_str)
    while i < n:
        char = values_str[i]
        
        if char == "'":
            if i + 1 < n and values_str[i+1] == "'":
                current_val.append("'")
                i += 2
                continue
            else:
                in_quotes = not in_quotes
        elif char == "(" and not in_quotes:
            in_tuple = True
            current_row = []
            current_val = []
        elif char == ")" and not in_quotes:
            if in_tuple:
                val = "".join(current_val).strip()
                if val.startswith("'") and val.endswith("'"):
                    val = val[1:-1]
                current_row.append(val)
                rows.append(current_row)
                in_tuple = False
        elif char == "," and not in_quotes:
            if in_tuple:
                val = "".join(current_val).strip()
                if val.startswith("'") and val.endswith("'"):
                    val = val[1:-1]
                current_row.append(val)
                current_val = []
        else:
            current_val.append(char)
        
        i += 1
    return rows

def escape_val(val, is_number=False):
    if val is None or val == 'NULL':
        return 'NULL'
    if is_number:
        return str(val)
    # Escape single quotes
    escaped = str(val).replace("'", "''")
    return f"'{escaped}'"

def compile_all():
    print("Reading input SQL file...")
    with open(sql_input_path, 'r', encoding='utf-8') as f:
        sql_content = f.read()
        
    print("Parsing original rows...")
    rows = parse_sql_values(sql_content)
    print(f"Parsed {len(rows)} original rows.")
    
    print("Loading progress rewrite JSON...")
    if os.path.exists(progress_path):
        with open(progress_path, 'r', encoding='utf-8') as f:
            progress = json.load(f)
    else:
        progress = {}
    print(f"Loaded {len(progress)} rewritten entries.")
    
    parts_count = 6
    chunk_size = (len(rows) + parts_count - 1) // parts_count
    
    for part_idx in range(parts_count):
        start_r = part_idx * chunk_size
        end_r = min((part_idx + 1) * chunk_size, len(rows))
        chunk_rows = rows[start_r:end_r]
        
        if not chunk_rows:
            continue
            
        compiled_lessons = []
        compiled_questions = []
        compiled_prayers = []
        
        for row in chunk_rows:
            if len(row) != 13:
                continue
                
            lid = row[0]
            # Replace lessons fields if rewritten
            if lid in progress and 'updated' in progress[lid]:
                updated = progress[lid]['updated']
                row[6] = updated.get('title', row[6])
                row[8] = updated.get('biblical_story', row[8])
                row[9] = updated.get('reflection', row[9])
                row[10] = updated.get('challenge', row[10])
                row[11] = updated.get('final_message', row[11])
                
                # Dynamic Questions
                questions = updated.get('questions', [])
                for q_idx, q_text in enumerate(questions):
                    q_val = (escape_val(lid), escape_val(q_text), escape_val(q_idx + 1, is_number=True))
                    compiled_questions.append(f"({', '.join(q_val)})")
                    
                # Dynamic Prayers
                prayers = updated.get('prayers', [])
                for p_idx, p_data in enumerate(prayers):
                    p_role = p_data.get('role', 'Individual')
                    p_text = p_data.get('text', '')
                    p_val = (escape_val(lid), escape_val(p_role), escape_val(p_text), escape_val(p_idx + 1, is_number=True))
                    compiled_prayers.append(f"({', '.join(p_val)})")
            
            # Format lessons values
            formatted_cols = []
            for col_idx, col in enumerate(row):
                is_num = (col_idx == 5)
                formatted_cols.append(escape_val(col, is_number=is_num))
            compiled_lessons.append(f"({', '.join(formatted_cols)})")
            
        # Build SQL output for this part
        sql_output = []
        
        # Prepend Truncate in Part 1
        if part_idx == 0:
            sql_output.append('-- Clean tables first\nTRUNCATE TABLE "public"."dev_lessons" CASCADE;\n')
            
        # 1. Insert Lessons
        sql_output.append('INSERT INTO "public"."dev_lessons" ("id", "theme_id", "theme_name", "development_mode", "age_group", "lesson_number", "title", "biblical_reference", "biblical_story", "reflection", "challenge", "final_message", "created_at") VALUES\n' + ",\n".join(compiled_lessons) + ";\n")
        
        # 2. Insert Questions (if any)
        if compiled_questions:
            sql_output.append('\nINSERT INTO "public"."dev_questions" ("lesson_id", "question_text", "display_order") VALUES\n' + ",\n".join(compiled_questions) + ";\n")
            
        # 3. Insert Prayers (if any)
        if compiled_prayers:
            sql_output.append('\nINSERT INTO "public"."dev_prayers" ("lesson_id", "role", "text_content", "display_order") VALUES\n' + ",\n".join(compiled_prayers) + ";\n")
            
        part_file_path = os.path.join(output_dir, f'dev_lessons_rows_5_part{part_idx + 1}.sql')
        with open(part_file_path, 'w', encoding='utf-8') as f:
            f.write("".join(sql_output))
            
        print(f"Generated Part {part_idx + 1} SQL dump with {len(compiled_lessons)} lessons, {len(compiled_questions)} questions, and {len(compiled_prayers)} prayers.")

if __name__ == '__main__':
    compile_all()
