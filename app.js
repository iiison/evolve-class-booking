const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule')

const secrets = require('./configs/secrets.json')
const otpRoute = require('./src/routes/otpRoute')
const userLogin = require('./src/calls/login')
const getEvents = require('./src/calls/getEvents')
const bookClass = require('./src/calls/bookClass')
const filterEvents = require('./src/utils/filterEvents')
const refreshToken = require('./src/utils/refreshToken')

refreshToken()

schedule.scheduleJob('0 21 * * *', async () => {
  const { login, password } = secrets
  const response = await userLogin({ login, password })

  await response.json()
})

schedule.scheduleJob('15 22 * * *', async () => {
  const { token, memberships } = global
  const eventsRes = await getEvents({
    token,
    memberships
  })
  const { events } = await eventsRes.json()
  const event = filterEvents(events)
  const values = Object.values(event)

  if (values.length > 0) {
    for (const value of values) {
      const res = await bookClass(value)
      const val = await res.json()

      console.log('*******************')
      console.log(val)
      console.log('*******************')
    }
  }
})

const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended : false })

app.use(urlencodedParser)
app.use(jsonParser)

app.use('/otp', otpRoute)

app.listen(3000)
