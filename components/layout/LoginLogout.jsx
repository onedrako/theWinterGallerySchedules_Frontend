import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import LoginLogoutButton from './StyledButton'

const LoginLogout = ({ theme }) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }
  if (session == null) {
    return (
      <>
        <LoginLogoutButton
          action={signIn}
          text={'Iniciar Sesión'}
          theme={theme}
        />
      </>
    )
  }
  return (
    <>
      <LoginLogoutButton
        action={signOut}
        text={'Cerrar Sesión'}
        theme={theme}
      />
    </>
  )
}

export default LoginLogout
