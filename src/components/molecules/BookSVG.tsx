import { useBook } from 'hooks/useBook'
import { getBase64Image } from 'libs/getBase64Image'
import { FC, useEffect, useState } from 'react'
import { Book } from 'typings/context'
import { Text } from './Text'

export const BookSVG: FC = () => {
  const { book, setBook } = useBook()
  const [base64Image, setBase64Image] = useState<string>()
  const [image, setImage] = useState<HTMLImageElement>()
  useEffect(() => {
    const img = new Image()
    img.src = book.bookUrl
    img.onload = () => {
      setBase64Image(getBase64Image(img))
      setImage(img)
      setBook((prevBook) => {
        const newBook: Book = {
          ...prevBook,
          height: img.height,
          width: img.width,
        }

        return newBook
      })
    }
  }, [book.bookUrl, setBook])

  if (!base64Image) return null
  return (
    <svg
      ref={book.ref}
      width={image?.width}
      height={image?.height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <image
        xlinkHref={base64Image}
        height={image?.height}
        width={image?.width}
      />

      {book.texts.map((data, i) => (
        <Text key={'text-' + i} data={data} index={i} />
      ))}
    </svg>
  )
}
