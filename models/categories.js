const categories = (connection, sequelize) => {
  return connection.define('categories', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    category: { type: sequelize.STRING, allowNull: false },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = categories
