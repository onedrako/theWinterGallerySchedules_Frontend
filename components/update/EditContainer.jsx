import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import ListOfItemsToEdit from './ListOfItemsToEdit'
import ListOfDays from './ListOfDays'
import User from '../layout/User'

const EditDataContainer = () => {
  const [schedules, setSchedules] = useState([])
  const [isUpdatingSchedules, setIsUpdatingSchedules] = useState(false)

  const [notes, setNotes] = useState([])
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false)

  const [days, setDays] = useState([])
  const [isUpdatingDays, setIsUpdatingDays] = useState(false)

  // TO UPDATE THE ITEMS ON DAYS WHEN UPDATING THE SCHEDULES OR NOTES
  const [updateItemInDays, setUpdateItemInDays] = useState({ type: '', item: {} })

  // AUTH
  const { data: session, status } = useSession()
  // console.log(session)

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      return
    }
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    })
      .then(res => res.data.sort((a, b) => {
        if (a.initialTime < b.initialTime) {
          return -1
        }
        if (a.initialTime > b.initialTime) {
          return 1
        }
        return 0
      }))
      .then(res => setSchedules(res))
  }, [isUpdatingSchedules, status])

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      return
    }
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    })
      .then(res => setNotes(res.data))
  }, [isUpdatingNotes, status])

  useEffect(() => {
    const getData = async () => {
      const data = []
      const elements = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/days`)
        .then(res => res.data)
      const elementsWithDate = elements
        .filter(element => element.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      const elementsWithoutDate = elements.filter(element => !element.date)
      data.push(...elementsWithDate)
      data.push(...elementsWithoutDate)
      setDays(data)
    }
    getData()
  }, [isUpdatingDays, status])

  if (session == null) {
    return (
      <>
      <main className="container">
        <User theme="white" page={'/'} pageText="Home"/>
        <div className="container__warning">
          <h3>Alto ahí persona!!!, para ver este contenido tienes que iniciar sesión</h3>
        </div>

      </main>
      <style jsx>{`
            .container{
              padding: 25px;
              max-width: 1000px;
              height: 100%;
              margin: 0 auto;
            }
            .container__warning{
              margin-top: 50px;
              height: 500px;
              display: flex;
              justify-content: center;
              place-items: center;
              border: 1px solid #ccc;
              border-radius: 10px;
            }
            h2{
              font-size: 2.5rem;
              margin-bottom: 25px;
            }
            h3{
              font-size: 1.8rem;
              margin-bottom: 10px;
            }
        `}</style>
      </>
    )
  }

  return (
    <>
      <main className="container">
        <User theme="white" page={'/'} pageText="Home"/>

        <h2 className="title">Actualizar Datos</h2>

        <h3>Horarios</h3>
        <ListOfItemsToEdit
          type={'schedule'}
          schedules={schedules}
          setSchedules={setSchedules}
          setUpdate={setIsUpdatingSchedules}
          updateData={isUpdatingSchedules}
          setUpdateItemInDays={setUpdateItemInDays}
        />

        <h3>Notas</h3>
        <ListOfItemsToEdit
          type={'note'}
          notes={notes}
          setUpdate={setIsUpdatingNotes}
          updateData={isUpdatingNotes}
          setUpdateItemInDays={setUpdateItemInDays}
        />

        <h3>Semana</h3>
      </main>

      <ListOfDays
        days={days}
        setDays={setDays}
        schedules={schedules}
        notes={notes}
        updateData={isUpdatingDays}
        setUpdateData={setIsUpdatingDays}
        updateItemInDays={updateItemInDays}
      />

      <style jsx>{`
            .container{
              padding: 25px;
              max-width: 1000px;
              height: 100%;
              margin: 0 auto;
            }
            .title{
              border-bottom: 3px solid #e4a548;
              padding-bottom: 10px;
              color: #e28c29;
              width: 50%;
              margin-top: 25px;
            }
            .container__warning{
              margin-top: 50px;
              background-color: #e4a548;
            }
            h2{
              font-size: 2.5rem;
              margin-bottom: 25px;
            }
            h3{
              font-size: 1.8rem;
              margin-bottom: 10px;
            }
        `}</style>
    </>
  )
}

export default EditDataContainer
