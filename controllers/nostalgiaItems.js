const models = require('../models')

const getAllNostalgiaItems = async (request, response) => {
  //try {
  const allAuthors = await models.nostalgiaItems.findAll({
    include: [{
      // include: [{ model: models.characters }],
      // model: models.tags
      model: models.characters
    }]
  })

  return response.send(allAuthors)
  //} catch (error) {
  // return response.status(500)
  // .send('500 Errors on a half shell')
  // }
}

const getNostalgiaItemsByParamWithAllLinkedData = async (request, response) => {
  // try {
  const { param } = request.params
  const matchingItems = await models.nostalgiaItems.findAll({
    include: [{
      // include: [{ model: models.characters }],
      // model: models.tags
      model: models.characters
    }],
    where: {
      [models.Op.or]: [
        { id: { [models.Op.like]: param } },
        { name: { [models.Op.like]: `%${param.toLowerCase()}%` } }
      ]
    }
  })

  return matchingItems.length
    ? response.send(matchingItems)
    : response.status(404)
      .send(`"${param}" - Not Found`)
  //} catch (error) {
  //  return response.status(500).send('500')
  //}
}

module.exports = { getAllNostalgiaItems, getNostalgiaItemsByParamWithAllLinkedData }
