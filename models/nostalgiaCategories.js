const nostalgiaCategories = (
  connection, sequelize, nostalgiaItems, categories,
) => connection.define('nostalgiaCategories', {
  categoryId: { type: sequelize.INTEGER, primaryKey: true, references: { model: categories, key: 'id' } },
  nostalgiaItemId: { type: sequelize.INTEGER, primaryKey: true, references: { model: nostalgiaItems, key: 'id' } },
}, {
  defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } },
}, {
  paranoid: true,
})

module.exports = nostalgiaCategories
