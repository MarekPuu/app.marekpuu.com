import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3001,
    hmr: {
      clientPort: 3001,
    },
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
});
