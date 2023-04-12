import React, { createContext, ReactNode, useCallback } from 'react'
import { STORAGE, STORAGE_KEY, THEME } from '../const/app-const'
import { useStorage } from '../hooks'
import { themeContextType } from '../types/app-common-type'

const ThemeContext = createContext<themeContextType>({
  theme: THEME.LIGHT.style,
  changeTheme: (theme: string) => theme
})

type Props = {
  children: ReactNode
}

const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useStorage(
    STORAGE.LOCAL,
    STORAGE_KEY.THEME,
    THEME.LIGHT
  )

  const changeTheme = useCallback(
    (theme: string) => {
      if (theme === THEME.LIGHT.text) {
        setTheme(THEME.LIGHT)
      } else {
        setTheme(THEME.DARK)
      }
    },
    [setTheme]
  )

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
