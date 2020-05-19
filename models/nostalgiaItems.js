const nostalgiaItems = (connection, sequelize) => {
  return connection.define('nostalgiaItems', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize.STRING, allowNull: false },
    description: { type: sequelize.STRING, allowNull: false },
    slug: { type: sequelize.STRING, allowNull: false },
  }, {
    defaultScope: { attributes: { exclude: ['deletedAt'] } }
  }, {
    paranoid: true
  })
}

module.exports = nostalgiaItems
