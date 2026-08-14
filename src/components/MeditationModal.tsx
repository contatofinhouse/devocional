import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, RotateCw, 
  Sparkles, CheckCircle2, 
  Volume2, VolumeX, ArrowRight
} from 'lucide-react';
import type { MeditationSession } from '../data/mockMeditations';

interface MeditationModalProps {
  meditation: MeditationSession;
  onClose: () => void;
  onComplete?: (feeling: string) => void;
}

export const MeditationModal: React.FC<MeditationModalProps> = ({
  meditation,
  onClose,
  onComplete
}) => {
  const [viewState, setViewState] = useState<'prep' | 'playing' | 'completed'>('prep');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(meditation.durationSeconds || 172);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stepListRef = useRef<HTMLDivElement | null>(null);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(meditation.audioUrl);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);

      // Find current step
      const stepIdx = meditation.steps.findIndex(
        s => audio.currentTime >= s.startSeconds && audio.currentTime <= s.endSeconds
      );
      if (stepIdx !== -1 && stepIdx !== activeStepIndex) {
        setActiveStepIndex(stepIdx);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setViewState('completed');
    };

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [meditation]);

  // Auto-scroll to active step
  useEffect(() => {
    if (viewState === 'playing' && stepListRef.current) {
      const activeEl = document.getElementById(`med-step-${activeStepIndex}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeStepIndex, viewState]);

  const handleStartSession = () => {
    setViewState('playing');
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleSeek = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(duration, seconds));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkip = (delta: number) => {
    if (!audioRef.current) return;
    handleSeek(audioRef.current.currentTime + delta);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentStep = meditation.steps[activeStepIndex] || meditation.steps[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#FAFBFC', // Clean light background matching the app
        color: '#1E2229',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        fontFamily: 'var(--font-sans, "Outfit", sans-serif)',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {/* Header bar */}
      <div 
        style={{
          padding: 'calc(env(safe-area-inset-top) + 14px) 20px 14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #EBECEF',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F5F3FF',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7C3AED'
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#7C3AED', fontWeight: 700 }}>
              {meditation.methodology}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E2229' }}>
              {meditation.title}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: '#F1F3F5',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            color: '#5C6470',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* 1. Tela de Preparação (Onboarding) */}
      {viewState === 'prep' && (
        <div 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px 24px',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: '#F5F3FF',
              border: '1.5px solid rgba(139, 92, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.1)'
            }}
          >
            <img 
              src="/mascot_meditating.png" 
              alt="Meditação" 
              style={{ width: '54px', height: '54px', objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1E2229', margin: '0 0 8px 0', fontFamily: 'var(--font-display, inherit)' }}>
            Prepare sua Mente
          </h2>

          <p style={{ fontSize: '13px', color: '#5C6470', lineHeight: 1.5, margin: '0 0 24px 0' }}>
            Uma prática guiada de <strong>3 minutos</strong> para desacelerar o ritmo respiratório, acalmar pensamentos e renovar a clareza para o seu dia.
          </p>

          <div 
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EBECEF',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              width: '100%',
              marginBottom: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px' }}>🎧</span>
              <span style={{ fontSize: '13px', color: '#1E2229' }}>Conecte seus <strong>fones de ouvido</strong> se possível.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px' }}>🪑</span>
              <span style={{ fontSize: '13px', color: '#1E2229' }}>Sente-se com a <strong>coluna ereta e relaxada</strong>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>🌿</span>
              <span style={{ fontSize: '13px', color: '#1E2229' }}>Apenas acompanhe a voz e o ritmo da respiração.</span>
            </div>
          </div>

          <button
            onClick={handleStartSession}
            style={{
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '14px',
              padding: '15px 32px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.25)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Play size={16} fill="#FFFFFF" />
            Iniciar Meditação
          </button>
        </div>
      )}

      {/* 2. Sessão Imersiva em Execução */}
      {viewState === 'playing' && (
        <div 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 20px',
            maxWidth: '540px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Círculo de Respiração Pulsante no Topo */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 0'
            }}
          >
            <div 
              style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Outer Pulsing Halo */}
              <div 
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%)',
                  animation: isPlaying ? 'pulseHalo 4s ease-in-out infinite' : 'none'
                }}
              />
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#F5F3FF',
                  border: '2px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(124, 58, 237, 0.12)'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', letterSpacing: '0.4px' }}>
                  {isPlaying ? 'RESPIRAR' : 'PAUSADO'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '10px', fontSize: '11px', color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Fase {currentStep.id} de {meditation.steps.length} • {currentStep.phase}
            </div>
          </div>

          {/* Lista de Textos Guiados com Destaque Suave no Passo Atual */}
          <div 
            ref={stepListRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: '260px',
              padding: '8px 2px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {meditation.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  id={`med-step-${idx}`}
                  onClick={() => handleSeek(step.startSeconds)}
                  style={{
                    backgroundColor: isActive ? '#FFFFFF' : '#F8F9FB',
                    border: isActive ? '1.5px solid #7C3AED' : '1px solid #EBECEF',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 16px rgba(124, 58, 237, 0.08)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: isActive ? '#7C3AED' : '#8C94A0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px'
                      }}
                    >
                      {step.phase}
                    </span>
                    <span style={{ fontSize: '10px', color: '#8C94A0' }}>
                      {formatTime(step.startSeconds)}
                    </span>
                  </div>
                  <p 
                    style={{ 
                      fontSize: isActive ? '14px' : '12.5px', 
                      lineHeight: 1.5, 
                      margin: 0,
                      color: isActive ? '#1E2229' : '#5C6470',
                      fontWeight: isActive ? 600 : 400
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Barra de Progresso & Controles de Áudio */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EBECEF',
              borderRadius: '18px',
              padding: '14px 18px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Scrubber */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: '#5C6470', width: '30px', fontWeight: 600 }}>
                {formatTime(currentTime)}
              </span>
              
              <div 
                style={{
                  flex: 1,
                  height: '5px',
                  backgroundColor: '#EBECEF',
                  borderRadius: '3px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  handleSeek(pos * duration);
                }}
              >
                <div 
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: '#7C3AED',
                    borderRadius: '3px',
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              <span style={{ fontSize: '11px', color: '#5C6470', width: '30px', textAlign: 'right', fontWeight: 600 }}>
                {formatTime(duration)}
              </span>
            </div>

            {/* Controles Principais */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={toggleMute}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isMuted ? '#EF4444' : '#5C6470',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => handleSkip(-10)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#1E2229',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '9px',
                    fontWeight: 700
                  }}
                >
                  <RotateCcw size={18} />
                  <span>10s</span>
                </button>

                <button
                  onClick={togglePlayPause}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#7C3AED',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  {isPlaying ? <Pause size={20} fill="#FFFFFF" /> : <Play size={20} fill="#FFFFFF" style={{ marginLeft: '2px' }} />}
                </button>

                <button
                  onClick={() => handleSkip(10)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#1E2229',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '9px',
                    fontWeight: 700
                  }}
                >
                  <RotateCw size={18} />
                  <span>10s</span>
                </button>
              </div>

              <div style={{ width: '30px' }} />
            </div>
          </div>
        </div>
      )}

      {/* 3. Tela de Conclusão & Check-in */}
      {viewState === 'completed' && (
        <div 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px 24px',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              border: '1.5px solid #10B981',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.15)'
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1E2229', margin: '0 0 6px 0', fontFamily: 'var(--font-display, inherit)' }}>
            Mente Serena & Foco Renovado
          </h2>

          <p style={{ fontSize: '13px', color: '#5C6470', margin: '0 0 20px 0' }}>
            Parabéns por dedicar este momento à sua presença e clareza mental.
          </p>

          {/* Cartão de Afirmação */}
          <div 
            style={{
              backgroundColor: '#F5F3FF',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#7C3AED', fontWeight: 700, marginBottom: '4px' }}>
              Afirmação de Ancoragem
            </div>
            <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#1E2229', lineHeight: 1.5 }}>
              "{meditation.affirmation}"
            </div>
          </div>

          {/* Check-in de Sensação */}
          <div style={{ width: '100%', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#1E2229', marginBottom: '10px', fontWeight: 600 }}>
              {meditation.reflectionPrompt}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'calmo', label: '🌿 Calmo', desc: 'Em paz' },
                { id: 'focado', label: '⚡ Focado', desc: 'Clareza' },
                { id: 'renovado', label: '✨ Renovado', desc: 'Energia' }
              ].map(item => {
                const isSel = selectedFeeling === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFeeling(item.id)}
                    style={{
                      backgroundColor: isSel ? '#F5F3FF' : '#FFFFFF',
                      border: isSel ? '1.5px solid #7C3AED' : '1px solid #EBECEF',
                      borderRadius: '12px',
                      padding: '10px 4px',
                      color: isSel ? '#7C3AED' : '#1E2229',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      transition: 'all 0.2s ease',
                      boxShadow: isSel ? '0 2px 8px rgba(124, 58, 237, 0.1)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.label}</span>
                    <span style={{ fontSize: '10px', color: '#5C6470' }}>{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              if (onComplete) onComplete(selectedFeeling || 'renovado');
              onClose();
            }}
            style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
            }}
          >
            <span>Concluir & Levar para o Dia</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Global CSS for subtle breathing halo animation */}
      <style>{`
        @keyframes pulseHalo {
          0% { transform: scale(0.95); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(0.95); opacity: 0.3; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
