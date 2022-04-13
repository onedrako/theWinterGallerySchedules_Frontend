import { useState } from 'react'
import { MdOutlineNoteAdd, MdCancel, MdDeleteForever } from 'react-icons/md'
import { FaRegCalendarPlus, FaEdit } from 'react-icons/fa'
import { BsFillCheckCircleFill, BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'

import iconsStyles from '../../styles/iconStyles.module.css'

const DayItem = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [isAddingANewElement, setIsAddingANewElement] = useState(true)

  return (
    <>
      <form className='daysUpdateForm' >
      <div className='daysUpdateForm__dayContainer'>

        <div className='daysUpdateForm__dayContainer--date'>
          <h3>Lunes 12/02/22 </h3>
          <input className='colorInput' type="color" />
        </div>

        <div className='daysUpdateForm__dayContainer--status'>
          <h4 className="online" onClick={() => setIsOnline(true) }>Online</h4>
          <h4 className="offline" onClick={() => setIsOnline(false)} >Offline</h4>
        </div>

        { isOnline &&
        (
          <div className='daysUpdateForm__dayContainer--options' >
          <div className="options__container">
            <div className='addNewItemContainer' onClick={() => setIsAddingANewElement(true)} >
              <FaRegCalendarPlus size={22} />
              <p>Horarios</p>
            </div>

            <div className='addNewItemContainer' onClick={() => setIsAddingANewElement(true)} >
              <MdOutlineNoteAdd size={25} />
              <p>Notas</p>
            </div>
          </div>

          <div className='chosenElements'>
            <div className="chosenElements__upDownElement">
              <BsFillCaretUpSquareFill size={20} className={iconsStyles.icon}/>
              <BsFillCaretDownSquareFill size={20} className={iconsStyles.icon}/>
            </div>
            <div className="chosenElements__description">
              <p>Mañana</p>
              <div className="chosenElements__upDownElement">
                <p>10:00</p>
                <span> - </span>
                <p>12:00</p>
            </div>
            </div>
            <div className="chosenElements__upDownElement">
            <FaEdit size={20} className={iconsStyles.icon} />
            <MdDeleteForever size={20} className={iconsStyles.icon}/>
            </div>
          </div>

          <div className='chosenElements'>
            <div className="chosenElements__upDownElement">
              <BsFillCaretUpSquareFill size={20} className={iconsStyles.icon}/>
              <BsFillCaretDownSquareFill size={20} className={iconsStyles.icon}/>
            </div>
            <div className={'chosenElements__description'}>
              <p>Discord</p>
              <p>Este es yb ejeplo deeojfwhfwfkjh wieyhgbfwiyf weuihfgwe weyhfgbwuilehf wiufgbwlh wehifgbwile</p>
            </div>
            <div className="chosenElements__upDownElement">
            <FaEdit size={20} className={iconsStyles.icon} />
            <MdDeleteForever size={20} className={iconsStyles.icon}/>
            </div>
          </div>

          {
            isAddingANewElement &&
            <div className="addNewItem--schedule">
            <select name="" id="">
              <option value="">Horario 1</option>
              <option value="">Nota 1</option>
            </select>
            <input className='colorInput' type="color" />
            <BsFillCheckCircleFill size={20} className={iconsStyles.closeIcon} color="green" alt="Aceptar" />
            <MdCancel size={23} className={iconsStyles.closeIcon} color="red" alt="Rechazar" onClick={() => setIsAddingANewElement(false)}/>
          </div>
          }
        </div>
        )}

      </div>
    </form>

  <style jsx>{` 
    .daysUpdateForm{
        width: 90%;
        margin: 0 auto;
      } 
      .daysUpdateForm__dayContainer{
        border: 1px solid #ccc;
        max-width: 30%;
        padding: 10px;
      }
      .daysUpdateForm__dayContainer--date{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      .daysUpdateForm__dayContainer--status{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      .daysUpdateForm__dayContainer--options{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0; 
      }

      .chosenElements{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        width: 90%;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        gap: 10px;
      }
      .chosenElements__upDownElement{
        display: flex;
        gap: 5px;
      }

      .chosenElements__description{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }

      .online{
        background-color: ${isOnline ? '#10b410' : '#ccc'};
        border-radius: 10px 0px 0px 10px;
        width: 60px;
        padding: 5px;
        text-align: center;
        cursor: pointer;
      }
      .offline{
        background-color: ${isOnline ? '#ccc' : '#e42f2f'};
        border-radius: 0px 10px 10px 0px;
        width: 60px;
        padding: 5px;
        text-align: center;
        cursor: pointer;
      }
      .options__container{
        display: flex;
        gap: 25px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-top: 10px;
      }
      .addNewItemContainer{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        }
      .addNewItem--schedule{
        display: flex;
        align-items: center;
        margin : 10px 0;
        gap: 15px;
        width: 90%;
      }

      p {
        font-size: 1.5rem;
      }
      span {
        font-size: 1.5rem;
      }
      h3{
      font-size: 2rem;
      margin-right: 15px;
      }
      h4{
        font-size: 1.5rem;
      }
      select{
        width: 225px;
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
    }`}</style>
    </>

  )
}

export default DayItem
