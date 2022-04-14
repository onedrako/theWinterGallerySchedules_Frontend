import { useFormik } from 'formik'
import { useState } from 'react'

import { BsFillArrowRightSquareFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever, MdCancel } from 'react-icons/md'

import iconsStyles from '../../styles/iconStyles.module.css'

const ScheduleItem = ({ scheduleData, editSchedule }) => {
  const [isEditing, setIsEditing] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: scheduleData.title,
      initialTime: scheduleData.initialTime.substr(0, 5),
      finalTime: scheduleData.finalTime.substr(0, 5)
    },
    onSubmit: values => {
      const { id } = scheduleData
      const itemEdited = {
        id,
        title: values.title,
        initialTime: values.initialTime,
        finalTime: values.finalTime,
        updatedAt: new Date()
      }
      editSchedule(itemEdited)
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
          <div className='container__data--schedule divisionInElement'>
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
        <h3>{scheduleData.title}</h3>
        <div className='container__data--schedule divisionInElement'>
          <h3>{scheduleData.initialTime.substr(0, 5) }</h3>
          <BsFillArrowRightSquareFill size={20} className='container__data__icon'/>
          <h3 >{scheduleData.finalTime.substr(0, 5) }</h3>
        </div>
        <div className='container__data--options'>
          <FaEdit size={20} className={iconsStyles.divisionIcon} onClick={() => setIsEditing(true)} />
          <MdDeleteForever size={20} className={iconsStyles.divisionIcon}/>
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
        .container__data--schedule{
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 70%;
        }

        .container__data--options{
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 30%;
        }

        .divisionInElement{
          border-right: 1px solid #ccc;
          border-left: 1px solid #ccc;
          padding: 0 10px;
        }

        h3{
          font-size: 2rem;
          margin-right: 15px;
        }

        p{
          font-size: 1.2rem;
        }
        
        .titleInput{
          font-size: 1.6rem;
          width: 125px;
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
