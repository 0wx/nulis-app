import { Moon, Sun } from 'components/atoms/Icons'
import { useTheme } from 'hooks/useTheme'
import { FC, useEffect } from 'react'
import { themeChange } from 'theme-change'
import type { Themes } from 'typings/context'

export const Theme: FC = () => {
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    themeChange(false)
    const currentTheme = localStorage.getItem('theme') as Themes | null
    if (currentTheme) {
      setTheme(currentTheme === 'dark' ? 'garden' : 'dark')
    }
  }, [setTheme])
  return (
    <button
      className=""
      data-set-theme={theme}
      onClick={() => {
        setTheme((t) => (t === 'dark' ? 'garden' : 'dark'))
      }}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  )
}
