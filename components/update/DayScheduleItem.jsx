import { useState } from 'react'
import axios from 'axios'

import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'

import iconsStyles from '../../styles/iconStyles.module.css'

import objectPrepared from '../../utils/prepareObject'
import sanitizeObject from '../../utils/sanitizeObject'

import AddUpdateNoteScheduleItems from './AddUpdateNoteScheduleItems'

const DayScheduleItem = ({ schedule, listOfSchedules, dayId, setUpdate, updateData, schedules }) => {
  const scheduleData = schedule.schedule[0]
  const [isEditing, setIsEditing] = useState(false)
  const { id } = schedule
  console.log(schedules)

  const editRelation = (type, data) => {
    data.dayId = dayId
    data.order = null
    const preparedObject = objectPrepared(data)
    const safeObject = sanitizeObject(preparedObject)
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules/${id}`, safeObject)
      .then(() => setUpdate(!updateData))
  }

  const deleteRelation = (id) => {
    console.log('ejecutando')

    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules/${id}`)
      .then(() => setUpdate(!updateData))
  }

  return (
    <>
    {!isEditing
      ? <div className='chosenElements'>
      <div className="chosenElements__upDownElement">
        <BsFillCaretUpSquareFill size={20} className={iconsStyles.icon}/>
        <BsFillCaretDownSquareFill size={20} className={iconsStyles.icon}/>
      </div>
      <div className="chosenElements__description">
        <p>{scheduleData.title}</p>
        <div className="chosenElements__schedules">
          <p>{`${scheduleData.initialTime.substr(0, 5)} `}</p>
          {scheduleData.finalTime &&
          <>
            <span>-</span>
            <p>{scheduleData.finalTime.substr(0, 5)}</p>
          </>
          }
        </div>
      </div>
      <div className="chosenElements__upDownElement">
        <FaEdit size={20} className={iconsStyles.icon} onClick={() => setIsEditing(true)} />
        <MdDeleteForever size={20} className={iconsStyles.icon} onClick={() => deleteRelation(id)}/>
      </div>
    </div>
      : <AddUpdateNoteScheduleItems schedules={schedules} setIsAddingANewElement={setIsEditing} type="schedules" action={editRelation}/>
  }

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
      .chosenElements__schedules{
        display: flex;
        justify-content: center;
        align-items: center;
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

export default DayScheduleItem
