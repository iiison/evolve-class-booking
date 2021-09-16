const fetch = require('node-fetch')

function getEvents({ token, memberships : [{ memberId : id }] }) {
  console.log('*******************')
  console.log('GET Events')
  console.log('*******************')

  const headers = {
    accept             : 'application/json, text/plain, */*',
    authorization      : `Bearer ${token}`,
    'sec-ch-ua'        : '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    'sec-ch-ua-mobile' : '?0'
  }
  const url = 'https://api.evolvegenius.com/booking/get-events'
  const date = new Date()
    .toISOString()
    .replace(/T.*/, '')
    .split('-')
    // .reverse()
    .join('-')

  return fetch(`${url}?memberId=${id}&date=${date}&area=FES_WARRIOR&view=3days%2Bcache`, {
    headers,
    referrer       : 'https://book.evolve-mma.com/',
    referrerPolicy : 'strict-origin-when-cross-origin',
    body           : null,
    method         : 'GET',
    mode           : 'cors'
  });
}

module.exports = getEvents
