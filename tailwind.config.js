/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Paleta oficial — Manual de marca Impulso Cero Academy (3.3 y 3.4)
      colors: {
        azul: { DEFAULT: '#2c3159', deep: '#1f2342', ink: '#171a33' },
        naranja: { DEFAULT: '#d78133', soft: '#e39555' },
        grisazul: '#b9c1cc',
        niebla: '#e9ebef',
        durazno: '#f6c29f',
        marfil: '#f7f4ee',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
