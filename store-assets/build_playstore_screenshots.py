import os
import shutil
import subprocess
from PIL import Image

OUTPUT_DIR = r"c:\Users\rafae\Documents\FINHOUSE\SITES\devocional\store-assets"
TEMP_DIR = os.path.join(OUTPUT_DIR, "temp_html")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# Generated photo paths
IMG_DEVOTIONAL = r"C:\Users\rafae\.gemini\antigravity-ide\brain\fa7ac46d-7408-4334-b140-179d578f4dc1\person_morning_devotional_1786977613413.jpg"
IMG_CHARACTER = r"C:\Users\rafae\.gemini\antigravity-ide\brain\fa7ac46d-7408-4334-b140-179d578f4dc1\person_character_man_1786977709697.jpg"
IMG_ANXIETY = r"C:\Users\rafae\.gemini\antigravity-ide\brain\fa7ac46d-7408-4334-b140-179d578f4dc1\person_peace_anxiety_1786977808281.jpg"
IMG_MEDITATION = r"C:\Users\rafae\.gemini\antigravity-ide\brain\fa7ac46d-7408-4334-b140-179d578f4dc1\person_mindfulness_earphones_1786977910161.jpg"
IMG_FAMILY = r"C:\Users\rafae\.gemini\antigravity-ide\brain\fa7ac46d-7408-4334-b140-179d578f4dc1\family_devotional_moment_1786978016520.jpg"

# Copy images locally to store-assets
shutil.copy(IMG_DEVOTIONAL, os.path.join(OUTPUT_DIR, "human_devotional.jpg"))
shutil.copy(IMG_CHARACTER, os.path.join(OUTPUT_DIR, "human_character.jpg"))
shutil.copy(IMG_ANXIETY, os.path.join(OUTPUT_DIR, "human_anxiety.jpg"))
shutil.copy(IMG_MEDITATION, os.path.join(OUTPUT_DIR, "human_meditation.jpg"))
shutil.copy(IMG_FAMILY, os.path.join(OUTPUT_DIR, "human_family.jpg"))

# Crisp SVG Icons
SVG_BOOK = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>'
SVG_HEADPHONES = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>'
SVG_HEART = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'
SVG_SPARKLES = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>'
SVG_SHIELD = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>'
SVG_COMPASS = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>'
SVG_TARGET = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
SVG_TREE = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19v3"/><path d="M12 19a7 7 0 0 1-7-7c0-3.5 2-6 7-10 5 4 7 6.5 7 10a7 7 0 0 1-7 7Z"/></svg>'
SVG_WIND = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>'
SVG_FLAME = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>'
SVG_HANDSHAKE = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l6.6-6.6a2 2 0 0 0 0-2.8l-1.6-1.6a2 2 0 0 0-2.8 0L14.5 10"/><path d="m13 13-2-2a1 1 0 0 0-1.4 0L3 17.6a2 2 0 0 0 0 2.8l1.6 1.6a2 2 0 0 0 2.8 0l2.1-2.1"/><path d="m9.5 7.5 1.5 1.5"/></svg>'
SVG_LIGHTNING = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
SVG_BRAIN = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z"/></svg>'
SVG_SCROLL = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1z"/><path d="M4 17a2 2 0 0 1 2-2h12"/></svg>'
SVG_MUSIC = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
SVG_USERS = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
SVG_CALENDAR = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>'
SVG_OFFLINE = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M18 12h4"/><path d="m19.07 4.93-2.83 2.83"/></svg>'

def get_nav_bar(active_tab="inicio", accent_color="#F59E0B"):
    tabs = [
        ("inicio", "Início", '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'),
        ("trilhas", "Trilhas", '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'),
        ("meditacao", "Meditação", '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'),
        ("biblia", "Bíblia", '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>'),
        ("perfil", "Perfil", '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>')
    ]
    
    html = '<div class="app-tab-bar">'
    for tid, label, icon in tabs:
        if tid == active_tab:
            html += f'<div class="app-tab active" style="color: {accent_color};">{icon}<span>{label}</span></div>'
        else:
            html += f'<div class="app-tab">{icon}<span>{label}</span></div>'
    html += '</div>'
    return html

