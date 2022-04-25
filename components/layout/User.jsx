// import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { FaUserAlt } from 'react-icons/fa'

import LoginLogout from './LoginLogout'

const User = ({ color }) => {
  // const [isShowed, setIsShowed] = useState(true)

  const { data: session } = useSession()

  return (
    <>
      <div className='user'>
      <LoginLogout className="user__login"/>
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
      </div>
      <style jsx>{`
        .user{
          width: 100%;
          height: 100%;
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
          margin: 0px 25px 0 10px;
          background-color: #ffffff;
          height: 45px;
          width: 45px;
          border-radius: 50%;
          /* cursor: pointer; */
        }

      `}</style>
    </>
  )
}

export default User
