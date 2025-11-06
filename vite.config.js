// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.js'], 
    css: true,
    restoreMocks: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'text', 'json'],
    },
    
    environmentOptions: {
      jsdom: { url: 'http://localhost' },
    },
    
  },
})
