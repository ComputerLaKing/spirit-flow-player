import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.62a7d0ad35b14fcbb653a3a3ade41475',
  appName: 'spirit-flow-player',
  webDir: 'dist',
  server: {
    url: 'https://62a7d0ad-35b1-4fcb-b653-a3a3ade41475.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#8B5CF6',
      showSpinner: false
    }
  }
};

export default config;