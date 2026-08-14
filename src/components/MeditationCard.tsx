import React from 'react';
import { Sparkles, Play, Headphones } from 'lucide-react';
import type { MeditationSession } from '../data/mockMeditations';

interface MeditationCardProps {
  meditation: MeditationSession;
  onStart: (meditation: MeditationSession) => void;
}

export const MeditationCard: React.FC<MeditationCardProps> = ({ meditation, onStart }) => {
  const durationMin = Math.ceil(meditation.durationSeconds / 60);

  return (
    <div 
      className="meditation-banner-card"
      onClick={() => onStart(meditation)}
      style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
        borderRadius: '20px',
        padding: '22px 20px',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px -8px rgba(49, 46, 129, 0.45)',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        marginBottom: '28px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      {/* Background glow effects */}
      <div 
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.35) 0%, rgba(167, 139, 250, 0) 70%)',
          pointerEvents: 'none'
        }} 
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span 
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#DDD6FE'
            }}
          >
            <Sparkles size={12} />
            Mindfulness MBSR
          </span>
          <span 
            style={{
              background: 'rgba(99, 102, 241, 0.35)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#C7D2FE'
            }}
          >
            {durationMin} min • Áudio Neural
          </span>
        </div>

        <div 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: '#312E81',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            flexShrink: 0
          }}
        >
          <Play size={18} fill="#312E81" style={{ marginLeft: '2px' }} />
        </div>
      </div>

      <div style={{ maxWidth: '85%' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
          {meditation.title}
        </h3>
        <p style={{ fontSize: '13px', margin: 0, color: '#E0E7FF', lineHeight: 1.4, opacity: 0.9 }}>
          {meditation.subtitle}
        </p>
      </div>

      <div 
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#C7D2FE'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Headphones size={14} />
          <span>Fones recomendados para imersão</span>
        </div>
        <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Iniciar Sessão →</span>
      </div>
    </div>
  );
};