SCREENS = [
    {
        "id": "playstore_1_devocional_biblia",
        "alias": "screenshot-1-devocional",
        "bg_gradient": "radial-gradient(circle at 80% 20%, #451A03 0%, #1E1B4B 45%, #080911 100%)",
        "accent_glow": "rgba(245, 158, 11, 0.45)",
        "accent_color": "#FBBF24",
        "btn_bg": "#F59E0B",
        "highlight_style": "background: linear-gradient(135deg, #FFFBEB 0%, #FDE68A 35%, #F59E0B 80%, #D97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",
        "top_badge": "✨ MOMENTO DIÁRIO COM DEUS",
        "badge_bg": "rgba(245, 158, 11, 0.2)",
        "badge_border": "rgba(245, 158, 11, 0.6)",
        "badge_color": "#FDE68A",
        "title_main": "Histórias Bíblicas que",
        "title_highlight": "Transformam Sua Vida",
        "subtitle": "Devocionais diários, narração em áudio e orações guiadas para renovar a sua fé a cada manhã.",
        "human_img": "human_devotional.jpg",
        "human_name": "Mariana Ramos",
        "human_tag": "Leitora há 6 meses • Curitiba, PR",
        "human_quote": "“O Lecti transformou o meu café da manhã no momento de maior paz e conexão com Deus do meu dia.”",
        "pills": [
            {"svg": SVG_BOOK, "bg": "rgba(245, 158, 11, 0.2)", "color": "#FBBF24", "title": "Devocional Diário", "sub": "Narrativas bíblicas profundas e vivas"},
            {"svg": SVG_HEADPHONES, "bg": "rgba(99, 102, 241, 0.25)", "color": "#A5B4FC", "title": "Narração em Áudio", "sub": "Ouça no carro, na caminhada ou no lar"},
            {"svg": SVG_HEART, "bg": "rgba(16, 185, 129, 0.2)", "color": "#6EE7B7", "title": "Versículo & Oração", "sub": "Promessas eternas para o seu coração"}
        ],
        "bottom_banner": "🌿 “Lâmpada para os meus pés é a Tua Palavra e luz para o meu caminho.” — Sl 119:105",
        "phone_content": f"""
            <div class="app-card-gold">
                <div class="card-tag">DEVOCIONAL DO DIA • TRILHA CARÁTER</div>
                <div class="card-h1">Davi: Moldado no Silêncio do Campo</div>
                <div class="verse-quote">"O homem vê a aparência exterior, mas o Senhor olha para o coração." • <b>1 Samuel 16:7</b></div>
            </div>
            
            <div class="audio-player-glass">
                <div class="play-btn-glow">▶</div>
                <div class="player-text">
                    <div class="p-title">Ouvir Narração Guiada</div>
                    <div class="p-sub">Com trilha sonora serena • 04:20</div>
                </div>
                <div class="waves">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
            </div>

            <div class="story-excerpt-glass">
                <div class="story-tag">NARRATIVA BÍBLICA & REFLEXÃO</div>
                <div class="story-body">Antes de vencer gigantes perante multidões, Davi aprendeu a ser fiel a Deus no silêncio do pastoreio. É no oculto que o seu caráter é forjado dia após dia.</div>
            </div>

            <div class="prayer-highlight">
                <span class="hl-ico">🕊️</span>
                <div><b>Oração de Hoje:</b> "Senhor, forja em mim fidelidade e pureza de coração."</div>
            </div>

            <div class="challenge-highlight">
                <span class="hl-ico">💡</span>
                <div><b>Desafio Prático:</b> Faça o que é correto hoje mesmo quando ninguém estiver olhando.</div>
            </div>

            <div class="checklist-card">
                <div class="chk-item">✓ Leitura Bíblica</div>
                <div class="chk-item">✓ Áudio Guiado</div>
                <div class="chk-item">✓ Oração Feita</div>
            </div>
            {get_nav_bar("inicio", "#F59E0B")}
        """
    },
    {
        "id": "playstore_2_fe_carater",
        "alias": "screenshot-2-carater",
        "bg_gradient": "radial-gradient(circle at 80% 25%, #1E3A8A 0%, #0F172A 50%, #030712 100%)",
        "accent_glow": "rgba(59, 130, 246, 0.5)",
        "accent_color": "#60A5FA",
        "btn_bg": "#3B82F6",
        "highlight_style": "background: linear-gradient(135deg, #EFF6FF 0%, #93C5FD 35%, #60A5FA 70%, #2563EB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",
        "top_badge": "🛡️ PRINCÍPIOS & FORMAÇÃO MORAL",
        "badge_bg": "rgba(59, 130, 246, 0.2)",
        "badge_border": "rgba(59, 130, 246, 0.6)",
        "badge_color": "#BFDBFE",
        "title_main": "Forje um Caráter Sólido e uma",
        "title_highlight": "Fé Inabalável",
        "subtitle": "Trilhas temáticas que desenvolvem virtudes essenciais para guiar suas escolhas, sua carreira e seu lar.",
        "human_img": "human_character.jpg",
        "human_name": "Lucas Rodrigues",
        "human_tag": "Pai e Líder Comunitário • São Paulo, SP",
        "human_quote": "“Princípios bíblicos que me dão firmeza e sabedoria para liderar minha família com retidão todos os dias.”",
        "pills": [
            {"svg": SVG_SHIELD, "bg": "rgba(59, 130, 246, 0.25)", "color": "#93C5FD", "title": "8 Virtudes Cristãs", "sub": "Honestidade, coragem, paciência e autocontrole"},
            {"svg": SVG_COMPASS, "bg": "rgba(245, 158, 11, 0.2)", "color": "#FCD34D", "title": "Trilhas Temáticas", "sub": "Jornadas passo a passo de evolução espiritual"},
            {"svg": SVG_TREE, "bg": "rgba(168, 85, 247, 0.25)", "color": "#D8B4FE", "title": "Árvore da Fé", "sub": "Acompanhe suas conquistas e raízes na Palavra"}
        ],
        "bottom_banner": "💎 Princípios eternos para transformar seu propósito, seu lar e suas atitudes.",
        "phone_content": f"""
            <div class="trail-main-glass">
                <div class="trail-badge-blue">TRILHA ATIVA • 85% CONCLUÍDA</div>
                <div class="trail-title-row">
                    <div class="trail-h1">Construindo Caráter</div>
                    <div class="trail-pct-val">85%</div>
                </div>
                <div class="trail-sub-txt">Honestidade, Coragem, Responsabilidade</div>
                <div class="bar-track">
                    <div class="bar-fill-blue" style="width: 85%;"></div>
                </div>
            </div>

            <div class="trails-2col">
                <div class="mini-trail green">
                    <div class="mt-icon">🌱</div>
                    <div class="mt-title">Vida com Deus</div>
                    <div class="mt-sub">Fé, Oração & Gratidão</div>
                    <div class="mt-bar"><div style="width: 90%; background: #10B981;"></div></div>
                </div>
                <div class="mini-trail gold">
                    <div class="mt-icon">🧭</div>
                    <div class="mt-title">Sabedoria Prática</div>
                    <div class="mt-sub">Autocontrole & Escolhas</div>
                    <div class="mt-bar"><div style="width: 70%; background: #F59E0B;"></div></div>
                </div>
            </div>

            <div class="trail-item-glass">
                <div class="ti-badge">RELACIONAMENTOS & FAMÍLIA</div>
                <div class="ti-title">Perdão, Mansidão e Escuta Ativa</div>
                <div class="ti-sub">Como construir laços fortes, saudáveis e blindados no lar</div>
            </div>

            <div class="tree-progress-glass">
                <span class="tp-icon">🌳</span>
                <div><b>Árvore da Fé: Nível 4</b> • 24 Dias de Constância & Raízes Firmes</div>
            </div>

            <div class="virtues-chips-row">
                <span class="vchip">🛡️ Honestidade</span>
                <span class="vchip">⚔️ Coragem</span>
                <span class="vchip">🕊️ Paciência</span>
            </div>
            {get_nav_bar("trilhas", "#3B82F6")}
        """
    },
    {
        "id": "playstore_3_socorro_ansiedade",
        "alias": "screenshot-3-ansiedade",
        "bg_gradient": "radial-gradient(circle at 80% 25%, #064E3B 0%, #022C22 50%, #01140E 100%)",
        "accent_glow": "rgba(16, 185, 129, 0.5)",
        "accent_color": "#34D399",
        "btn_bg": "#10B981",
        "highlight_style": "background: linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 35%, #34D399 70%, #059669 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",
        "top_badge": "🕊️ SOS ESPIRITUAL & APOIO EMOCIONAL",
        "badge_bg": "rgba(16, 185, 129, 0.2)",
        "badge_border": "rgba(16, 185, 129, 0.6)",
        "badge_color": "#A7F3D0",
        "title_main": "Paz e Clareza para",
        "title_highlight": "Ansiedade, Medo e Incertezas",
        "subtitle": "Direcionamento bíblico imediato e orações para desacelerar o coração nos momentos de aflição.",
        "human_img": "human_anxiety.jpg",
        "human_name": "Beatriz Mendes",
        "human_tag": "Superou crises de ansiedade • Belo Horizonte, MG",
        "human_quote": "“Quando sinto o aperto no peito, abro o SOS. A oração guiada e os versículos me trazem alívio e paz real.”",
        "pills": [
            {"svg": SVG_WIND, "bg": "rgba(16, 185, 129, 0.25)", "color": "#6EE7B7", "title": "Alívio da Ansiedade", "sub": "Versículos e orações para acalmar a mente"},
            {"svg": SVG_FLAME, "bg": "rgba(245, 158, 11, 0.2)", "color": "#FCD34D", "title": "Vença o Medo", "sub": "Confiança renovada no cuidado de Deus"},
            {"svg": SVG_LIGHTNING, "bg": "rgba(239, 68, 68, 0.2)", "color": "#FCA5A5", "title": "Socorro em 1 Toque", "sub": "A resposta bíblica na hora que você mais precisa"}
        ],
        "bottom_banner": "🕊️ “Não andem ansiosos por coisa alguma... A paz de Deus guardará o seu coração.” — Fl 4:6-7",
        "phone_content": f"""
            <div class="screen-tag-emerald">AJUDA EM TEMPO REAL • SOS ESPIRITUAL</div>
            <div class="screen-title-sos">O que você está sentindo hoje?</div>

            <div class="chips-sos-grid">
                <div class="chip-sos active">🌊 Ansiedade Aguda</div>
                <div class="chip-sos">🕯️ Medo do Futuro</div>
                <div class="chip-sos">💔 Mágoa & Tristeza</div>
                <div class="chip-sos">🌪️ Sobrecarga Mental</div>
            </div>

            <div class="sos-card-glass">
                <div class="sos-pill-green">PROMESSA BÍBLICA IMEDIATA</div>
                <div class="sos-verse-txt">"Não andem ansiosos por coisa alguma; antes, as suas petições sejam conhecidas diante de Deus pela oração e súplica com ações de graças."</div>
                <div class="sos-ref-txt">Filipenses 4:6-7 • 1 Pedro 5:7</div>
                
                <div class="sos-btn-play">
                    <div class="sos-btn-circle">▶</div>
                    <div>
                        <div class="sos-btn-t1">Ouvir Oração de Entrega Guiada</div>
                        <div class="sos-btn-t2">03:30 • Respiração Consciente & Serenidade</div>
                    </div>
                </div>
            </div>

            <div class="calm-breath-bar">
                <span class="hl-ico">🌬️</span>
                <div><b>Respire Fundo:</b> Lance sobre Ele toda a sua ansiedade, porque Ele tem cuidado de você a cada instante.</div>
            </div>

            <div class="sos-action-bar">
                <span>🛡️ Salmo 91:1</span>
                <span>🕊️ Mateus 11:28</span>
                <span>🌿 Isaías 41:10</span>
            </div>
            {get_nav_bar("inicio", "#10B981")}
        """
    },
    {
        "id": "playstore_4_meditacao_lectio",
        "alias": "screenshot-4-meditacao",
        "bg_gradient": "radial-gradient(circle at 80% 25%, #4C1D95 0%, #2E1065 50%, #0D031A 100%)",
        "accent_glow": "rgba(168, 85, 247, 0.5)",
        "accent_color": "#C084FC",
        "btn_bg": "#A855F7",
        "highlight_style": "background: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 35%, #C084FC 70%, #9333EA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",
        "top_badge": "🧠 MINDFULNESS BÍBLICO & NEUROCIÊNCIA",
        "badge_bg": "rgba(168, 85, 247, 0.2)",
        "badge_border": "rgba(168, 85, 247, 0.6)",
        "badge_color": "#E9D5FF",
        "title_main": "Lectio Divina & Meditação para",
        "title_highlight": "Aquietar Sua Mente",
        "subtitle": "A união entre a tradição contemplativa cristã e técnicas validadas de respiração consciente (MBSR).",
        "human_img": "human_meditation.jpg",
        "human_name": "Juliana Pinheiro",
        "human_tag": "Pratica Lectio Divina diária • Porto Alegre, RS",
        "human_quote": "“Aquietar os ruídos da mente com a Palavra restaurou o meu sono e trouxe uma calma profunda para os meus dias.”",
        "pills": [
            {"svg": SVG_SCROLL, "bg": "rgba(168, 85, 247, 0.25)", "color": "#D8B4FE", "title": "Método Lectio Divina", "sub": "Leitura, Meditação, Oração e Contemplação"},
            {"svg": SVG_WIND, "bg": "rgba(59, 130, 246, 0.25)", "color": "#93C5FD", "title": "Ancoragem 4-4-6", "sub": "Estabilize o sistema nervoso e reduza o estresse"},
            {"svg": SVG_BRAIN, "bg": "rgba(16, 185, 129, 0.2)", "color": "#6EE7B7", "title": "Base Científica MBSR", "sub": "Protocolo RAIN para foco e clareza intencional"}
        ],
        "bottom_banner": "🌿 Aquiete o ruído do mundo e encontre refúgio genuíno na presença de Deus.",
        "phone_content": f"""
            <div class="screen-tag-purple">MEDITAÇÃO GUIADA • LECTIO DIVINA</div>
            <div class="screen-title-med">Presença, Clareza & Foco Espiritual</div>

            <div class="breath-sphere-box">
                <div class="sphere-outer-glow">
                    <div class="sphere-inner-circle">
                        <div class="b-label">INSPIRE A PAZ</div>
                        <div class="b-count">4s</div>
                        <div class="b-sub">Ancoragem Neural 4-4-6</div>
                    </div>
                </div>
            </div>

            <div class="mbsr-pill-tag">
                <span>🔬</span> Base Científica: Protocolo MBSR & RAIN Integrado
            </div>

            <div class="affirmation-glass">
                <div class="aff-tag">AFIRMAÇÃO & CONTEMPLAÇÃO</div>
                <div class="aff-txt">"Minha mente está serena, meu discernimento está afiado e o meu coração repousa plenamente em Deus."</div>
            </div>

            <div class="sound-selector-row">
                <span class="snd-pill active">🌧️ Chuva Serena</span>
                <span class="snd-pill">🎹 Piano Devocional</span>
                <span class="snd-pill">🌲 Floresta</span>
            </div>

            <div class="med-phases-row">
                <div class="m-dot done"></div>
                <div class="m-dot active"></div>
                <div class="m-dot"></div>
                <div class="m-dot"></div>
                <span>Fase 2 de 4: Escaneamento & Contemplação</span>
            </div>
            {get_nav_bar("meditacao", "#A855F7")}
        """
    },
    {
        "id": "playstore_5_familia_offline",
        "alias": "screenshot-5-familia",
        "bg_gradient": "radial-gradient(circle at 80% 25%, #7C2D12 0%, #431407 50%, #0F0402 100%)",
        "accent_glow": "rgba(249, 115, 22, 0.5)",
        "accent_color": "#FB923C",
        "btn_bg": "#EA580C",
        "highlight_style": "background: linear-gradient(135deg, #FFF7ED 0%, #FED7AA 35%, #FB923C 70%, #EA580C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;",
        "top_badge": "📅 CONSTÂNCIA, FAMÍLIA & MODO OFFLINE",
        "badge_bg": "rgba(249, 115, 22, 0.2)",
        "badge_border": "rgba(249, 115, 22, 0.6)",
        "badge_color": "#FED7AA",
        "title_main": "Construa Hábitos Diários e um",
        "title_highlight": "Legado de Fé no Lar",
        "subtitle": "Devocionais para toda a família, calendário de consistência e acesso 100% offline estilo Kindle.",
        "human_img": "human_family.jpg",
        "human_name": "Família Martins",
        "human_tag": "Devocional em Família • Campinas, SP",
        "human_quote": "“Nossa filha de 7 anos agora pede o momento bíblico todas as noites. Uniu a nossa casa com amor e fé.”",
        "pills": [
            {"svg": SVG_USERS, "bg": "rgba(249, 115, 22, 0.25)", "color": "#FDBA74", "title": "Devocional no Lar", "sub": "Diálogo bíblico entre pais e filhos"},
            {"svg": SVG_CALENDAR, "bg": "rgba(59, 130, 246, 0.25)", "color": "#93C5FD", "title": "Sequência de Hábitos", "sub": "Constância diária inquebrável com Deus"},
            {"svg": SVG_OFFLINE, "bg": "rgba(16, 185, 129, 0.2)", "color": "#6EE7B7", "title": "100% Offline (Kindle)", "sub": "Leia em qualquer lugar, mesmo sem sinal"}
        ],
        "bottom_banner": "❤️ Mais que um app: um compromisso diário com a sua fé e as próximas gerações.",
        "phone_content": f"""
            <div class="screen-tag-orange">DISCIPLINA & FAMÍLIA</div>
            <div class="screen-title-fam">Meu Progresso & Constância com Deus</div>

            <div class="streak-glass-box">
                <div class="streak-head">
                    <div>
                        <div class="streak-fire-val">🔥 28 Dias</div>
                        <div class="streak-fire-sub">Sequência Diária Ininterrupta</div>
                    </div>
                    <div class="offline-pill-green">📴 OFFLINE ATIVO</div>
                </div>
                <div class="week-days-row">
                    <div class="w-day done"><span>S</span>✓</div>
                    <div class="w-day done"><span>T</span>✓</div>
                    <div class="w-day done"><span>Q</span>✓</div>
                    <div class="w-day done"><span>Q</span>✓</div>
                    <div class="w-day done"><span>S</span>✓</div>
                    <div class="w-day done"><span>S</span>✓</div>
                    <div class="w-day today"><span>D</span>⭐</div>
                </div>
            </div>

            <div class="family-dialogue-glass">
                <div class="fam-tag-row">DEVOCIONAL EM FAMÍLIA • DIÁLOGO PRÁTICO</div>
                <div class="dialogue-item">
                    <b style="color:#FB923C;">Pai:</b> "O que aprendemos hoje sobre sermos fiéis no pouco?"
                </div>
                <div class="dialogue-item">
                    <b style="color:#60A5FA;">Filho:</b> "Que Deus cuida das nossas atitudes em casa e na escola."
                </div>
            </div>

            <div class="offline-ready-bar">
                <span class="hl-ico">📥</span>
                <div><b>365 Lições Baixadas:</b> Leitura estilo Kindle disponível sem sinal de internet.</div>
            </div>

            <div class="journal-mini-card">
                <span>✍️</span> <b>Diário de Gratidão:</b> "Agradecendo pela paz no lar e direcionamento na semana."
            </div>
            {get_nav_bar("inicio", "#EA580C")}
        """
    }
]

