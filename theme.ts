import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  useSystemColorMode: false,
}

const token = {
  color: {
    brand: '#6d28d9',
  },
}

export const headingSizeMap = {
  h1: ['4xl', '6xl', '6xl'],
  h2: '4xl',
  h3: '4xl',
  h4: '4xl',
}

export const theme = extendTheme({
  config,
  shadows: {
    outline: `0 0 0 2px ${token.color.brand + '50'}`,
  },
  colors: {
    brand: token.color.brand,
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
  styles: {
    focusBorderColor: 'brand.500',
  },
})
