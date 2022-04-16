import { useState } from 'react'

import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'

import iconsStyles from '../../styles/iconStyles.module.css'

const SchedulesNotesItemInDays = () => {
  const [isUpdating, setIsUpdating] = useState(false)

  const itemData = {
    DaySchedule: 1,
    DayNote: 1
  }

  return (
  <>
    { itemData.DaySchedule === 1 && (
      <div className='chosenElements'>
        <div className="chosenElements__upDownElement">
          <BsFillCaretUpSquareFill size={20} className={iconsStyles.icon}/>
          <BsFillCaretDownSquareFill size={20} className={iconsStyles.icon}/>
        </div>
        <div className="chosenElements__description">
          <p>Mañana</p>
          <div className="chosenElements__upDownElement">
            <p>10:00</p>
            <span> - </span>
            <p>12:00</p>
          </div>
        </div>
        <div className="chosenElements__upDownElement">
          <FaEdit size={20} className={iconsStyles.icon} />
          <MdDeleteForever size={20} className={iconsStyles.icon}/>
        </div>
      </div>
    )}

    { itemData.DayNote === 1 && (
      <div className='chosenElements'>
        <div className="chosenElements__upDownElement">
          <BsFillCaretUpSquareFill size={20} className={iconsStyles.icon}/>
          <BsFillCaretDownSquareFill size={20} className={iconsStyles.icon}/>
        </div>
        <div className={'chosenElements__description'}>
          <p>Discord</p>
          <p>Este es yb ejeplo deeojfwhfwfkjh wieyhgbfwiyf weuihfgwe weyhfgbwuilehf wiufgbwlh wehifgbwile</p>
        </div>
        <div className="chosenElements__upDownElement">
        <FaEdit size={20} className={iconsStyles.icon} />
        <MdDeleteForever size={20} className={iconsStyles.icon}/>
        </div>
      </div>
    )}

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

export default SchedulesNotesItemInDays
