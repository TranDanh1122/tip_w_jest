import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Kích hoạt globals như Jest
    environment: 'jsdom', // Môi trường để test các thành phần DOM
    setupFiles: './vitest.setup.ts', // File khởi tạo test
  },
})
