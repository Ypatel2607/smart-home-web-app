import type { AppProps } from 'next/app'
 
function SmartHomeApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default SmartHomeApp