import React from 'react'
import { useFormik } from 'formik'

import { MdCancel } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import iconsStyles from '../../styles/iconStyles.module.css'

const AddUpdateNoteScheduleItems = ({ setIsAddingANewElement, type, notes, schedules, action, count, setCount }) => {
  const formik = useFormik({
    initialValues: {
      option: '',
      generalColor: '',
      titleColor: '',
      timeColor: '',
      commentColor: ''
    },
    onSubmit: values => {
      const type = values.option.substring(0, 1)
      const id = parseInt(values.option.substring(2))
      let relationId
      console.log(values)

      if (type === 's') {
        if (values.generalColor !== '') {
          values.titleColor = values.generalColor
          values.timeColor = values.generalColor
        }
        const data = {
          scheduleId: id,
          titleColor: values.titleColor,
          timeColor: values.timeColor
        }
        action('schedule', data, relationId)
        setIsAddingANewElement(false)
      } else if (type === 'n') {
        if (values.generalColor !== '') {
          values.titleColor = values.generalColor
          values.commentColor = values.generalColor
        }
        const data = {
          noteId: id,
          titleColor: values.titleColor,
          commentColor: values.commentColor
        }
        action('n', data)
        setIsAddingANewElement(false)
      }
    }

  })

  return (
    <>
    <div className="addNewItem" onSubmit={formik.handleSubmit} >
      <select {...formik.getFieldProps('option')} >
        <option value="">Selecciona una opción</option>
        {type === 'schedules'
          ? schedules.map(schedule => (
          <option value={`s-${schedule.id}`} key={`scheduleElement-${schedule.id}`} >
            {`${schedule.title && schedule.title}: ${schedule.initialTime !== null ? schedule.initialTime.substr(0, 5) : ''} ${schedule.finalTime !== null ? `- ${schedule.finalTime.substr(0, 5)}` : ''}`}
          </option>))

          : notes.map(note => (
          <option key={`noteElement-${note.id}`} value={`n-${note.id}`} >
            {`${note.title && note.title}: ${note.comment ? note.comment : ''}`}
          </option>))
        }
      </select>
      <div className="addNewItem--options">
        <p>Color general</p>
        <input className='colorInput' type="color" {...formik.getFieldProps('generalColor')} />
        {type === 'schedules' && <>
          <p>Color título</p>
          <input className='colorInput' type="color" {...formik.getFieldProps('titleColor')} />
          <p>Color horario</p>
          <input className='colorInput' type="color" {...formik.getFieldProps('timeColor')} />
        </>
        }
        { type === 'notes' && <>
          <p>Color título</p>
          <input className='colorInput' type="color" {...formik.getFieldProps('titleColor')} />
          <p>Color nota</p>
          <input className='colorInput' type="color" {...formik.getFieldProps('commentColor')} />
        </>}
      </div>
      <div className="addNewItem--buttons">
        <p>Aceptar</p>
        <BsFillCheckCircleFill size={20} className={iconsStyles.closeIcon} color="green" alt="Aceptar" onClick={formik.handleSubmit} />
        <p>Regresar</p>
        <MdCancel size={23} className={iconsStyles.closeIcon} color="red" alt="Rechazar" onClick={() => setIsAddingANewElement(false)}/>
      </div>

    </div>

    <style jsx>{`
      .addNewItem{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin : 10px 0;
        gap: 15px;
        width: 90%;
        border-radius: 10px;
        border: 1px solid #ccc;
        padding: 15px;
      }
      .addNewItem--options{
        display: flex;
        gap: 5px;
        align-items: center;
      }
      .addNewItem--buttons{
        display: flex;
        gap: 10px;
        align-items: center;
      }
      select{
        width: 90%;
        height: 35px;
        font-size: 1.5rem;
        border-radius: 10px;
        border: 1px solid #ccc;
        justify-self: center;
      }
      option{
        font-size: 1.5rem;
      }
      .colorInput{
        width: 25px;
      }
      p {
        font-size: 1.6rem;
      }
    `}</style>

    </>
  )
}

export default AddUpdateNoteScheduleItems
