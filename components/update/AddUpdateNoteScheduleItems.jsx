import React from 'react'
import { useFormik, Field } from 'formik'

import { MdCancel } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'

import iconsStyles from '../../styles/iconStyles.module.css'

const AddUpdateNoteScheduleItems = ({ setIsAddingANewElement, type, notes, schedules }) => {
  const formik = useFormik({
    initialValues: {
      option: ''
    },
    onSubmit: values => {
      const type = values.option.substring(0, 1)
      const id = values.option.substring(2)
      if (type === 's') {
        setIsAddingANewElement(false)
      }
    }

  })

  return (
    <>
    <form className="addNewItem--options" onSubmit={formik.handleSubmit} >
    <select {...formik.getFieldProps('option')} >
      {type === 'schedules'
        ? schedules.map(schedule => (
        <option value={`s-${schedule.id}`} key={`scheduleElement-${schedule.id}`} >
          {`${schedule.title && schedule.title}: ${schedule.initialTime !== null ? schedule.initialTime.substr(0, 5) : ''} ${schedule.finalTime !== null ? `- ${schedule.finalTime.substr(0, 5)}` : ''}`}
        </option>))
        : notes.map(note => (
        <option key={`noteElement-${note.id}`} value={`n-${note.id}`} >
          {`${note.title && note.title}: ${note.comment && note.comment}`}
        </option>))
      }
    </select>
    <input className='colorInput' type="color" />
    <BsFillCheckCircleFill size={20} className={iconsStyles.closeIcon} color="green" alt="Aceptar" onClick={formik.handleSubmit} />
    <MdCancel size={23} className={iconsStyles.closeIcon} color="red" alt="Rechazar" onClick={() => setIsAddingANewElement(false)}/>
  </form>

    <style jsx>{`
      select{
    width: 225px;
    height: 35px;
    font-size: 1.5rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    justify-self: center;
    }
    .addNewItem--options{
      display: flex;
      justify-content: center;
      align-items: center;
      margin : 10px 0;
      gap: 15px;
      width: 90%;
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
