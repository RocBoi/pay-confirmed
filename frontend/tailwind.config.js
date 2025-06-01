/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        accent: '#E94560',
        background: '#F5F5F5',
        brand: '#0F3460',
      },
    },
  },
  plugins: [],
}
