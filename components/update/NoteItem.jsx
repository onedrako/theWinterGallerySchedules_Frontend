import { useState } from 'react'
import { useFormik } from 'formik'

import iconsStyles from '../../styles/iconStyles.module.css'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever, MdCancel } from 'react-icons/md'

import sanitizeObject from '../../utils/sanitizeObject'
import objectPrepared from '../../utils/prepareObject'

const NoteItem = ({ noteData, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { id } = noteData

  const title = noteData.title || ''
  const comment = noteData.comment || ''

  const formik = useFormik({
    initialValues: {
      title: title,
      comment: comment
    },
    onSubmit: values => {
      const itemEdited = {
        title: values.title,
        comment: values.comment
      }
      const preparedObject = objectPrepared(itemEdited)
      preparedObject.updatedBy = 'admin'
      const safeObject = sanitizeObject(preparedObject)
      editNote(id, safeObject)
      setIsEditing(false)
    }
  })

  return (
    <>
    {
      isEditing
        ? (
          <div className='container'>
          <form className='container__data' onSubmit={formik.handleSubmit}>
            <input className='titleInput' type="Text" placeholder='Titulo' {...formik.getFieldProps('title')}/>
            <div className='container__data--schedule divisionInElement'>
              <textarea className='commentTextArea' type="Text" placeholder='Nota' {...formik.getFieldProps('comment')}/>
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
          <h3>{title}</h3>
          <div className='container__data--schedule divisionInElement'>
            <p>{comment}</p>
          </div>
          <div className='container__data--options'>
            <FaEdit size={20} className={iconsStyles.divisionIcon} onClick={() => setIsEditing(true)} />
            <MdDeleteForever size={20} className={iconsStyles.divisionIcon} onClick={() => deleteNote(id) } />
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
      padding: 10px;
    }
    .commentTextArea{
      width: 280px;
      height: 80px;
      border-radius: 10px;
      border: 1px solid #ccc;
      font-size: 1.5rem;
      font-family: 'Roboto', sans-serif;
      padding: 10px;

    }
    `}</style>
  </>
  )
}

export default NoteItem
