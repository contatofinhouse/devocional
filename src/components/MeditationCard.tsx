import React, { useState } from 'react';
import { Lock, Play } from 'lucide-react';
import type { MeditationSession } from '../data/mockMeditations';

interface MeditationCardProps {
  meditation: MeditationSession;
  isLocked?: boolean;
  onStart: (meditation: MeditationSession) => void;
}

const DEFAULT_MED_FALLBACK_IMG = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80';

export const MeditationCard: React.FC<MeditationCardProps> = ({ 
  meditation, 
  isLocked = false, 
  onStart 
}) => {
  const [imgSrc, setImgSrc] = useState(meditation.imageUrl || DEFAULT_MED_FALLBACK_IMG);
  const durationMin = Math.ceil(meditation.durationSeconds / 60);

  return (
    <div
      onClick={() => onStart(meditation)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStart(meditation);
        }
      }}
      style={{
        width: 172,
        minWidth: 172,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 14px rgba(124, 58, 237, 0.06)',
        border: '1px solid rgba(139, 92, 246, 0.12)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        opacity: isLocked ? 0.75 : 1,
        position: 'relative',
        userSelect: 'none'
      }}
      className="trail-theme-card"
    >
      {/* Top Image Area */}
      <div style={{ position: 'relative', width: '100%', height: 110, overflow: 'hidden', backgroundColor: '#EDE9FE' }}>
        <img
          src={imgSrc}
          alt={meditation.title}
          loading="lazy"
          onError={() => {
            if (imgSrc !== DEFAULT_MED_FALLBACK_IMG) {
              setImgSrc(DEFAULT_MED_FALLBACK_IMG);
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Subtle dark gradient for contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 60%, rgba(0,0,0,0.1) 100%)'
          }}
        />

        {/* Locked Badge (isPremium) or Free Play Button in top right */}
        {meditation.isPremium ? (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: isLocked ? 'rgba(0, 0, 0, 0.75)' : 'rgba(124, 58, 237, 0.9)',
              color: isLocked ? '#FBBF24' : '#FFFFFF',
              borderRadius: 8,
              padding: '3px 7px',
              display: 'flex',
              alignItems: 'center',
              gap: 3.5,
              fontSize: 10,
              fontWeight: 800,
              backdropFilter: 'blur(6px)',
              border: isLocked ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Lock size={11} strokeWidth={2.5} />
            <span>PRO</span>
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.4)'
            }}
          >
            <Play size={11} fill="#FFFFFF" style={{ marginLeft: 1 }} />
          </div>
        )}
      </div>

      {/* Bottom Content Area */}
      <div
        style={{
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}
      >
        <h4
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: 'var(--text-main, #1F2937)',
            margin: 0,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {meditation.title}
        </h4>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 8,
            borderTop: '1px solid rgba(0,0,0,0.04)',
            paddingTop: 6
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#7C3AED'
            }}
          >
            {durationMin} min
          </span>
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 500,
              color: 'var(--text-second, #6B7280)'
            }}
          >
            {meditation.speakerName}
          </span>
        </div>
      </div>
    </div>
  );
};
