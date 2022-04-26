import DayScheduleItem from './DayScheduleItem'
import DayNoteItem from './DayNoteItem'

const SchedulesNotesItemInDays = ({
  listOfItems,
  dayId,
  setUpdate,
  updateData,
  schedules,
  notes,
  setNewOrder,
  setIsChangingOrder,
  isChangingOrder,
  configs,
  saveNewOrder,

  setUpdatePreview,
  updatePreview
}) => {
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
          setIsChangingOrder={setIsChangingOrder}
          isChangingOrder={isChangingOrder}
          configs={configs}
          saveNewOrder={saveNewOrder}

          setUpdatePreview={setUpdatePreview}
          updatePreview={updatePreview}
          />
        : <DayNoteItem
          key={`dayNote-${item.id}`}
          note={item}
          listOfItems={listOfItems}
          dayId={dayId}
          setUpdate={setUpdate}
          updateData={updateData}
          notes={notes}
          setNewOrder={setNewOrder}
          setIsChangingOrder={setIsChangingOrder}
          isChangingOrder={isChangingOrder}
          configs={configs}
          saveNewOrder={saveNewOrder}

          setUpdatePreview={setUpdatePreview}
          updatePreview={updatePreview}
          />
    )}
  </>
  )
}

export default SchedulesNotesItemInDays
