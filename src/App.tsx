import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Heart, 
  HelpCircle, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ShieldAlert, 
  CheckSquare, 
  Footprints, 
  Flame as FlameIcon, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  Smile, 
  Gift, 
  Compass, 
  Sun, 
  ChevronDown, 
  Wind, 
  Moon, 
  Sparkle,
  Share2,
  Bell
} from 'lucide-react';

import type { KidProfile, ParentLog, Devotional } from './data/mockDevotionals';
import { 
  TRAILS, 
  CRISIS_SITUATIONS, 
  getStaticDevotional,
  generatePersonalizedDevotional
} from './data/mockDevotionals';

import { supabase } from './data/supabaseClient';

const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldAlert,
  CheckSquare,
  Footprints,
  Flame: FlameIcon,
  HeartHandshake,
  Users,
  Sparkles,
  Smile,
  Gift,
  Compass,
  Sun,
  ChevronDown,
  HelpCircle,
  Lock: CheckSquare,
  Wind,
  Moon,
  Sparkle
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashClass, setSplashClass] = useState('');
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState<'journey' | 'calendar' | 'crisis' | 'parent'>('journey');
  const [currentDevotional, setCurrentDevotional] = useState<Devotional | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  
  const [kidProfile, setKidProfile] = useState<KidProfile>({
    name: '',
    age: 8,
    interests: '',
    hobbies: '',
    personality: '',
    difficulties: '',
    objectives: '',
    favoriteVerses: '',
    availableTime: 15
  });

  const [streakCount, setStreakCount] = useState(0);
  const [unlockedMedals, setUnlockedMedals] = useState<string[]>([]);
  
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [readingTheme, setReadingTheme] = useState<'default' | 'sepia' | 'darker'>('default');

  const [logs, setLogs] = useState<ParentLog[]>([]);

  const [newLogRating, setNewLogRating] = useState<number>(5);
  const [newLogTags, setNewLogTags] = useState<string[]>([]);
  const [newLogHowItWent, setNewLogHowItWent] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [reminderTime, setReminderTime] = useState('20:30');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  // Load static configurations from localStorage (non-user configurations)
  useEffect(() => {
    const savedReminder = localStorage.getItem('nf_reminder_time');
    const savedReminderEnabled = localStorage.getItem('nf_reminder_enabled');
    if (savedReminder) setReminderTime(savedReminder);
    if (savedReminderEnabled) setReminderEnabled(JSON.parse(savedReminderEnabled));

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Supabase Auth and Data synchronization
  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadUserData(session.user.id);
      } else {
        setAuthLoading(false);
      }
    });

    // 2. Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadUserData(session.user.id);
      } else {
        setUser(null);
        setKidProfile({
          name: '',
          age: 8,
          interests: '',
          hobbies: '',
          personality: '',
          difficulties: '',
          objectives: '',
          favoriteVerses: '',
          availableTime: 15
        });
        setLogs([]);
        setStreakCount(0);
        setUnlockedMedals([]);
        setAuthLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Soft fade-out splash screen after auth state is resolved and minimum 2 seconds wait
  useEffect(() => {
    if (!authLoading) {
      const timer = setTimeout(() => {
        setSplashClass('fade-out-splash');
        const hiddenTimer = setTimeout(() => {
          setShowSplash(false);
        }, 500); // match transition duration
        return () => clearTimeout(hiddenTimer);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [authLoading]);

  const loadUserData = async (userId: string) => {
    try {
      setAuthLoading(true);

      // Load Profile
      const { data: profile } = await supabase
        .from('dev_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profile) {
        setKidProfile({
          name: profile.kid_name || '',
          age: profile.kid_age || 8,
          interests: profile.interests || '',
          hobbies: profile.hobbies || '',
          personality: '',
          difficulties: profile.difficulties || '',
          objectives: '',
          favoriteVerses: '',
          availableTime: profile.available_time || 15
        });
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }

      // Load Progress
      const { data: progress } = await supabase
        .from('dev_progress')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (progress) {
        setStreakCount(progress.streak_count || 0);
        setUnlockedMedals(progress.unlocked_medals || []);
      }

      // Load Logs
      const { data: dbLogs } = await supabase
        .from('dev_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (dbLogs && dbLogs.length > 0) {
        const mappedLogs: ParentLog[] = dbLogs.map(log => {
          const createdAt = new Date(log.created_at || new Date());
          return {
            id: log.id,
            date: createdAt.toLocaleDateString('pt-BR') + ' às ' + createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            devotionalId: log.devotional_id,
            devotionalTitle: log.devotional_title,
            howItWent: log.how_it_went || '',
            reaction: log.rating >= 5 ? 'loved' : log.rating >= 4 ? 'good' : log.rating >= 3 ? 'neutral' : 'difficult',
            learnings: (log.tags || []).join(', '),
            prayerRequests: '',
            progressPerceived: 'Diálogo diário',
            challengeStatus: 'completed',
            rating: log.rating,
            tags: log.tags || []
          };
        });
        setLogs(mappedLogs);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error('Erro ao carregar dados do Supabase:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Erro na autenticação com o Google:', err);
      alert('Ocorreu um erro ao entrar com o Google. Tente novamente.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  };

  const saveToStorage = (key: string, value: any) => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  };

  // Bedtime alarm checker
  useEffect(() => {
    const interval = setInterval(() => {
      if (!reminderEnabled) return;
      const now = new Date();
      const currentFormatted = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      if (currentFormatted === reminderTime) {
        if (Notification.permission === 'granted') {
          new Notification('Devocional Pais & Filhos Fortes 🌙', {
            body: `Hora do devocional com o(a) ${kidProfile.name || 'seu filho(a)'}! Vamos passar 15 minutos juntos?`,
          });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [reminderTime, reminderEnabled, kidProfile.name]);

  // Roll up / scroll to top on tab, devotional, or story changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const scrollContainers = document.querySelectorAll('.custom-scroll, .screen-content');
    scrollContainers.forEach(container => {
      container.scrollTop = 0;
    });
  }, [activeTab, currentDevotional, storyIndex]);

  const handleShareDevotional = async () => {
    if (!currentDevotional) return;
    const activeStory = currentDevotional.stories[storyIndex] || currentDevotional.stories[0];
    const shareText = `*Devocional Pais & Filhos Fortes*\n\n*Tema:* ${currentDevotional.theme}\n*História:* ${activeStory.biblicalStoryTitle}\n\n*Desafio da Semana:* ${activeStory.challenge}\n\n*Mensagem Final:* "${activeStory.finalMessage}"`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Devocional Pais & Filhos Fortes - ${currentDevotional.theme}`,
          text: shareText
        });
      } catch (e) {
        console.log('Compartilhamento cancelado:', e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Copiado! Compartilhe o texto com seu cônjuge via WhatsApp.');
      } catch (err) {
        alert('Não foi possível copiar automaticamente.');
      }
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const profileData = {
        id: user.id,
        kid_name: kidProfile.name,
        kid_age: kidProfile.age,
        available_time: kidProfile.availableTime,
        interests: kidProfile.interests,
        hobbies: kidProfile.hobbies,
        difficulties: kidProfile.difficulties,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('dev_profiles')
        .upsert(profileData);

      if (error) throw error;

      // Check if we need to initialize progress record too
      const { data: existingProgress } = await supabase
        .from('dev_progress')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existingProgress) {
        await supabase
          .from('dev_progress')
          .insert({
            user_id: user.id,
            streak_count: 0,
            unlocked_medals: []
          });
      }

      setShowOnboarding(false);
    } catch (err) {
      console.error('Erro ao salvar perfil no Supabase:', err);
      alert('Erro ao salvar perfil. Verifique sua conexão e tente novamente.');
    }
  };

  const dragScrollHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.dataset.isDown = 'true';
      el.dataset.startX = String(e.pageX - el.offsetLeft);
      el.dataset.scrollLeft = String(el.scrollLeft);
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.dataset.isDown = 'false';
      el.style.cursor = 'grab';
    },
    onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.dataset.isDown = 'false';
      el.style.cursor = 'grab';
    },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.dataset.isDown !== 'true') return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const startX = Number(el.dataset.startX || 0);
      const scrollLeft = Number(el.dataset.scrollLeft || 0);
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    }
  };

  const handleOpenDevotional = (id: string, customDevotional?: Devotional) => {
    setStoryIndex(0);
    if (customDevotional) {
      setCurrentDevotional(customDevotional);
      return;
    }
    const staticDev = getStaticDevotional(id);
    setCurrentDevotional(staticDev);
  };

  const handleSelectCrisis = (situationId: string) => {
    const sit = CRISIS_SITUATIONS.find((s: any) => s.id === situationId);
    const themeId = sit ? sit.id : 'humildade';
    // Generate simple personalized devotional
    const generated = generatePersonalizedDevotional(kidProfile, themeId);
    handleOpenDevotional(`personalized-${situationId}`, generated);
  };

  const handleCompleteDevotional = async () => {
    if (!currentDevotional) return;
    
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);

    const theme = currentDevotional.theme;
    let updatedMedals = [...unlockedMedals];
    if (theme && !unlockedMedals.includes(theme)) {
      updatedMedals.push(theme);
      setUnlockedMedals(updatedMedals);
    }

    if (user) {
      try {
        await supabase
          .from('dev_progress')
          .upsert({
            user_id: user.id,
            streak_count: newStreak,
            unlocked_medals: updatedMedals,
            last_devotional_at: new Date().toISOString()
          });
      } catch (err) {
        console.error('Erro ao registrar progresso no Supabase:', err);
      }
    }

    const activeStory = currentDevotional.stories[storyIndex] || currentDevotional.stories[0];
    setNewLogHowItWent(`Conversamos sobre o tema ${currentDevotional.theme}. Lemos "${activeStory.biblicalStoryTitle}" e o diálogo foi produtivo.`);
    setNewLogTags(['Conversa Fluida']);
    setNewLogRating(5);
    
    setCurrentDevotional(null);
    setActiveTab('parent');
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reaction: ParentLog['reaction'] = newLogRating >= 5 ? 'loved' : newLogRating >= 4 ? 'good' : newLogRating >= 3 ? 'neutral' : 'difficult';
    const logDate = new Date();

    const tempLog: ParentLog = {
      id: `log-${Date.now()}`,
      date: 'Hoje às ' + logDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      devotionalId: currentDevotional?.id || 'personalizado',
      devotionalTitle: currentDevotional ? (currentDevotional.stories[storyIndex]?.biblicalStoryTitle || currentDevotional.stories[0].biblicalStoryTitle) : 'Devocional de hoje',
      howItWent: newLogHowItWent.trim() || 'Conversa realizada com sucesso.',
      reaction,
      learnings: newLogTags.join(', '),
      prayerRequests: '',
      progressPerceived: 'Diálogo diário',
      challengeStatus: 'ongoing',
      rating: newLogRating,
      tags: newLogTags
    };

    setLogs(prev => [tempLog, ...prev]);

    if (user) {
      try {
        const { error } = await supabase
          .from('dev_logs')
          .insert({
            user_id: user.id,
            date: logDate.toISOString().split('T')[0],
            devotional_id: currentDevotional?.id || 'personalizado',
            devotional_title: tempLog.devotionalTitle,
            how_it_went: tempLog.howItWent,
            rating: newLogRating,
            tags: newLogTags
          });
        if (error) throw error;
      } catch (err) {
        console.error('Erro ao salvar log no Supabase:', err);
      }
    }

    setNewLogHowItWent('');
    setNewLogTags([]);
    setNewLogRating(5);
  };

  const handleToggleReminderSetting = (checked: boolean) => {
    setReminderEnabled(checked);
    saveToStorage('nf_reminder_enabled', checked);
  };

  const getReaderThemeClass = () => {
    if (readingTheme === 'sepia') return 'reader-sepia';
    if (readingTheme === 'darker') return 'reader-darker';
    return '';
  };

  return (
    <>
      {showSplash && (
        <div className={`splash-screen ${splashClass}`}>
          <div className="splash-logo">🙌</div>
          <h1 className="splash-title">Devocional Pais & Filhos Fortes</h1>
          <p className="splash-subtitle">Fortalecendo valores e a conexão em família</p>
          <div className="splash-loader"></div>
        </div>
      )}

      <div className="app-container fade-in">
        <div className="app-screen">
          {!user ? (
            // LOGIN SCREEN (when not authenticated)
            <div className="screen-content custom-scroll" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <div style={{ fontSize: 64, marginBottom: 12, display: 'inline-block', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.06))' }}>🙌</div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-main)', marginTop: 4, lineHeight: '120%' }}>
                  Devocional Pais & Filhos Fortes
                </h1>
                <p style={{ color: 'var(--text-second)', fontSize: 14, marginTop: 8, padding: '0 20px', lineHeight: '140%' }}>
                  Fortaleça o caráter, as virtudes e a conexão emocional com seus filhos através de devocionais interativos de 15 minutos.
                </p>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20, backgroundColor: '#FFFFFF', padding: 24, textAlign: 'center' }}>
                <h3 style={{ fontSize: 16, color: 'var(--text-main)', fontWeight: 700 }}>Comece sua Jornada Familiar</h3>
                <p style={{ fontSize: 13, color: 'var(--text-second)', lineHeight: '145%' }}>
                  Para salvar o progresso dos seus filhos, manter sua ofensiva de preces e sincronizar as anotações do diário dos pais.
                </p>
                
                <button 
                  onClick={handleGoogleLogin} 
                  className="btn-primary" 
                  style={{ 
                    padding: '14px 20px', 
                    borderRadius: 12, 
                    fontSize: 14, 
                    backgroundColor: '#FF385C', 
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-3.3-4.53-6.16-4.53z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Entrar com Google
                </button>
              </div>
            </div>
          ) : showOnboarding ? (
            // ONBOARDING FORM
            <div className="screen-content custom-scroll" style={{ padding: '16px 20px 40px 20px' }}>
              <div style={{ textAlign: 'center', marginBottom: 12, marginTop: 4 }}>
                <div style={{ fontSize: 44, marginBottom: 4, display: 'inline-block', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>🙌</div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-main)', marginTop: 4, lineHeight: '120%' }}>
                  Configurar Perfil do Filho
                </h1>
                <p style={{ color: 'var(--text-second)', fontSize: 13, marginTop: 2 }}>
                  Insira os dados para personalizar a experiência do devocional
                </p>
              </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: '#FFFFFF', padding: 14 }}>
                <h3 style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 700 }}>Perfil do Filho</h3>
                
                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Nome do filho(a)</label>
                  <input 
                    type="text" 
                    value={kidProfile.name} 
                    onChange={e => setKidProfile({...kidProfile, name: e.target.value})} 
                    required 
                    placeholder="Ex: Lucas"
                    style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Idade (8 a 14)</label>
                    <input 
                      type="number" 
                      min={8} 
                      max={14}
                      value={kidProfile.age} 
                      onChange={e => setKidProfile({...kidProfile, age: parseInt(e.target.value, 10)})} 
                      required
                      style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Tempo diário</label>
                    <select 
                      value={kidProfile.availableTime} 
                      onChange={e => setKidProfile({...kidProfile, availableTime: parseInt(e.target.value, 10)})}
                      style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10, height: 37 }}
                    >
                      <option value={10}>10 min</option>
                      <option value={15}>15 min</option>
                      <option value={20}>20 min</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Interesses</label>
                    <input 
                      type="text" 
                      value={kidProfile.interests} 
                      onChange={e => setKidProfile({...kidProfile, interests: e.target.value})} 
                      placeholder="Ex: Futebol, Minecraft"
                      style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Hobbies</label>
                    <input 
                      type="text" 
                      value={kidProfile.hobbies} 
                      onChange={e => setKidProfile({...kidProfile, hobbies: e.target.value})} 
                      placeholder="Ex: Desenhar, videogame"
                      style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Dificuldade principal</label>
                  <input 
                    type="text" 
                    value={kidProfile.difficulties} 
                    onChange={e => setKidProfile({...kidProfile, difficulties: e.target.value})} 
                    placeholder="Ex: Não aceita perder, ansiedade"
                    style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: 12, borderRadius: 12, fontSize: 14, backgroundColor: '#FF385C', border: 'none' }}>
                Entrar no Aplicativo <ChevronRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          // MAIN DASHBOARD
          <>
            {/* STREAK & MEDALS PANEL */}
            <div style={{ 
              padding: '14px 20px', 
              borderBottom: '1px solid var(--border-light)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#FFF0F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18
                }}>
                  🙌
                </div>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{streakCount} Noites de celebração</span>
                  <div style={{ fontSize: 10, color: 'var(--text-second)' }}>Sua família unida no hábito</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 4 }}>
                {unlockedMedals.slice(0, 4).map((m, idx) => (
                  <div 
                    key={idx} 
                    title={`Valores: ${m}`}
                    style={{ 
                      width: 26, 
                      height: 26, 
                      borderRadius: '50%', 
                      background: '#F3F4F6',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12
                    }}
                  >
                    ⭐
                  </div>
                ))}
              </div>
            </div>

            <div className="screen-content custom-scroll" style={{ backgroundColor: '#FFFFFF' }}>
              
              {/* TAB 1: JOURNEY */}
              {activeTab === 'journey' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ marginTop: 4 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)' }}>Trilhas de Desenvolvimento</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-second)' }}>Escolha um tema e comecem a ler juntos.</p>
                  </div>

                  {TRAILS.map((trail) => (
                    <div 
                      key={trail.id} 
                      className="card" 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 12,
                        backgroundColor: trail.bgColor,
                        borderColor: 'rgba(0,0,0,0.03)',
                        overflow: 'hidden'
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: 15, color: 'var(--text-main)', fontWeight: 700 }}>{trail.title}</h3>
                        <p style={{ fontSize: 11, color: 'var(--text-second)', marginTop: 2 }}>{trail.description}</p>
                      </div>

                      {/* Path node layout style headspace */}
                      <div 
                        className="horizontal-scroll"
                        {...dragScrollHandlers}
                        style={{ cursor: 'grab' }}
                      >
                        {trail.themes.map((theme) => {
                          const IconComp = iconMap[theme.icon] || HelpCircle;
                          const isCompleted = unlockedMedals.includes(theme.name);
                          
                          return (
                            <button
                              key={theme.id}
                              onClick={() => handleOpenDevotional(theme.id)}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 6,
                                background: 'none',
                                border: 'none',
                                minWidth: 70,
                                flexShrink: 0,
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                backgroundColor: isCompleted ? '#FFFFFF' : 'rgba(0,0,0,0.03)',
                                border: `1.5px solid ${isCompleted ? trail.color : 'rgba(0,0,0,0.06)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isCompleted ? trail.color : 'var(--text-second)',
                                transition: 'var(--transition-smooth)',
                                position: 'relative'
                              }}>
                                <IconComp size={18} />
                                {isCompleted && (
                                  <div style={{
                                    position: 'absolute',
                                    bottom: -2,
                                    right: -2,
                                    backgroundColor: trail.color,
                                    color: '#FFF',
                                    borderRadius: '50%',
                                    width: 14,
                                    height: 14,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 8,
                                    fontWeight: 'bold'
                                  }}>
                                    ✓
                                  </div>
                                )}
                              </div>
                              <span style={{ fontSize: 10, color: 'var(--text-main)', textAlign: 'center', fontWeight: 600 }}>
                                {theme.name}
                              </span>
                            </button>
                          );
                        })}
                        <div style={{ minWidth: 20, flexShrink: 0 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: SMART CALENDAR */}
              {activeTab === 'calendar' && (() => {
                const allThemes = TRAILS.flatMap(t => t.themes);
                const nights = Array.from({ length: 50 }).map((_, i) => {
                  const dayNumber = i + 1;
                  const theme = allThemes[i % allThemes.length];
                  
                  // Simple titles list mapping or fallback to name
                  const staticDev = getStaticDevotional(theme.id);
                  const baseTitle = staticDev.stories[0]?.biblicalStoryTitle || theme.name;
                  const cleanTitle = baseTitle.replace(/\(Lição \d+ de \d+\)/g, '').trim();
                  
                  return {
                    dayNumber,
                    themeId: theme.id,
                    themeName: theme.name,
                    title: `${theme.name}: ${cleanTitle}`
                  };
                });

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)' }}>Plano de 365 Dias</h2>
                      <p style={{ fontSize: 13, color: 'var(--text-second)' }}>Navegue pelas noites do ano em progressão natural.</p>
                    </div>

                    <input 
                      type="text" 
                      placeholder="🔍 Buscar por temas ou passagens..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ marginBottom: 4, backgroundColor: '#FAFAFB', border: '1px solid var(--border-light)', padding: 10, borderRadius: 10, outline: 'none', width: '100%', fontSize: 13 }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '60vh', overflowY: 'auto', paddingRight: 4 }} className="custom-scroll">
                      {nights.map((night) => {
                        if (searchQuery && !night.title.toLowerCase().includes(searchQuery.toLowerCase())) return null;

                        return (
                          <div 
                            key={night.dayNumber} 
                            onClick={() => handleOpenDevotional(night.themeId)}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: 14,
                              backgroundColor: '#FAFBFD',
                              borderRadius: 14,
                              border: '1px solid #E2E8F0',
                              opacity: 1,
                              cursor: 'pointer',
                              transition: 'var(--transition-smooth)'
                            }}
                          >
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                              <div style={{ 
                                width: 30, 
                                height: 30, 
                                borderRadius: 8, 
                                backgroundColor: '#F0F5FF',
                                border: '1px solid #3B82F6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#3B82F6',
                                flexShrink: 0
                              }}>
                                {night.dayNumber}
                              </div>
                              <div>
                                <span style={{ fontSize: 10, color: 'var(--text-second)', display: 'block', fontWeight: 600 }}>NOITE {night.dayNumber}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>{night.title}</span>
                              </div>
                            </div>
                            <div>
                              <ChevronRight size={16} style={{ color: 'var(--text-second)' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* TAB 3: CRISIS HELPER */}
              {activeTab === 'crisis' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)' }}>Passando por isso...</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-second)' }}>
                      Selecione um sentimento ou situação real que seu filho viveu hoje para iniciar uma conversa focada.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {CRISIS_SITUATIONS.slice(0, 14).map((sit: any) => (
                      <button
                        key={sit.id}
                        onClick={() => handleSelectCrisis(sit.id)}
                        className="card"
                        style={{
                          padding: 12,
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4,
                          backgroundColor: '#FAFBFD',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: 9, color: 'var(--text-second)', fontWeight: 600 }}>{sit.category.toUpperCase()}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>{sit.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PARENTS DIARY & SETTINGS */}
              {activeTab === 'parent' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)' }}>Diário dos Pais</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-second)' }}>Acompanhe o desenvolvimento e os diálogos noturnos.</p>
                  </div>

                  {/* Account panel */}
                  {user && (
                    <div className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FF385C', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 12 }}>
                          {user.email?.[0].toUpperCase() || 'U'}
                        </div>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 600, display: 'block', color: 'var(--text-main)' }}>{user.email}</span>
                          <span style={{ fontSize: 10, color: 'var(--text-second)' }}>Conta Google</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleLogout}
                        style={{ 
                          padding: '6px 12px', 
                          borderRadius: 8, 
                          fontSize: 11, 
                          backgroundColor: '#FFF0F2', 
                          color: '#FF385C', 
                          border: 'none', 
                          fontWeight: 600,
                          cursor: 'pointer' 
                        }}
                      >
                        Sair
                      </button>
                    </div>
                  )}

                  {/* Bedtime Reminder settings */}
                  <div className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Bell size={18} style={{ color: 'var(--text-second)' }} />
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, display: 'block' }}>Lembrete diário</span>
                        <span style={{ fontSize: 11, color: 'var(--text-second)' }}>Notificação de hora de dormir</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input 
                        type="time" 
                        value={reminderTime} 
                        onChange={(e) => {
                          setReminderTime(e.target.value);
                          saveToStorage('nf_reminder_time', e.target.value);
                        }}
                        style={{ padding: 4, width: 70, border: 'none', background: '#F3F4F6', fontSize: 12 }} 
                      />
                      <input 
                        type="checkbox" 
                        checked={reminderEnabled} 
                        onChange={(e) => handleToggleReminderSetting(e.target.checked)}
                        style={{ width: 18, height: 18 }} 
                      />
                    </div>
                  </div>

                  {/* Log new dialog form */}
                  <form onSubmit={handleAddLog} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14, backgroundColor: '#FFFFFF' }}>
                    <h3 style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 700 }}>Anotar Conversa de Hoje</h3>
                    
                    {/* Airbnb-style Star Rating */}
                    <div>
                      <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 6, fontWeight: 600 }}>Avaliação da conversa</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {Array.from({ length: 5 }).map((_, i) => {
                          const starValue = i + 1;
                          const active = starValue <= newLogRating;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setNewLogRating(starValue)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 26,
                                color: active ? '#FF385C' : '#E4E4E7',
                                padding: 0,
                                margin: 0,
                                transition: 'transform 0.1s ease',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                              ★
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Predefined Quick Tags */}
                    <div>
                      <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 6, fontWeight: 600 }}>O que aconteceu hoje?</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {[
                          'Conversa Fluida',
                          'Filho distraído',
                          'Teve choro',
                          'Pediu oração',
                          'Focou no desafio',
                          'Muitas dúvidas'
                        ].map((tag) => {
                          const isSelected = newLogTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setNewLogTags(newLogTags.filter(t => t !== tag));
                                } else {
                                  setNewLogTags([...newLogTags, tag]);
                                }
                              }}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 20,
                                fontSize: 11,
                                border: `1.5px solid ${isSelected ? '#FF385C' : 'var(--border-light)'}`,
                                backgroundColor: isSelected ? '#FFF0F2' : '#FFFFFF',
                                color: isSelected ? '#FF385C' : 'var(--text-second)',
                                cursor: 'pointer',
                                fontWeight: 600,
                                transition: 'var(--transition-smooth)'
                              }}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Annotation Field */}
                    <div>
                      <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 4, fontWeight: 600 }}>Anotação (opcional)</label>
                      <textarea 
                        rows={2} 
                        value={newLogHowItWent}
                        onChange={e => setNewLogHowItWent(e.target.value)}
                        placeholder="Escreva alguma observação ou momento marcante..." 
                        style={{
                          width: '100%',
                          padding: 10,
                          borderRadius: 10,
                          border: '1.5px solid var(--border-light)',
                          fontSize: 13,
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ padding: 10, fontSize: 13, backgroundColor: '#FF385C', border: 'none' }}>
                      Salvar Anotação
                    </button>
                  </form>

                  {/* Logs list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-second)' }}>Relatórios Anteriores</h3>
                    
                    {logs.map((log) => (
                      <div key={log.id} className="card" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 6, backgroundColor: '#FAFBFD' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: 'var(--text-second)', fontWeight: 600 }}>{log.date}</span>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {Array.from({ length: 5 }).map((_, starIdx) => {
                              const filled = starIdx < (log.rating ?? (log.reaction === 'loved' ? 5 : log.reaction === 'good' ? 4 : log.reaction === 'neutral' ? 3 : 2));
                              return (
                                <span key={starIdx} style={{ color: filled ? '#FF385C' : '#E4E4E7', fontSize: 14 }}>
                                  ★
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <h4 style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: 700 }}>{log.devotionalTitle}</h4>
                        <p style={{ fontSize: 12, color: 'var(--text-second)', lineHeight: '140%' }}>"{log.howItWent}"</p>
                        
                        {/* Render Tags */}
                        {log.tags && log.tags.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                            {log.tags.map((t, tIdx) => (
                              <span key={tIdx} style={{ fontSize: 9, padding: '2px 6px', backgroundColor: '#F3F4F6', color: '#4B5563', borderRadius: 12, fontWeight: 600 }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : log.learnings && (
                          <div style={{ fontSize: 11, borderTop: '1px solid rgba(0,0,0,0.03)', paddingTop: 4, display: 'flex', gap: 4 }}>
                            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>💡 Foco:</span>
                            <span style={{ color: 'var(--text-second)' }}>{log.learnings}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* TAB NAV BAR */}
            <div className="bottom-nav">
              <button 
                onClick={() => setActiveTab('journey')} 
                className={`nav-tab ${activeTab === 'journey' ? 'active' : ''}`}
              >
                <BookOpen size={20} />
                <span>Trilhas</span>
              </button>
              <button 
                onClick={() => setActiveTab('calendar')} 
                className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
              >
                <Calendar size={20} />
                <span>Calendário</span>
              </button>
              <button 
                onClick={() => setActiveTab('crisis')} 
                className={`nav-tab ${activeTab === 'crisis' ? 'active' : ''}`}
              >
                <Heart size={20} />
                <span>Situações</span>
              </button>
              <button 
                onClick={() => setActiveTab('parent')} 
                className={`nav-tab ${activeTab === 'parent' ? 'active' : ''}`}
              >
                <User size={20} />
                <span>Pais</span>
              </button>
            </div>
          </>
          )}

        {/* DEVOTIONAL READER FULLSCREEN OVERLAY */}
        {currentDevotional && (() => {
          const activeStory = currentDevotional.stories[storyIndex] || currentDevotional.stories[0];
          return (
            <div 
              className={`fade-in ${getReaderThemeClass()}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: readingTheme === 'sepia' ? '#FAF4EB' : readingTheme === 'darker' ? '#12131C' : '#FFFFFF',
                color: readingTheme === 'sepia' ? '#433422' : readingTheme === 'darker' ? '#F3F4F6' : 'var(--text-main)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition-smooth)'
              }}
            >
            {/* Header config bar */}
            <div style={{ 
              padding: '12px 16px', 
              borderBottom: `1px solid ${readingTheme === 'sepia' ? '#EFE4D2' : 'var(--border-light)'}`,
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <button 
                onClick={() => setCurrentDevotional(null)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'inherit', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 13,
                  fontWeight: 600
                }}
              >
                <ChevronLeft size={22} />
                <span>Voltar</span>
              </button>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button 
                  onClick={handleShareDevotional}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Compartilhar"
                >
                  <Share2 size={18} />
                </button>

                <button 
                  onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal')}
                  style={{
                    background: 'none',
                    border: `1.5px solid ${readingTheme === 'sepia' ? '#EFE4D2' : 'var(--border-light)'}`,
                    borderRadius: 8,
                    padding: '4px 8px',
                    fontSize: 11,
                    color: 'inherit',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Letra: {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
                </button>

                <button 
                  onClick={() => setReadingTheme(readingTheme === 'default' ? 'sepia' : readingTheme === 'sepia' ? 'darker' : 'default')}
                  style={{
                    background: 'none',
                    border: `1.5px solid ${readingTheme === 'sepia' ? '#EFE4D2' : 'var(--border-light)'}`,
                    borderRadius: 8,
                    padding: '4px 8px',
                    fontSize: 11,
                    color: 'inherit',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Tema: {readingTheme === 'default' ? 'Claro' : readingTheme === 'sepia' ? 'Sépia' : 'Escuro'}
                </button>
              </div>
            </div>

            {/* Reading scrollable area */}
            <div 
              className="screen-content custom-scroll" 
              style={{ 
                padding: '24px 20px 100px 20px',
                fontSize: fontSize === 'normal' ? '15px' : fontSize === 'large' ? '17px' : '19px',
                lineHeight: '165%'
              }}
            >
              {/* Theme Badge & Reference */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ 
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: 20,
                  backgroundColor: readingTheme === 'sepia' ? 'rgba(67, 52, 34, 0.08)' : 'rgba(0,0,0,0.04)',
                  fontSize: 11,
                  fontWeight: 700
                }}>
                  {currentDevotional.theme.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-second)' }}>
                  {activeStory.biblicalReference}
                </div>
              </div>

              {/* Alternative Story Swapper */}
              {currentDevotional.stories.length > 1 && (
                <div style={{ marginBottom: 18 }}>
                  <button 
                    onClick={() => setStoryIndex((prev) => (prev + 1) % currentDevotional.stories.length)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: readingTheme === 'sepia' ? 'rgba(67, 52, 34, 0.03)' : 'rgba(0,0,0,0.02)',
                      border: `1.5px solid ${readingTheme === 'sepia' ? '#EFE4D2' : 'var(--border-light)'}`,
                      borderRadius: 14,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      color: 'inherit',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    🔄 Ver outra lição ({storyIndex + 1}/{currentDevotional.stories.length})
                  </button>
                </div>
              )}

              {/* Story Title */}
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: fontSize === 'normal' ? '22px' : fontSize === 'large' ? '25px' : '28px', 
                fontWeight: 700, 
                marginBottom: 20,
                color: 'inherit'
              }}>
                {activeStory.biblicalStoryTitle}
              </h2>

              {/* 1. Biblical Story */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-second)', letterSpacing: 1.2, marginBottom: 8 }}>1. HISTÓRIA BÍBLICA</h4>
                <p style={{ 
                  color: 'inherit',
                  whiteSpace: 'pre-line'
                }}>
                  {activeStory.biblicalStory}
                </p>
              </div>

              {/* 2. Reflection */}
              <div style={{ 
                marginBottom: 28, 
                padding: 16, 
                borderRadius: 16, 
                backgroundColor: readingTheme === 'sepia' ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.015)',
                borderLeft: '4px solid var(--text-main)'
              }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-main)', letterSpacing: 1.2, marginBottom: 6 }}>2. REFLEXÃO</h4>
                <p style={{ 
                  color: 'inherit',
                  whiteSpace: 'pre-line'
                }}>
                  {activeStory.reflection}
                </p>
              </div>

              {/* 3. Conversation Questions */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-second)', letterSpacing: 1.2, marginBottom: 12 }}>3. PERGUNTAS</h4>
                <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {activeStory.questions.map((q, idx) => (
                    <li key={idx} style={{ color: 'inherit' }}>{q}</li>
                  ))}
                </ol>
              </div>

              {/* 4. Weekly Challenge */}
              <div style={{ 
                marginBottom: 28,
                padding: 16,
                backgroundColor: readingTheme === 'sepia' ? 'rgba(67, 52, 34, 0.04)' : 'rgba(0,0,0,0.01)',
                borderRadius: 14,
                border: `1.5px solid ${readingTheme === 'sepia' ? '#EFE4D2' : 'var(--border-light)'}`
              }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-main)', letterSpacing: 1.2, marginBottom: 6 }}>4. APLICAÇÃO PRÁTICA (DESAFIO PARA AMANHÃ)</h4>
                <p style={{ color: 'inherit', fontWeight: 600 }}>
                  {activeStory.challenge}
                </p>
              </div>

              {/* 5. Joint Dialogue Prayer */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-second)', letterSpacing: 1.2, marginBottom: 12 }}>5. ORAÇÃO EM CONJUNTO</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeStory.prayer.dialogue.map((line, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: 10,
                        borderRadius: 12,
                        backgroundColor: readingTheme === 'sepia' ? 'rgba(67, 52, 34, 0.04)' : 'rgba(0,0,0,0.02)',
                        borderLeft: `3px solid ${
                          line.role === 'Pai' 
                            ? 'var(--text-second)' 
                            : line.role === 'Filho' 
                              ? 'var(--text-muted)' 
                              : 'var(--text-main)'
                        }`,
                        alignSelf: line.role === 'Pai' ? 'flex-start' : line.role === 'Filho' ? 'flex-end' : 'center',
                        maxWidth: '85%'
                      }}
                    >
                      <strong style={{ fontSize: 10, display: 'block', color: 'inherit', marginBottom: 2 }}>
                        {line.role.toUpperCase()}:
                      </strong>
                      <span style={{ fontSize: 13 }}>{line.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Concluding Quote */}
              {activeStory.finalMessage && (
                <div style={{ 
                  margin: '12px 0 30px 0',
                  padding: 16,
                  border: `1.5px dashed ${readingTheme === 'sepia' ? '#E2D3B8' : 'var(--border-light)'}`,
                  borderRadius: 16,
                  textAlign: 'center',
                  fontStyle: 'italic',
                  color: 'inherit',
                  backgroundColor: 'transparent'
                }}>
                  <h4 style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, fontStyle: 'normal', color: 'var(--text-muted)' }}>MENSAGEM FINAL</h4>
                  "{activeStory.finalMessage}"
                </div>
              )}

              {/* Complete button */}
              <button 
                onClick={handleCompleteDevotional}
                className="btn-primary"
                style={{ marginTop: 10 }}
              >
                Concluir Noite & Registrar <Check size={18} />
              </button>
            </div>
          </div>
        );
      })()}
      </div>
    </div>
    </>
  );
}
