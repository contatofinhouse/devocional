import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Heart, 
  HelpCircle, 
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
  Bell,
  Settings
} from 'lucide-react';

import type { KidProfile, ParentLog, Devotional } from './data/mockDevotionals';
import { 
  TRAILS, 
  KIDS_CRISIS_SITUATIONS,
  ADULT_CRISIS_SITUATIONS
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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [developmentMode, setDevelopmentMode] = useState<'personal' | 'kids'>('kids');
  const [userAge, setUserAge] = useState<number>(35);
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
  const [completedCalendarNights, setCompletedCalendarNights] = useState<number[]>([]);
  const [currentCalendarNight, setCurrentCalendarNight] = useState<number | null>(null);
  
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
        }, 1200); // match transition duration
        return () => clearTimeout(hiddenTimer);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authLoading]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
        setDevelopmentMode(profile.development_mode || 'kids');
        setUserAge(profile.user_age || 35);
        setIsPremium(profile.is_premium === true);
        setShowOnboarding(false);
      } else {
        setIsPremium(false);
        setShowOnboarding(true);
        setOnboardingStep(1);
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
          new Notification('lecti 🌙', {
            body: `Hora do seu momento de desenvolvimento diário com o(a) ${kidProfile.name || 'seu filho(a)'}! Vamos lá?`,
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
    const shareText = `*lecti*\n\n*Tema:* ${currentDevotional.theme}\n*História:* ${activeStory.biblicalStoryTitle}\n\n*Desafio:* ${activeStory.challenge}\n\n*Mensagem Final:* "${activeStory.finalMessage}"`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `lecti - ${currentDevotional.theme}`,
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
        development_mode: developmentMode,
        user_age: userAge,
        kid_name: developmentMode === 'kids' ? kidProfile.name : null,
        kid_age: developmentMode === 'kids' ? kidProfile.age : null,
        available_time: kidProfile.availableTime,
        interests: kidProfile.interests,
        hobbies: kidProfile.hobbies,
        difficulties: developmentMode === 'kids' ? kidProfile.difficulties : null,
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

  const loadDevotional = async (themeId: string): Promise<Devotional | null> => {
    let ageGroup = 'adulto';
    if (developmentMode === 'kids') {
      if (kidProfile.age <= 8) {
        ageGroup = 'kids';
      } else if (kidProfile.age <= 14) {
        ageGroup = 'teens';
      } else {
        ageGroup = 'young_adults';
      }
    }
    const cacheKey = `vf_cache_${themeId}_${developmentMode}_${ageGroup}`;

    // Se estiver offline, tenta carregar do cache local imediatamente
    if (!navigator.onLine) {
      const localCached = localStorage.getItem(cacheKey);
      if (localCached) {
        try {
          console.log(`Carregando do cache offline: ${themeId}`);
          return JSON.parse(localCached);
        } catch (e) {
          console.warn('Erro ao ler cache local offline:', e);
        }
      }
    }

    try {
      // 1. Tentar buscar lições do Supabase
      const { data: lessons, error } = await supabase
        .from('dev_lessons')
        .select(`
          id,
          theme_id,
          theme_name,
          title,
          biblical_reference,
          biblical_story,
          reflection,
          challenge,
          final_message
        `)
        .eq('theme_id', themeId)
        .eq('development_mode', developmentMode)
        .eq('age_group', ageGroup)
        .order('lesson_number', { ascending: true });

      if (error) throw error;

      if (lessons && lessons.length > 0) {
        const lessonIds = lessons.map(l => l.id);
        const { data: dbQuestions } = await supabase
          .from('dev_questions')
          .select('lesson_id, question_text, display_order')
          .in('lesson_id', lessonIds)
          .order('display_order', { ascending: true });

        const { data: dbPrayers } = await supabase
          .from('dev_prayers')
          .select('lesson_id, role, text_content, display_order')
          .in('lesson_id', lessonIds)
          .order('display_order', { ascending: true });

        const stories = lessons.map(lesson => {
          const questions = (dbQuestions || [])
            .filter((q: any) => q.lesson_id === lesson.id)
            .map((q: any) => q.question_text);

          const dialogue = (dbPrayers || [])
            .filter((p: any) => p.lesson_id === lesson.id)
            .map((p: any) => ({ role: p.role, text: p.text_content }));

          return {
            biblicalReference: lesson.biblical_reference,
            biblicalStoryTitle: lesson.title,
            biblicalStory: lesson.biblical_story,
            reflection: lesson.reflection,
            questions: questions.length > 0 ? questions : ['Como podemos aplicar isso em nossa vida?'],
            challenge: lesson.challenge,
            prayer: {
              dialogue: dialogue.length > 0 ? dialogue : [
                { role: (developmentMode === 'kids' ? 'Pai' : 'Individual') as any, text: 'Querido Deus, ajuda-nos a colocar em prática tudo o que aprendemos hoje. Amém.' }
              ]
            },
            finalMessage: lesson.final_message
          };
        });

        const result = {
          id: themeId,
          theme: lessons[0].theme_name,
          stories: stories
        };

        // Salvar no cache local para uso offline posterior
        try {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch (e) {
          console.warn('Erro ao salvar no cache local:', e);
        }

        return result;
      }
    } catch (err) {
      console.warn('Erro ao carregar do Supabase, tentando cache local:', err);
      const localCached = localStorage.getItem(cacheKey);
      if (localCached) {
        try {
          return JSON.parse(localCached);
        } catch (e) {
          console.warn('Erro ao ler cache local após falha de rede:', e);
        }
      }
    }

    return null;
  };

  // trailThemeIndex: position within trail (0 = free, >0 = premium)
  // nightNumber: calendar night number (1-5 = free, >5 = premium)
  const handleOpenDevotional = async (id: string, customDevotional?: Devotional, trailThemeIndex?: number, nightNumber?: number) => {
    // Free tier limits:
    // - Trails: only the 1st devotional per trail (index 0)
    // - Calendar: only the first 5 nights
    const isLocked =
      !isPremium &&
      (
        (trailThemeIndex !== undefined && trailThemeIndex > 0) ||
        (nightNumber !== undefined && nightNumber > 3)
      );

    if (isLocked) {
      setShowPaywall(true);
      return;
    }

    // Rastreia qual noite do calendário foi aberta
    setCurrentCalendarNight(nightNumber !== undefined ? nightNumber : null);
    setStoryIndex(0);
    
    let dev: Devotional | null = null;
    if (customDevotional) {
      dev = customDevotional;
    } else {
      dev = await loadDevotional(id);
    }

    if (dev) {
      // Se for modo Pessoal (adulto), garante que o devocional está com formato e linguagem adaptados
      if (developmentMode === 'personal') {
        const adaptedStories = dev.stories.map(story => {
          const isIndividualAlready = story.prayer.dialogue.some(d => d.role === 'Individual');
          const combinedPrayerText = isIndividualAlready
            ? story.prayer.dialogue[0].text
            : story.prayer.dialogue.map(d => d.text).join(' ');

          const adaptedReflection = story.reflection
            .replace(/os nossos filhos/g, 'nossa própria vida')
            .replace(/seus filhos/g, 'sua vida')
            .replace(/em nosso lar com as crianças/g, 'em nossa vida diária')
            .replace(/escola/g, 'trabalho e relações');

          return {
            ...story,
            reflection: adaptedReflection,
            prayer: {
              dialogue: [
                { role: 'Individual' as const, text: combinedPrayerText }
              ]
            }
          };
        });
        dev = {
          ...dev,
          stories: adaptedStories
        };
      }
      
      setCurrentDevotional(dev);
    } else {
      alert('Esta trilha está sendo gerada pela IA e cadastrada no banco de dados. Por favor, aguarde alguns instantes ou tente outra virtude!');
    }
  };

  const getCrisisSituations = () => {
    return developmentMode === 'kids' ? KIDS_CRISIS_SITUATIONS : ADULT_CRISIS_SITUATIONS;
  };

  const handleSelectCrisis = (situationId: string) => {
    const sit = getCrisisSituations().find((s: any) => s.id === situationId);
    const themeId = sit ? sit.id : 'humildade';
    handleOpenDevotional(themeId);
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

    // Marca a noite do calendário como concluída
    if (currentCalendarNight !== null && !completedCalendarNights.includes(currentCalendarNight)) {
      setCompletedCalendarNights(prev => [...prev, currentCalendarNight!]);
    }
    setCurrentCalendarNight(null);
    setCurrentDevotional(null);
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reaction: ParentLog['reaction'] = newLogRating >= 5 ? 'loved' : newLogRating >= 4 ? 'good' : newLogRating >= 3 ? 'neutral' : 'difficult';
    const logDate = new Date();

    const tempLog: ParentLog = {
      id: `log-${Date.now()}`,
      date: 'Hoje às ' + logDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      devotionalId: currentDevotional?.id || 'personalizado',
      devotionalTitle: currentDevotional ? (currentDevotional.stories[storyIndex]?.biblicalStoryTitle || currentDevotional.stories[0].biblicalStoryTitle) : 'Prática de hoje',
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
          {/* Mosaic background of parent-child photos */}
          <div className="splash-mosaic">
            {['/splash/s1.png','/splash/s2.png','/splash/s3.png','/splash/s4.png','/splash/s5.png','/splash/s6.png'].map((src, i) => (
              <div key={i} className="splash-mosaic-cell">
                <img src={src} alt="" />
              </div>
            ))}
          </div>

          {/* Dark overlay */}
          <div className="splash-overlay" />

          {/* Frosted glass card */}
          <div className="splash-card">
            <div className="splash-logo">🙌</div>
            <h1 className="splash-title">lecti</h1>
            <p className="splash-subtitle">Desenvolvimento de caráter, meditação e conexão</p>
            <div className="splash-loader"></div>
          </div>
        </div>
      )}

      <div className="app-container fade-in">
        <div className="app-screen">
          {!user ? (
            // LOGIN SCREEN (when not authenticated)
            <div className="screen-content custom-scroll" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <div style={{ fontSize: 64, marginBottom: 12, display: 'inline-block', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.06))' }}>🙌</div>
                <h1 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 48, 
                  fontWeight: 900, 
                  color: 'var(--text-main)', 
                  marginTop: 6, 
                  lineHeight: '100%',
                  letterSpacing: '-0.06em',
                  textTransform: 'lowercase'
                }}>
                  lecti
                </h1>
                <p style={{ color: 'var(--text-second)', fontSize: 14, marginTop: 8, padding: '0 20px', lineHeight: '140%' }}>
                  Fortaleça o caráter, a mente e a conexão familiar através de práticas diárias, meditações e reflexões guiadas de 15 minutos.
                </p>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20, backgroundColor: '#FFFFFF', padding: 24, textAlign: 'center' }}>
                <h3 style={{ fontSize: 16, color: 'var(--text-main)', fontWeight: 700 }}>Comece sua Jornada</h3>
                <p style={{ fontSize: 13, color: 'var(--text-second)', lineHeight: '145%' }}>
                  Para salvar o seu progresso ou o dos seus filhos, manter sua ofensiva diária e sincronizar as anotações no diário.
                </p>
                <button 
                  onClick={handleGoogleLogin} 
                  style={{ 
                    padding: '14px 20px', 
                    borderRadius: 12, 
                    fontSize: 14, 
                    backgroundColor: '#FF385C', 
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    fontWeight: 600,
                    width: '100%'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#FFFFFF"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#FFFFFF"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-3.3-4.53-6.16-4.53z" fill="#FFFFFF"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#FFFFFF"/>
                  </svg>
                  Entrar com Google
                </button>
              </div>
            </div>
          ) : showOnboarding ? (
            // ONBOARDING FORM
            <div className="screen-content custom-scroll" style={{ padding: '16px 20px 40px 20px' }}>
              {onboardingStep === 1 ? (
                // PASSO 1: Escolha do Modo
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10 }}>
                  <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 44, marginBottom: 4, display: 'inline-block' }}>🙌</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-main)', lineHeight: '120%' }}>
                      Escolha o seu Foco
                    </h1>
                    <p style={{ color: 'var(--text-second)', fontSize: 13, marginTop: 4 }}>
                      Como você deseja usar o aplicativo lecti?
                    </p>
                  </div>

                  {/* Card 1: Desenvolvimento Filhos */}
                  <div 
                    onClick={() => {
                      setDevelopmentMode('kids');
                      setOnboardingStep(2);
                    }}
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: 20,
                      backgroundColor: '#FFF5F5',
                      border: '1.5px solid #FFD8D8',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <div style={{ fontSize: 36, backgroundColor: '#FFE3E3', width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨‍👩‍👧‍👦</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#C92A2A' }}>Desenvolvimento Filhos</h3>
                      <p style={{ fontSize: 12, color: '#E03131', marginTop: 4, lineHeight: '135%' }}>
                        Fortalecer valores, caráter e ter momentos de diálogo e oração com seus filhos.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Desenvolvimento Pessoal */}
                  <div 
                    onClick={() => {
                      setDevelopmentMode('personal');
                      setOnboardingStep(2);
                    }}
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: 20,
                      backgroundColor: '#F0F5FF',
                      border: '1.5px solid #D0E2FF',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <div style={{ fontSize: 36, backgroundColor: '#E0EBFF', width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A365D' }}>Desenvolvimento Pessoal</h3>
                      <p style={{ fontSize: 12, color: '#2B6CB0', marginTop: 4, lineHeight: '135%' }}>
                        Crescimento próprio e individual. Reflexões sobre fé, maturidade e autogoverno.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // PASSO 2: Formulário de Perfil correspondente
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 12, marginTop: 4 }}>
                    <div style={{ fontSize: 44, marginBottom: 4, display: 'inline-block' }}>📝</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-main)', lineHeight: '120%' }}>
                      {developmentMode === 'kids' ? 'Perfil da Família' : 'Seu Perfil'}
                    </h1>
                    <p style={{ color: 'var(--text-second)', fontSize: 13, marginTop: 2 }}>
                      {developmentMode === 'kids' 
                        ? 'Insira os dados para personalizar a experiência com seu filho' 
                        : 'Insira os dados para personalizar a sua jornada individual'}
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12, backgroundColor: '#FFFFFF', padding: 16 }}>
                      {/* Campo de Idade do Usuário (sempre solicitado) */}
                      <div>
                        <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Sua Idade (Anos)</label>
                        <input 
                          type="number" 
                          min={18}
                          max={100}
                          value={userAge} 
                          onChange={e => setUserAge(parseInt(e.target.value, 10))} 
                          required 
                          placeholder="Sua idade"
                          style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                        />
                      </div>

                      {/* Tempo diário (sempre solicitado) */}
                      <div>
                        <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Tempo diário disponível</label>
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

                      {developmentMode === 'kids' ? (
                        // Campos Específicos do Modo Filhos
                        <>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Nome do filho(a)</label>
                              <input 
                                type="text" 
                                value={kidProfile.name} 
                                onChange={e => setKidProfile({...kidProfile, name: e.target.value})} 
                                required={developmentMode === 'kids'}
                                placeholder="Ex: Lucas"
                                style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Idade do filho(a)</label>
                              <input 
                                type="number" 
                                min={4} 
                                max={18}
                                value={kidProfile.age} 
                                onChange={e => setKidProfile({...kidProfile, age: parseInt(e.target.value, 10)})} 
                                required={developmentMode === 'kids'}
                                style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Interesses dele(a)</label>
                              <input 
                                type="text" 
                                value={kidProfile.interests} 
                                onChange={e => setKidProfile({...kidProfile, interests: e.target.value})} 
                                placeholder="Ex: Futebol, games"
                                style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Hobbies dele(a)</label>
                              <input 
                                type="text" 
                                value={kidProfile.hobbies} 
                                onChange={e => setKidProfile({...kidProfile, hobbies: e.target.value})} 
                                placeholder="Ex: Desenhar"
                                style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Dificuldade do filho(a)</label>
                            <input 
                              type="text" 
                              value={kidProfile.difficulties} 
                              onChange={e => setKidProfile({...kidProfile, difficulties: e.target.value})} 
                              placeholder="Ex: Teimosia, ansiedade"
                              style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                            />
                          </div>
                        </>
                      ) : (
                        // Campos Específicos do Modo Pessoal (Adulto)
                        <>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Seus Interesses</label>
                              <input 
                                type="text" 
                                value={kidProfile.interests} 
                                onChange={e => setKidProfile({...kidProfile, interests: e.target.value})} 
                                placeholder="Ex: Livros, liderança"
                                style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Seus Hobbies</label>
                              <input 
                                type="text" 
                                value={kidProfile.hobbies} 
                                onChange={e => setKidProfile({...kidProfile, hobbies: e.target.value})} 
                                placeholder="Ex: Corrida, música"
                                style={{ padding: '8px 12px', fontSize: 13, borderRadius: 10 }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button 
                        type="button" 
                        onClick={() => setOnboardingStep(1)} 
                        className="btn-secondary" 
                        style={{ padding: 12, borderRadius: 12, fontSize: 14 }}
                      >
                        Voltar
                      </button>
                      <button 
                        type="submit" 
                        className="btn-primary" 
                        style={{ padding: 12, borderRadius: 12, fontSize: 14, backgroundColor: '#FF385C', border: 'none', flex: 2 }}
                      >
                        Concluir Cadastro <ChevronRight size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{streakCount} Noites de celebração</span>
                    {isOffline && (
                      <span style={{
                        fontSize: 9,
                        fontWeight: 600,
                        backgroundColor: '#F3F4F6',
                        color: 'var(--text-second)',
                        padding: '2px 6px',
                        borderRadius: 6,
                        border: '1px solid var(--border-light)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#9CA3AF' }} /> Offline
                      </span>
                    )}
                  </div>
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
                    <p style={{ fontSize: 13, color: 'var(--text-second)' }}>
                      {developmentMode === 'kids' 
                        ? 'Escolha um tema e comecem a ler juntos.' 
                        : 'Escolha um tema para refletir e praticar.'}
                    </p>
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
                        {trail.themes.map((theme, themeIndex) => {
                          const IconComp = iconMap[theme.icon] || HelpCircle;
                          const isCompleted = unlockedMedals.includes(theme.name);
                          const isLocked = !isPremium && themeIndex > 0;
                          
                          return (
                            <button
                              key={theme.id}
                              onClick={() => handleOpenDevotional(theme.id, undefined, themeIndex)}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 6,
                                background: 'none',
                                border: 'none',
                                minWidth: 70,
                                flexShrink: 0,
                                cursor: 'pointer',
                                opacity: isLocked ? 0.55 : 1
                              }}
                            >
                              <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                backgroundColor: isCompleted ? '#FFFFFF' : 'rgba(0,0,0,0.03)',
                                border: `1.5px solid ${isCompleted ? trail.color : isLocked ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.06)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isCompleted ? trail.color : 'var(--text-second)',
                                transition: 'var(--transition-smooth)',
                                position: 'relative'
                              }}>
                                {isLocked ? <span style={{ fontSize: 16 }}>🔒</span> : <IconComp size={18} />}
                                {isCompleted && !isLocked && (
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

              {/* TAB 2: CALENDAR — agrupado por trilha (Opção B) */}
              {activeTab === 'calendar' && (() => {
                // Gera noites agrupadas: cada tema tem 6 noites, ordenadas por trilha
                let globalNight = 0;
                const trailGroups = TRAILS.map(trail => ({
                  ...trail,
                  nightItems: trail.themes.flatMap(theme =>
                    Array.from({ length: 6 }, (_, i) => {
                      globalNight++;
                      return {
                        dayNumber: globalNight,
                        nightOfTheme: i + 1,
                        themeId: theme.id,
                        themeName: theme.name,
                        trailColor: trail.color,
                        trailBg: trail.bgColor,
                        title: `${theme.name}`
                      };
                    })
                  )
                }));

                const allNights = trailGroups.flatMap(g => g.nightItems);

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)' }}>Jornada por Trilhas</h2>
                      <p style={{ fontSize: 13, color: 'var(--text-second)' }}>
                        {allNights.length} noites organizadas por trilha — uma trilha por vez, do início ao fim.
                      </p>
                    </div>

                    <input 
                      type="text" 
                      placeholder="🔍 Buscar por tema..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ backgroundColor: '#FAFAFB', border: '1px solid var(--border-light)', padding: 10, borderRadius: 10, outline: 'none', width: '100%', fontSize: 13 }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxHeight: '60vh', overflowY: 'auto', paddingRight: 4 }} className="custom-scroll">
                      {trailGroups.map(trail => {
                        const filteredNights = trail.nightItems.filter(n =>
                          !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        if (filteredNights.length === 0) return null;

                        const doneInTrail = filteredNights.filter(n => completedCalendarNights.includes(n.dayNumber)).length;

                        return (
                          <div key={trail.id}>
                            {/* Cabeçalho da Trilha */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: 10,
                              padding: '10px 14px',
                              backgroundColor: trail.bgColor,
                              borderRadius: 12,
                              border: `1px solid ${trail.color}30`
                            }}>
                              <div>
                                <span style={{ fontSize: 13, fontWeight: 800, color: trail.color }}>{trail.title.toUpperCase()}</span>
                                <span style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginTop: 1 }}>
                                  {trail.themes.length} temas · {trail.nightItems.length} noites
                                </span>
                              </div>
                              {doneInTrail > 0 && (
                                <span style={{ fontSize: 11, color: trail.color, fontWeight: 700, background: `${trail.color}20`, padding: '3px 10px', borderRadius: 20 }}>
                                  {doneInTrail}/{filteredNights.length} feitas
                                </span>
                              )}
                            </div>

                            {/* Noites da Trilha */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {filteredNights.map((night) => {
                                const isLocked = !isPremium && night.dayNumber > 3;
                                const isDone = completedCalendarNights.includes(night.dayNumber);

                                return (
                                  <div 
                                    key={night.dayNumber}
                                    onClick={() => handleOpenDevotional(night.themeId, undefined, undefined, night.dayNumber)}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      padding: '12px 14px',
                                      backgroundColor: isDone ? '#F0FFF4' : isLocked ? '#F9FAFB' : '#fff',
                                      borderRadius: 12,
                                      border: `1px solid ${isDone ? '#86EFAC' : '#E9EDF2'}`,
                                      opacity: isLocked ? 0.6 : 1,
                                      cursor: 'pointer',
                                      transition: 'var(--transition-smooth)'
                                    }}
                                  >
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                      {/* Badge da noite do tema */}
                                      <div style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 8,
                                        backgroundColor: isDone ? '#22C55E' : isLocked ? '#F3F4F6' : `${trail.color}15`,
                                        border: `1.5px solid ${isDone ? '#16A34A' : isLocked ? '#D1D5DB' : trail.color}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 11,
                                        fontWeight: 800,
                                        color: isDone ? '#fff' : isLocked ? '#9CA3AF' : trail.color,
                                        flexShrink: 0
                                      }}>
                                        {isLocked ? '🔒' : isDone ? '✓' : night.nightOfTheme}
                                      </div>
                                      <div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: isDone ? '#15803D' : isLocked ? 'var(--text-muted)' : 'var(--text-main)', display: 'block' }}>
                                          {isLocked ? 'Conteúdo Premium' : night.themeName}
                                        </span>
                                        <span style={{ fontSize: 11, color: isDone ? '#16A34A' : 'var(--text-second)', fontWeight: 500, marginTop: 1, display: 'block' }}>
                                          {isDone ? `Noite ${night.nightOfTheme} de 6 · Concluída ✨` : `Noite ${night.nightOfTheme} de 6`}
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      {isLocked
                                        ? <span style={{ fontSize: 10, color: '#FF385C', fontWeight: 700, background: '#FFF0F2', padding: '3px 8px', borderRadius: 20 }}>Premium</span>
                                        : isDone
                                          ? <span style={{ fontSize: 10, color: '#16A34A', fontWeight: 700, background: '#DCFCE7', padding: '3px 8px', borderRadius: 20 }}>✓ Feita</span>
                                          : <ChevronRight size={16} style={{ color: 'var(--text-second)' }} />}
                                    </div>
                                  </div>
                                );
                              })}
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
                      {developmentMode === 'kids'
                        ? 'Selecione um sentimento ou situação real que seu filho viveu hoje para iniciar uma conversa focada.'
                        : 'Selecione um sentimento ou situação real que você viveu hoje para iniciar uma reflexão focada.'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {getCrisisSituations().map((sit: any) => (
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

              {/* TAB 4: PROFILE CONFIG & DIARY */}
              {activeTab === 'parent' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)' }}>
                      {developmentMode === 'kids' ? 'Diário dos Pais & Ajustes' : 'Diário Pessoal & Ajustes'}
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--text-second)' }}>
                      {developmentMode === 'kids' 
                        ? 'Acompanhe o desenvolvimento e ajuste os parâmetros familiares.' 
                        : 'Acompanhe seu progresso e ajuste as configurações do perfil.'}
                    </p>
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

                  {/* Development Mode Toggle Switcher */}
                  <div className="card" style={{ padding: 16, backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontSize: 11, color: 'var(--text-second)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>Modo de Uso</label>
                    <div style={{ display: 'flex', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4 }}>
                      <button
                        onClick={async () => {
                          setDevelopmentMode('kids');
                          setCurrentDevotional(null);
                          if (user) {
                            await supabase.from('dev_profiles').update({ development_mode: 'kids' }).eq('id', user.id);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: developmentMode === 'kids' ? '#FFFFFF' : 'transparent',
                          color: developmentMode === 'kids' ? '#C92A2A' : 'var(--text-second)',
                          boxShadow: developmentMode === 'kids' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        👨‍👩‍👧‍👦 Desenvolvimento Filhos
                      </button>
                      <button
                        onClick={async () => {
                          setDevelopmentMode('personal');
                          setCurrentDevotional(null);
                          if (user) {
                            await supabase.from('dev_profiles').update({ development_mode: 'personal' }).eq('id', user.id);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: developmentMode === 'personal' ? '#FFFFFF' : 'transparent',
                          color: developmentMode === 'personal' ? '#1A365D' : 'var(--text-second)',
                          boxShadow: developmentMode === 'personal' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        🎯 Pessoal (Adulto)
                      </button>
                    </div>
                  </div>

                  {/* Edit Profile Configuration Form */}
                  <div className="card" style={{ padding: 16, backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <h3 style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: 700 }}>Editar Dados de Perfil</h3>
                    
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Sua Idade</label>
                        <input 
                          type="number" 
                          min={18}
                          value={userAge} 
                          onChange={e => setUserAge(parseInt(e.target.value, 10))} 
                          style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10 }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Tempo diário</label>
                        <select 
                          value={kidProfile.availableTime} 
                          onChange={e => setKidProfile({...kidProfile, availableTime: parseInt(e.target.value, 10)})}
                          style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10, height: 35 }}
                        >
                          <option value={10}>10 min</option>
                          <option value={15}>15 min</option>
                          <option value={20}>20 min</option>
                        </select>
                      </div>
                    </div>

                    {developmentMode === 'kids' && (
                      <>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Nome do filho(a)</label>
                            <input 
                              type="text" 
                              value={kidProfile.name} 
                              onChange={e => setKidProfile({...kidProfile, name: e.target.value})} 
                              placeholder="Nome do filho"
                              style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10 }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Idade do filho(a)</label>
                            <input 
                              type="number" 
                              min={4} 
                              max={18}
                              value={kidProfile.age} 
                              onChange={e => setKidProfile({...kidProfile, age: parseInt(e.target.value, 10)})} 
                              style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10 }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>Dificuldade do filho(a)</label>
                          <input 
                            type="text" 
                            value={kidProfile.difficulties} 
                            onChange={e => setKidProfile({...kidProfile, difficulties: e.target.value})} 
                            placeholder="Ex: ansiedade, teimosia"
                            style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10 }}
                          />
                        </div>
                      </>
                    )}

                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>{developmentMode === 'kids' ? 'Interesses do filho' : 'Seus Interesses'}</label>
                        <input 
                          type="text" 
                          value={kidProfile.interests} 
                          onChange={e => setKidProfile({...kidProfile, interests: e.target.value})} 
                          placeholder="Futebol, leitura, etc"
                          style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10 }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 3, fontWeight: 600 }}>{developmentMode === 'kids' ? 'Hobbies do filho' : 'Seus Hobbies'}</label>
                        <input 
                          type="text" 
                          value={kidProfile.hobbies} 
                          onChange={e => setKidProfile({...kidProfile, hobbies: e.target.value})} 
                          placeholder="Jogos, artes, etc"
                          style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10 }}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={async (e) => {
                        e.preventDefault();
                        if (user) {
                          const profileData = {
                            id: user.id,
                            development_mode: developmentMode,
                            user_age: userAge,
                            kid_name: developmentMode === 'kids' ? kidProfile.name : null,
                            kid_age: developmentMode === 'kids' ? kidProfile.age : null,
                            available_time: kidProfile.availableTime,
                            interests: kidProfile.interests,
                            hobbies: kidProfile.hobbies,
                            difficulties: developmentMode === 'kids' ? kidProfile.difficulties : null,
                            updated_at: new Date().toISOString()
                          };
                          const { error } = await supabase.from('dev_profiles').upsert(profileData);
                          if (error) {
                            alert('Erro ao atualizar perfil: ' + error.message);
                          } else {
                            alert('Perfil atualizado com sucesso!');
                          }
                        }
                      }}
                      className="btn-primary" 
                      style={{ padding: '8px 12px', fontSize: 12, borderRadius: 10, height: 35, width: 'auto', alignSelf: 'flex-end', marginTop: 4 }}
                    >
                      Salvar Alterações Perfil
                    </button>
                  </div>

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
                    <h3 style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 700 }}>
                      {developmentMode === 'kids' ? 'Anotar Conversa de Hoje' : 'Anotar Reflexão de Hoje'}
                    </h3>
                    
                    {/* Airbnb-style Star Rating */}
                    <div>
                      <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 6, fontWeight: 600 }}>
                        {developmentMode === 'kids' ? 'Avaliação da conversa' : 'Avaliação do meu foco/atenção'}
                      </label>
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
                      <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 6, fontWeight: 600 }}>
                        {developmentMode === 'kids' ? 'O que aconteceu hoje?' : 'Como foi o seu momento?'}
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(developmentMode === 'kids' 
                          ? [
                              'Conversa Fluida',
                              'Filho distraído',
                              'Teve choro',
                              'Pediu oração',
                              'Focou no desafio',
                              'Muitas dúvidas'
                            ]
                          : [
                              'Foco total',
                              'Mente dispersa',
                              'Senti paz',
                              'Novas decisões',
                              'Dificuldade em focar',
                              'Aprendizado forte'
                            ]
                        ).map((tag) => {
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
                      <label style={{ fontSize: 11, color: 'var(--text-second)', display: 'block', marginBottom: 4, fontWeight: 600 }}>
                        {developmentMode === 'kids' ? 'Anotação (opcional)' : 'Suas anotações / decisões'}
                      </label>
                      <textarea 
                        rows={2} 
                        value={newLogHowItWent}
                        onChange={e => setNewLogHowItWent(e.target.value)}
                        placeholder={developmentMode === 'kids' ? 'Escreva alguma observação ou momento marcante...' : 'Escreva suas reflexões ou resoluções de hoje...'} 
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
                onClick={() => { setActiveTab('journey'); setCurrentDevotional(null); }} 
                className={`nav-tab ${activeTab === 'journey' ? 'active' : ''}`}
              >
                <BookOpen size={20} />
                <span>Trilhas</span>
              </button>
              <button 
                onClick={() => { setActiveTab('calendar'); setCurrentDevotional(null); }} 
                className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
              >
                <Calendar size={20} />
                <span>Calendário</span>
              </button>
              <button 
                onClick={() => { setActiveTab('crisis'); setCurrentDevotional(null); }} 
                className={`nav-tab ${activeTab === 'crisis' ? 'active' : ''}`}
              >
                <Heart size={20} />
                <span>Situações</span>
              </button>
              <button 
                onClick={() => { setActiveTab('parent'); setCurrentDevotional(null); }} 
                className={`nav-tab ${activeTab === 'parent' ? 'active' : ''}`}
              >
                <Settings size={20} />
                <span>Config</span>
              </button>
            </div>
          </>
          )}

        {/* PAYWALL MODAL */}
        {showPaywall && (
          <div
            className="fade-in"
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0 0 0 0'
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowPaywall(false); }}
          >
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px 28px 0 0',
              padding: '28px 24px 40px 24px',
              width: '100%',
              maxWidth: 540,
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 36, marginBottom: 6 }}>⭐</div>
                  <h2 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 22, 
                    fontWeight: 900, 
                    color: 'var(--text-main)', 
                    lineHeight: '120%',
                    letterSpacing: '-0.04em',
                    textTransform: 'lowercase'
                  }}>
                    lecti premium
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--text-second)', marginTop: 4 }}>
                    Desbloqueie toda a jornada pessoal e familiar
                  </p>
                </div>
                <button onClick={() => setShowPaywall(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 22, lineHeight: 1, padding: 4 }}>✕</button>
              </div>

              {/* Benefits */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📖', title: 'Trilhas Completas', desc: 'Acesso a todos os temas de todas as trilhas' },
                  { icon: '🌙', title: '50 Noites de Práticas', desc: 'O plano completo de meditações e reflexões diárias' },
                  { icon: '🏆', title: 'Medalhas e Progresso', desc: 'Desbloqueie conquistas e veja o crescimento' },
                  { icon: '📝', title: 'Diário dos Pais Completo', desc: 'Histórico ilimitado de anotações e avaliações' },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ fontSize: 24, width: 40, height: 40, backgroundColor: '#FFF0F2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {b.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>{b.title}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-second)' }}>{b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ borderRadius: 18, background: 'linear-gradient(135deg, #FF385C, #c0165a)', padding: '18px 20px', textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>ACESSO VITALÍCIO</div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>R$</span>
                  <span style={{ color: '#FFFFFF', fontSize: 38, fontWeight: 800, lineHeight: 1 }}>29</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>,90</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>pagamento único, para sempre</div>
              </div>

              <button
                className="btn-primary"
                style={{ backgroundColor: '#FF385C', border: 'none', fontSize: 15, padding: 16 }}
                onClick={() => {
                  alert('Em breve disponível na Play Store! 🚀\nO acesso Premium será desbloqueado após a compra no aplicativo.');
                  setShowPaywall(false);
                }}
              >
                🔓 Desbloquear Acesso Premium
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
                Compra única via Play Store • Sem assinatura • Sem renovação
              </p>
            </div>
          </div>
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
                bottom: 76,
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

              {/* 5. Prayer */}
              <div style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-second)', letterSpacing: 1.2, marginBottom: 12 }}>
                  {developmentMode === 'kids' ? '5. ORAÇÃO EM CONJUNTO' : '5. ORAÇÃO PESSOAL'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeStory.prayer.dialogue.map((line, idx) => {
                    const isIndividual = line.role === 'Individual';
                    return (
                      <div 
                        key={idx}
                        style={{
                          padding: 12,
                          borderRadius: 12,
                          backgroundColor: readingTheme === 'sepia' ? 'rgba(67, 52, 34, 0.04)' : 'rgba(0,0,0,0.02)',
                          borderLeft: `3px solid ${
                            line.role === 'Pai' 
                              ? 'var(--text-second)' 
                              : line.role === 'Filho' 
                                ? 'var(--text-muted)' 
                                : 'var(--text-main)'
                          }`,
                          alignSelf: isIndividual ? 'stretch' : line.role === 'Pai' ? 'flex-start' : line.role === 'Filho' ? 'flex-end' : 'center',
                          maxWidth: isIndividual ? '100%' : '85%'
                        }}
                      >
                        {!isIndividual && (
                          <strong style={{ fontSize: 10, display: 'block', color: 'inherit', marginBottom: 2 }}>
                            {line.role.toUpperCase()}:
                          </strong>
                        )}
                        <span style={{ fontSize: 13, fontStyle: isIndividual ? 'italic' : 'normal' }}>{line.text}</span>
                      </div>
                    );
                  })}
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
