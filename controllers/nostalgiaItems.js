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
      categories, characters, decades, description, name, slug, tags
    } = request.body

    if (!categories || !characters || !decades || !description || !name || !slug || !tags) {
      return response
        .status(400)
        .send('404 - Required attributes:  "categories","characters","decades","description","name","slug","tags"')
    }

    const [newNostalgiaItem] = await models.nostalgiaItems.findOrCreate({
      where: { slug },
      defaults: { description: description, name: name }
    })

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

const updateNostalgiaItem = async (request, response) => {
  try {
    const { id } = request.params

    const {
      categories, characters, decades, description, name, slug, tags
    } = request.body

    if (!categories || !characters || !decades || !description || !name || !slug || !tags) {
      return response
        .status(400)
        .send('404 - Required attributes:  "categories","characters","decades","description","name","slug","tags"')
    }

    await models.nostalgiaItems.update({
      description: description, name: name, slug: slug
    }, {
      where: { id: id }
    })

    models.nostalgiaTags.destroy({ where: { nostalgiaItemId: id } })

    const tagIds = tags.map(async tagName => {
      const [tag] = await models.tags.findOrCreate({ where: { tag: tagName } })

      return tag.id
    })

    const promisedTagIds = await Promise.all(tagIds)

    promisedTagIds.map(async tagId => {
      const [tag] = await models.nostalgiaTags.findOrCreate({
        where: { tagId: tagId, nostalgiaItemId: id }
      })

      return tag
    })

    models.nostalgiaDecades.destroy({ where: { nostalgiaItemId: id } })

    const decadeIds = decades.map(async decadeName => {
      const [decade] = await models.decades.findOrCreate({ where: { decade: decadeName } })

      return decade.id
    })

    const promisedDecadeIds = await Promise.all(decadeIds)

    promisedDecadeIds.map(async decadeId => {
      const [decade] = await models.nostalgiaDecades.findOrCreate({
        where: { decadeId: decadeId, nostalgiaItemId: id }
      })

      return decade
    })

    models.nostalgiaCharacters.destroy({ where: { nostalgiaItemId: id } })

    const characterIds = characters.map(async characterName => {
      const [character] = await models.characters.findOrCreate({ where: { character: characterName } })

      return character.id
    })

    const promisedCharacterIds = await Promise.all(characterIds)

    promisedCharacterIds.map(async characterId => {
      const [character] = await models.nostalgiaCharacters.findOrCreate({
        where: { characterId: characterId, nostalgiaItemId: id }
      })

      return character
    })


    models.nostalgiaCategories.destroy({ where: { nostalgiaItemId: id } })

    const categoryIds = categories.map(async categoryName => {
      const [category] = await models.categories.findOrCreate({ where: { category: categoryName } })

      return category.id
    })

    const promisedCategoryIds = await Promise.all(categoryIds)

    promisedCategoryIds.map(async categoryId => {
      const [category] = await models.nostalgiaCategories.findOrCreate({
        where: { categoryId: categoryId, nostalgiaItemId: id }
      })

      return category
    })

    return response.status(201).send('Thanks for the UPDATE')
  } catch (error) {
    return response.status(500).send('500 Error - Unable to update nostalgia item')
  }
}

const deleteNostalgiaItem = async (request, response) => {
  try {
    const { slug } = request.params

    const nostalgiaItemToDelete = await models.nostalgiaItems.findOne({ where: { slug } })

    if (!nostalgiaItemToDelete) return response.status(404).send(`Unknown nostalgia item ${slug}.`)

    await models.nostalgiaCategories.destroy({ where: { nostalgiaItemId: nostalgiaItemToDelete.id } })
    await models.nostalgiaCharacters.destroy({ where: { nostalgiaItemId: nostalgiaItemToDelete.id } })
    await models.nostalgiaDecades.destroy({ where: { nostalgiaItemId: nostalgiaItemToDelete.id } })
    await models.nostalgiaTags.destroy({ where: { nostalgiaItemId: nostalgiaItemToDelete.id } })
    await models.nostalgiaItems.destroy({ where: { id: nostalgiaItemToDelete.id } })

    return response.send(`Successfully deleted the nostalgia item with slug ${slug}`)
  } catch (error) {
    return response.status(500).send('Unknown error while deleting item')
  }
}

const patchNostalgiaItem = async (request, response) => {
  try {
    const { id } = request.params

    const { description, name, slug } = request.body

    const nostalgiaItemToUpdate = await models.nostalgiaItems.findOne({ where: { id } })

    if (!nostalgiaItemToUpdate) return response.status(404).send('Unknown nostalgia item')

    if (name) { await models.nostalgiaItems.update({ name: name }, { where: { id: id } }) }
    else if (description) { await models.nostalgiaItems.update({ description: description }, { where: { id: id } }) }
    else if (slug) { await models.nostalgiaItems.update({ slug: slug }, { where: { id: id } }) }
    else {
      return response
        .status(400)
        .send('404 - Must provide "name", "description", or "slug"')
    }

    return response.send('Successfully patched the nostalgia item')
  } catch (error) {
    return response.status(500).send('Unknown error while patching item')
  }
}

module.exports = {
  getAllNostalgiaItems,
  getNostalgiaItemsByIdentifierWithAllLinkedData,
  createNewNostalgiaItem,
  deleteNostalgiaItem,
  updateNostalgiaItem,
  patchNostalgiaItem
}