def generate_wow_html(s):
    pills_html = ""
    for p in s["pills"]:
        pills_html += f"""
        <div class="glow-pill-card">
            <div class="pill-icon-circle" style="background: {p['bg']}; color: {p['color']}; border-color: {p['color']};">
                {p['svg']}
            </div>
            <div class="pill-text-col">
                <div class="pill-title">{p['title']}</div>
                <div class="pill-sub">{p['sub']}</div>
            </div>
        </div>
        """

    img_path = os.path.abspath(os.path.join(OUTPUT_DIR, s['human_img'])).replace("\\", "/")

    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>{s['id']}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@500;600;700;800;900&display=swap');

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}}

body {{
  width: 1080px;
  height: 1920px;
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: {s['bg_gradient']};
  color: #FFFFFF;
  position: relative;
}}

/* Ambient Glow Orbs */
.orb-1 {{
  position: absolute;
  top: -100px;
  right: -100px;
  width: 950px;
  height: 950px;
  border-radius: 50%;
  background: {s['accent_glow']};
  filter: blur(160px);
  pointer-events: none;
  z-index: 1;
}}

.orb-2 {{
  position: absolute;
  bottom: 50px;
  left: -100px;
  width: 850px;
  height: 850px;
  border-radius: 50%;
  background: {s['accent_glow']};
  filter: blur(160px);
  opacity: 0.85;
  pointer-events: none;
  z-index: 1;
}}

