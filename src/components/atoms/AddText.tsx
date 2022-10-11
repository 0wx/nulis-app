import { useBook } from 'hooks/useBook'
import { useConfig } from 'hooks/useConfig'
import { FC } from 'react'
import { Add } from './Icons'

export const AddText: FC = () => {
  const { setBook } = useBook()
  const { config } = useConfig()
  return (
    <button
      onClick={() => {
        setBook((prevBook) => {
          const texts = prevBook.texts.concat([
            {
              x: 0,
              y: 0,
              length: 0,
              moveable: true,
              lineHeight: 1,
              text: '',
            },
          ])

          const newBook = { ...prevBook, texts }
          return newBook
        })
      }}
      className="btn btn-ghost gap-2"
    >
      <Add /> Add Text
    </button>
  )
}
