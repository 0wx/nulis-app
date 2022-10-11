import { BookPreview } from 'components/organisms/BookPreview'
import { BookTextEditor } from 'components/organisms/BookTextEditor'
import { HomeLayout } from 'layouts/Home'
import { MainLayout } from 'layouts/Main'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Nulis.app | Nulis buku anti ribet</title>
      </Head>
      <HomeLayout>
        <BookPreview />
        <BookTextEditor />
      </HomeLayout>
    </MainLayout>
  )
}

export default Home
