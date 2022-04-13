import { useState } from 'react'
import parseDates from '../../utils/parseDates'
import DayItem from './DayItem'

const ListOfDays = () => {
  const [days, setDays] = useState([])
  const [scheduleData, setScheduleData] = useState([{
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {}
  }])

  return (
    <>
    <div>
      <div className='selectWeekContainer'>
        <p>Seleccionar Semana</p>
        <input type="week" className='weekInput'
          onChange={e => {
            const selectedWeek = e.target.value
            const dates = parseDates(selectedWeek)
            setDays(dates)
          }} />
      </div>

      <div className='selectWeekContainer'>
        <p>Color de Fondo</p>
        <input className='colorInput' type="color" />
        <p>Color de Títulos</p>
        <input className='colorInput' type="color" />
        <p>Color de Textos</p>
        <input className='colorInput' type="color" />
      </div>
    </div>

    { days && (
      <DayItem/>
    )}

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
      .colorInput{
        width: 25px;
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
