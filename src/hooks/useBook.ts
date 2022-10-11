import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { Book } from 'typings/context'

export const BookContext = createContext<{
  book: Book
  setBook: Dispatch<SetStateAction<Book>>
}>({
  book: {
    bookUrl: '/book.jpg',
    texts: [],
    ref: undefined,
  },
  setBook: () => {},
})

export const useBook = () => useContext(BookContext)