/* Geometric mesh / stars */
.stars-bg {{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(255,255,255,0.2) 1.5px, transparent 1.5px),
    radial-gradient(circle at 85% 35%, rgba(255,255,255,0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 50% 80%, rgba(255,255,255,0.14) 1.5px, transparent 1.5px);
  background-size: 150px 150px;
  pointer-events: none;
  z-index: 2;
}}

/* Container */
.container {{
  position: relative;
  z-index: 10;
  width: 1080px;
  height: 1920px;
  padding: 50px 45px 35px 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}}

/* Header Area */
.header-area {{
  max-width: 990px;
}}

.top-badge {{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 22px;
  border-radius: 100px;
  background: {s['badge_bg']};
  border: 1.5px solid {s['badge_border']};
  color: {s['badge_color']};
  font-family: 'Outfit', sans-serif;
  font-size: 14.5px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 14px;
  backdrop-filter: blur(16px);
  box-shadow: 0 0 30px {s['accent_glow']};
}}

.hero-title {{
  font-family: 'Outfit', sans-serif;
  font-size: 56px;
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: #FFFFFF;
  margin-bottom: 10px;
}}

.hero-title span.glow-highlight {{
  {s['highlight_style']}
  display: block;
}}

.hero-sub {{
  font-size: 22px;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  max-width: 980px;
  margin-bottom: 16px;
}}

