import { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'

import objectPrepared from '../../utils/prepareObject'
import sanitizeObject from '../../utils/sanitizeObject'

import AddUpdateNoteScheduleItems from './AddUpdateNoteScheduleItems'

import iconsStyles from '../../styles/iconStyles.module.css'

const DayNoteItem = ({
  note,
  notes,
  dayId,
  setUpdate,
  updateData,
  listOfItems,
  setNewOrder,
  setIsChangingOrder,
  isChangingOrder,
  configs,
  saveNewOrder,

  setUpdatePreview,
  updatePreview
}) => {
  // States
  const [isEditing, setIsEditing] = useState(false)

  const { id } = note
  const { data: session } = useSession()

  // UI
  const order = note?.order
  const noteData = note.note[0]
  const { titleColor, commentColor } = note
  const { mainTitlesColor, mainTextsColor } = configs

  // Methods
  const editRelation = (type, data) => {
    data.dayId = dayId
    const preparedObject = objectPrepared(data)
    const safeObject = sanitizeObject(preparedObject)
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/${id}`, safeObject, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(() => setUpdate(!updateData))
      .then(() => setUpdatePreview(!updatePreview))
  }

  const deleteRelation = (id) => {
    const listOfItemsCopy = [...listOfItems]
    const numberOfItems = listOfItemsCopy.length
    const actualItemIndex = listOfItemsCopy.findIndex(item => item.id === id)
    if (actualItemIndex !== numberOfItems - 1 && listOfItemsCopy[actualItemIndex].noteId) {
      for (let i = actualItemIndex + 1; i < numberOfItems; i++) {
        listOfItemsCopy[i].order = listOfItemsCopy[i].order - 1
        saveNewOrder(listOfItemsCopy)
        setNewOrder(listOfItemsCopy)
      }
    }
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/${id}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(() => setUpdate(!updateData))
      .then(() => setUpdatePreview(!updatePreview))
  }

  const changeOrder = (id, type) => {
    setIsChangingOrder(true)
    const listOfItemsCopy = [...listOfItems]

    const actualItem = listOfItemsCopy.find(item => item.id === id)
    const actualItemIndex = listOfItemsCopy.findIndex(item => item.id === id)
    const previousItemIndex = listOfItemsCopy.findIndex(item => item.order === actualItem.order - 1)
    const nextItemIndex = listOfItemsCopy.findIndex(item => item.order === actualItem.order + 1)

    if (type === 'up') {
      listOfItemsCopy[actualItemIndex].order = listOfItemsCopy[actualItemIndex].order - 1
      listOfItemsCopy[previousItemIndex].order = listOfItemsCopy[previousItemIndex].order + 1
    }
    if (type === 'down') {
      listOfItemsCopy[actualItemIndex].order = listOfItemsCopy[actualItemIndex].order + 1
      listOfItemsCopy[nextItemIndex].order = listOfItemsCopy[nextItemIndex].order - 1
    }

    const listOfItemsOrdered = listOfItemsCopy.sort((a, b) => a.order - b.order)
    setNewOrder(listOfItemsOrdered)
    setUpdatePreview(!updatePreview)
  }

  return (
    <>

    {!isEditing
      ? <div className='chosenElements'>
    <div className="chosenElements__upDownElement">
      <BsFillCaretUpSquareFill
        size={20}
        className={iconsStyles.icon}
        display={order === 1 ? 'none' : 'block'}
        onClick={() => changeOrder(id, 'up')}
      />

      <BsFillCaretDownSquareFill
        size={20}
        className={iconsStyles.icon}
        display={order === listOfItems.length ? 'none' : 'block'}
        onClick={() => changeOrder(id, 'down')}
      />
    </div>
    <div className={'chosenElements__description'}>
      <p className='chosenElements__description--title' >{noteData.title}</p>
      <p className='chosenElements__description-comment'>{noteData.comment}</p>
    </div>
    {!isChangingOrder &&
      <div className="chosenElements__upDownElement">
      <FaEdit size={20} className={iconsStyles.icon} onClick={() => setIsEditing(true)} />
      <MdDeleteForever size={20} className={iconsStyles.icon} onClick={() => deleteRelation(id)} />
      </div>
    }
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
        width: 325px;
      }
      .chosenElements__upDownElement{
        display: flex;
        gap: 5px;
      }
      .chosenElements__description--title{
        color: ${titleColor === null ? mainTitlesColor : titleColor}; 
      }
      .chosenElements__description-comment{
        color: ${commentColor === null ? mainTextsColor : commentColor};
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
