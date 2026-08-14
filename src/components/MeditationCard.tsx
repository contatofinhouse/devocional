import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import type { MeditationSession } from '../data/mockMeditations';

interface MeditationCardProps {
  meditation: MeditationSession;
  onStart: (meditation: MeditationSession) => void;
}

export const MeditationCard: React.FC<MeditationCardProps> = ({ meditation, onStart }) => {
  const durationMin = Math.ceil(meditation.durationSeconds / 60);

  return (
    <div 
      className="card"
      onClick={() => onStart(meditation)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        backgroundColor: '#F5F3FF', // Soft mindfulness lavender matching the app's palette
        borderColor: 'rgba(139, 92, 246, 0.15)',
        borderRadius: 16,
        padding: '16px 20px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 16
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid rgba(139, 92, 246, 0.25)',
          color: '#7C3AED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(124, 58, 237, 0.08)'
        }}>
          <span style={{ fontSize: '22px', lineHeight: 1 }}>🧘</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <h3 style={{ fontSize: 15, color: 'var(--text-main)', fontWeight: 700, margin: 0 }}>
              {meditation.title}
            </h3>
            <span 
              style={{ 
                fontSize: 10, 
                color: '#7C3AED', 
                backgroundColor: 'rgba(139, 92, 246, 0.12)', 
                padding: '2px 8px', 
                borderRadius: 10, 
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}
            >
              MBSR
            </span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-second)', margin: 0, lineHeight: 1.4 }}>
            {meditation.subtitle}
          </p>
        </div>

        <div 
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: '#7C3AED',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 3px 10px rgba(124, 58, 237, 0.2)'
          }}
        >
          <Play size={16} fill="#FFFFFF" style={{ marginLeft: 2 }} />
        </div>
      </div>

      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          borderTop: '1px solid rgba(139, 92, 246, 0.1)',
          fontSize: 11,
          color: 'var(--text-second)'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>⏱️ {durationMin} min</span>
          <span>•</span>
          <span>Áudio Neural Guiado</span>
        </span>
        <span style={{ fontWeight: 600, color: '#7C3AED', display: 'flex', alignItems: 'center', gap: 2 }}>
          Iniciar Sessão <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
};
