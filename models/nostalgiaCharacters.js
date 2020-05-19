const nostalgiaCharacters = (connection, sequelize, characters, nostalgiaItems) => {
  return connection.define('nostalgiaCharacters', {
    characterId: { type: sequelize.INTEGER, primaryKey: true, references: { model: characters, key: 'id' } },
    nostalgiaId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = nostalgiaCharacters
