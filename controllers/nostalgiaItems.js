const models = require('../models')
// const nostalgiaAttributes = ['name', 'description', 'categories', 'decades', 'tags', 'slug']

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
  // try {
  const {
    name,
    description,
    slug,
    // categories, // Different Create?
    // characters, // Different Create?
    tags // Different Create?
    // decades // Different Create?
  } = request.body

  // if (!name || !description || !slug || !categories || !characters || !tags || !decades)
  if (!name || !description || !slug) {
    return response
      .status(400)
      .send('400 Need the all attributes')
    // .send(`400 Need the following attributes: ${nostalgiaAttributes.join(', ')}`)
  }

  const [newNostalgiaItem] = await models.nostalgiaItems.findOrCreate({
    where: { slug: slug },
    defaults: { name: name, description: description }
  })

  const tagIds = tags.map(async tagName => {
    const [tag] = await models.tags.findOrCreate({ where: { tag: tagName } })

    return tag.id
  })

  const resolveTagIds = await Promise.all(tagIds)

  const linkedTags = resolveTagIds.map(async tagName => {
    const [entry] = await models.nostalgiaTags.findOrCreate({
      where: { tagId: tagName },
      defaults: { nostalgiaItemId: newNostalgiaItem.id }
    })

    return entry
  })

  await Promise.all(linkedTags)


  // characters = "characters": ["Shredder", "Raphael", "Leonardo"],
  // tags = "tags": [ "action", "gnarly", "extreme"]
  // categories = "categories": ["cartoon", "movie", "toy"]


  return response.status(201).send(`added ${newNostalgiaItem.slug}`)
  //  }
  // catch (error) {
  // return response.status(500).send('A 500 error')
  // }
}


module.exports = { getAllNostalgiaItems, getNostalgiaItemsByIdentifierWithAllLinkedData, createNewNostalgiaItem }
