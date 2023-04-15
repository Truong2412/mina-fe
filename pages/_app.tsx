import { AppLoadingProvider } from '@/contexts/LoadingContext'
import { ThemeContextProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'
import { AppLayout } from '@/layout/AppLayout'
import { Auth } from '@/middleware/Auth'
import '@/styles/globals.css'
import 'react-quill/dist/quill.snow.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLoadingProvider>
      <ThemeContextProvider>
        <UserProvider>
          <Auth>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </Auth>
        </UserProvider>
      </ThemeContextProvider>
    </AppLoadingProvider>
  )
}
