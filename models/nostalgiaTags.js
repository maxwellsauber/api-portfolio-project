const nostalgiaTags = (connection, sequelize, nostalgiaItems, tags) => {
  return connection.define('nostalgiaTags', {
    tagId: { type: sequelize.INTEGER, primaryKey: true, references: { model: tags, key: 'id' } },
    nostalgiaItemId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = nostalgiaTags
