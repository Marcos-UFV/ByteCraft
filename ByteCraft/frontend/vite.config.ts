/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: 'dist', // Gera uma pasta 'dist' dentro de /frontend
    emptyOutDir: true, // Limpa a pasta antes de cada build
  },
  server: {
    port: 3030, // Mantém na 8081 (conforme configurado no Spring Security)
    host: true, // ESSENCIAL: Permite conexões externas ao container
    open: false, // RECOMENDADO: No Docker, o 'open' tenta abrir o browser DENTRO do container (e falha)
    proxy: {
      '/api': {
        // No Docker, usamos o nome do serviço definido no compose
        target: 'http://backend:8080', // Backend Spring Boot na 8080
        changeOrigin: true,
        secure: false,
      }
    }
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/tests/**/*.test.ts', 'tests/**/*.test.ts'],
  }
})