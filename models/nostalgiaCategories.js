const nostalgiaCategories = (connection, sequelize, nostalgiaItems, categories) => {
  return connection.define('nostalgiaCategories', {
    categoryId: { type: sequelize.INTEGER, primaryKey: true, references: { model: categories, key: 'id' } },
    nostalgiaId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = nostalgiaCategories
