import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    maisTodos: {
      100: '#00A786',
      200: '#008465',
    },
    brand: {
      100: '#f2f2f2',
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  }
})

export default theme
