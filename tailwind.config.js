/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#b88e2f',
        textTitle: '#3a3a3a',
        textSubtitle: '#666',
      },
    },
  },
  plugins: [],
}
