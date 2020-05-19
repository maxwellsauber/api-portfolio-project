const characters = (connection, sequelize) => {
  return connection.define('characters', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    character: { type: sequelize.STRING, allowNull: false },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = characters
