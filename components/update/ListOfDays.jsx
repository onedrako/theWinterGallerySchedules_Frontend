import { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import axios from 'axios'
import { Formik, Field, Form } from 'formik'
import { useSession } from 'next-auth/react'

import DayItem from './DayItem'

import parseDates from '../../utils/parseDates'
import { safeHTMLObject } from '../../utils/sanitizeObject'

const ListOfDays = ({ days, notes, schedules, updateData, setUpdateData, updateItemInDays }) => {
  const [configs, setConfigs] = useState({})
  const [loading, setLoading] = useState(true)
  const [isEditingOptions, setIsEditingOptions] = useState(false)
  const { data: session } = useSession()

  const setNewWeek = (week) => {
    const actualWeek = [...days]
    const newWeek = []
    actualWeek.forEach((day, index) => {
      day.date = moment(week[index]).format('MM-DD-YYYY')
    })
    actualWeek[actualWeek.length - 1].date = null
    actualWeek.forEach(day => {
      const { id } = day
      const { date } = day
      const { updatedBy } = day
      newWeek.push({ id, date, updatedBy })
    })

    const safeObjet = safeHTMLObject({ listOfDays: newWeek })

    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/days`, safeObjet, {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    })
      .then(() => setUpdateData(!updateData))
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/configs`)
      .then(res => setConfigs(res.data))
      .then(() => setLoading(false))
  }, [])

  return (
    <>
      <div className='selectWeekContainer'>
        <p>Seleccionar Semana</p>
        <input type="week" className='weekInput'
          onChange={e => {
            const selectedWeek = e.target.value
            const dates = parseDates(selectedWeek)
            setNewWeek(dates)
          }} />
      </div>
        {!loading &&
          <Formik
            initialValues = {{
              backgroundColor: configs.backgroundColor,
              mainTitlesColor: configs.mainTitlesColor,
              mainTextsColor: configs.mainTextsColor
            }}
            onSubmit={ async (values) => {
              const { backgroundColor, mainTitlesColor, mainTextsColor } = values
              const data = {
                backgroundColor,
                mainTitlesColor,
                mainTextsColor
              }
              await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/configs/1`, data, {
                headers: { Authorization: `Bearer ${session.accessToken}` }
              })
              setIsEditingOptions(false)
            }}
          >
            <Form onChange={() => setIsEditingOptions(true) } >
              <div className='selectWeekContainer'>
              <p>Color de Fondo</p>
              <Field type='color' name='backgroundColor' />
              <p>Color de Títulos</p>
              <Field type='color' name='mainTitlesColor' />
              <p>Color de Textos</p>
              <Field type='color' name='mainTextsColor' />
              { isEditingOptions && <button type='submit' className='selectWeekContainer__sendChangesButton'>Guardar cambios</button>}
              </div>
            </Form>
          </Formik>
        }

      <div className='daysContainer'>
        { days && (days.map(day => <DayItem
          key={`day-${day.id}`}
          notes={notes}
          schedules={schedules}
          day={day}
          setUpdate={setUpdateData}
          updateData={updateData}
          configs={configs}
          updateItemInDays={updateItemInDays}
          />))
        }
      </div>

      <style jsx>{` 
        .weekInput{
          width: 185px;
          height: 35px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-size: 1.5rem;
          font-family: 'Roboto', sans-serif;
          padding: 15px;
        }

        .selectWeekContainer{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .selectWeekContainer__sendChangesButton{
          font-size: 1.5rem;
          margin-left : 25px;
          width: 150px;
          height: 40px; 
          border:  none;
          border-radius: 10px;
          cursor: pointer;
        }

        .colorInput{
          width: 25px;
        }

        .daysContainer{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 25px;
          gap: 25px;
        }

        p {
          font-size: 1.5rem;
        }

        h3{
        font-size: 2rem;
        margin-right: 15px;
        }
      }`}</style>
  </>
  )
}

export default ListOfDays
