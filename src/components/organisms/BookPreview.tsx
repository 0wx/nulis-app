import { BookSVG } from 'components/molecules/BookSVG'
import { FC } from 'react'

export const BookPreview: FC = () => {
  return (
    <div className="overflow-scroll h-full md:min-w-[calc(50vw-24px)] md:overflow-auto md:flex md:justify-end md:p-6 md:shadow-none shadow-xl">
      <div className="overflow-auto rounded-lg shadow-xl">
        <BookSVG />
      </div>
    </div>
  )
}
