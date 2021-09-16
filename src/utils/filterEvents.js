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
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      // const date = new Date(start)
      const date = moment(start)
      const dayName = date.format('dddd')
      // const targetDate = new Date()
      const targetDate = moment().add(2, 'd')
      // const targetDayCount = targetDate.getDay() + 1
      // const targetDay = targetDayCount <= 6
      //   ? days[targetDayCount]
      //   : days[(targetDayCount % 6) - 1]
      const targetDay = targetDate.format('dddd')
      // const classStartTime = `${date.getHours()}:${date.getMinutes()}`
      const classStartTime = date.format('HH:mm')
      const key = `${dayName}-${classStartTime}-${level}`

      if (
        level
        && level.toLowerCase().includes('mt_level_1')
        && targetDay === dayName
        && (
          classStartTime === '18:00'
          || classStartTime === '18:15'
          // || classStartTime === '07:30'
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
