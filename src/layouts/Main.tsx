import { Footer } from 'components/molecules/Footer'
import { Navbar } from 'components/organisms/Navbar'
import { ThemeContext } from 'hooks/useTheme'
import { FC, ReactNode, useState } from 'react'
import { Themes } from 'typings/context'

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>('garden')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="">
        <Navbar />
        <div className="container min-h-[calc(100vh-64px)] p-6 pt-20">
          {children}
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}
