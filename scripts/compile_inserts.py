import re
import json
import os

sql_input_path = r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\store-assets\dev_lessons_rows_2.sql'
progress_path = r'C:\Users\rafae\.gemini\antigravity-ide\scratch\progress_rewrite.json'
sql_output_path = r'c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\store-assets\dev_lessons_rows_4.sql'

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
    escaped = val.replace("'", "''")
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
    
    compiled_tuples = []
    updated_count = 0
    
    for idx, row in enumerate(rows):
        if len(row) != 13:
            print(f"Warning: Row {idx+1} has invalid column count ({len(row)})")
            continue
            
        lid = row[0]
        # If this lesson has been rewritten, replace the relevant columns
        if lid in progress and 'updated' in progress[lid]:
            updated = progress[lid]['updated']
            row[6] = updated.get('title', row[6])
            row[8] = updated.get('biblical_story', row[8])
            row[9] = updated.get('reflection', row[9])
            row[10] = updated.get('challenge', row[10])
            row[11] = updated.get('final_message', row[11])
            updated_count += 1
            
        # Format values for SQL
        formatted_cols = []
        for col_idx, col in enumerate(row):
            is_num = (col_idx == 5) # lesson_number is at index 5
            formatted_cols.append(escape_val(col, is_number=is_num))
            
        compiled_tuples.append(f"({', '.join(formatted_cols)})")
        
    print(f"Updated {updated_count} lessons with rewritten versions.")
    
    print("Generating output SQL...")
    sql_header = 'INSERT INTO "public"."dev_lessons" ("id", "theme_id", "theme_name", "development_mode", "age_group", "lesson_number", "title", "biblical_reference", "biblical_story", "reflection", "challenge", "final_message", "created_at") VALUES\n'
    
    sql_body = ",\n".join(compiled_tuples)
    sql_final = sql_header + sql_body + ";"
    
    with open(sql_output_path, 'w', encoding='utf-8') as f:
        f.write(sql_final)
        
    print(f"Successfully compiled SQL dump into {sql_output_path}")

if __name__ == '__main__':
    compile_all()
