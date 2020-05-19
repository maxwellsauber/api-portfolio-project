
const sequelize = require('sequelize')
const allConfigs = require('../config/sequelize')

const nostalgiaItemsModels = require('./nostalgiaItems')
const categoriesModels = require('./categories')
const charactersModels = require('./characters')
const decadesModels = require('./decades')
const tagsModels = require('./tags')
/* linking tables */
const nostalgiaCategoriesModels = require('./nostalgiaCategories')
const nostalgiaCharactersModels = require('./nostalgiaCharacters')
const nostalgiaDecadesModels = require('./nostalgiaDecades')
const nostalgiaTagsModels = require('./nostalgiaTags')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect
})

const nostalgiaItems = nostalgiaItemsModels(connection, sequelize)
const categories = categoriesModels(connection, sequelize, nostalgiaItems)
const characters = charactersModels(connection, sequelize, nostalgiaItems)
const decades = decadesModels(connection, sequelize, nostalgiaItems)
const tags = tagsModels(connection, sequelize, nostalgiaItems)
/* linking tables */
const nostalgiaCategories = nostalgiaCategoriesModels(connection, sequelize, nostalgiaItems, categories)
const nostalgiaCharacters = nostalgiaCharactersModels(connection, sequelize, nostalgiaItems, characters)
const nostalgiaDecades = nostalgiaDecadesModels(connection, sequelize, nostalgiaItems, decades)
const nostalgiaTags = nostalgiaTagsModels(connection, sequelize, nostalgiaItems, tags)

/* Link the tables */
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
  Op: sequelize.Op
}
