import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

const supabaseUrl = 'https://xznzppgkkkkpzyvzemlr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bnpwcGdra2trcHp5dnplbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDIxNjMsImV4cCI6MjA3ODAxODE2M30.R7e76191bM6gsabfHh39aO6I6DCUrPGhy_K1HYIm8Sk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => {
        return Preferences.get({ key })
          .then(({ value }) => value)
          .catch((err) => {
            console.warn("Preferences.get failed, falling back to localStorage", err);
            return window.localStorage.getItem(key);
          });
      },
      setItem: (key, value) => {
        return Preferences.set({ key, value }).catch((err) => {
          console.warn("Preferences.set failed, falling back to localStorage", err);
          window.localStorage.setItem(key, value);
        });
      },
      removeItem: (key) => {
        return Preferences.remove({ key }).catch((err) => {
          console.warn("Preferences.remove failed, falling back to localStorage", err);
          window.localStorage.removeItem(key);
        });
      }
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
