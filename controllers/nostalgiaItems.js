const models = require('../models')
// const nostalgiaAttributes = ['name', 'description', 'categories', 'decades', 'tags', 'slug']

const getAllNostalgiaItems = async (request, response) => {
  try {
    const allAuthors = await models.nostalgiaItems.findAll()

    return response.send(allAuthors)
  } catch (error) {
    return response.status(500)
      .send('500 Errors on a half shell')
  }
}

const getNostalgiaItemsByIdentifierWithAllLinkedData = async (request, response) => {
  try {
    const { identifier } = request.params
    const matchingItems = await models.nostalgiaItems.findAll({
      include: [
        { model: models.categories },
        { model: models.characters },
        { model: models.tags },
        { model: models.decades }
      ],
      where: {
        [models.Op.or]: [
          // { id: { [models.Op.like]: identifier } },
          { slug: { [models.Op.like]: `%${identifier.toLowerCase()}%` } }
        ]
      }
    })

    return matchingItems.length
      ? response.send(matchingItems)
      : response.status(404)
        .send(`"${identifier}" - Not Found`)
  } catch (error) {
    return response.status(500).send('500')
  }
}

module.exports = { getAllNostalgiaItems, getNostalgiaItemsByIdentifierWithAllLinkedData }
