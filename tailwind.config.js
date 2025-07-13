/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'paper': '#f5eedb',
        'sea-salt': '#F9F7F7',
        'dark-serpent': '#133020',
        'castleton': '#046241',
        'white': '#ffffff',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}