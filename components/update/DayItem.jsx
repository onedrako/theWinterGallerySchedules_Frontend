import { useState } from 'react'
import axios from 'axios'

import SchedulesNotesItemInDays from './SchedulesNotesItemInDays'
import AddUpdateNoteScheduleItems from './AddUpdateNoteScheduleItems'

import { MdOutlineNoteAdd } from 'react-icons/md'
import { FaRegCalendarPlus } from 'react-icons/fa'

import moment from 'moment-timezone'
import 'moment/locale/es'

import capitalize from './../../utils/capitalize'

import sanitizeObject from '../../utils/sanitizeObject'
import objectPrepared from '../../utils/prepareObject'

const DayItem = ({ day, notes, schedules, setUpdate, updateData }) => {
  const [isOnline, setIsOnline] = useState(true)
  const [isAddingANewElement, setIsAddingANewElement] = useState(false)
  const [typeOfNewElement, setTypeOfNewElement] = useState('')

  console.log(day)

  const dayId = day.id

  const createNewRelation = (type, data) => {
    if (type === 'schedule') {
      data.dayId = dayId
      data.order = null
      const preparedObject = objectPrepared(data)
      const safeObject = sanitizeObject(preparedObject)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules`, safeObject)
        .then(res => setUpdate(!updateData))
    } else if (type === 'n') {
      data.dayId = dayId
      data.order = null
      const preparedObject = objectPrepared(data)
      const safeObject = sanitizeObject(preparedObject)
      console.log(safeObject)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/days-notes`, safeObject)
        .then(res => setUpdate(!updateData))
    }
  }

  const { date } = day
  const formatDate = capitalize(moment(date).locale('es').format('dddd, DD/MMMM'))

  return (
    <>
      <form className='daysUpdateForm' >
      <div className='daysUpdateForm__dayContainer'>

        <div className='daysUpdateForm__dayContainer--date'>
          <h3>{formatDate}</h3>
          <input className='colorInput' type="color" />
        </div>

        <div className='daysUpdateForm__dayContainer--status'>
          <h4 className="online" onClick={() => setIsOnline(true) }>Online</h4>
          <h4 className="offline" onClick={() => setIsOnline(false)} >Offline</h4>
        </div>

        { isOnline && (
          <div className='daysUpdateForm__dayContainer--options' >
            <SchedulesNotesItemInDays schedules={day.schedules} notes={day.notes}/>

            {!isAddingANewElement && (
              <div className="options__container">
                <div className='addNewItemContainer' onClick={() => {
                  setTypeOfNewElement('schedules')
                  setIsAddingANewElement(true)
                }} >
                  <FaRegCalendarPlus size={22} />
                  <p>Horarios</p>
                </div>
                <div className='addNewItemContainer' onClick={() => {
                  setTypeOfNewElement('notes')
                  setIsAddingANewElement(true)
                }} >
                  <MdOutlineNoteAdd size={25} />
                  <p>Notas</p>
                </div>
              </div>
            )}

            {isAddingANewElement && <AddUpdateNoteScheduleItems setIsAddingANewElement={setIsAddingANewElement} type={typeOfNewElement} notes={notes} schedules={schedules} createNewRelation={createNewRelation}/>}

          </div>
        )}
      </div>
    </form>

  <style jsx>{` 
    .daysUpdateForm{
        width: 100%;
        margin: 0 auto;
      } 
      .daysUpdateForm__dayContainer{
        border: 1px solid #ccc;
        max-width: 100%;
        padding: 10px;
      }
      .daysUpdateForm__dayContainer--date{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      .daysUpdateForm__dayContainer--status{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      .daysUpdateForm__dayContainer--options{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0; 
      }

      .online{
        background-color: ${isOnline ? '#10b410' : '#ccc'};
        border-radius: 10px 0px 0px 10px;
        width: 60px;
        padding: 5px;
        text-align: center;
        cursor: pointer;
      }
      .offline{
        background-color: ${isOnline ? '#ccc' : '#e42f2f'};
        border-radius: 0px 10px 10px 0px;
        width: 60px;
        padding: 5px;
        text-align: center;
        cursor: pointer;
      }
      .options__container{
        display: flex;
        gap: 25px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-top: 10px;
      }
      .addNewItemContainer{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        }

      p {
        font-size: 1.6rem;
      }
      span {
        font-size: 1.5rem;
      }
      h3{
      font-size: 2rem;
      margin-right: 15px;
      }
      h4{
        font-size: 1.5rem;
      }
      .colorInput{
        width: 25px;
      }
    }`}</style>
    </>

  )
}

export default DayItem
