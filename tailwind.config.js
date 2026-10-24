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
      // Geoform (títulos) no está en Google Fonts: si se agrega el OTF con @font-face
      // se usa solo; mientras tanto cae en Montserrat, la más parecida.
      fontFamily: {
        display: ['Geoform', 'Montserrat', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
