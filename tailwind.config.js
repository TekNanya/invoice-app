/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        purple: {
          500: '#7C5DFA',
          400: '#9277FF',
        },
        // Semantic Colors for UI
        danger: {
          500: '#EC5757',
          400: '#FF9797',
        },
        // Neutral Grays (Designed for Light & Dark mode contrast)
        vulcan: '#141625',     // Main Dark BG
        shipCove: '#7E88C3',   // Subtle text
        whisper: '#F8F8FB',    // Main Light BG
        mirage: '#1E2139',     // Dark Mode Cards
        ebony: '#0C0E16',      // Darkest headers
        selago: '#DFE3FA',     // Form labels/borders
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}