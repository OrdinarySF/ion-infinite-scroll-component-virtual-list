import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cn.holmescraft',
  appName: 'ionic-demo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
