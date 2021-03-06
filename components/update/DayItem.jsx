import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import SchedulesNotesItemInDays from './SchedulesNotesItemInDays'
import AddUpdateNoteScheduleItems from './AddUpdateNoteScheduleItems'

import { MdOutlineNoteAdd } from 'react-icons/md'
import { FaRegCalendarPlus } from 'react-icons/fa'

import moment from 'moment-timezone'
import 'moment/locale/es'

import capitalize from './../../utils/capitalize'

import sanitizeObject, { safeHTMLObject } from '../../utils/sanitizeObject'
import objectPrepared from '../../utils/prepareObject'

const DayItem = ({
  day,
  notes,
  schedules,
  configs,

  setUpdate,
  updateData,
  updateItemInDays,

  updateWhenAScheduleIsDeleted,
  updateWhenANoteIsDeleted,

  setUpdatePreview,
  updatePreview
}) => {
  // TO ADD A NEW ITEM TO THE DAY
  const [isAddingANewElement, setIsAddingANewElement] = useState(false)
  const [typeOfNewElement, setTypeOfNewElement] = useState('')

  // TO MANAGE THE LIST OF ACTUAL ELEMENTS
  const [listOfSchedulesNotes, setListOfSchedulesNotes] = useState([])
  const [updateList, setUpdateList] = useState(false)
  const [countOfItemsInDays, setCountOfItemsInDays] = useState(0)
  const [isChangingOrder, setIsChangingOrder] = useState(false)

  // FOR BUTTON ONLINE-OFFLINE
  const [isOnline, setIsOnline] = useState(false)
  const [isTurningOffline, setIsTurningOffline] = useState(false)

  const dayId = day.id
  const { data: session } = useSession()

  const saveNewOrder = (data) => {
    const listOfNotes = { listOfDaysNotes: [] }
    const listOfSchedules = { listOfDaysSchedules: [] }

    const dataForNotes = data.filter(item => item.noteId)
    dataForNotes.forEach(item => {
      const id = item.id
      const order = item.order
      const dayId = item.dayId
      const noteId = item.noteId
      listOfNotes.listOfDaysNotes.push({ id, order, dayId, noteId })
    })

    const dataForSchedules = data.filter(item => item.scheduleId)
    dataForSchedules.forEach(item => {
      const id = item.id
      const order = item.order
      const dayId = item.dayId
      const scheduleId = item.scheduleId
      listOfSchedules.listOfDaysSchedules.push({ id, order, dayId, scheduleId })
    })

    const safeDataForNotes = safeHTMLObject(listOfNotes)
    const safeDataForSchedules = safeHTMLObject(listOfSchedules)

    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules`, safeDataForSchedules, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/days-notes`, safeDataForNotes, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })

    setIsChangingOrder(false)
  }

  const createNewRelation = (type, data) => {
    if (type === 'schedule') {
      data.dayId = dayId
      data.order = countOfItemsInDays + 1
      setCountOfItemsInDays(countOfItemsInDays + 1)
      const preparedObject = objectPrepared(data)
      const safeObject = sanitizeObject(preparedObject)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules`, safeObject, {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      })
        .then(() => setUpdate(!updateData))
        .then(() => setUpdateList(!updateList))
        .then(() => setUpdatePreview(!updatePreview))
    } else if (type === 'n') {
      data.dayId = dayId
      data.order = countOfItemsInDays + 1
      setCountOfItemsInDays(countOfItemsInDays + 1)
      const preparedObject = objectPrepared(data)
      const safeObject = sanitizeObject(preparedObject)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/days-notes`, safeObject, {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      })
        .then(() => setUpdate(!updateData))
        .then(() => setUpdateList(!updateList))
        .then(() => setUpdatePreview(!updatePreview))
    }
  }

  const deleteAllRelationsPuttingOfflineState = async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules/day/${dayId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/day/${dayId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
    setUpdateList(!updateList)
    setIsTurningOffline(false)
    setUpdatePreview(!updatePreview)
  }

  const { date } = day
  let formatDate
  if (date) {
    formatDate = capitalize(moment(date).locale('es').format('dddd, DD/MMMM'))
  } else {
    formatDate = 'NOTAS'
  }

  useEffect(() => {
    const getData = async () => {
      let listOfElementsInDay = []
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules/${dayId}`)
        .then(res => listOfElementsInDay = [...listOfElementsInDay, ...res.data]) //eslint-disable-line

      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/${dayId}`)
        .then(res => listOfElementsInDay = [...listOfElementsInDay, ...res.data]) //eslint-disable-line

      listOfElementsInDay.sort((a, b) => a.order - b.order)
      listOfElementsInDay.length > 0 ? setIsOnline(true) : setIsOnline(false)
      setListOfSchedulesNotes(listOfElementsInDay)
      setCountOfItemsInDays(listOfElementsInDay.length)
    }
    getData()
  }, [updateList, updateItemInDays, updateWhenAScheduleIsDeleted, updateWhenANoteIsDeleted])

  // useEffect(() => {
  //   const getData = async () => {
  //     if (updateItemInDays.type === 'schedule') {
  //       const copyOfList = [...listOfSchedulesNotes]
  //       const element = copyOfList.filter(item => item.id === updateItemInDays.id)
  //       console.log('element', element)
  //     }
  //   }
  //   getData()
  // }, [updateItemInDays])

  return (
    <>
      <form className='daysUpdateForm' >
      <div className='daysUpdateForm__dayContainer'>

        <div className='daysUpdateForm__dayContainer--date'>
          <h3>{formatDate}</h3>
        </div>

        <div className='daysUpdateForm__dayContainer--status'>
          <h4 className="online" onClick={() => {
            setIsOnline(true)
            setIsTurningOffline(false)
          }
            }>Online</h4>
          <h4 className="offline" onClick={() => {
            setIsOnline(false)
            setIsTurningOffline(true)
          }
            } >Offline</h4>
        </div>

        { isOnline && (
          <div className='daysUpdateForm__dayContainer--options' >

            <SchedulesNotesItemInDays
              listOfItems={listOfSchedulesNotes}
              dayId={dayId}
              schedules={schedules}
              notes={notes}
              setUpdate={setUpdateList}
              updateData={updateList}
              setNewOrder={setListOfSchedulesNotes}
              setIsChangingOrder={setIsChangingOrder}
              isChangingOrder={isChangingOrder}
              configs={configs}
              saveNewOrder={saveNewOrder}

              setUpdatePreview={setUpdatePreview}
              updatePreview={updatePreview}
            />

            {(!isAddingANewElement && !isChangingOrder) &&
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
            }

            {isAddingANewElement &&
              <AddUpdateNoteScheduleItems
                setIsAddingANewElement={setIsAddingANewElement}
                type={typeOfNewElement}
                notes={notes}
                schedules={schedules}
                action={createNewRelation}
                setUpdate={setUpdate}
                count={countOfItemsInDays}
                setCount={setCountOfItemsInDays}
              />}

            {
              isChangingOrder &&
                <button
                  type="button"
                  className="daysUpdateForm__dayContainer--sendChangesButton"
                  onClick={() => saveNewOrder([...listOfSchedulesNotes])} >
                    Guardar Cambios
                </button>
            }

          </div>
        )}
      {
        (isTurningOffline && countOfItemsInDays > 0) &&
          <button
            type="button"
            className="daysUpdateForm__dayContainer--sendChangesButton"
            onClick={() => deleteAllRelationsPuttingOfflineState()} >
              Guardar Cambios
          </button>
      }
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
        display: flex;
        flex-direction: column;
        align-items: center;
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
      .daysUpdateForm__dayContainer--sendChangesButton{
        font-size: 1.5rem;
        margin-top: 15px;
        width: 150px;
        height: 40px; 
        border:  none;
        border-radius: 10px;
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
