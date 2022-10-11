import { Book } from 'typings/context'

export const navLinks: Array<{ url: string; label: string | JSX.Element }> = [
  {
    url: 'https://github.com/0wx/nulis-app',
    label: 'Github',
  },
]

export const testData: Book[] = [
  {
    bookUrl: '/buku.jpg',
    texts: [
      {
        x: 80,
        y: 150,
        length: 360,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque molestiae esse inventore odit aspernatur ducimus magni ad? Harum vero sint perspiciatis, nemo alias doloribus qui tenetur esse, itaque, aspernatur possimus.',
        lineHeight: 1.8,
        moveable: false,
        fontSize: 11,
        label: 'Paragraf Utama',
      },
    ],
  },
]
