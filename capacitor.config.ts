import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.contatofinhouse.lecti',
  appName: 'lecti',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '812385850733-83dl5cbbb9kqee7dul3f4hgrjd4bnpmm.apps.googleusercontent.com', // Substitua pelo seu ID de Cliente Web do Google Cloud Console
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
