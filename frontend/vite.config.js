import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite: apenas o plugin oficial do React (JSX/Fast Refresh).
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
