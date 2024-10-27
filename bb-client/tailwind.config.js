/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        header: 'var(--color-header)',
        green: '#34C687',
        red: '#DA3E27',
        yellow: '#FAB627',
      },
    },
  },
  plugins: [],
}