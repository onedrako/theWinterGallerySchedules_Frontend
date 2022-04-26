// import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { FaUserAlt } from 'react-icons/fa'

import LoginLogout from './LoginLogout'

const User = ({ color, theme, page, pageText }) => {
  // const [isShowed, setIsShowed] = useState(true)
  const { data: session } = useSession()

  return (
    <>
    <section>
      {session !== null && (
        <Link className="link" href={page}>
          <a className="link">{pageText}</a>
        </Link>
      )}
      <div className='user'>
        {
          session?.user.nickName && (
            <div className='user__infoIfLogged'>
              <h4>Ingresaste como</h4>
              <p>{session.user.nickName}</p>
            </div>
          )
        }
        <div className='user__userIcon'>
          <FaUserAlt size={20} color={color}/>
        </div>
        <LoginLogout theme={theme}/>
      </div>

    </section>
      <style jsx>{`
        section{
          width: 100%;
          height: 100%;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user{
          width: 100%;
          height: 100%;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: end;
        }
        .user__infoIfLogged{
          font-size: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .user__userIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0px 10px 0 10px;
          background-color: ${theme === 'white' ? '#e4a548' : '#ffffff'};
          height: 45px;
          width: 45px;
          border-radius: 50%;
          /* cursor: pointer; */
        }
        .user__update{
          display: flex;
          justify-self: flex-start;
        }
        a{
          font-size: 1.5rem;
          width: 200px;
          height: 35px;
          border-radius: 10px;
          display: flex;
          place-items: center;
          justify-content: center;
          background-color: ${theme === 'white' ? '#e4a548' : '#ffffff'};
        }


      `}</style>
    </>
  )
}

export default User
