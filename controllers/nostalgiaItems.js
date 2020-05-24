const models = require('../models')

const getAllNostalgiaItems = async (request, response) => {
  try {
    const allNostalgiaItems = await models.nostalgiaItems.findAll()

    return response.send(allNostalgiaItems)
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
        slug: { [models.Op.like]: `%${identifier.toLowerCase()}%` }
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

const createNewNostalgiaItem = async (request, response) => {
  try {
    const {
      categories,
      characters,
      decades,
      description,
      name,
      slug,
      tags
    } = request.body

    if (!categories || !characters || !decades || !description || !name || !slug || !tags) {
      return response
        .status(400)
        .send('404 - Required attributes:  "categories","characters","decades","description","name","slug","tags"')
    }

    /* New Item */
    const [newNostalgiaItem] = await models.nostalgiaItems.findOrCreate({
      where: { slug: slug, name: name, description: description }
    })

    /* New Tags */
    const tagIds = tags.map(async tagName => {
      const [tag] = await models.tags.findOrCreate({ where: { tag: tagName } })

      return tag.id
    })

    const promisedTagIds = await Promise.all(tagIds)

    const linkedTags = promisedTagIds.map(async tagId => {
      const [entry] = await models.nostalgiaTags.findOrCreate({
        where: { tagId: tagId, nostalgiaItemId: newNostalgiaItem.id }
      })

      return entry
    })

    await Promise.all(linkedTags)

    /* New Decades */
    const decadeIds = decades.map(async decadeName => {
      const [decade] = await models.decades.findOrCreate({ where: { decade: decadeName } })

      return decade.id
    })

    const promisedDecadeIds = await Promise.all(decadeIds)

    const linkedDecades = promisedDecadeIds.map(async decade => {
      const [entry] = await models.nostalgiaDecades.findOrCreate({
        where: { decadeId: decade, nostalgiaItemId: newNostalgiaItem.id }
      })

      return entry
    })

    await Promise.all(linkedDecades)

    /* New Characters*/
    const characterIds = characters.map(async characterName => {
      const [character] = await models.characters.findOrCreate({ where: { character: characterName } })

      return character.id
    })

    const promisedCharacterIds = await Promise.all(characterIds)

    const linkedCharacters = promisedCharacterIds.map(async character => {
      const [entry] = await models.nostalgiaCharacters.findOrCreate({
        where: { characterId: character, nostalgiaItemId: newNostalgiaItem.id }
      })

      return entry
    })

    await Promise.all(linkedCharacters)

    /* New Categories */
    const categoriesIds = categories.map(async categoryName => {
      const [category] = await models.categories.findOrCreate({ where: { category: categoryName } })

      return category.id
    })

    const promisedCategoryIds = await Promise.all(categoriesIds)

    const linkedCategories = promisedCategoryIds.map(async category => {
      const [entry] = await models.nostalgiaCategories.findOrCreate({
        where: { categoryId: category, nostalgiaItemId: newNostalgiaItem.id }
      })

      return entry
    })

    await Promise.all(linkedCategories)

    return response.status(201).send(`added ${newNostalgiaItem.slug}`)
  }
  catch (error) {
    return response.status(500).send('A 500 error')
  }
}

module.exports = { getAllNostalgiaItems, getNostalgiaItemsByIdentifierWithAllLinkedData, createNewNostalgiaItem }
