import React from 'react'
import { AiFillAlert } from 'react-icons/ai'

const ErrorMessageForForms = ({ children }) => {
  return (
    <>
      <div className='errorContainer'>
        <p>{children}</p>
        <AiFillAlert size={20} color='#b91b1b'/>
      </div>
      <style jsx>{`
        p{
          font-size: 1.5rem;
          color : #b91b1b;
        }
        .errorContainer{
          display: flex;
          align-items: center;
          gap: 10px;
        }

      `}</style>
    </>
  )
}

export default ErrorMessageForForms
