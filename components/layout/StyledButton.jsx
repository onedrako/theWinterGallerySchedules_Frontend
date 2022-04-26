import React from 'react'

const StyledButton = ({ action, text, theme, selector }) => {
  return (
    <>
      <button onClick={() => action(selector)} >{text}</button>
      <style jsx>{`
        button {
          width: 85px;
          height: 30px;
          font-size: 1.2rem;
          border: none;
          background-color: ${theme === 'white' ? '#e4a548' : '#ffffff'};          
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default StyledButton
