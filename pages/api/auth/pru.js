import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import axios from 'axios'

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',

        credentials: {
          email: { label: 'email', type: 'email' },
          password: { label: 'password', type: 'password' }
        },
        async authorize (credentials) {
          try {
            const response = await axios.post('/auth/login', {
              email: credentials.email,
              password: credentials.password
            })
            const cookies = response.headers['set-cookie']
            res.setHeader('Set-Cookie', cookies)
            return response.data
          } catch (error) {
            console.log(error)
          }
        }
      })]
  }
}

// const options = {
//   theme: {
//     colorScheme: 'dark'
//   },
//   session: {
//     jwt: true
//   },
//   debug: true,
//   secret: process.env.NEXT_AUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',

//       credentials: {
//         email: { label: 'email', type: 'email' },
//         password: { label: 'password', type: 'password' }
//       },
//       async authorize (credentials, req) {
//         try {
//           const user = await axios.post(process.env.NEXTAUTH_URL, {
//             email: credentials.email,
//             password: credentials.password

//           })
//           if (user.data) {
//             return user.data
//           }
//         } catch {
//           return {
//             message: 'Invalid email or password'
//           }
//         }

//         return null
//       }
//     })

//   ],
//   callbacks: {
//     // Getting the JWT token from API response
//     async jwt (token, user) {
//       if (user) {
//         token.accessToken = user.token
//       }

//       return token
//     },

//     async session (session, token) {
//       session.accessToken = token.accessToken
//       return session
//     }

//   }

// }

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
