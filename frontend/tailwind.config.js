import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        gray: {
          ...colors.gray,
          50: '#EFEFEF',
        },
        blue: {
          ...colors.blue,
          50: '#f8f9ff',
          100: '#e8eaff',
          600: '#393BE4',
          700: '#2d30c4',
        },
        indigo: colors.indigo,
        slate: colors.slate,
        white: colors.white,
        'light-gray': '#EFEFEF',
        'primary-blue': '#393BE4',
      },
    },
  },
  plugins: [],
};
