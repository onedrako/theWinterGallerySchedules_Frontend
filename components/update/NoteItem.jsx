import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import iconsStyles from '../../styles/iconStyles.module.css'

const NoteItem = () => {
  return (
    <>
    <div className='container'>
      <div className='container__data'>
        <h3>DISCORD</h3>
        <div className='container__data--schedule divisionInElement'>
          <p>Es es el texto ejemplo de una nota para el edit</p>
        </div>
        <div className='container__data--options'>
          <FaEdit size={20} className={iconsStyles.divisionIcon}/>
          <MdDeleteForever size={20} className={iconsStyles.divisionIcon}/>
        </div>

      </div>
      </div>

    <style jsx>{`
    .container{
      padding: 10px;
      width: 100%;
    }
    .container__data{
      border: 1px solid #ccc;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .container__data--schedule{
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 70%;
    }
    .container__data--options{
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 30%;

    }
    .divisionInElement{
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      padding: 0 10px;
    }
    
    h3{
      font-size: 2rem;
      margin-right: 15px;
    }
    p{
      font-size: 1.2rem;
    }
    `}</style>
  </>
  )
}

export default NoteItem
