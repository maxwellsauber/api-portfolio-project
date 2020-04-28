const nostalgia = require('../nostalgia')

// Below are TEST controllers to determine API Routes. Need to be consolidated

const getNostalgia = (request, response) => {
  return response.send(nostalgia)
}

const getCategory = (request, response) => {
  const { category } = request.params

  const matchingItems = nostalgia.filter((item) => item.category === category)

  return matchingItems.length > 0
    ? response.send(matchingItems)
    : response.status(404).send(`Nothing to see at Category '${category}'`)
}

const getDecade = (request, response) => {
  const { decade } = request.params

  const matchingItems = nostalgia.filter((item) => item.decade === decade)

  return matchingItems.length > 0
    ? response.send(matchingItems)
    : response.status(404).send(`Nothing to see at Decade '${decade}'`)
}

const getSlug = (request, response) => {
  const { slug } = request.params

  const matchingItems = nostalgia.filter((item) => item.slug === slug)

  return matchingItems.length > 0
    ? response.send(matchingItems)
    : response.status(404).send(`Nothing to see at Slug '${slug}'`)
}

module.exports = { getNostalgia, getCategory, getSlug, getDecade }
