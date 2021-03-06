import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { saveAs } from 'file-saver'

import ListOfItemsToEdit from './ListOfItemsToEdit'
import ListOfDays from './ListOfDays'
import User from '../layout/User'
import HomePage from '../home/HomePage'
import StyledButton from '../layout/StyledButton'

const EditDataContainer = () => {
  const [schedules, setSchedules] = useState([])
  const [isUpdatingSchedules, setIsUpdatingSchedules] = useState(false)

  const [notes, setNotes] = useState([])
  const [isUpdatingNotes, setIsUpdatingNotes] = useState(false)

  const [days, setDays] = useState([])
  const [isUpdatingDays, setIsUpdatingDays] = useState(false)

  // TO UPDATE THE ITEMS ON DAYS WHEN UPDATING THE SCHEDULES OR NOTES
  const [updateItemInDays, setUpdateItemInDays] = useState({ type: '', item: {} })

  // TO UPDATE ITEMS ON PREVIEW IMAGES WHEN UPDATING OR ADDING NEW ITEMS
  const [updatePreview, setUpdatePreview] = useState(false)

  // AUTH
  const { data: session, status } = useSession()

  // GET Preview Images

  const savePreview = async (country) => {
    import('dom-to-image-more').then(({ default: domtoimage }) => {
      domtoimage.toBlob(document.getElementById(country))
        .then(
          function (blob) {
            saveAs(blob, `Preview-${country}.png`)
          }
        )
    })
  }

  // EFFECTS
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
          <h3>Alto ah?? persona!!!, para ver este contenido tienes que iniciar sesi??n</h3>
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

          setUpdatePreview={setUpdatePreview}
          updatePreview={updatePreview}
        />

        <h3>Notas</h3>
        <ListOfItemsToEdit
          type={'note'}
          notes={notes}
          setUpdate={setIsUpdatingNotes}
          updateData={isUpdatingNotes}
          setUpdateItemInDays={setUpdateItemInDays}

          setUpdatePreview={setUpdatePreview}
          updatePreview={updatePreview}
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

        updateWhenAScheduleIsDeleted={isUpdatingSchedules}
        updateWhenANoteIsDeleted={isUpdatingNotes}

        setUpdatePreview={setUpdatePreview}
        updatePreview={updatePreview}

      />

      <div>
        <div>
          <div className='titleButtonToDownLoad'>
            <h2 className="titleForPreview">Vista previa: Espa??a Peninsular</h2>
            <StyledButton text='Descargar' theme="white" action={savePreview} selector={'Espa??a'}/>
          </div>
          <HomePage id="Espa??a" type="preview" update={updatePreview}/>

          <div className='titleButtonToDownLoad'>
            <h2 className="titleForPreview">Vista previa: Argentina</h2>
            <StyledButton text='Descargar' theme="white" action={savePreview} selector={'Argentina'}/>
          </div>
          <HomePage id="Argentina" type="preview" update={updatePreview} />

          <div className='titleButtonToDownLoad'>
            <h2 className="titleForPreview">Vista previa: M??xico(CDMX)</h2>
            <StyledButton text='Descargar' theme="white" action={savePreview} selector={'M??xico'}/>
          </div>
          <HomePage id="M??xico" type="preview" update={updatePreview}/>

        </div>
      </div>

      <div id="downloadImg">
        <p>Hola</p>
      </div>

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
            .titleButtonToDownLoad{
              display: flex;
              align-items: center;
            }
            .titleForPreview{
              border-bottom: 3px solid #e4a548;
              padding-bottom: 10px;
              color: #e28c29;
              width: 50%;
              margin-top: 25px;
              padding-left: 25px;
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
