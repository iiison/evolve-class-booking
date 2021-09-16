const fs = require('fs')
const path = require('path')
const express = require('express')
const moment = require('moment')

const userLogin = require('../calls/login')
const secrets = require('../../configs/secrets.json')

const router = express.Router()

const verifyOTP = async (req, res) => {
  const verificationCode = req.params.otp
  const { login, password } = secrets
  const response = await userLogin({ login, password, verificationCode })
  const { token, memberships } = await response.json()

  global.token = token
  global.memberships = memberships

  const sessionData = JSON.stringify({
    token,
    memberships,
    dated : moment.utc(new Date()).valueOf()
  }, 2)

  console.log('Writing session data to file')
  fs.writeFileSync(path.resolve(__dirname, '../../configs/session.json'), sessionData)
  res.send('Okay!')
}

router.get('/:otp', verifyOTP)

module.exports = router
