import { useState } from 'react'
import ScheduleItem from './ScheduleItem'
import NoteItem from './NoteItem'
import { FaPlusCircle } from 'react-icons/fa'

const ListOfItemsToEdit = ({ type, schedules, setSchedules }) => {
  const comments = [1]

  const editSchedule = (itemEdited) => {
    const allSchedules = [...schedules]

    const { id } = itemEdited
    const index = allSchedules.findIndex(schedule => schedule.id === id)

    allSchedules[index] = { ...schedules[index], ...itemEdited }
    setSchedules(allSchedules)
  }

  // const addNewSchedule = (newItemEdited) => {
  //   setSchedules([...schedules, itemEdited])
  //   console.log(schedules)
  // }

  return (
    <div className='container' >
      <div>
        { type === 'schedule'
          ? schedules.map(schedule => <ScheduleItem key={`schedule-${schedule.id}`} scheduleData={schedule} editSchedule={editSchedule}/>)
          : comments.map(comment => <NoteItem key={2}/>)
        }
      </div>

      <div className='addNewItemContainer' >
        <FaPlusCircle size={25} />
        <p>Añadir nuevo elemento</p>
      </div>

      <style jsx>{`
        .container{
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ccc;
        }
        .addNewItemContainer{
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
          margin-top: 10px;
          cursor: pointer;
        }
        p{
          margin-left: 10px;
          font-size: 1.4rem;
        }
      `}</style>
    </div>

  )
}

export default ListOfItemsToEdit
