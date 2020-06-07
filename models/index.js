
const Sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')

const nostalgiaItemsModels = require('./nostalgiaItems')
const categoriesModels = require('./categories')
const charactersModels = require('./characters')
const decadesModels = require('./decades')
const tagsModels = require('./tags')
const nostalgiaCategoriesModels = require('./nostalgiaCategories')
const nostalgiaCharactersModels = require('./nostalgiaCharacters')
const nostalgiaDecadesModels = require('./nostalgiaDecades')
const nostalgiaTagsModels = require('./nostalgiaTags')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const nostalgiaItems = nostalgiaItemsModels(connection, Sequelize)
const categories = categoriesModels(connection, Sequelize, nostalgiaItems)
const characters = charactersModels(connection, Sequelize, nostalgiaItems)
const decades = decadesModels(connection, Sequelize, nostalgiaItems)
const tags = tagsModels(connection, Sequelize, nostalgiaItems)
const nostalgiaCategories = nostalgiaCategoriesModels(connection, Sequelize, nostalgiaItems, categories)
const nostalgiaCharacters = nostalgiaCharactersModels(connection, Sequelize, nostalgiaItems, characters)
const nostalgiaDecades = nostalgiaDecadesModels(connection, Sequelize, nostalgiaItems, decades)
const nostalgiaTags = nostalgiaTagsModels(connection, Sequelize, nostalgiaItems, tags)

nostalgiaItems.belongsToMany(categories, { through: nostalgiaCategories })
categories.belongsToMany(nostalgiaItems, { through: nostalgiaCategories })
nostalgiaItems.belongsToMany(characters, { through: nostalgiaCharacters })
characters.belongsToMany(nostalgiaItems, { through: nostalgiaCharacters })
nostalgiaItems.belongsToMany(decades, { through: nostalgiaDecades })
decades.belongsToMany(nostalgiaItems, { through: nostalgiaDecades })
nostalgiaItems.belongsToMany(tags, { through: nostalgiaTags })
tags.belongsToMany(nostalgiaItems, { through: nostalgiaTags })

module.exports = {
  nostalgiaItems,
  categories,
  characters,
  decades,
  tags,
  nostalgiaCategories,
  nostalgiaCharacters,
  nostalgiaDecades,
  nostalgiaTags,
  Op: Sequelize.Op,
}
