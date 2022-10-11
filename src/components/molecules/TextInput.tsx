import { Setting, Trash } from 'components/atoms/Icons'
import { useBook } from 'hooks/useBook'
import { FC } from 'react'

export const TextInput: FC = () => {
  const { book, setBook } = useBook()

  return (
    <>
      {book.texts.map((data, index) => {
        if (!data) return null
        return (
          <div key={'input-' + index} className="my-2">
            <div className="pb-1 px-4">
              {data.label || `Text #${index + 1}`}
            </div>
            <div className="flex items-center">
              <textarea
                className="textarea textarea-bordered mr-2 flex-grow md:flex-grow-0"
                key={'input' + index}
                placeholder="Tulis di sini..."
                value={data.text}
                onChange={(e) => {
                  setBook((prevBook) => {
                    const texts = prevBook.texts.map((data, i) => {
                      if (!data) return null
                      if (i === index) return { ...data, text: e.target.value }
                      return data
                    })
                    const newBook = { ...prevBook, texts }
                    return newBook
                  })
                }}
              />
              <button className="btn btn-ghost btn-circle">
                <Setting />
              </button>
              {data.moveable && (
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => {
                    setBook((prevBook) => {
                      const texts = prevBook.texts.map((_, i) =>
                        i === index ? null : _
                      )
                      const newBook = { ...prevBook, texts }
                      return newBook
                    })
                  }}
                >
                  <Trash />
                </button>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
