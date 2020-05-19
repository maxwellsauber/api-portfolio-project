'use strict'

module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.bulkInsert('nostalgiaItems', [
      {
        name: 'Teenage Mutant Ninja Turtles',
        description: 'Pizza-eating turtles protect their city under the guidance of a rat',
        slug: 'teenage-mutant-ninja-turtles'
      },
    ])

    await queryInterface.bulkInsert('categories', [
      { category: 'cartoon' },
      { category: 'toy' },
      { category: 'movie' },
    ])
    await queryInterface.bulkInsert('tags', [
      { tag: 'action' },
      { tag: 'gnarly' },
      { tag: 'extreme' },
    ])

    await queryInterface.bulkInsert('characters', [
      { character: 'Shredder' },
      { character: 'Raphael' },
      { character: 'Leonardo' },
    ])

    await queryInterface.bulkInsert('decades', [
      { decade: '1990' },
      { decade: '1980' },
    ])

    await queryInterface.bulkInsert('nostalgiaCategories', [
      { categoryId: 1, nostalgiaId: 1 }, /* Cartoon, TMNT */
      { categoryId: 2, nostalgiaId: 1 }, /* Toy, TMNT */
      { categoryId: 3, nostalgiaId: 1 }, /* Movie, TMNT */
    ])

    await queryInterface.bulkInsert('nostalgiaTags', [
      { tagId: 1, nostalgiaId: 1 }, /* action, TMNT */
      { tagId: 2, nostalgiaId: 1 }, /* gnarly, TMNT */
      { tagId: 3, nostalgiaId: 1 }, /* extreme, TMNT */
    ])

    await queryInterface.bulkInsert('nostalgiaCharacters', [
      { characterId: 1, nostalgiaId: 1 }, /* Shredder, TMNT */
      { characterId: 2, nostalgiaId: 1 }, /* Raphael, TMNT */
      { characterId: 3, nostalgiaId: 1 }, /* Leonardo, TMNT */
    ])

    return queryInterface.bulkInsert('nostalgiaDecades', [
      { decadeId: 1, nostalgiaId: 1 }, /* 1990, TMNT */
      { decadeId: 2, nostalgiaId: 1 }, /* 1980, TMNT */
    ])
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.bulkDelete('nostalgiaItems')

    await queryInterface.bulkDelete('categories')

    await queryInterface.bulkDelete('tags')

    await queryInterface.bulkDelete('characters')

    await queryInterface.bulkDelete('decades')

    await queryInterface.bulkDelete('nostalgiaCategories')

    await queryInterface.bulkDelete('nostalgiaTags')

    await queryInterface.bulkDelete('nostalgiaCharacters')

    return queryInterface.bulkDelete('nostalgiaDecades')
  }
}
