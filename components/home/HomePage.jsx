import { useEffect, useState } from 'react'
import axios from 'axios'
import CardDayItem from './CardDayItem'
import User from '../layout/User'

const HomePage = () => {
  const [days, setDays] = useState([])
  const [configs, setConfigs] = useState([])

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
  }, [])

  useEffect(() => {
    const getData = async () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/configs`)
        .then(res => setConfigs(res.data))
    }
    getData()
  }, [])

  return (
    <>
      <main>
        <section className="user">
          <User color={configs.mainTextsColor} page="./update" pageText="Actualizar Horarios"/>
        </section>
        <section className="container">
        {days?.map(day => <CardDayItem key={`day-${day.id}`} dayData={day} configs={configs} />)}
        </section>
      </main>

      <style jsx>{`
        main{
          height: 100vh;
          width: 100%;
          background-color: ${configs.backgroundColor};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          /* position: relative; */
        }
        .user {
          width: 100%;
          height: 10%;
          display: flex;

        }
        .container{
          width: 90%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          justify-self: center;
          padding: 15px 50px;
          gap: 15px;
        }
      `}</style>
    </>
  )
}

export default HomePage
