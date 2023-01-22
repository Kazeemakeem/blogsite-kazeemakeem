// import Footer from 'components/layout/Footer' path aliases for absolute imports can be used @/*** */
// import Header from 'components/layout/Header'
import '../styles/globals.css'
import '../styles/styles.css'
import '../node_modules/react-quill/dist/quill.snow.css'
import '../node_modules/nprogress/nprogress.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../app/store'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
