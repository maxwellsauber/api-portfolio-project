const nostalgiaCharacters = (
  connection, sequelize, nostalgiaItems, characters,
) => connection.define('nostalgiaCharacters', {
  characterId: { type: sequelize.INTEGER, primaryKey: true, references: { model: characters, key: 'id' } },
  nostalgiaItemId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
}, {
  defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } },
}, {
  paranoid: true,
})

module.exports = nostalgiaCharacters
