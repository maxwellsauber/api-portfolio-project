const models = require('../models')

const getNostalgiaItemsByCategory = async (request, response) => {
  try {
    const { category } = request.params
    const matchingItems = await models.categories.findAll({
      include: [{
        model: models.nostalgiaItems
      }],
      where: {
        category: { [models.Op.like]: `%${category.toLowerCase()}%` }
      },
    })

    return matchingItems.length
      ? response.send(matchingItems)
      : response.status(404)
        .send(`"${category}" - Not Found`)
  } catch (error) {
    return response.status(500).send('500')
  }
}

module.exports = { getNostalgiaItemsByCategory }
