const tags = (connection, sequelize) => {
  return connection.define('tags', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    tag: { type: sequelize.STRING, allowNull: false },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = tags
