import { useBook } from 'hooks/useBook'
import { useConfig } from 'hooks/useConfig'
import { createRef, FC, useEffect, useState } from 'react'
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
  const [resized, setResized] = useState(0)

  const textRef = createRef<HTMLDivElement>()

  useEffect(() => {
    setOnEdit(true)
    const timeout = setTimeout(() => {
      setOnEdit(false)
    }, 200)
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
      axis={data.moveable && !onEdit ? 'both' : 'none'}
      grid={[1, 1]}
      position={{
        x: (currentSize.width / book.width!) * data.x,
        y: (currentSize.height / book.height!) * data.y,
      }}
      scale={1}
      onStop={(_, d) => {
        if (!data.moveable || onEdit) return
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
      <div className="flex absolute">
        <div
          ref={textRef}
          className={
            ' whitespace-pre-wrap overflow-hidden border border-transparent hover:border-black ' +
            (data.moveable ? 'cursor-move ' : '') +
            (onEdit ? 'border-black' : '')
          }
          style={{
            fontFamily: 'handwriting-' + index,
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
        <Draggable
          axis="none"
          onDrag={(_, dragData) => {
            if (!book.width) return

            const { x } = dragData
            const newLength = (book.width / currentSize.width!) * (x - resized)

            setBook((prevBook) => {
              const texts = prevBook.texts.map((value, i) => {
                if (i !== index || !value) return value
                if (!value.length && !textRef.current) return value
                const length = value.length || textRef.current!.clientWidth
                const newValue = {
                  ...value,
                  length: length + newLength,
                }
                return newValue
              })

              const newBook = {
                ...prevBook,
                texts,
              }

              return newBook
            })

            setResized(x)
          }}
        >
          <div className="h-auto w-2 cursor-col-resize"></div>
        </Draggable>
      </div>
    </Draggable>
  )
}
