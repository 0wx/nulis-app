import { Setting, Trash } from 'components/atoms/Icons'
import { useBook } from 'hooks/useBook'
import { FC, useState } from 'react'
import { TextSetting } from './TextSetting'

export const TextInput: FC = () => {
  const { book, setBook } = useBook()
  // make an array of the text objects and fill with false
  const [showSettings, setShowSettings] = useState<boolean[]>(
    book.texts.map(() => false)
  )

  const toggle = (index: number) => {
    setShowSettings((prev) => {
      const newShowSettings = [...prev]
      newShowSettings[index] = !newShowSettings[index]
      return newShowSettings
    })
  }
  return (
    <div className="md:overflow-y-scroll md:max-h-[calc(100vh-400px)]">
      {book.texts.map((data, index) => {
        if (!data) return null
        return (
          <div key={'input-' + index} className="my-2">
            {index > 0 && <div className="divider"></div>}
            <div className="pb-1 px-4">
              {data.label || `Text #${index + 1}`}
            </div>
            <div className="flex items-center">
              <textarea
                className="textarea textarea-bordered w-full mr-2 flex-grow md:flex-grow-0"
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
              <button
                onClick={() => toggle(index)}
                className="btn btn-ghost btn-circle"
              >
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
            {showSettings[index] && <TextSetting index={index} />}
          </div>
        )
      })}
    </div>
  )
}
