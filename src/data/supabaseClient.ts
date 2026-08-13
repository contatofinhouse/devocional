import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const customFetch = (url: RequestInfo | URL, options?: RequestInit) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15000); // 15 segundos de timeout
  return fetch(url, {
    ...options,
    signal: controller.signal
  }).finally(() => clearTimeout(id));
};

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
  },
  global: {
    fetch: customFetch
  }
});
