import {Provider} from 'react-redux'
import {useRouter} from 'next/router'
import {useStore} from '../redux/stores'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return(<Provider store={store}>
  <div className="min-h-screen flex flex-col justify-between relative">
    <Component {...pageProps} />
  </div>
</Provider>)
}

export default MyApp
