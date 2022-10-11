import { useTheme } from 'hooks/useTheme'
import { FC } from 'react'

export const Logo: FC = () => {
  const { theme } = useTheme()
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={theme === 'garden' ? '/logo-white.png' : '/logo-black.png'}
      alt="nulis.app"
      width={110}
    />
  )
}
