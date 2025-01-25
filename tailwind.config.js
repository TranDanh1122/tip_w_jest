/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,js,tsx,jsx}"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        mb: { min: "0", max: "767px" }
      }
    },
  },
  plugins: [],
}

