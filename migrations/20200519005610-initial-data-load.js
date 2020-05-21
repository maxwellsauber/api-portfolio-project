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
      {
        name: 'Nerf Football',
        description: 'A vibrant squishy football',
        slug: 'nerf-football'
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
      { tag: 'squishy' },
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
      { categoryId: 1, nostalgiaItemId: 1 }, /* Cartoon, TMNT */
      { categoryId: 2, nostalgiaItemId: 1 }, /* Toy, TMNT */
      { categoryId: 3, nostalgiaItemId: 1 }, /* Movie, TMNT */
      { categoryId: 2, nostalgiaItemId: 2 }, /* Toy, Nerf */

    ])

    await queryInterface.bulkInsert('nostalgiaTags', [
      { tagId: 1, nostalgiaItemId: 1 }, /* action, TMNT */
      { tagId: 2, nostalgiaItemId: 1 }, /* gnarlßy, TMNT */
      { tagId: 3, nostalgiaItemId: 1 }, /* extreme, TMNT */
      { tagId: 3, nostalgiaItemId: 2 }, /* extreme, Nerf */
      { tagId: 4, nostalgiaItemId: 2 }, /* squishy, Nerf */
    ])

    await queryInterface.bulkInsert('nostalgiaCharacters', [
      { characterId: 1, nostalgiaItemId: 1 }, /* Shredder, TMNT */
      { characterId: 2, nostalgiaItemId: 1 }, /* Raphael, TMNT */
      { characterId: 3, nostalgiaItemId: 1 }, /* Leonardo, TMNT */
    ])

    return queryInterface.bulkInsert('nostalgiaDecades', [
      { decadeId: 1, nostalgiaItemId: 1 }, /* 1990, TMNT */
      { decadeId: 2, nostalgiaItemId: 1 }, /* 1980, TMNT */
      { decadeId: 1, nostalgiaItemId: 2 }, /* 1990, Nerf */
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
