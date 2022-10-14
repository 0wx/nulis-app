import { useBook } from 'hooks/useBook'
import { useConfig } from 'hooks/useConfig'
import { FC, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Book, TextData } from 'typings/context'

export const TextPreview: FC<{
  data: TextData
  currentSize: {
    width: number
    height: number
  }
  index: number
}> = ({ data, currentSize, index }) => {
  const { book, setBook } = useBook()
  const { config } = useConfig()
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    setOnEdit(true)
    const timeout = setTimeout(() => {
      setOnEdit(false)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [data.text, data.length])

  const convertFontSize = (x: number) => {
    if (!(book.width && book.height)) return 0

    const initial = book.height * book.width
    const current = currentSize.height * currentSize.width
    const result = Math.sqrt(current / initial) * x
    return result
  }
  return (
    <Draggable
      axis={data.moveable ? 'both' : 'none'}
      grid={[1, 1]}
      defaultPosition={{
        x: (currentSize.width / book.width!) * data.x,
        y: (currentSize.height / book.height!) * data.y,
      }}
      scale={1}
      onStop={(_, d) => {
        if (!data.moveable) return
        if (book.width && book.height) {
          const width = currentSize.width
          const height = currentSize.height
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
        className={
          'absolute whitespace-pre-wrap overflow-hidden border border-transparent hover:border-black ' +
          (data.moveable ? 'cursor-move ' : '') +
          (onEdit ? 'border-black' : '')
        }
        style={{
          fontFamily: 'handwriting',
          whiteSpace: 'pre-wrap',
          width: data.length
            ? (currentSize.width / book.width!) * data.length
            : 'auto',
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
}
