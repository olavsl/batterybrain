/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          100: 'var(--color-background-100)',
          200: 'var(--color-background-200)',
          300: 'var(--color-background-300)',
          400: 'var(--color-background-400)',
          500: 'var(--color-background-500)',
          600: 'var(--color-background-600)',
          700: 'var(--color-background-700)',
          800: 'var(--color-background-800)',
          900: 'var(--color-background-900)',
        },
        text: {
          100: 'var(--color-text-100)',
          200: 'var(--color-text-200)',
          300: 'var(--color-text-300)',
          400: 'var(--color-text-400)',
          500: 'var(--color-text-500)',
          600: 'var(--color-text-600)',
          700: 'var(--color-text-700)',
          800: 'var(--color-text-800)',
          900: 'var(--color-text-900)',
          light: 'var(--color-text-light)',
          dark: 'var(--color-text-dark)',
        },
        green: '#34C687',
        red: '#DA3E27',
      },
    },
  },
  plugins: [],
}