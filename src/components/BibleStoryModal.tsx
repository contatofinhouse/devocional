import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause, BookOpen, Heart, MessageCircle, HelpCircle, Share2 } from 'lucide-react';
import type { BibleStoryItem } from '../data/mockBibleTrails';

interface BibleStoryModalProps {
  story: BibleStoryItem;
  onClose: () => void;
  onShare?: () => void;
}

export const BibleStoryModal: React.FC<BibleStoryModalProps> = ({
  story,
  onClose,
  onShare
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const handleToggleAudio = () => {
    if (!story.audioUrl) return;

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        const audio = new Audio(story.audioUrl);
        audio.playbackRate = 0.95;

        audio.onloadedmetadata = () => {
          if (audio.duration && !isNaN(audio.duration)) {
            setDuration(audio.duration);
          }
        };

        audio.ontimeupdate = () => {
          setCurrentTime(audio.currentTime);
        };

        audio.onended = () => {
          setIsPlaying(false);
        };

        audioRef.current = audio;
      }

      audioRef.current.play().catch(e => console.warn('Erro audio:', e));
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className="fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FAFBFC',
        color: '#1E2229',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          padding: 'calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #EBECEF',
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: '#F1F3F5',
            border: 'none',
            color: '#475569',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Fechar"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', flex: 1, padding: '0 12px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: '#4D96FF' }}>
            {story.trailId === 'momentos' ? '🌿 Momentos & Emoções' : '📖 História da Bíblia'}
          </span>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#1E2229', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {story.name}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {onShare && (
            <button
              onClick={onShare}
              style={{
                background: '#F1F3F5',
                border: 'none',
                color: '#475569',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Compartilhar"
            >
              <Share2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 16px 50px 16px', maxWidth: 580, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Hero Card */}
        <div
          style={{
            position: 'relative',
            height: 180,
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #E2E8F0'
          }}
        >
          <img
            src={story.imageUrl}
            alt={story.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.3) 60%, rgba(0,0,0,0.1) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#38BDF8', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
              <BookOpen size={14} />
              <span>{story.biblicalReference}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#FFFFFF' }}>{story.name}</h2>
            <p style={{ margin: '2px 0 0 0', fontSize: 12.5, color: '#E2E8F0' }}>{story.subtitle}</p>
          </div>
        </div>

        {/* Audio Player Bar (Light clean UI) */}
        {story.audioUrl && (
          <div
            style={{
              backgroundColor: isPlaying ? '#F0F9FF' : '#FFFFFF',
              border: `1.5px solid ${isPlaying ? '#0284C7' : '#E2E8F0'}`,
              borderRadius: 16,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18,
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={handleToggleAudio}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
              </button>
              <div>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: '#1E2229' }}>
                  {isPlaying ? 'Reproduzindo narração' : 'Ouvir narração da história'}
                </p>
                <p style={{ margin: '2px 0 0 0', fontSize: 11.5, color: '#64748B' }}>
                  {duration > 0 ? `${formatTime(currentTime)} / ${formatTime(duration)}` : 'Áudio narrado em alta definição'}
                </p>
              </div>
            </div>

            {isPlaying && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  onClick={() => {
                    if (audioRef.current) audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }}
                  style={{
                    background: '#F1F5F9',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Central Scripture Quote Box (Warm golden background) */}
        {story.content.biblicalTextQuote && (
          <div
            style={{
              backgroundColor: '#FFFBEB',
              borderLeft: '4px solid #F59E0B',
              borderRadius: '0 16px 16px 0',
              padding: '16px 18px',
              marginBottom: 18,
              border: '1px solid #FEF3C7',
              borderLeftWidth: '4px'
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Passagem das Escrituras ({story.biblicalReference})
            </span>
            <p style={{ margin: '6px 0 0 0', fontSize: 15, lineHeight: '165%', color: '#78350F', fontStyle: 'italic' }}>
              "{story.content.biblicalTextQuote}"
            </p>
          </div>
        )}

        {/* Story Acts (For Trilha Histórias) */}
        {story.content.acts && story.content.acts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            <h4 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: '#1E2229', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={18} style={{ color: '#4D96FF' }} />
              <span>A História em 4 Atos</span>
            </h4>

            {story.content.acts.map((act) => (
              <div
                key={act.actNumber}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 16,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      backgroundColor: '#4D96FF',
                      color: '#FFFFFF',
                      fontSize: 11.5,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {act.actNumber}
                  </span>
                  <h5 style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: '#1E2229' }}>
                    {act.title}
                  </h5>
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: '160%', color: '#475569' }}>
                  {act.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Key Verses (For Trilha Momentos) */}
        {story.content.keyVerses && story.content.keyVerses.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Versículos para Memorizar e Meditar:
            </span>
            {story.content.keyVerses.map((v, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 14,
                  padding: '12px 14px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <p style={{ margin: 0, fontSize: 14, color: '#334155', fontStyle: 'italic', lineHeight: '150%' }}>
                  "{v.text}"
                </p>
                <span style={{ display: 'block', textAlign: 'right', marginTop: 6, fontSize: 12, fontWeight: 700, color: '#4D96FF' }}>
                  — {v.reference}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reflection Box */}
        {story.content.reflection && (
          <div
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: 16,
              padding: 16,
              border: '1px solid #BBF7D0',
              marginBottom: 14
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
              <MessageCircle size={16} />
              <span>Reflexão para o seu Dia:</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#14532D', lineHeight: '160%' }}>
              {story.content.reflection}
            </p>
          </div>
        )}

        {/* Application Question */}
        {story.content.applicationQuestion && (
          <div
            style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 16,
              padding: 16,
              marginBottom: 14
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1D4ED8', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
              <HelpCircle size={16} />
              <span>Para Pensar & Praticar:</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#1E3A8A', lineHeight: '150%', fontWeight: 500 }}>
              {story.content.applicationQuestion}
            </p>
          </div>
        )}

        {/* Prayer Box */}
        {story.content.prayer && (
          <div
            style={{
              backgroundColor: '#FFF1F2',
              border: '1px solid #FECDD3',
              borderRadius: 16,
              padding: 16,
              marginBottom: 18
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9F1239', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
              <Heart size={16} />
              <span>Oração:</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#881337', lineHeight: '160%', fontStyle: 'italic' }}>
              "{story.content.prayer}"
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
