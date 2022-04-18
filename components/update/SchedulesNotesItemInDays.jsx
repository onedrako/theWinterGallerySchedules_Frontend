import DayScheduleItem from './DayScheduleItem'
import DayNoteItem from './DayNoteItem'

const SchedulesNotesItemInDays = ({ schedules, notes }) => {
  return (
  <>
    { schedules.map(schedule => (<DayScheduleItem key={`daySchedule-${schedule.id}`} schedule={schedule} />)) }
    { notes.map(note => (<DayNoteItem key={`dayNote-${note.id}`} note={note} />))}
  </>
  )
}

export default SchedulesNotesItemInDays
