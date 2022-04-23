import axios from 'axios'
import moment from 'moment-timezone'
import 'moment/locale/es'
import { useEffect, useState } from 'react'

import ItemInDay from './ItemInDay'

const CardDayItem = ({ dayData, configs }) => {
  const [listOfSchedulesNotes, setListOfSchedulesNotes] = useState([])
  const [isOnline, setIsOnline] = useState(false)

  const { id } = dayData

  const { date } = dayData
  const day = moment(date).locale('es').format('dddd').toUpperCase()
  const dateNumber = moment(date).locale('es').format('D')

  useEffect(() => {
    const getData = async () => {
      let listOfElementsInDay = []
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/days-schedules/${id}`)
        .then(res => listOfElementsInDay = [...listOfElementsInDay, ...res.data]) //eslint-disable-line

      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/days-notes/${id}`)
        .then(res => listOfElementsInDay = [...listOfElementsInDay, ...res.data]) //eslint-disable-line

      listOfElementsInDay.sort((a, b) => a.order - b.order)
      listOfElementsInDay.length > 0 ? setIsOnline(true) : setIsOnline(false)
      setListOfSchedulesNotes(listOfElementsInDay)
    }
    getData()
  }, [])

  return (
    <>
      <div className="cardContainer">
        <div className="cardContainer__date">
          <p className="cardContainer__date--day">{day === 'FECHA INVÁLIDA' ? 'NOTAS:' : day}</p>
          { dateNumber !== 'Fecha inválida' && <p className="cardContainer__date--dateNumber">{dateNumber}</p> }
        </div>
        <div className="cardContainer__items">
          {listOfSchedulesNotes.map(item =>
            <ItemInDay
              key={`item-${item.id}`}
              itemData={item}
              configs={configs}
              listOfSchedulesNotes={listOfSchedulesNotes}
              isOnline={isOnline}
              date={date}
            />)}
        </div>
      </div>

      <style jsx>{`
        .cardContainer {
          width: 100%;
          height: 420px;
          /* border: 1px solid #fff; */
          padding: 10px;
          background-color: #fff;
        }
        .cardContainer__date {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 15px 10px 15px;
          border-bottom: ${dateNumber !== 'Fecha inválida' ? `1px solid ${configs.backgroundColor}` : 'none'};
        }
        .cardContainer__date--dateNumber{
          color: ${configs.mainTitlesColor};
          border: 2px solid ${configs.mainTitlesColor};
          width: 45px;
          text-align: center;
          padding: 5px;
        }
        .cardContainer__date--day {
          letter-spacing: 2px;
          color: ${configs.mainTitlesColor};
        }
        .cardContainer__items {
          display: flex;
          flex-direction: column;
          padding: 10px;
          gap: 20px;
          height: 85%;
          justify-content: center;
        }
        p {
          font-size: 2.2rem;
          font-weight: 500;
        }
      `}</style>
    </>
  )
}

export default CardDayItem
