import React from 'react'

import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'

import iconsStyles from '../../styles/iconStyles.module.css'

const DayNoteItem = ({ note }) => {
  return (
    <>

    <div className='chosenElements'>
      <div className="chosenElements__upDownElement">
        <BsFillCaretUpSquareFill size={20} className={iconsStyles.icon}/>
        <BsFillCaretDownSquareFill size={20} className={iconsStyles.icon}/>
      </div>
      <div className={'chosenElements__description'}>
        <p>{note.title}</p>
        <p>{note.comment}</p>
      </div>
      <div className="chosenElements__upDownElement">
      <FaEdit size={20} className={iconsStyles.icon} />
      <MdDeleteForever size={20} className={iconsStyles.icon}/>
      </div>
    </div>

    <style jsx>{`
    .chosenElements{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        width: 90%;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        gap: 10px;
      }
      .chosenElements__upDownElement{
        display: flex;
        gap: 5px;
      }
      p {
        font-size: 1.6rem;
        text-align: center;
      }
      span {
        font-size: 1.5rem;
      }
    `}</style>

    </>
  )
}

export default DayNoteItem