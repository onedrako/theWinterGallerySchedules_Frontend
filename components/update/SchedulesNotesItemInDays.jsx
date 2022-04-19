import DayScheduleItem from './DayScheduleItem'
import DayNoteItem from './DayNoteItem'

const SchedulesNotesItemInDays = ({ listOfItems, dayId, setUpdate, updateData, schedules, notes, setNewOrder }) => {
  return (
  <>
    {listOfItems.map(item =>
      item.schedule
        ? <DayScheduleItem
          key={`daySchedule-${item.id}`}
          schedule={item}
          listOfItems={listOfItems}
          dayId={dayId}
          setUpdate={setUpdate}
          updateData={updateData}
          schedules={schedules}
          setNewOrder={setNewOrder}
          />
        : <DayNoteItem
          key={`dayNote-${item.id}`}
          note={item}
          listOfNotes={listOfItems.filter(item => item.note)}
          dayId={dayId}
          setUpdate={setUpdate}
          updateData={updateData}
          notes={notes}
          setNewOrder={setNewOrder}
          />
    )}
  </>
  )
}

export default SchedulesNotesItemInDays
