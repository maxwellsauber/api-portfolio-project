const nostalgia = require('../nostalgia')

const getNostalgia = (request, response) => {
  return response.send(nostalgia)
}

const getToys = (request, response) => {
  return response.send(nostalgia.toys)
}

const getCartoons = (request, response) => {
  return response.send(nostalgia.cartoons)
}

module.exports = { getNostalgia, getToys, getCartoons }
