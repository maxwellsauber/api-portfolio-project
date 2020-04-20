const nostalgia = require('../nostalgia')

const getNostalgia = (request, response) => {
  return response.send(nostalgia)
}

module.exports = { getNostalgia }
