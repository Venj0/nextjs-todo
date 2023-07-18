import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/loadingWrapper.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
