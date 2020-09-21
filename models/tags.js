const tags = (connection, sequelize) => connection.define('tags', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  tag: { type: sequelize.STRING, allowNull: false },
}, {
  defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } },
}, {
  paranoid: true,
})

export default tags
