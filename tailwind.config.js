const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.blue,
          DEFAULT: "#377DFF",
          dark: "#124198",
          hover:'#658dd7'
        },
        success: {
          light: "#8be77b",
          DEFAULT: "#00bd1d",
          dark: "#008916",
          hover: "#6cc7a7"
        },
        danger:{
          light: "#f16484",
          DEFAULT: "#f53f66",
          dark: "#a80029",
          hover: "#ef7491",
        },
        warning:{
          light: "#ec9f76",
          DEFAULT: "#e88550",
          dark: "#f19564",
          hover: "#ffa882",
        },
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '26px',
        '5xl': '28px',
      },
      borderRadius: {
        'none': '0',
        'sm': '8px',
        DEFAULT: '16px',
        'md': '20px',
        'lg': '26px',
        'large': '32px',
        'full': '9999px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
