import { useBook } from 'hooks/useBook'
import { useConfig } from 'hooks/useConfig'
import { FC } from 'react'
import { TextData } from 'typings/context'

type Key = keyof TextData
type Value = TextData[Key]

export const TextSetting: FC<{ index: number }> = ({ index }) => {
  const { book, setBook } = useBook()
  const { config } = useConfig()
  const handleChange = (key: Key, value: Value) => {
    setBook((prevBook) => {
      const texts = prevBook.texts.map((text, i) => {
        if (text && i === index) {
          const newText = { ...text, [key]: value }
          return newText
        }
        return text
      })

      return {
        ...prevBook,
        texts,
      }
    })
  }

  return (
    <div className="flex flex-col container w-auto rounded">
      <div>
        <div className="px-4">Font Size</div>
        <div className="flex justify-center items-center">
          <input
            className="input md:w-20 w-16 h-8 mx-4 input-bordered"
            type="number"
            onChange={({ target: { value } }) =>
              handleChange('fontSize', Number(value))
            }
            value={book.texts[index]?.fontSize || config.fontSize}
          />
          <input
            className="input w-full range"
            type="range"
            min="1"
            max="100"
            onChange={({ target: { value } }) =>
              handleChange('fontSize', Number(value))
            }
            value={book.texts[index]?.fontSize || config.fontSize}
          />
        </div>
      </div>
      <div>
        <div className="px-4">Line Height</div>
        <div className="flex justify-center items-center">
          <input
            className="input md:w-20 w-16 h-8 mx-4 input-bordered"
            type="number"
            onChange={({ target: { value } }) =>
              handleChange('lineHeight', Number(value))
            }
            value={book.texts[index]?.lineHeight || config.lineHeight}
          />
          <input
            className="input w-full range"
            type="range"
            min="1"
            max="100"
            onChange={({ target: { value } }) =>
              handleChange('lineHeight', Number(value))
            }
            value={book.texts[index]?.lineHeight || config.lineHeight}
          />
        </div>
      </div>
    </div>
  )
}
