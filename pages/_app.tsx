import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'
import { lightTheme } from '../themes'
import { UiProvider } from '../context/ui'
import { CartProvider } from '../context/cart'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
    value={{
      // refreshInterval: 500,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
    >
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </SWRConfig>

  )
}

export default MyApp
