import { BookSVG } from 'components/molecules/BookSVG'
import { useBook } from 'hooks/useBook'
import { useConfig } from 'hooks/useConfig'
import { createRef, FC, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Book, TextData } from 'typings/context'

export const BookPreview: FC = () => {
  const { book, setBook } = useBook()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const { config } = useConfig()
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

  const convertFontSize = (x: number) => {
    if (!(book.width && book.height)) return 0

    const initialSize = book.height * book.width
    const currentSize = size.height * size.width
    const result = Math.sqrt(currentSize / initialSize) * x
    return result
  }

  return (
    <div className="h-full md:min-w-[calc(50vw-24px)] md:overflow-auto md:flex md:justify-end md:p-6 md:shadow-none shadow-xl">
      <div className="rounded-lg shadow-xl overflow-hidden w-0 h-0">
        <BookSVG />
      </div>

      <div className="h-full overflow-hidden z-30 relative">
        {book.texts.map((data, index) => {
          if (!data || !book.width || !book.height) return null
          const width = size.width
          const height = size.height

          const { x, y } = data
          return (
            <Draggable
              key={'preview-text-' + index}
              axis={data.moveable ? 'both' : 'none'}
              grid={[1, 1]}
              defaultPosition={{
                x: (width / book.width) * x,
                y: (height / book.height) * y,
              }}
              scale={1}
              onStop={(_, d) => {
                if (!data.moveable) return
                if (ref.current && book.width && book.height) {
                  const width = ref.current.width
                  const height = ref.current.height
                  const x = (d.x / width) * book.width
                  const y = (d.y / height) * book.height
                  setBook((prevBook) => {
                    const texts: Array<TextData | null> = prevBook.texts.map(
                      (value, i) => {
                        if (value && i === index) {
                          const newValue = { ...value, x, y }
                          return newValue
                        }

                        return value
                      }
                    )

                    const newBook: Book = { ...prevBook, texts }
                    return newBook
                  })
                }
              }}
            >
              <div
                className="absolute whitespace-pre-wrap overflow-hidden "
                style={{
                  fontFamily: 'handwriting',
                  whiteSpace: 'pre-wrap',
                  width: data.length
                    ? (width / book.width) * data.length
                    : width,
                  fontSize: convertFontSize(data.fontSize || config.fontSize),
                  lineHeight: data.lineHeight,
                  filter: `blur(${data.blur || config.blur}px)`,
                  color: data.color || config.color,
                }}
              >
                {data?.text}
              </div>
            </Draggable>
          )
        })}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={ref} src={book.bookUrl} alt="book" />
      </div>
    </div>
  )
}
