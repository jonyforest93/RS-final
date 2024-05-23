/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        osvald: ['Oswald', 'sans-serif'],
        cormorant: ['Cormorant', 'sans-serif'],
      },
      colors: {
        primary: '#43ffd2',
        secondary: '#7d2253',
        accent: '#d978ac',
        btnText: '#040a0a',
        turquoiseEllipse: 'rgb(67, 255, 210)',
      },
    },
  },
  plugins: [],
}
