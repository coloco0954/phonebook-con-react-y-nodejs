/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': {
          '50': '#eef2ff',
          '100': '#dfe7ff',
          '200': '#c6d2ff',
          '300': '#a3b4fe',
          '400': '#7f8cfa',
          '500': '#676cf4',
          '600': '#4a43e8',
          '700': '#3f35cd',
          '800': '#332ea5',
          '900': '#2f2d82',
          '950': '#1c1a4c',
        },

      }
    },
  },
  plugins: [],
}

