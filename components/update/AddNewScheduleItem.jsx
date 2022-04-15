import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { BsFillArrowRightSquareFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'

import sanitizeObject from '../../utils/sanitizeObject'
import objectPrepared from '../../utils/prepareObject'

import iconsStyles from '../../styles/iconStyles.module.css'

const AddNewScheduleItem = ({ setVisible, addItem }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      initialTime: '',
      finalTime: ''
    },
    onSubmit: values => {
      const preparedObject = objectPrepared(values)
      preparedObject.updatedBy = 'admin'
      const safeObject = sanitizeObject(preparedObject)
      addItem(safeObject)
      setVisible(false)
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      initialTime: Yup.string().required('Debes elegir una Hora de inicio'),
      finalTime: Yup.string()
    })
  })

  return (
    <>
      <div className='container'>
        <form className='container__data' onSubmit={formik.handleSubmit}>
          <input className='titleInput' type="Text" {...formik.getFieldProps('title')} />
          <div className='container__data--schedule divisionInElement'>
            <div>
              <input className='timeInput' type="time" {...formik.getFieldProps('initialTime')}/>
              {formik.errors.initialTime && <p>{formik.errors.initialTime}</p>}
            </div>
            <BsFillArrowRightSquareFill size={20} className='container__data__icon'/>
            <input className='timeInput' type="time" {...formik.getFieldProps('finalTime')} />
          </div>
          <div className='container__data--options'>
            <BsFillCheckCircleFill size={20} className={iconsStyles.divisionIcon} color="green" alt="Aceptar" onClick={formik.handleSubmit}/>
            <MdCancel size={23} className={iconsStyles.divisionIcon} color="red" alt="Rechazar" onClick={() => setVisible(false)}/>
          </div>

        </form>
      </div>

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

export default AddNewScheduleItem
