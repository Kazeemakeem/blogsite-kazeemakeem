// import Footer from 'components/layout/Footer' path aliases for absolute imports can be used @/*** */
// import Header from 'components/layout/Header'
import '../styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../app/store'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
