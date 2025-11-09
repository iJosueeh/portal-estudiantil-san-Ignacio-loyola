/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D3557', // dark blue
        secondary: '#F4A261', // gold
        accent: '#2A9D8F', // green
        celeste: '#87CEEB', // light blue
        neutral: { // Full neutral color scale
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // If forms plugin is needed
    require('@tailwindcss/typography'), // If typography plugin is needed
    require('@tailwindcss/aspect-ratio'), // If aspect-ratio plugin is needed
    require('@tailwindcss/container-queries'), // If container-queries plugin is needed
    // Enable backdrop-filter utilities
    function ({ addUtilities }) {
      addUtilities({
        '.backdrop-blur-sm': {
          'backdrop-filter': 'blur(4px)',
        },
        '.backdrop-blur-md': {
          'backdrop-filter': 'blur(12px)',
        },
        '.backdrop-blur-lg': {
          'backdrop-filter': 'blur(16px)',
        },
        '.backdrop-blur-xl': {
          'backdrop-filter': 'blur(24px)',
        },
      }, ['responsive']);
    },
  ],
}
