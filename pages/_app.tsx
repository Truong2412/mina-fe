import { AppLoadingProvider } from '@/contexts/LoadingContext'
import { ThemeContextProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'
import { AppLayout } from '@/layout/AppLayout'
import { Auth } from '@/middleware/Auth'
import '@/styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'sakura-js/dist/sakura.min.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useEffect } from 'react'
//@ts-ignore
import Sakura from 'sakura-js/dist/sakura.min.js'

export function SakuraEffect() {
  useEffect(() => {
    Sakura('body')
  }, [])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AppLoadingProvider>
        <ThemeContextProvider>
          <UserProvider>
            <Auth>
              <AppLayout>
                <SakuraEffect />
                <Component {...pageProps} />
              </AppLayout>
            </Auth>
          </UserProvider>
        </ThemeContextProvider>
      </AppLoadingProvider>
    </QueryClientProvider>
  )
}
