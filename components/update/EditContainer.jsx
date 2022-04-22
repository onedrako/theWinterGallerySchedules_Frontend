
import { useState, useEffect } from 'react'
import axios from 'axios'

import ListOfItemsToEdit from './ListOfItemsToEdit'
import ListOfDays from './ListOfDays'

const EditDataContainer = () => {
  const [schedules, setSchedules] = useState([])
  const [isUpdatingSchedules, setIsUpdatingSchedules] = useState(false)

  const [notes, setNotes] = useState([])
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false)

  const [days, setDays] = useState([])
  const [isUpdatingDays, setIsUpdatingDays] = useState(false)

  // TO UPDATE THE ITEMS ON DAYS WHEN UPDATING THE SCHEDULES OR NOTES
  const [updateItemInDays, setUpdateItemInDays] = useState({ type: '', item: {} })

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/schedules`)
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
  }, [isUpdatingSchedules])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`)
      .then(res => setNotes(res.data))
  }, [isUpdatingNotes])

  useEffect(() => {
    const getData = async () => {
      const data = []
      const elements = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/days`).then(res => res.data)
      const elementsWithDate = elements
        .filter(element => element.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      const elementsWithoutDate = elements.filter(element => !element.date)
      data.push(...elementsWithDate)
      data.push(...elementsWithoutDate)
      setDays(data)
    }
    getData()
  }, [isUpdatingDays])

  return (
    <>
      <section className="container">
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
      </section>

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
              margin: 0 auto;
            }
            .title{
              border-bottom: 3px solid #e4a548;
              padding-bottom: 10px;
              color: #e28c29;
              width: 50%;
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
