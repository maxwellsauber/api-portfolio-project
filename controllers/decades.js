const models = require('../models')

const getNostalgiaItemsByDecade = async (request, response) => {
  try {
    const { decade } = request.params
    const matchingItems = await models.decades.findAll({
      include: [{
        model: models.nostalgiaItems
      }],
      where: {
        decade: { [models.Op.like]: `%${decade}%` }
      }
    })

    return matchingItems.length
      ? response.send(matchingItems)
      : response.status(404)
        .send(`"${decade}" - Not Found`)
  } catch (error) {
    return response.status(500).send('500')
  }
}

module.exports = { getNostalgiaItemsByDecade }
