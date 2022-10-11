import { useBook } from 'hooks/useBook'
import { download } from 'libs/download'
import { FC } from 'react'
import { Download as DownloadIcon } from './Icons'
export const Download: FC = () => {
  const { book } = useBook()
  return (
    <button
      onClick={() => download(book.ref.current)}
      className="btn btn-ghost gap-2"
    >
      <DownloadIcon /> Download
    </button>
  )
}
