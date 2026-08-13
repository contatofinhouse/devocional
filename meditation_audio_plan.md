# 🧘 Plano de Implementação: Trilhas de Meditação Diária & Áudio Guiado (Lecti)

> **Baseado nas Evidências Científicas de Benefícios da Meditação, Mindfulness e Oração Guiada**
> Ref: [Information is Beautiful - What is Meditation/Mindfulness Good for?](https://informationisbeautiful.net/visualizations/what-is-meditation-mindfulness-good-for/) & Estudos Neurocientíficos (Harvard, NIH, PNAS)

---

## 📌 Visão Geral do Projeto

Expandir o aplicativo **Lecti** com um ecossistema completo de **Áudios Guiados, Vídeos de Ambiente em Loop e Trilhas de Meditação Diária Espiritual/Devocional**. 

A proposta une a **tradição de reflexão bíblica e oração** aos **benefícios neurocientíficos comprovados** da meditação (redução da atividade da amígdala, fortalecimento do córtex pré-frontal, diminuição do cortisol, ativação do nervo vago e estimulação de ondas alfa/teta).

---

## 🎯 Pilares da Experiência (Inspiração Calm + Headspace)

```mermaid
graph TD
    A[Ecossistema Lecti Audio & Visual] --> B[Player de Áudio Nativo & Web]
    A --> C[Trilhas Temáticas Científicas]
    A --> D[Mixer de Sons BGM + Vídeos em Loop]
    A --> E[Guia Animado de Respiração Ritmar]

    C --> C1[Ansiedade & Calma no Caos]
    C --> C2[Foco & Clareza Mental]
    C --> C3[Sono Repousante & Paz Noturna]
    C --> C4[Gratidão & Conexão Familiar]
    C --> C5[Socorro Rápido 2-3 min]

    D --> D1[Chuva na Janela / Chuva de Verão]
    D --> D2[Lareira / Piano Devocional]
    D --> D3[Sons de Floresta & Vento]
    D --> D4[Frequência 432Hz / Solfeggio]

    E --> E1[Inspirar 4s - Reter 7s - Exspirar 8s]
    E --> E2[Circulo Expansivo / Pulsar Suave]
```

---

## 📚 Categorias & Trilhas Inspiradas nas Evidências Científicas

Com base nos dados de eficácia clínica (*Information is Beautiful* e revisões médicas):

| Eixo / Categoria | Foco Científico & Emocional | Estrutura da Prática (Voz + BGM + Vídeo) | Duração Recomendada |
| :--- | :--- | :--- | :--- |
| **1. Calma na Tempestade** | Redução de Cortisol & Desativação da Amígdala | Respiração Guiada + Versículo de Paz (Salmo 46:10) + Tom Suave | 3 min / 5 min / 10 min |
| **2. Foco & Renovação Mental** | Ativação do Córtex Pré-Frontal & Concentração | Ancoragem de Pensamentos + Meditação no Proverbo do Dia + Frequência 432Hz | 5 min / 8 min |
| **3. Sono Repousante & Desligar** | Indução a Ondas Teta & Relaxamento Muscular | Body Scan (Escaneamento Corporal) + Oração da Noite + Vídeo Loop Lareira/Chuva | 10 min / 15 min |
| **4. Coração Grato & Compaixão** | Estímulo à Empatia & Saúde Cardiovascular | Meditação da Gratidão Diária + Reflexão em Família + Piano Calmo | 5 min |
| **5. Socorro Rápido (Crises)** | Ativação Parassimpática Imediata via Nervo Vago | Respiração Quadrada (Box Breathing) + Declaração de Fé | 2 min / 3 min |

---

## 🛠️ Especificação de Funcionalidades & UX/UI Visuais

### 1. Player de Áudio Flutuante (Mini-Player & Fullscreen)
* **Mini-Player Persistente**: Barra inferior elegante que permite navegar pelo app enquanto o áudio continua tocando em background.
* **Modo Imersivo (Fullscreen estilo Calm)**:
  * **Vídeo em Loop no Fundo (Background MP4/WebM)**: Imagens relaxantes em altíssima qualidade (chuva caindo, chamas da lareira, lago ao entardecer, céu estrelado).
  * Controles: Play/Pause, Avançar/Voltar 15s, Timer de Desligamento (Sleep Timer de 5min a 60min).

### 2. Guia de Respiração Visual Animado (Estilo Headspace)
* Um círculo expansivo e luminoso na tela que orienta o ritmo da respiração:
  * **Inspire (4s)**: Círculo se expande suavemente.
  * **Pausa / Retenção (7s)**: Círculo pulsa levemente.
  * **Expire (8s)**: Círculo diminui de tamanho até voltar ao repouso.
* **Efeito Neurocientífico**: Ancoragem visual para diminuir a ruminação mental (Default Mode Network - DMN).

### 3. Mixer de Ambiente de Fundo (Dual-Track Audio)
* Permite ao usuário ajustar o volume da **Voz Guiada** e do **Som de Fundo (BGM)** de forma independente.
* **Opções de Som de Fundo**:
  * 🌧️ Chuva na Janela
  * 🎹 Piano Devocional Suave
  * 🕊️ Frequência Suave de Paz (432Hz)
  * 🌿 Ventos da Montanha / Floresta
  * 🌊 Ondas do Mar

---

## 🔬 Referências de Estudos Científicos & Neurociência

Aqui estão as pesquisas clínicas e acadêmicas que embasam cada componente deste plano:

### 1. Alterações Estruturais no Cérebro (Amígdala & Córtex Pré-Frontal)
* **Estudo**: *Mindfulness practice leads to increases in regional brain gray matter density* (2011).
* **Autores / Instituição**: Sara W. Lazar et al. — **Harvard Medical School / Massachusetts General Hospital**.
* **Publicação**: *Psychiatry Research: Neuroimaging*, 191(1), 36-43.
* **Descoberta**: 8 semanas de práticas diárias de meditação reduziram o volume de matéria cinzenta na **amígdala** (centro de estresse, medo e pânico) e aumentaram a espessura do **córtex pré-frontal** (foco, tomada de decisão e regulação emocional).

### 2. Eficácia em Redução de Ansiedade, Estresse e Depressão
* **Estudo**: *Meditation Programs for Psychological Stress and Well-being: A Systematic Review and Meta-analysis* (2014).
* **Autores / Instituição**: Madhav Goyal et al. — **Johns Hopkins University**.
* **Publicação**: *JAMA Internal Medicine*, 174(3), 357-368.
* **Descoberta**: Meta-análise com 3.515 participantes comprovou que programas de meditação guiada de 8 semanas reduzem significativamente sintomas de ansiedade, estresse e depressão com nível de evidência moderado a alto.

### 3. Respiração Guiada (4-7-8 / Box Breathing) & Ativação do Nervo Vago
* **Estudo**: *Physiological effects of slow breathing exercises and their significance in in-depth meditation* (2006 / 2018).
* **Autores / Instituição**: Ravinder Jerath et al. / Marc A. Russo et al.
* **Publicação**: *Medical Hypotheses* & *Frontiers in Human Neuroscience*.
* **Descoberta**: Respirar ritmadamente abaixo de 6 respirações por minuto ativa o **sistema nervoso parassimpático** via nervo vago, aumentando a variabilidade da frequência cardíaca (**HRV**) e reduzindo instantaneamente os níveis de cortisol no sangue.

### 4. Benefícios dos Sons da Natureza (Dual-Track BGM)
* **Estudo**: *A synthesis of health benefits of natural sounds and their distribution in national parks* (2021).
* **Autores / Instituição**: Rachel T. Buxton et al. — **Carleton University & National Park Service**.
* **Publicação**: *PNAS (Proceedings of the National Academy of Sciences)*, 118(14).
* **Descoberta**: Sons naturais (água/chuva, vento e pássaros) diminuem o estresse, diminuem a frequência cardíaca e a pressão arterial, além de acelerar a recuperação após episódios de estresse mental.

### 5. Ancoragem Visual & Redução da Rede Neural de Modo Padrão (DMN)
* **Estudo**: *Altered Traits: Science Reveals How Meditation Changes Your Mind, Brain, and Body* (2017).
* **Autores**: Daniel Goleman (Harvard) & Richard J. Davidson (University of Wisconsin-Madison).
* **Descoberta**: Guias visuais animados (como o círculo de respiração do Headspace) reduzem a hiperatividade da *Default Mode Network* (DMN), que é a rede neural responsável por preocupações excessivas sobre o passado/futuro e distração mental.

---

## 🏗️ Arquitetura Técnica & Banco de Dados

```sql
-- Tabela de Trilhas de Áudio e Vídeo
CREATE TABLE public.audio_meditations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'ansiedade', 'foco', 'sono', 'gratidao', 'crise'
  audio_url TEXT NOT NULL,
  video_bg_url TEXT, -- URL do vídeo em loop (MP4/WebM)
  bgm_default_url TEXT,
  duration_seconds INT NOT NULL,
  target_audience TEXT DEFAULT 'all', -- 'adult', 'kids', 'family'
  biblical_reference TEXT,
  scientific_benefit TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Histórico de Escuta do Usuário
CREATE TABLE public.user_audio_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  audio_id UUID REFERENCES public.audio_meditations(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  listened_seconds INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 📋 Checklist de Execução Futura

- [ ] **Fase 1: Protótipo de UX & Componente Player**
  - [ ] Criar `AudioPlayerModal.tsx` com suporte a vídeo em loop no fundo (MP4/WebM)
  - [ ] Implementar o Guia Visual Animado de Respiração 4-7-8 (Breathing Circle em SVG/CSS)

- [ ] **Fase 2: Motor de Áudio & Dual-Channel**
  - [ ] Integrar Howler.js ou Web Audio API para reprodução de voz + BGM
  - [ ] Adicionar suporte ao Capacitor Background Audio para tocar com tela apagada

- [ ] **Fase 3: Conteúdo de Meditações Guiadas & Vídeos**
  - [ ] Gravar/Gerar áudios para as 5 categorias base (Ansiedade, Sono, Foco, Gratidão, Crises)
  - [ ] Selecionar/Otimizar 5 vídeos curtos em loop para plano de fundo (chuva, lareira, lago, estrelas)
  - [ ] Mapear evidências científicas e versículos para o card de informação da meditação

- [ ] **Fase 4: Estatísticas de Bem-Estar & Hábitos**
  - [ ] Adicionar contagem de "Minutos Meditados" no diário/perfil do usuário
  - [ ] Integrar conquistas/medalhas de consistência (ex: "7 noites de paz")
