import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, BookOpen, Heart, Sparkles, Share2 } from 'lucide-react';
import type { BibleStoryItem } from '../data/mockBibleTrails';

interface BibleKidsStoryModalProps {
  story: BibleStoryItem;
  onClose: () => void;
  onShare?: () => void;
}

export const BibleKidsStoryModal: React.FC<BibleKidsStoryModalProps> = ({
  story,
  onClose,
  onShare
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scenes = story.content.scenes || [];
  const currentScene = scenes[currentSceneIdx] || scenes[0];
  const totalScenes = scenes.length;

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

  const handleNextScene = () => {
    if (currentSceneIdx < totalScenes - 1) {
      setCurrentSceneIdx(prev => prev + 1);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(prev => prev - 1);
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
      {/* Top Header */}
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
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: '#0284C7' }}>
            👶 Bíblia Kids Ilustrada
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 16px 40px 16px', maxWidth: 540, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Audio Control Bar */}
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
              marginBottom: 16,
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
                  {isPlaying ? 'Ouvindo historinha com Tia Bia' : 'Ouvir historinha narrada'}
                </p>
                <p style={{ margin: '2px 0 0 0', fontSize: 11.5, color: '#64748B' }}>
                  Voz doce & afetuosa {duration > 0 ? `(${formatTime(currentTime)} / ${formatTime(duration)})` : ''}
                </p>
              </div>
            </div>

            {isPlaying && (
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
            )}
          </div>
        )}

        {/* Storybook Scene Carousel Card */}
        {currentScene && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Scene Image with gentle rounded presentation */}
            <div style={{ position: 'relative', width: '100%', height: 260, backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
              <img
                src={currentScene.imageUrl}
                alt={currentScene.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* Scene Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: '#0284C7',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                Cena {currentSceneIdx + 1} de {totalScenes}
              </div>
            </div>

            {/* Scene Body & Text */}
            <div style={{ padding: '20px 20px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1E2229' }}>
                {currentScene.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 15.5,
                  lineHeight: '165%',
                  color: '#334155',
                  fontWeight: 400
                }}
              >
                {currentScene.text}
              </p>
            </div>

            {/* Carousel Navigation Bar */}
            <div
              style={{
                padding: '12px 20px 16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #F1F5F9'
              }}
            >
              <button
                onClick={handlePrevScene}
                disabled={currentSceneIdx === 0}
                style={{
                  backgroundColor: currentSceneIdx === 0 ? 'transparent' : '#F1F5F9',
                  color: currentSceneIdx === 0 ? '#CBD5E1' : '#334155',
                  border: 'none',
                  borderRadius: 12,
                  padding: '8px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: currentSceneIdx === 0 ? 'default' : 'pointer'
                }}
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              {/* Dots indicator */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {scenes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSceneIdx(idx)}
                    style={{
                      width: idx === currentSceneIdx ? 22 : 7,
                      height: 7,
                      borderRadius: 4,
                      backgroundColor: idx === currentSceneIdx ? '#0284C7' : '#E2E8F0',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNextScene}
                disabled={currentSceneIdx === totalScenes - 1}
                style={{
                  backgroundColor: currentSceneIdx === totalScenes - 1 ? '#F1F5F9' : '#0284C7',
                  color: currentSceneIdx === totalScenes - 1 ? '#CBD5E1' : '#FFFFFF',
                  border: 'none',
                  borderRadius: 12,
                  padding: '8px 14px',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: currentSceneIdx === totalScenes - 1 ? 'default' : 'pointer'
                }}
              >
                <span>Próxima</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Biblical Reference Box: Onde Ler na Bíblia */}
        <div
          style={{
            marginTop: 16,
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400E', fontSize: 13, fontWeight: 700 }}>
            <BookOpen size={16} />
            <span>Onde está na Bíblia: {story.content.biblicalReference}</span>
          </div>
          {story.content.biblicalTextQuote && (
            <p style={{ margin: 0, fontSize: 13.5, fontStyle: 'italic', color: '#78350F', lineHeight: '150%' }}>
              "{story.content.biblicalTextQuote}"
            </p>
          )}
        </div>

        {/* Moral Lesson & Family Prayer */}
        {story.content.moralLesson && (
          <div
            style={{
              marginTop: 12,
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 13, fontWeight: 700 }}>
              <Sparkles size={16} />
              <span>O que aprendemos hoje:</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#14532D', lineHeight: '150%', fontWeight: 500 }}>
              {story.content.moralLesson}
            </p>
          </div>
        )}

        {story.content.kidsPrayer && (
          <div
            style={{
              marginTop: 12,
              backgroundColor: '#FFF1F2',
              border: '1px solid #FECDD3',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9F1239', fontSize: 13, fontWeight: 700 }}>
              <Heart size={16} />
              <span>Oraçãozinha da Família:</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#881337', lineHeight: '155%', fontStyle: 'italic' }}>
              "{story.content.kidsPrayer}"
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
