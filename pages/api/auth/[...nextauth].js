import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'

const options = {
  theme: {
    colorScheme: 'dark'
  },
  debug: true,
  session: {},
  jwt: {},
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize (credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-type': 'application/json' }
        })

        const user = await res.json()
        // console.log('user', user)

        if (res.ok && user) {
          // console.log('user working')
          console.log(user)
          return user
        }

        return null
      }
    })
  ],
  callbacks: {
    // Getting the JWT token from API response
    async jwt ({ token, user, account, profile, isNewUser }) {
      // console.log('data', token.token.user)
      if (user) {
        token.nickName = user.user.nickName
        token.email = user.user.email
        token.accessToken = user.token
      }

      return token
    },

    async session ({ session, token }) {
      // console.log('session', token.nickName)
      session.user.nickName = token.nickName
      session.user.email = token.email
      session.accessToken = token.accessToken
      console.log('session', session)
      return session
    }
  }

}

export default NextAuth(options)