/* Main Stage: Left Human + Pills | Right Phone */
.main-stage {{
  display: grid;
  grid-template-columns: 465px 505px;
  gap: 20px;
  align-items: center;
  flex: 1;
  position: relative;
}}

/* Left Column: Human Story Card + Bullets */
.left-pills-col {{
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 20;
}}

/* Big Real Human Visual Card */
.big-human-card {{
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 28px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 30px {s['accent_glow']};
}}

.big-human-photo {{
  width: 100%;
  height: 100%;
  object-fit: cover;
}}

.big-human-overlay {{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(8, 9, 17, 0.95) 0%, rgba(8, 9, 17, 0.75) 65%, transparent 100%);
  padding: 20px 18px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}}

.bho-header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
}}

.bho-name {{
  font-size: 20px;
  font-weight: 900;
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif;
}}

.bho-stars {{
  color: #FBBF24;
  font-size: 15px;
  letter-spacing: 2px;
}}

.bho-tag {{
  font-size: 12px;
  color: {s['accent_color']};
  font-weight: 700;
}}

.bho-quote {{
  font-size: 13.5px;
  line-height: 1.4;
  color: #F1F5F9;
  font-style: italic;
}}

.glow-pill-card {{
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 18px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.3);
}}

.pill-icon-circle {{
  width: 46px;
  height: 46px;
  min-width: 46px;
  border-radius: 14px;
  border: 1.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px {s['accent_glow']};
}}

