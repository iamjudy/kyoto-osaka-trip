import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 重要：這裡必須跟您的 GitHub Repository 名稱一樣
  base: '/kyoto-osaka-trip/',
  build: {
    outDir: 'dist',
  }
});