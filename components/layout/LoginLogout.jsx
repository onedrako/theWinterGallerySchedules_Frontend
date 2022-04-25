import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import LoginLogoutButton from './LoginLogoutButton'

const LoginLogout = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }
  if (session == null) {
    return (
      <>
        <LoginLogoutButton action={signIn} text={'Iniciar Sesión'}/>
      </>
    )
  }
  return (
    <>
      <LoginLogoutButton action={signOut} text={'Cerrar Sesión'}/>
    </>
  )
}

export default LoginLogout
