import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import { FaPlusCircle } from 'react-icons/fa'

import ScheduleItem from './ScheduleItem'
import NoteItem from './NoteItem'
import AddNewScheduleItem from './AddNewScheduleItem'
import AddNewNoteItem from './AddNewNoteItem'

const ListOfItemsToEdit = ({ type, schedules, setUpdate, updateData, notes, setUpdateItemInDays }) => {
  const [addingNewItem, setAddingNewItem] = useState(false)

  // Bearer Token
  const { data: session } = useSession()

  // TODO: Transformar a custom HOOK para schedules

  const addNewSchedule = (newItem) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, newItem, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(res => setUpdate(!updateData))
  }

  const editSchedule = (id, itemEdited) => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`, itemEdited, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(res => setUpdate(!updateData))
  }

  const deleteSchedule = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(res => setUpdate(!updateData))
  }

  // TODO Transformar a custom HOOK para notes
  const addNewNote = (newItem) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, newItem, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(res => setUpdate(!updateData))
  }

  const editNote = (id, itemEdited) => {
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, itemEdited, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(res => setUpdate(!updateData))
  }

  const deleteNote = (id) => {
    console.log(id)
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(res => setUpdate(!updateData))
  }

  return (
    <div className='container' >
      <div>
        { type === 'schedule'
          ? schedules.map(schedule => <ScheduleItem key={`schedule-${schedule.id}`} scheduleData={schedule} editSchedule={editSchedule} deleteSchedule={deleteSchedule} setUpdateItemInDays={setUpdateItemInDays} />)
          : notes.map(note => <NoteItem key={`note-${note.id}`} noteData={note} editNote={editNote} deleteNote={deleteNote} setUpdateItemInDays={setUpdateItemInDays}/>)
        }
        {
          type === 'schedule'
            ? addingNewItem && <AddNewScheduleItem visible={addingNewItem} setVisible={setAddingNewItem} addItem={addNewSchedule} setUpdate={setUpdate} />
            : addingNewItem && <AddNewNoteItem visible={addingNewItem} setVisible={setAddingNewItem} addItem={addNewNote} setUpdate={setUpdate} />
        }
      </div>

      {!addingNewItem && (
        <div className='addNewItemContainer' onClick={() => setAddingNewItem(true)} >
          <FaPlusCircle size={25} />
          <p>Añadir nuevo elemento</p>
        </div>
      )}

      <style jsx>{`
        .container{
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ccc;
        }
        .addNewItemContainer{
          display: flex;
          align-items: center;
          width: 35%;
          justify-content: center;
          margin: 0 auto;
          margin-top: 30px;
          cursor: pointer;
        }
        p{
          margin-left: 10px;
          font-size: 1.6rem;
        }
      `}</style>
    </div>

  )
}

export default ListOfItemsToEdit
