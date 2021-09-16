const fetch = require('node-fetch')

function userLogin(data) {
  const headers = {
    accept             : 'application/json, text/plain, */*',
    pragma             : 'no-cache',
    'accept-language'  : 'en-US,en;q=0.9',
    'cache-control'    : 'no-cache',
    'content-type'     : 'application/json;charset=UTF-8',
    'sec-ch-ua'        : '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'sec-ch-ua-mobile' : '?0',
    'sec-fetch-dest'   : 'empty',
    'sec-fetch-mode'   : 'cors',
    'sec-fetch-site'   : 'cross-site'
  }
  const body = {
    forceEmailMFA : false
  }

  return fetch('https://api.evolvegenius.com/booking/sessions', {
    headers,
    referrer       : 'https://book.evolve-mma.com/',
    referrerPolicy : 'strict-origin-when-cross-origin',
    body           : JSON.stringify({
      ...body,
      ...data
    }),
    method : 'POST',
    mode   : 'cors'
  })
}

module.exports = userLogin
