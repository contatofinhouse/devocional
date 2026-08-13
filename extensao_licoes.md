# Guia de Extensão de Lições (6 para 10 Lições por Tema)

Este documento contém todas as instruções, diretrizes de conteúdo e procedimentos técnicos para expandir qualquer trilha do aplicativo **Lecti** de **6 para 10 lições** por tema.

---

## 1. Como Executar a Expansão via Linha de Comando

Antes de rodar as inserções de lições com `lesson_number > 6`, certifique-se de que a constraint do banco permite até 30 lições (já inclusa no topo dos arquivos SQL gerados):

```sql
ALTER TABLE "public"."dev_lessons" 
  DROP CONSTRAINT IF EXISTS "dev_lessons_lesson_number_check",
  ADD CONSTRAINT "dev_lessons_lesson_number_check" CHECK ((lesson_number >= 1) AND (lesson_number <= 30));
```

Para rodar a geração e inserção das novas noites (7 a 10) no banco de dados Supabase:

```bash
# Para gerar e inserir noites 7 a 10 de temas específicos ou de todas as trilhas:
node scripts/expand_lessons.js
```

O script é idempotente: ele verifica se a lição (`theme_id`, `development_mode`, `age_group`, `lesson_number`) já existe antes de gerar/inserir.

---

## 2. Estrutura do Banco de Dados

Cada lição requer registros em 3 tabelas relacionadas:

### Tabela `dev_lessons`
- `id` (UUID, primary key)
- `theme_id` (string, ex: `'honestidade'`, `'coragem'`, `'perseveranca'`)
- `theme_name` (string, ex: `'Honestidade'`)
- `development_mode` (`'personal'` ou `'kids'`)
- `age_group` (`'adulto'`, `'kids'`, `'teens'`, `'young_adults'`)
- `lesson_number` (número da noite: `1` a `10`)
- `title` (título de até 6 palavras)
- `biblical_reference` (ex: `'Lucas 19:1-9'`)
- `biblical_story` (relato da história com 120 a 160 palavras)
- `reflection` (reflexão prática em 1 parágrafo com até 100 palavras)
- `challenge` (desafio prático em 1 frase com até 15 palavras)
- `final_message` (frase de impacto com até 12 palavras)
- `share_summary` (resumo de 3 a 4 linhas para compartilhamento)

### Tabela `dev_questions` (3 perguntas por lição)
- `lesson_id` (UUID da lição)
- `question_text` (texto da pergunta)
- `display_order` (`1`: compreensão da história; `2`: conexão com o dia a dia; `3`: atitude prática)

### Tabela `dev_prayers` (orações)
- `lesson_id` (UUID da lição)
- `role`:
  - Para Modo `kids` (`kids`, `teens`, `young_adults`): 3 falas (`'Pai'`, `'Filho'`, `'Juntos'`).
  - Para Modo `personal` (`adulto`): 1 fala (`'Individual'`).
- `text_content` (texto da oração)
- `display_order` (`1`, `2`, `3`)

---

## 3. Diretrizes Editoriais de Conteúdo

### 3.1. Tom de Voz por Público-Alvo
1. **Pessoal (Adulto)**: Tom maduro, reflexivo e focado em integridade, maturidade emocional, autogoverno, casamento, carreira e temor a Deus.
2. **Kids (4 a 8 anos)**: Lúdico, afetuoso, uso de analogias simples da natureza e animais, situações como guardar brinquedos, obediência alegre e respeito no lar.
3. **Teens (9 a 14 anos)**: Direto e realista, sem infantilização. Foco em pressões escolares, aceitação social, amizades, honestidade em provas e mundo digital.
4. **Young Adults (15 a 18 anos)**: Desafiador e inspirador. Foco em maturidade, integridade privada, preparação para o futuro, vocação e limites morais.

### 3.2. Vocabulário Proibido
- ❌ Expressões de autoajuda vazia e jargões terapêuticos explícitos (ex: *"TCC"*, *"distorção cognitiva"*, *"narrativa de proteção"*, *"identidade fragmentada"*, *"performance"*).
- ❌ Travessões soltos (`—`) no meio do texto corrido.

---

## 4. Matriz Pedagógica das 10 Noites

- **Noite 1**: Fundamento & Raiz Bíblica
- **Noite 2**: Aplicação Prática no Cotidiano
- **Noite 3**: Pressão dos Pares & Resistência Moral
- **Noite 4**: Erro, Arrependimento e Reparação
- **Noite 5**: Impacto na Família e no Lar
- **Noite 6**: Autogoverno & O Secreto (vencer impulsos na intimidade)
- **Noite 7**: Restituição, Sinceridade e Transparência
- **Noite 8**: Amor ao Próximo, Comunhão e Verdade nas Relações
- **Noite 9**: Liderança pelo Exemplo & Integridade Pública
- **Noite 10**: Firmeza Inabalável & Consciência Limpa até o Fim
