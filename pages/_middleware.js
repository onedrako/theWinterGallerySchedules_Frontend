import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware (req, ev) {
  const { pathname } = req.nextUrl
  const session = await getToken({ req, secret: process.env.AUTH_SECRET })

  if (pathname === '/signUp' && session) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/update`)
  }

  if (pathname === '/update' && session === null) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`)
  }

  return NextResponse.next()
}
