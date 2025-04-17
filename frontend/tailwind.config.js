/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],  
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      colors: {
        'dark-Blue': '#00023b',
        'bright-Blue': '#0014d3',
        'light-Blue': '#095cd4',
        'gray-Blue': '#292e66',
      },
    },
  },
  plugins: [],
}

