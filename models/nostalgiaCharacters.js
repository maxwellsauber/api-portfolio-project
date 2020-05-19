const nostalgiaCharacters = (connection, sequelize, nostalgiaItems, characters) => {
  return connection.define('nostalgiaCharacters', {
    characterId: { type: sequelize.INTEGER, primaryKey: true, references: { model: characters, key: 'id' } },
    nostalgiaItemId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}


module.exports = nostalgiaCharacters
