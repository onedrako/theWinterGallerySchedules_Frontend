import React from 'react'
import ScheduleItem from './ScheduleItem'
import NoteItem from './NoteItem'
import { FaPlusCircle } from 'react-icons/fa'
// import iconsStyles from '../../styles/iconStyles.module.css'

const ListOfItemsToEdit = ({ type }) => {
  const items = [1]
  const comments = [1]

  return (
    <>
      <div>
        { type === 'schedule'
          ? items.map(item => <ScheduleItem key={1}/>)
          : comments.map(comment => <NoteItem key={2}/>)
        }
      </div>

      <div className='addNewItemContainer' >
        <FaPlusCircle size={25} />
        <p>Añadir nuevo elemento</p>
      </div>

      <style jsx>{`
        .addNewItemContainer{
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
          margin-top: 10px;
          cursor: pointer;
        }
        p{
          margin-left: 10px;
          font-size: 1.4rem;
        }
      `}</style>
    </>

  )
}

export default ListOfItemsToEdit
