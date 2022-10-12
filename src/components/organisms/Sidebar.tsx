import { Cancel } from 'components/atoms/Icons'
import { navLinks } from 'libs/const'
import Link from 'next/link'
import { FC } from 'react'

export const Sidebar: FC<{ show: boolean; onClose?: () => void }> = ({
  show,
  onClose,
}) => {
  return (
    <div
      className={`md:hidden fixed top-0 left-0 w-[100vw] h-[100vh] bg-base-300 z-[150] transition-transform p-6 flex flex-col gap-10 ${
        !show ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <div onClick={onClose}>
        <Cancel />
      </div>
      {navLinks.map(({ url, label }) => {
        return (
          <div
            key={'sidebar-' + label}
            className="transition-transform hover:underline "
          >
            <Link href={url}>{label}</Link>
          </div>
        )
      })}
    </div>
  )
}
