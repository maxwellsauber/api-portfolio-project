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
    return response.status(500).send('500 Error! We HAVE to go back!')
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
      where: { slug },
      defaults: { description: description, name: name } // descritpion:description could just be description
    })

    /* New Tags */
    const tagIds = tags.map(async tagName => {
      const [tag] = await models.tags.findOrCreate({ where: { tag: tagName } })

      return tag.id
    })

    const promisedTagIds = await Promise.all(tagIds)

    promisedTagIds.map(async tagId => {
      const [tag] = await models.nostalgiaTags.findOrCreate({
        where: { tagId: tagId, nostalgiaItemId: newNostalgiaItem.id }
      })

      return tag
    })

    /* New Decades */
    const decadeIds = decades.map(async decadeName => {
      const [decade] = await models.decades.findOrCreate({ where: { decade: decadeName } })

      return decade.id
    })

    const promisedDecadeIds = await Promise.all(decadeIds)

    promisedDecadeIds.map(async decade => {
      const [decadeId] = await models.nostalgiaDecades.findOrCreate({
        where: { decadeId: decade, nostalgiaItemId: newNostalgiaItem.id }
      })

      return decadeId
    })

    /* New Characters */
    const characterIds = characters.map(async characterName => {
      const [character] = await models.characters.findOrCreate({ where: { character: characterName } })

      return character.id
    })

    const promisedCharacterIds = await Promise.all(characterIds)

    promisedCharacterIds.map(async character => {
      const [characterId] = await models.nostalgiaCharacters.findOrCreate({
        where: { characterId: character, nostalgiaItemId: newNostalgiaItem.id }
      })

      return characterId
    })

    /* New Categories */
    const categoriesIds = categories.map(async categoryName => {
      const [category] = await models.categories.findOrCreate({ where: { category: categoryName } })

      return category.id
    })

    const promisedCategoryIds = await Promise.all(categoriesIds)

    promisedCategoryIds.map(async category => {
      const [categoryId] = await models.nostalgiaCategories.findOrCreate({
        where: { categoryId: category, nostalgiaItemId: newNostalgiaItem.id }
      })

      return categoryId
    })

    return response.status(201).send(`We remember ${newNostalgiaItem.slug}! How could you forget!?`)
  } catch (error) {
    return response.status(500).send('500 Error - Unable to create nostalgia item')
  }
}

const deleteNostalgiaItem = async (request, response) => {
  try {
    const { slug } = request.params

    const nostalgiaItemtoDelete = await models.nostalgiaItems.findOne({ where: { slug } })

    if (!nostalgiaItemtoDelete) return response.status(404).send(`Unknown nostalgia item ${slug}.`)

    await models.nostalgiaCategories.destroy({ where: { nostalgiaItemId: nostalgiaItemtoDelete.id } })
    await models.nostalgiaCharacters.destroy({ where: { nostalgiaItemId: nostalgiaItemtoDelete.id } })
    await models.nostalgiaDecades.destroy({ where: { nostalgiaItemId: nostalgiaItemtoDelete.id } })
    await models.nostalgiaTags.destroy({ where: { nostalgiaItemId: nostalgiaItemtoDelete.id } })
    await models.nostalgiaItems.destroy({ where: { id: nostalgiaItemtoDelete.id } })

    return response.send(`Successfully deleted the animal with ID: ${slug}`)
  } catch (error) {
    return response.status(500).send('Unknown error while deleting item')
  }
}

module.exports = {
  getAllNostalgiaItems,
  getNostalgiaItemsByIdentifierWithAllLinkedData,
  createNewNostalgiaItem,
  deleteNostalgiaItem
}
