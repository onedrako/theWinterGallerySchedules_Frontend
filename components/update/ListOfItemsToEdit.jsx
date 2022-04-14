import { useState } from 'react'
import axios from 'axios'

import { FaPlusCircle } from 'react-icons/fa'

import ScheduleItem from './ScheduleItem'
import NoteItem from './NoteItem'
import AddNewScheduleItem from './AddNewScheduleItem'

const ListOfItemsToEdit = ({ type, schedules, setSchedules }) => {
  const [addingNewItem, setAddingNewItem] = useState(false)
  const comments = [1]

  const editSchedule = (itemEdited) => {
    const allSchedules = [...schedules]

    const { id } = itemEdited
    const index = allSchedules.findIndex(schedule => schedule.id === id)

    allSchedules[index] = { ...schedules[index], ...itemEdited }
    setSchedules(allSchedules)
  }

  const addNewSchedule = (newItem) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, newItem)
  }

  return (
    <div className='container' >
      <div>
        { type === 'schedule'
          ? schedules.map(schedule => <ScheduleItem key={`schedule-${schedule.id}`} scheduleData={schedule} editSchedule={editSchedule}/>)
          : comments.map(comment => <NoteItem key={2}/>)
        }
        { addingNewItem && <AddNewScheduleItem visible={addingNewItem} setVisible={setAddingNewItem} addItem={addNewSchedule}/> }
      </div>

      <div className='addNewItemContainer' onClick={() => setAddingNewItem(true)} >
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
