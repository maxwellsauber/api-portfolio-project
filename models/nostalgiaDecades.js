const nostalgiaDecades = (connection, sequelize, nostalgiaItems, decades) => connection.define('nostalgiaDecades', {
  decadeId: { type: sequelize.INTEGER, primaryKey: true, references: { model: decades, key: 'id' } },
  nostalgiaItemId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
}, {
  defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } },
}, {
  paranoid: true,
})

export default nostalgiaDecades
