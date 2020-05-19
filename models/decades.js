const decades = (connection, sequelize) => {
  return connection.define('decades', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    decade: { type: sequelize.STRING, allowNull: false },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = decades
