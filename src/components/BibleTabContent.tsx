import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { BIBLE_TRAILS, type BibleStoryItem } from '../data/mockBibleTrails';
import { TrailThemeCard } from './TrailThemeCard';

interface BibleTabContentProps {
  isPremium: boolean;
  onOpenFullBible: () => void;
  onSelectStory: (story: BibleStoryItem) => void;
  onSelectKidsStory: (story: BibleStoryItem) => void;
  onOpenPaywall: () => void;
  dragScrollHandlers?: any;
}

export const BibleTabContent: React.FC<BibleTabContentProps> = ({
  isPremium,
  onOpenFullBible,
  onSelectStory,
  onSelectKidsStory,
  onOpenPaywall,
  dragScrollHandlers
}) => {
  const handleItemClick = (story: BibleStoryItem) => {
    if (!isPremium && !story.isFree) {
      onOpenPaywall();
      return;
    }

    if (story.trailId === 'kids') {
      onSelectKidsStory(story);
    } else {
      onSelectStory(story);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingBottom: 24 }}>
      {/* Header */}
      <div style={{ marginTop: 4 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <BookOpen size={24} style={{ color: 'var(--primary)' }} />
          <span>Bíblia Sagrada & Histórias</span>
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-second)', marginTop: 4, marginBottom: 0 }}>
          Explore passagens para seus momentos, narrativas bíblicas e histórias ilustradas.
        </p>
      </div>

      {/* BANNER DESTAQUE: LEITOR BÍBLICO COMPLETO */}
      <div
        onClick={onOpenFullBible}
        role="button"
        tabIndex={0}
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: 20,
          padding: '18px 20px',
          color: '#FFFFFF',
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'transform 0.2s ease',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: 'rgba(56, 189, 248, 0.18)',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: '#38BDF8' }}>
                Texto Integral
              </span>
              <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 6, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', fontWeight: 600 }}>
                66 Livros
              </span>
            </div>
            <h3 style={{ fontSize: 15.5, fontWeight: 700, margin: '2px 0 0 0', color: '#FFFFFF' }}>
              Abrir Leitor Completo da Bíblia
            </h3>
            <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0 0' }}>
              Navegue por capítulos, livros e temas com fontes ajustáveis.
            </p>
          </div>
        </div>

        <div style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' }}>
          <ChevronRight size={22} />
        </div>
      </div>

      {/* TRILHAS BÍBLICAS (MOMENTOS, HISTÓRIAS, KIDS) */}
      {BIBLE_TRAILS.map((trail) => (
        <div
          key={trail.id}
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            backgroundColor: trail.bgColor,
            borderColor: 'rgba(0,0,0,0.03)',
            overflow: 'hidden',
            padding: '16px'
          }}
        >
          {/* Header da Trilha */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ fontSize: 15.5, color: 'var(--text-main)', fontWeight: 700, margin: 0 }}>
                  {trail.id === 'momentos' && '🌿 '}
                  {trail.id === 'historias' && '📖 '}
                  {trail.id === 'kids' && '👶 '}
                  {trail.title}
                </h3>
              </div>
              <p style={{ fontSize: 11.5, color: 'var(--text-second)', marginTop: 2, marginBottom: 0 }}>
                {trail.description}
              </p>
            </div>

            <span
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: 'var(--text-second)',
                flexShrink: 0
              }}
            >
              {trail.themes.length} temas
            </span>
          </div>

          {/* Carrossel Horizontal de Cards */}
          <div
            className="horizontal-scroll"
            {...dragScrollHandlers}
            style={{ cursor: 'grab', paddingBottom: 4 }}
          >
            {trail.themes.map((theme) => {
              const isLocked = !isPremium && !theme.isFree;

              return (
                <TrailThemeCard
                  key={theme.id}
                  theme={{
                    id: theme.id,
                    name: theme.name,
                    imageUrl: theme.imageUrl,
                    duration: theme.duration
                  }}
                  trailName={trail.badgeName}
                  trailColor={trail.color}
                  isCompleted={false}
                  isLocked={isLocked}
                  onClick={() => handleItemClick(theme)}
                />
              );
            })}
            <div style={{ minWidth: 10, flexShrink: 0 }} />
          </div>
        </div>
      ))}
    </div>
  );
};
