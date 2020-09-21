const decades = (connection, sequelize) => connection.define('decades', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  decade: { type: sequelize.STRING, allowNull: false },
}, {
  defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } },
}, {
  paranoid: true,
})

export default decades
