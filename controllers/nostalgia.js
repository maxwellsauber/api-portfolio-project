const nostalgia = require('../nostalgia')

const getNostalgia = (request, response) => {
  return response.send(nostalgia)
}

const getToys = (request, response) => {
  const matchingItems = nostalgia.filter((item) => item.category === 'toys')

  return matchingItems
    ? response.send(matchingItems)
    : response.sendStatus(404)
}

// duplicate to getToys... playing with data
const getCartoons = (request, response) => {
  const matchingItems = nostalgia.filter((item) => item.category === 'cartoons')

  return matchingItems
    ? response.send(matchingItems)
    : response.sendStatus(404)
}

module.exports = { getNostalgia, getToys, getCartoons }
