const parseDates = (inp) => {
  const year = parseInt(inp.slice(0, 4), 10)
  const week = parseInt(inp.slice(6), 10)

  const day = (1 + (week) * 7) // 1st of January + 7 days for each week

  let dayOffset = new Date(year, 0, 1).getDay() // we need to know at what day of the week the year start

  dayOffset-- // depending on what day you want the week to start increment or decrement this value. This should make the week start on a monday

  const days = []
  for (let i = 0; i < 7; i++) { // do this 7 times, once for every day
    days.push(new Date(year, 0, day - dayOffset + i))
  } // add a new Date object to the array with an offset of i days relative to the first day of the week
  return days
}

export default parseDates
