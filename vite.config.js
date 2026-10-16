import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/App.jsx',
        'src/components/**',
        'src/context/**',
        'src/data/**',
        'src/pages/**',
        'src/services/**',
        'src/utils/**',
      ],
    },
  },
})
