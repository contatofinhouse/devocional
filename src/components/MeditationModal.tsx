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
        background: 'linear-gradient(180deg, #0B0A1A 0%, #17153B 60%, #2E236C 100%)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        fontFamily: 'inherit',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      {/* Header bar */}
      <div 
        style={{
          padding: 'calc(env(safe-area-inset-top) + 16px) 20px 12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(167, 139, 250, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#A78BFA'
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#A78BFA', fontWeight: 700 }}>
              {meditation.methodology}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>
              {meditation.title}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
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
            maxWidth: '500px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(99, 102, 241, 0.1) 70%)',
              border: '2px solid rgba(167, 139, 250, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)'
            }}
          >
            <img 
              src="/mascot_meditating.png" 
              alt="Meditação" 
              style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px 0' }}>
            Prepare sua Mente
          </h2>

          <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6, margin: '0 0 28px 0' }}>
            Esta sessão de 3 minutos utiliza <strong>Mindfulness MBSR</strong> para desacelerar o ritmo mental, acalmar a respiração e reprogramar seu foco para o momento presente.
          </p>

          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              width: '100%',
              marginBottom: '32px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>🎧</span>
              <span style={{ fontSize: '13px', color: '#E2E8F0' }}>Se puder, conecte seus <strong>fones de ouvido</strong>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>🪑</span>
              <span style={{ fontSize: '13px', color: '#E2E8F0' }}>Sente-se de forma confortável, com a <strong>coluna ereta</strong>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>🌿</span>
              <span style={{ fontSize: '13px', color: '#E2E8F0' }}>Deixe o áudio e o texto guiarem sua respiração.</span>
            </div>
          </div>

          <button
            onClick={handleStartSession}
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Play size={18} fill="#FFFFFF" />
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
            padding: '20px',
            maxWidth: '600px',
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
              padding: '20px 0'
            }}
          >
            <div 
              style={{
                position: 'relative',
                width: '110px',
                height: '110px',
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
                  background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(99, 102, 241, 0) 70%)',
                  animation: isPlaying ? 'pulseHalo 4s ease-in-out infinite' : 'none'
                }}
              />
              <div 
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)'
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#DDD6FE', letterSpacing: '0.5px' }}>
                  {isPlaying ? 'RESPIRAR' : 'PAUSADO'}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '12px', fontSize: '12px', color: '#A78BFA', fontWeight: 600 }}>
              Fase {currentStep.id} de {meditation.steps.length} • {currentStep.phase}
            </div>
          </div>

          {/* Lista de Textos Guiados com Destaque no Passo Atual */}
          <div 
            ref={stepListRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: '260px',
              padding: '10px 4px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
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
                    background: isActive ? 'rgba(139, 92, 246, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid rgba(167, 139, 250, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isActive ? '0 4px 20px rgba(139, 92, 246, 0.25)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: isActive ? '#C4B5FD' : '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {step.phase}
                    </span>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>
                      {formatTime(step.startSeconds)}
                    </span>
                  </div>
                  <p 
                    style={{ 
                      fontSize: isActive ? '15px' : '13px', 
                      lineHeight: 1.5, 
                      margin: 0,
                      color: isActive ? '#FFFFFF' : '#94A3B8',
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
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '16px 20px'
            }}
          >
            {/* Scrubber */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', width: '32px' }}>
                {formatTime(currentTime)}
              </span>
              
              <div 
                style={{
                  flex: 1,
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.15)',
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
                    background: 'linear-gradient(90deg, #818CF8, #C084FC)',
                    borderRadius: '3px',
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              <span style={{ fontSize: '11px', color: '#94A3B8', width: '32px', textAlign: 'right' }}>
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
                  color: isMuted ? '#EF4444' : '#94A3B8',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => handleSkip(-10)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#E2E8F0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '9px',
                    fontWeight: 700
                  }}
                >
                  <RotateCcw size={20} />
                  <span>10s</span>
                </button>

                <button
                  onClick={togglePlayPause}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(147, 51, 234, 0.4)'
                  }}
                >
                  {isPlaying ? <Pause size={22} fill="#FFFFFF" /> : <Play size={22} fill="#FFFFFF" style={{ marginLeft: '3px' }} />}
                </button>

                <button
                  onClick={() => handleSkip(10)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#E2E8F0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '9px',
                    fontWeight: 700
                  }}
                >
                  <RotateCw size={20} />
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
            maxWidth: '500px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(52, 211, 153, 0.15)',
              border: '2px solid #34D399',
              color: '#34D399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 0 25px rgba(52, 211, 153, 0.3)'
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px 0' }}>
            Mente Serena & Foco Renovado
          </h2>

          <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 24px 0' }}>
            Você dedicou este momento para cuidar da sua presença e clareza mental.
          </p>

          {/* Cartão de Afirmação */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              borderRadius: '16px',
              padding: '18px',
              marginBottom: '28px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#A78BFA', fontWeight: 700, marginBottom: '6px' }}>
              Afirmação de Ancoragem
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#F1F5F9', lineHeight: 1.5 }}>
              "{meditation.affirmation}"
            </div>
          </div>

          {/* Check-in de Sensação */}
          <div style={{ width: '100%', marginBottom: '32px' }}>
            <div style={{ fontSize: '13px', color: '#CBD5E1', marginBottom: '12px', fontWeight: 600 }}>
              {meditation.reflectionPrompt}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
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
                      background: isSel ? 'rgba(139, 92, 246, 0.35)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSel ? '1.5px solid #A855F7' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      padding: '12px 6px',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{item.label}</span>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>{item.desc}</span>
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
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
            }}
          >
            <span>Concluir & Levar para o Dia</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Global CSS for pulsing animation */}
      <style>{`
        @keyframes pulseHalo {
          0% { transform: scale(0.95); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0.4; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
