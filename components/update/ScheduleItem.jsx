import { useFormik } from 'formik'
import { useState } from 'react'

import { BsFillArrowRightSquareFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever, MdCancel } from 'react-icons/md'

import sanitizeObject from '../../utils/sanitizeObject'
import objectPrepared from '../../utils/prepareObject'

import iconsStyles from '../../styles/iconStyles.module.css'

const ScheduleItem = ({ scheduleData, editSchedule, deleteSchedule }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { id } = scheduleData
  const finalTime = scheduleData.finalTime ? scheduleData.finalTime.substr(0, 5) : ''

  const formik = useFormik({
    initialValues: {
      title: scheduleData.title,
      initialTime: scheduleData.initialTime.substr(0, 5),
      finalTime: finalTime
    },
    onSubmit: values => {
      const itemEdited = {
        title: values.title,
        initialTime: values.initialTime,
        finalTime: values.finalTime
      }
      const preparedObject = objectPrepared(itemEdited)
      preparedObject.updatedBy = 'admin'
      const safeObject = sanitizeObject(preparedObject)

      editSchedule(id, safeObject)
      setIsEditing(false)
    }
  })

  return (
    <>
    {isEditing
      ? (
      <div className='container'>
        <form className='container__data' onSubmit={formik.handleSubmit}>
          <input className='titleInput' type="Text" {...formik.getFieldProps('title')} />
          <div className='container__data--scheduleEdit divisionInElement'>
            <input className='timeInput' type="time" {...formik.getFieldProps('initialTime')} />
            <BsFillArrowRightSquareFill size={20} className='container__data__icon'/>
            <input className='timeInput' type="time" {...formik.getFieldProps('finalTime')} />
          </div>
          <div className='container__data--options'>
            <BsFillCheckCircleFill size={20} className={iconsStyles.divisionIcon} color="green" alt="Aceptar" onClick={formik.handleSubmit}/>
            <MdCancel size={23} className={iconsStyles.divisionIcon} color="red" alt="Rechazar" onClick={() => setIsEditing(false)}/>
          </div>

        </form>
      </div>
        )
      : (
      <div className='container'>
      <div className='container__data'>
        <h3 className='container__data--title' >{scheduleData.title}</h3>
        <div className='container__data--schedule divisionInElement'>
          <h3>{scheduleData.initialTime.substr(0, 5) }</h3>
          <BsFillArrowRightSquareFill size={20} className='container__data__icon'/>
          <h3 >{finalTime}</h3>
        </div>
        <div className='container__data--options'>
          <FaEdit size={20} className={iconsStyles.divisionIcon} onClick={() => setIsEditing(true)} />
          <MdDeleteForever size={20} className={iconsStyles.divisionIcon} onClick={() => deleteSchedule(id)}/>
        </div>

      </div>
      </div>
        )
    }

      <style jsx>{`
        .container{
          padding: 10px;
          width: 100%;
        }
        .container__data{
          border: 1px solid #ccc;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .container__data--title{
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 50%;
        }

        .container__data--schedule{
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 30%;
        }

        .container__data--options{
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 20%;
        }

        .divisionInElement{
          border-right: 1px solid #ccc;
          border-left: 1px solid #ccc;
          padding: 0 10px;
          width: 200px;
        }

        h3{
          font-size: 2rem;
          margin-right: 15px;
        }

        p{
          font-size: 1.2rem;
        }

        .container__data--scheduleEdit{
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 50%;
        }
        
        .titleInput{
          font-size: 1.6rem;
          width: 40%;
          height: 35px;
          margin-right: 15px;
          border-radius: 10px;
          border: 1px solid #ccc;
          padding: 5px;
        }
        .timeInput{
          width: 130px;
          height: 35px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-size: 1.5rem;
          font-family: 'Roboto', sans-serif;
          padding: 5px;
        }
      `}</style>
    </>
  )
}

export default ScheduleItem
