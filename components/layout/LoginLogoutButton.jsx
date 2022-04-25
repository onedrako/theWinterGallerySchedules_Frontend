import React from 'react'

const LoginLogoutButton = ({ action, text }) => {
  return (
    <>
      <button onClick={() => action()} >{text}</button>
      <style jsx>{`
        button {
          width: 85px;
          height: 30px;
          font-size: 1.2rem;
          border: none;
          background-color: #ffffff;
          border-radius: 5px;
          margin-right: 10px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default LoginLogoutButton
