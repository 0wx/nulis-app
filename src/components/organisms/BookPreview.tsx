import { BookSVG } from 'components/molecules/BookSVG'
import { TextPreview } from 'components/molecules/TextPreview'
import { useBook } from 'hooks/useBook'
import { createRef, FC, useEffect, useState } from 'react'

export const BookPreview: FC = () => {
  const { book } = useBook()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const ref = createRef<HTMLImageElement>()

  useEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.width,
        height: ref.current.height,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-full md:min-w-[calc(50vw-24px)] md:overflow-auto md:flex md:justify-end md:p-6 md:shadow-none shadow-xl">
      <div className="rounded-lg shadow-xl overflow-hidden w-0 h-0">
        <BookSVG />
      </div>

      <div className="h-full overflow-hidden z-30 relative">
        {book.texts.map((data, index) => {
          if (!data || !book.width || !book.height) return null
          return (
            <TextPreview
              key={'preview-text-' + index}
              data={data}
              currentSize={size}
              index={index}
            />
          )
        })}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={ref} src={book.bookUrl} alt="book" />
      </div>
    </div>
  )
}