.pill-text-col {{
  flex: 1;
}}

.pill-title {{
  font-size: 17.5px;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 2px;
  font-family: 'Outfit', sans-serif;
}}

.pill-sub {{
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.3;
}}

/* Right Phone Area */
.phone-stage {{
  position: relative;
  display: flex;
  justify-content: center;
  height: 1040px;
}}

.phone-mockup {{
  width: 485px;
  height: 1040px;
  background: #000000;
  border-radius: 56px;
  padding: 12px;
  box-shadow: 
    0 40px 100px -10px rgba(0, 0, 0, 0.85),
    0 0 60px {s['accent_glow']},
    0 0 0 2px rgba(255, 255, 255, 0.28) inset;
  position: relative;
  display: flex;
  flex-direction: column;
}}

.dynamic-island {{
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 125px;
  height: 28px;
  background: #000;
  border-radius: 20px;
  z-index: 100;
}}

.phone-screen {{
  width: 100%;
  height: 100%;
  background: #0B1120;
  border-radius: 46px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 56px 16px 0px 16px;
  color: #F8FAFC;
}}

.status-bar {{
  position: absolute;
  top: 16px;
  left: 32px;
  right: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #FFFFFF;
  z-index: 90;
}}

/* Inside Phone App UI Styles - High Contrast Dark Premium */
.app-card-gold {{
  background: rgba(245, 158, 11, 0.16);
  border: 1.5px solid rgba(245, 158, 11, 0.45);
  border-radius: 18px;
  padding: 14px 16px;
}}

.card-tag {{
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.1em;
  color: #FBBF24;
  margin-bottom: 4px;
}}

.card-h1 {{
  font-size: 17px;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 5px;
}}

.verse-quote {{
  font-size: 12.5px;
  line-height: 1.45;
  color: #E2E8F0;
  font-style: italic;
}}

.audio-player-glass {{
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}}

.play-btn-glow {{
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: {s['btn_bg']};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 900;
  box-shadow: 0 0 20px {s['accent_glow']};
}}

.player-text {{
  flex: 1;
}}

.p-title {{
  font-size: 13.5px;
  font-weight: 800;
  color: #FFFFFF;
}}

.p-sub {{
  font-size: 10.5px;
  color: #94A3B8;
}}

.waves {{
  display: flex;
  align-items: center;
  gap: 3.5px;
  height: 20px;
}}

.waves span {{
  width: 3.5px;
  background: {s['accent_color']};
  border-radius: 3px;
}}

.waves span:nth-child(1) {{ height: 9px; }}
.waves span:nth-child(2) {{ height: 20px; }}
.waves span:nth-child(3) {{ height: 13px; }}
.waves span:nth-child(4) {{ height: 22px; }}
.waves span:nth-child(5) {{ height: 10px; }}

.story-excerpt-glass {{
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 12px 14px;
}}

.story-tag {{
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #94A3B8;
  margin-bottom: 3px;
}}

.story-body {{
  font-size: 12px;
  line-height: 1.45;
  color: #CBD5E1;
}}

.prayer-highlight {{
  background: rgba(16, 185, 129, 0.16);
  border: 1px solid rgba(16, 185, 129, 0.45);
  border-radius: 14px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11.5px;
  color: #D1FAE5;
}}

.challenge-highlight {{
  background: rgba(245, 158, 11, 0.14);
  border: 1px solid rgba(245, 158, 11, 0.4);
  border-radius: 14px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11.5px;
  color: #FDE68A;
}}

.hl-ico {{ font-size: 17px; }}

.checklist-card {{
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 9px;
  font-size: 11px;
}}

.chk-item {{ color: #34D399; font-weight: 700; }}

/* Trails Dark */
.trail-main-glass {{
  background: rgba(59, 130, 246, 0.18);
  border: 1.5px solid rgba(59, 130, 246, 0.5);
  border-radius: 18px;
  padding: 14px 16px;
}}

.trail-badge-blue {{
  display: inline-block;
  font-size: 9.5px;
  font-weight: 850;
  padding: 3px 8px;
  border-radius: 100px;
  background: #2563EB;
  color: #FFFFFF;
  margin-bottom: 4px;
}}

.trail-title-row {{
  display: flex;
  justify-content: space-between;
  align-items: center;
}}

.trail-h1 {{
  font-size: 17px;
  font-weight: 800;
  color: #FFFFFF;
}}

.trail-pct-val {{
  font-size: 17px;
  font-weight: 900;
  color: #60A5FA;
}}

.trail-sub-txt {{
  font-size: 11.5px;
  color: #94A3B8;
  margin-top: 2px;
  margin-bottom: 6px;
}}

.bar-track {{
  width: 100%;
  height: 7px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  overflow: hidden;
}}

.bar-fill-blue {{
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  border-radius: 10px;
}}

.trails-2col {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}}

.mini-trail {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 15px;
  padding: 11px 12px;
}}

