const token = {
  color: {
    brand: '#1116bb',
    dark: '#0c2210',
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: `${token.color.brand + '10'}`,
          200: `${token.color.brand + '20'}`,
          300: `${token.color.brand + '30'}`,
          400: `${token.color.brand + '40'}`,
          500: `${token.color.brand + '50'}`,
          600: `${token.color.brand + '60'}`,
          700: `${token.color.brand + '70'}`,
          800: `${token.color.brand + '80'}`,
          900: `${token.color.brand + '90'}`,
          1000: `${token.color.brand}`,
        },
        dark: {
          100: `${token.color.dark + '10'}`,
          200: `${token.color.dark + '20'}`,
          300: `${token.color.dark + '30'}`,
          400: `${token.color.dark + '40'}`,
          500: `${token.color.dark + '50'}`,
          600: `${token.color.dark + '60'}`,
          700: `${token.color.dark + '70'}`,
          800: `${token.color.dark + '80'}`,
          900: `${token.color.dark + '90'}`,
          1000: `${token.color.dark}`,
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          1000: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
}
