import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import NavHeader from '@/layout/NavHeader'
import 'styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  if(Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <NavHeader />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