.mini-trail.green {{ border-left: 4px solid #10B981; }}
.mini-trail.gold {{ border-left: 4px solid #F59E0B; }}

.mt-icon {{ font-size: 16px; margin-bottom: 3px; }}
.mt-title {{ font-size: 13px; font-weight: 800; color: #FFFFFF; }}
.mt-sub {{ font-size: 10.5px; color: #94A3B8; margin-bottom: 5px; }}

.mt-bar {{
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  overflow: hidden;
}}

.mt-bar div {{ height: 100%; border-radius: 6px; }}

.trail-item-glass {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 12px 14px;
}}

.ti-badge {{
  font-size: 9px;
  font-weight: 800;
  color: #F87171;
  letter-spacing: 0.08em;
  margin-bottom: 3px;
}}

.ti-title {{
  font-size: 14px;
  font-weight: 800;
  color: #FFFFFF;
}}

.ti-sub {{
  font-size: 11px;
  color: #94A3B8;
}}

.tree-progress-glass {{
  background: rgba(16, 185, 129, 0.16);
  border: 1px solid rgba(16, 185, 129, 0.45);
  border-radius: 14px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11.5px;
  color: #A7F3D0;
}}

.virtues-chips-row {{
  display: flex;
  justify-content: space-between;
  gap: 6px;
}}

.vchip {{
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 11px;
  color: #E2E8F0;
  font-weight: 700;
}}

/* SOS Screen */
.screen-tag-emerald {{
  font-size: 10px;
  font-weight: 850;
  color: #34D399;
  letter-spacing: 0.1em;
}}

.screen-title-sos {{
  font-size: 18px;
  font-weight: 800;
  color: #FFFFFF;
}}

.chips-sos-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}}

.chip-sos {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 13px;
  padding: 9px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #E2E8F0;
}}

.chip-sos.active {{
  background: rgba(16, 185, 129, 0.25);
  border: 1.5px solid #10B981;
  color: #A7F3D0;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.35);
}}

.sos-card-glass {{
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 13px 15px;
}}

.sos-pill-green {{
  font-size: 9px;
  font-weight: 800;
  color: #34D399;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}}

.sos-verse-txt {{
  font-size: 12px;
  line-height: 1.45;
  color: #FFFFFF;
  font-style: italic;
  margin-bottom: 3px;
}}

.sos-ref-txt {{
  font-size: 10.5px;
  color: #94A3B8;
  margin-bottom: 9px;
}}

.sos-btn-play {{
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.45);
  border-radius: 12px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}}

.sos-btn-circle {{
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: #10B981;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 900;
}}

.sos-btn-t1 {{ font-size: 12.5px; font-weight: 800; color: #FFFFFF; }}
.sos-btn-t2 {{ font-size: 10px; color: #A7F3D0; }}

.calm-breath-bar {{
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 14px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: #A7F3D0;
}}

.sos-action-bar {{
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 8px;
  font-size: 11px;
  color: #A7F3D0;
  font-weight: 700;
}}

/* Meditation */
.screen-tag-purple {{
  font-size: 10px;
  font-weight: 850;
  color: #C084FC;
  letter-spacing: 0.1em;
}}

.screen-title-med {{
  font-size: 18px;
  font-weight: 800;
  color: #FFFFFF;
}}

.breath-sphere-box {{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
}}

.sphere-outer-glow {{
  width: 165px;
  height: 165px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(168, 85, 247, 0.05) 70%);
  border: 3px solid #A855F7;
  box-shadow: 0 0 45px rgba(168, 85, 247, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}}

.sphere-inner-circle {{
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}}

.b-label {{ font-size: 9.5px; font-weight: 800; color: #C084FC; letter-spacing: 0.1em; }}
.b-count {{ font-size: 28px; font-weight: 900; color: #FFFFFF; font-family: 'Outfit', sans-serif; }}
.b-sub {{ font-size: 10px; color: #94A3B8; }}

.mbsr-pill-tag {{
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.5);
  border-radius: 100px;
  padding: 6px 14px;
  font-size: 11.5px;
  font-weight: 700;
  color: #E9D5FF;
  text-align: center;
}}

.affirmation-glass {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 15px;
  padding: 11px 13px;
}}

.aff-tag {{ font-size: 9px; font-weight: 800; color: #C084FC; margin-bottom: 3px; }}
.aff-txt {{ font-size: 12px; font-style: italic; line-height: 1.4; color: #E2E8F0; }}

.sound-selector-row {{
  display: flex;
  justify-content: space-between;
  gap: 6px;
}}

.snd-pill {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 10.5px;
  color: #CBD5E1;
}}

.snd-pill.active {{
  background: rgba(168, 85, 247, 0.25);
  border-color: #A855F7;
  color: #E9D5FF;
  font-weight: 700;
}}

.med-phases-row {{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  color: #94A3B8;
}}

.m-dot {{ width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.25); }}
.m-dot.done {{ background: #10B981; }}
.m-dot.active {{ background: #A855F7; width: 16px; border-radius: 10px; }}

/* Family & Offline */
.screen-tag-orange {{
  font-size: 10px;
  font-weight: 850;
  color: #FB923C;
  letter-spacing: 0.1em;
}}

.screen-title-fam {{
  font-size: 18px;
  font-weight: 800;
  color: #FFFFFF;
}}

.streak-glass-box {{
  background: rgba(249, 115, 22, 0.18);
  border: 1.5px solid rgba(249, 115, 22, 0.5);
  border-radius: 18px;
  padding: 13px 15px;
}}

.streak-head {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}}

.streak-fire-val {{ font-size: 17px; font-weight: 900; color: #FB923C; }}
.streak-fire-sub {{ font-size: 11px; color: #CBD5E1; }}

.offline-pill-green {{
  font-size: 9px;
  font-weight: 800;
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.3);
  border: 1px solid #10B981;
  color: #A7F3D0;
}}

.week-days-row {{
  display: flex;
  justify-content: space-between;
}}

.w-day {{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px;
  border-radius: 9px;
  width: 36px;
  background: rgba(255, 255, 255, 0.08);
}}

.w-day span {{ font-size: 9px; color: #94A3B8; margin-bottom: 2px; }}
.w-day.done {{ background: rgba(249, 115, 22, 0.25); color: #FB923C; }}
.w-day.today {{ background: #F97316; color: #FFFFFF; }}
.w-day.today span {{ color: #FFEDD5; }}

.family-dialogue-glass {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 12px 14px;
}}

.fam-tag-row {{
  font-size: 9.5px;
  font-weight: 800;
  color: #FB923C;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}}

.dialogue-item {{
  font-size: 12px;
  line-height: 1.45;
  color: #E2E8F0;
  background: rgba(0, 0, 0, 0.28);
  padding: 6px 9px;
  border-radius: 8px;
  margin-bottom: 4px;
}}

.offline-ready-bar {{
  background: rgba(16, 185, 129, 0.16);
  border: 1px solid rgba(16, 185, 129, 0.45);
  border-radius: 14px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: #A7F3D0;
}}

.journal-mini-card {{
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 11px;
  color: #CBD5E1;
}}

/* Bottom Nav Bar in Phone */
.app-tab-bar {{
  background: rgba(15, 23, 42, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 12px 16px 20px 16px;
  margin-left: -16px;
  margin-right: -16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}}

.app-tab {{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #64748B;
  font-size: 11px;
  font-weight: 600;
}}

.app-tab.active {{
  font-weight: 800;
}}

/* Bottom Banner */
.bottom-banner-wow {{
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 18px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 15px 45px rgba(0,0,0,0.5);
}}

.bottom-banner-text {{
  font-size: 19px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.35;
  max-width: 740px;
}}

.bottom-banner-btn {{
  padding: 14px 32px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 900;
  color: #000000;
  background: {s['btn_bg']};
  white-space: nowrap;
  box-shadow: 0 0 35px {s['accent_glow']};
}}
</style>
</head>
<body>

<div class="orb-1"></div>
<div class="orb-2"></div>
<div class="stars-bg"></div>

<div class="container">
  <!-- Header Area -->
  <div class="header-area">
    <div class="top-badge">{s['top_badge']}</div>
    <h1 class="hero-title">
      {s['title_main']}
      <span class="glow-highlight">{s['title_highlight']}</span>
    </h1>
    <p class="hero-sub">{s['subtitle']}</p>
  </div>

  <!-- Main Stage: Left Human Story + Right Phone -->
  <div class="main-stage">
    <div class="left-pills-col">
      <!-- Big Human Visual Hero Card -->
      <div class="big-human-card">
        <img class="big-human-photo" src="{img_path}" alt="{s['human_name']}">
        <div class="big-human-overlay">
          <div class="bho-header">
            <div class="bho-name">{s['human_name']}</div>
            <div class="bho-stars">★★★★★</div>
          </div>
          <div class="bho-tag">{s['human_tag']}</div>
          <div class="bho-quote">{s['human_quote']}</div>
        </div>
      </div>

      <!-- Feature Badges -->
      {pills_html}
    </div>

    <div class="phone-stage">
      <!-- Phone Device -->
      <div class="phone-mockup">
        <div class="dynamic-island"></div>
        <div class="phone-screen">
          <div class="status-bar">
            <span>9:41</span>
            <span>5G 🔋</span>
          </div>
          {s['phone_content']}
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Banner -->
  <div class="bottom-banner-wow">
    <div class="bottom-banner-text">{s['bottom_banner']}</div>
    <div class="bottom-banner-btn">Experimente Grátis</div>
  </div>
</div>

</body>
</html>
"""
    return html

def render_screenshots():
    print(f"Using Chrome: {CHROME_PATH}")
    for idx, screen in enumerate(SCREENS, 1):
        html_content = generate_wow_html(screen)
        html_file = os.path.join(TEMP_DIR, f"{screen['id']}.html")
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        
        target_png = os.path.join(OUTPUT_DIR, f"{screen['id']}.png")
        alias_png = os.path.join(OUTPUT_DIR, f"{screen['alias']}.png")
        
        abs_html = os.path.abspath(html_file).replace("\\", "/")
        
        cmd = [
            CHROME_PATH,
            "--headless=new",
            "--disable-gpu",
            "--window-size=1080,1920",
            "--force-device-scale-factor=1",
            "--hide-scrollbars",
            f"--screenshot={target_png}",
            f"file:///{abs_html}"
        ]
        
        print(f"Rendering Big Human Hero WOW [{idx}/5] {screen['id']} ...")
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0 and os.path.exists(target_png):
            im = Image.open(target_png)
            im.save(alias_png)
            print(f" -> OK: {target_png} ({im.size}) and alias {alias_png}")
        else:
            print(f" -> ERROR rendering {screen['id']}: {res.stderr}")

if __name__ == "__main__":
    render_screenshots()
