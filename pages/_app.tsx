import { ThemeContextProvider } from '@/contexts/ThemeContext'
import { AppLayout } from '@/layout/AppLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeContextProvider>
  )
}
