import { Burger } from 'components/atoms/Icons'
import { Logo } from 'components/atoms/Logo'
import { Theme } from 'components/molecules/Theme'
import { navLinks } from 'libs/const'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Sidebar } from './Sidebar'

export const Navbar: FC = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const close = () => setShowSidebar(false)
  const open = () => setShowSidebar(true)
  return (
    <>
      <Sidebar show={showSidebar} onClose={close} />
      <div className="fixed h-16 w-full top-0 z-50 left-0 bg-neutral-focus/30 backdrop-blur py-2 px-6 md:px-12 flex items-center justify-between">
        <div className="flex gap-6 justify-center items-center">
          <div className="md:hidden" onClick={open}>
            <Burger />
          </div>
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-5">
            {navLinks.map(({ url, label }) => {
              return (
                <div key={url} className="hover:underline">
                  <Link href={url}>{label}</Link>
                </div>
              )
            })}
          </div>
          <Theme />
        </div>
      </div>
    </>
  )
}
