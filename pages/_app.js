import '../styles/globals.css'
import { SessionProvider as AuthProvider } from 'next-auth/react'

function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
