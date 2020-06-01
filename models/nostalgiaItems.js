const nostalgiaItems = (connection, sequelize) => connection.define('nostalgiaItems', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: sequelize.STRING, allowNull: false },
  description: { type: sequelize.STRING, allowNull: false },
  slug: { type: sequelize.STRING, allowNull: false, primaryKey: true },
}, {
  defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } },
}, {
  paranoid: true,
})

module.exports = nostalgiaItems
