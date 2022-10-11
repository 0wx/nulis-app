import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { Themes } from 'typings/context'

export const ThemeContext = createContext<{
  theme: Themes
  setTheme: Dispatch<SetStateAction<Themes>>
}>({
  theme: 'garden',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)
