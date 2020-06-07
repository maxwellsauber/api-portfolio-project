import Sequelize from 'sequelize'
import allConfigs from '../config/sequelize'
import nostalgiaItemsModels from './nostalgiaItems'
import categoriesModels from './categories'
import charactersModels from './characters'
import decadesModels from './decades'
import tagsModels from './tags'
import nostalgiaCategoriesModels from './nostalgiaCategories'
import nostalgiaCharactersModels from './nostalgiaCharacters'
import nostalgiaDecadesModels from './nostalgiaDecades'
import nostalgiaTagsModels from './nostalgiaTags'

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

export default {
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
