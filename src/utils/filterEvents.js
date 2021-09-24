const moment = require('moment')

function filterEvents(events) {
  return events.reduce(
    (
      prev,
      {
        start,
        event: {
          id,
          classDetails: { level }
        }
      }
    ) => {
      const date = moment(start)
      const dayName = date.format('dddd')
      const targetDate = moment().add(2, 'd')
      const targetDay = targetDate.format('dddd')
      const classStartTime = date.format('HH:mm')
      const key = `${dayName}-${classStartTime}-${level}`

      if (
        level
        && level.toLowerCase().includes('mt_level_1')
        && targetDay === dayName
        && (
          classStartTime === '18:00'
          || classStartTime === '18:15'
        )
      ) {
        return {
          ...prev,
          [key] : {
            eventId   : id,
            eventDate : targetDate.format('YYYY-MM-DD'),
          }
        }
      }

      return prev
    },
    {}
  )
}

module.exports = filterEvents
