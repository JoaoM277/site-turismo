import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Configuração do Vite: plugin oficial do React (JSX/Fast Refresh) e o
// plugin do Tailwind CSS v4 (usado pelos componentes no padrão shadcn/ui
// em src/components/ui). O alias "@" aponta para "src", igual ao padrão
// shadcn (imports como "@/lib/utils").
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
});
