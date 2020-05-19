const nostalgiaTags = (connection, sequelize, tags, nostalgiaItems) => {
  return connection.define('nostalgiaTags', {
    categoryId: { type: sequelize.INTEGER, primaryKey: true, references: { model: tags, key: 'id' } },
    nostalgiaId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = nostalgiaTags
