import React, { useState } from 'react';
import { Lock, Check } from 'lucide-react';

export interface TrailThemeCardProps {
  theme: {
    id: string;
    name: string;
    icon?: string;
    imageUrl?: string;
    duration?: string;
  };
  trailName?: string;
  trailColor?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  onClick: () => void;
}

const DEFAULT_THEME_FALLBACK_IMG = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';

export const TrailThemeCard: React.FC<TrailThemeCardProps> = ({
  theme,
  trailName: _trailName,
  trailColor: _trailColor,
  isCompleted = false,
  isLocked = false,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(theme.imageUrl || DEFAULT_THEME_FALLBACK_IMG);
  const duration = theme.duration || '2 min';

  React.useEffect(() => {
    setImgSrc(theme.imageUrl || DEFAULT_THEME_FALLBACK_IMG);
  }, [theme.imageUrl]);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        width: 154,
        minWidth: 154,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        opacity: isLocked ? 0.7 : 1,
        position: 'relative',
        userSelect: 'none'
      }}
      className="trail-theme-card"
    >
      {/* Top Image Area with Badge */}
      <div style={{ position: 'relative', width: '100%', height: 104, overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
        <img
          src={imgSrc}
          alt={theme.name}
          loading="lazy"
          onError={() => {
            if (imgSrc !== DEFAULT_THEME_FALLBACK_IMG) {
              setImgSrc(DEFAULT_THEME_FALLBACK_IMG);
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        
        {/* Subtle gradient for contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 60%, rgba(0,0,0,0.1) 100%)'
          }}
        />

        {/* Locked Badge if applicable */}
        {isLocked && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Lock size={12} />
          </div>
        )}

        {/* Completed Badge if applicable */}
        {isCompleted && !isLocked && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(16,185,129,0.4)'
            }}
          >
            <Check size={12} strokeWidth={3} />
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
            fontSize: 14,
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
          {theme.name}
        </h4>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 6
          }}
        >
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 500,
              color: 'var(--text-second, #6B7280)'
            }}
          >
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};
