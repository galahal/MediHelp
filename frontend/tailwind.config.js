/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using a class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: {
          DEFAULT: '#1E293B',
        },
        lightBackground: {
          DEFAULT: '#E2E8F0',
        },
      },
      gradientColorStops: {
        dark: {
          start: '#1E293B',
          middle: '#334155',
          end: '#0F172A',
        },
        light: {
          start: '#FFFFFF',
          middle: '#BFDBFE',
          end: '#FBCFE8',
        },
      },
    },
  },
  plugins: [],
};
