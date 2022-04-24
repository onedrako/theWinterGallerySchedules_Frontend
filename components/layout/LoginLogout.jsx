import React from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'

const LoginLogout = () => {
  const { data: session, status } = useSession()
  console.log(session)
  // const session1 = getSession().then(data => console.log(data))
  // console.log(session1)

  if (status === 'loading') {
    return null
  }
  if (session == null) {
    return <button onClick={() => signIn()}>{'signIn'}</button>
  }
  return (
    <>
      <button onClick={() => signOut()} >  {'signOut'} </button>
      <span>{session.user?.email}</span>
    </>
  )
}

export default LoginLogout
