import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { Config } from 'typings/context'

export const ConfigContext = createContext<{
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
}>({
  config: {
    font: '/fonts/3.woff2',
    fontSize: 11,
    blur: 0.5,
    color: '#444',
    lineHeight: 1.7,
  },
  setConfig: () => {},
})

export const useConfig = () => useContext(ConfigContext)
