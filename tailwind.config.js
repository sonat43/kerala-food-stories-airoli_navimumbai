/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kasavu: '#F9F6F0',
        paper: '#FFFDF9',
        clay: '#B84A28',
        'clay-dark': '#94391E',
        teak: '#1E1915',
        palm: '#3A5A40',
        sand: '#E8DFD2',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 55px rgba(43, 35, 29, 0.10)',
        card: '0 12px 32px rgba(43, 35, 29, 0.08)',
      },
    },
  },
  plugins: [],
}
