-- ==========================================================
-- SCHEMA PARA TRILHAS E HISTÓRIAS BÍBLICAS NO SUPABASE
-- ==========================================================

-- 1. TABELA DE TRILHAS BÍBLICAS
CREATE TABLE IF NOT EXISTS public.bible_trails (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  bg_color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE HISTÓRIAS E MOMENTOS BÍBLICOS
CREATE TABLE IF NOT EXISTS public.bible_stories (
  id TEXT PRIMARY KEY,
  trail_id TEXT NOT NULL REFERENCES public.bible_trails(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subtitle TEXT,
  biblical_reference TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '3 min',
  image_url TEXT NOT NULL,
  audio_url TEXT,
  audio_voice TEXT,
  is_free BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÍNDICES DE BUSCA E PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_bible_stories_trail ON public.bible_stories(trail_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_bible_stories_free ON public.bible_stories(is_free);

-- HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.bible_trails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_stories ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO (RLS)
DROP POLICY IF EXISTS "Permitir leitura pública das trilhas bíblicas" ON public.bible_trails;
CREATE POLICY "Permitir leitura pública das trilhas bíblicas"
  ON public.bible_trails FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir leitura pública das histórias bíblicas" ON public.bible_stories;
CREATE POLICY "Permitir leitura pública das histórias bíblicas"
  ON public.bible_stories FOR SELECT
  USING (true);

-- POLÍTICAS DE INSERÇÃO/ATUALIZAÇÃO
DROP POLICY IF EXISTS "Permitir inserção e atualização de trilhas bíblicas" ON public.bible_trails;
CREATE POLICY "Permitir inserção e atualização de trilhas bíblicas"
  ON public.bible_trails FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir inserção e atualização de histórias bíblicas" ON public.bible_stories;
CREATE POLICY "Permitir inserção e atualização de histórias bíblicas"
  ON public.bible_stories FOR ALL
  USING (true)
  WITH CHECK (true);
