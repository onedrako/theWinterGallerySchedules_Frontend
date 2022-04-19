import { useState } from 'react'
import axios from 'axios'

import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'

import objectPrepared from '../../utils/prepareObject'
import sanitizeObject from '../../utils/sanitizeObject'

import AddUpdateNoteScheduleItems from './AddUpdateNoteScheduleItems'

import iconsStyles from '../../styles/iconStyles.module.css'

const DayNoteItem = ({ note, notes, dayId, setUpdate, updateData, listOfSchedules }) => {
  const [isEditing, setIsEditing] = useState(false)
  const noteData = note.note[0]
  const { id } = note
  const order = note.order

  const editRelation = (type, data) => {
    data.dayId = dayId
    const preparedObject = objectPrepared(data)
    const safeObject = sanitizeObject(preparedObject)
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/${id}`, safeObject)
      .then(() => setUpdate(!updateData))
  }

  const deleteRelation = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/${id}`)
      .then(() => setUpdate(!updateData))
  }
  return (
    <>

    {!isEditing
      ? <div className='chosenElements'>
    <div className="chosenElements__upDownElement">
      <BsFillCaretUpSquareFill
        size={20}
        className={iconsStyles.icon}
        // display={order === 1 ? 'none' : 'block'}
        onClick={() => console.log('subir lugar')}/>
      <BsFillCaretDownSquareFill
        size={20}
        className={iconsStyles.icon}
        // display={order === listOfSchedules.length ? 'none' : 'block'}
        onClick={() => console.log('bajar posición')} />
    </div>
    <div className={'chosenElements__description'}>
      <p>{noteData.title}</p>
      <p>{noteData.comment}</p>
    </div>
    <div className="chosenElements__upDownElement">
    <FaEdit size={20} className={iconsStyles.icon} onClick={() => setIsEditing(true)} />
    <MdDeleteForever size={20} className={iconsStyles.icon} onClick={() => deleteRelation(id)} />
    </div>
  </div>
      : <AddUpdateNoteScheduleItems notes={notes} setIsAddingANewElement={setIsEditing} type="notes" action={editRelation}/>
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
