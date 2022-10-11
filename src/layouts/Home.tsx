import { BookContext } from 'hooks/useBook'
import { ConfigContext } from 'hooks/useConfig'
import { testData } from 'libs/const'
import { createRef, FC, ReactNode, useState } from 'react'
import { Book, Config } from 'typings/context'

export const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config>({
    font: '/fonts/3.woff2',
    fontSize: 11,
    blur: 0.5,
    color: '#444',
  })

  const ref = createRef<SVGSVGElement>()
  const [book, setBook] = useState<Book>({ ...testData[0], ref })

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <BookContext.Provider value={{ book, setBook }}>
        <div className="flex flex-col md:flex-row gap-2">{children}</div>
      </BookContext.Provider>
    </ConfigContext.Provider>
  )
}
