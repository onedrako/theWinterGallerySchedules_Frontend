import moment from 'moment'
import { initialTimeZone } from '../../utils/constants'

let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const ItemInDay = ({
  itemData,
  configs,
  isOnline,
  date,
  country
}) => {
  const data = itemData.scheduleId ? itemData.schedule[0] : itemData.note[0]
  const time = {
    initialTime: '',
    finalTime: ''
  }

  switch (country) {
    case 'España':
      userTimeZone = 'Europe/Madrid'
      break
    case 'Argentina':
      userTimeZone = 'America/Argentina/Buenos_Aires'
      break
    case 'México':
      userTimeZone = 'America/Mexico_City'
      break
    default:
      break
  }

  if (itemData.scheduleId) {
    const initialTimeDate = moment.tz(`${date}T${data.initialTime}`, initialTimeZone)
    let finalTimeDate

    if (data.finalTime !== null) {
      finalTimeDate = moment.tz(`${date}T${data.finalTime}`, initialTimeZone)
      time.finalTime = moment.tz(finalTimeDate, userTimeZone).format('H:mm')
    }
    time.initialTime = moment.tz(initialTimeDate, userTimeZone).format('H:mm')
  }

  // Define Color for text
  const styles = {}
  styles.marginForTitles = itemData.order === 1 ? '0px' : '20px'

  if (itemData.scheduleId) {
    styles.titleColor = itemData.titleColor ? itemData.titleColor : configs.mainTitlesColor
    styles.timeColor = itemData.timeColor ? itemData.timeColor : configs.mainTextsColor
  } else {
    styles.titleColor = itemData.titleColor ? itemData.titleColor : configs.mainTitlesColor
    styles.commentColor = itemData.commentColor ? itemData.commentColor : configs.mainTextsColor
  }

  return (
    <>
    {
      itemData.schedule &&
      <div className="item">
        <h2 className='item__scheduleTitle'>{data.title}</h2>
        <h4 className='item__scheduleTime'>{`${time.initialTime}${time.finalTime && ` - ${time.finalTime}`}`}</h4>
      </div>
    }
    {
      itemData.note &&
        <div className="item">
          {data.title && <h2 className='item__noteTitle' >{data.title}</h2>}
          <p className='item__noteComment'>{data.comment}</p>
        </div>
    }
    {
      !isOnline &&
      <p>Nada</p>
    }

      <style jsx>{`
        .item{
          text-align: center;
        }
        .item__scheduleTitle{
          color: ${styles.titleColor};
          margin-top: ${styles.marginForTitles};
        }
        .item__scheduleTime{
          color: ${styles.timeColor};
        }
        .item__noteTitle{
          color: ${styles.titleColor};
          margin-top: ${styles.marginForTitles};
        }
        .item__noteComment{
          color: ${styles.titleColor};
        }
        h4{
          font-size: 2.3rem;
        }
        h2{
          font-size: 2.5rem;
        }
        p{
          font-size: 1.8rem;
        }
      `}</style>
    </>
  )
}

export default ItemInDay
