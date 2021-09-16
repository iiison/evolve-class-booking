const moment = require('moment')

const secrets = require('../../configs/secrets.json')
const sessionData = require('../../configs/session.json')
const userLogin = require('../calls/login')

function refreshToken() {
  const { login, password } = secrets

  try {
    const { dated, token, memberships } = sessionData

    const now = moment.utc()
    const sessionDate = moment(dated)
    const diff = now.diff(sessionDate, 'hours')

    if (diff > 8) {
      userLogin({ login, password })
    } else {
      console.log('Keeping the old session, as it is still valid')

      global.token = token
      global.memberships = memberships
    }
  } catch (err) {
    userLogin({ login, password })
  }
}

module.exports = refreshToken
