import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.N8N_CHAT_WEBHOOK': JSON.stringify(env.N8N_CHAT_WEBHOOK),
        'process.env.N8N_FORM_WEBHOOK': JSON.stringify(env.N8N_FORM_WEBHOOK)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
