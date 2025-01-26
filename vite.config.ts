import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "c8", // Sử dụng c8 để đo coverage
        reporter: ["text", "html"], // Báo cáo coverage dưới dạng text và html
        all: true, // Bao gồm cả file chưa được test
        include: ["src/**/*.{ts,tsx}"], // Các file cần đo coverage
        exclude: ["node_modules", "tests"], // Loại trừ các file không cần thiết
      },
    }
})
