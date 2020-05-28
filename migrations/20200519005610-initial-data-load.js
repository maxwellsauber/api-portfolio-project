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
      {
        name: 'Back to the Future',
        description: 'A creepy old man tricks a boy to go back in time so he can kiss his mother',
        slug: 'back-to-the-future'
      },
      {
        name: 'Ren and Stimpy',
        description: 'An angry dog and stupid cat endure bizzare adventures',
        slug: 'ren-and-stimpy'
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
      { tag: 'time travel' },
      { tag: 'bizarre' }
    ])

    await queryInterface.bulkInsert('characters', [
      { character: 'Shredder' },
      { character: 'Raphael' },
      { character: 'Leonardo' },
      { character: 'Marty McFly' },
      { character: 'Doc Brown' },
      { character: 'Ren Höek' },
      { character: 'Stimpson J. Cat' },
    ])

    await queryInterface.bulkInsert('decades', [
      { decade: '1990' },
      { decade: '1980' },
    ])

    await queryInterface.bulkInsert('nostalgiaCategories', [
      { categoryId: 1, nostalgiaItemId: 1 },
      { categoryId: 2, nostalgiaItemId: 1 },
      { categoryId: 3, nostalgiaItemId: 1 },
      { categoryId: 2, nostalgiaItemId: 2 },
      { categoryId: 3, nostalgiaItemId: 3 },
      { categoryId: 1, nostalgiaItemId: 4 },


    ])

    await queryInterface.bulkInsert('nostalgiaTags', [
      { tagId: 1, nostalgiaItemId: 1 },
      { tagId: 2, nostalgiaItemId: 1 },
      { tagId: 3, nostalgiaItemId: 1 },
      { tagId: 3, nostalgiaItemId: 2 },
      { tagId: 4, nostalgiaItemId: 2 },
      { tagId: 1, nostalgiaItemId: 3 },
      { tagId: 5, nostalgiaItemId: 3 },
      { tagId: 6, nostalgiaItemId: 4 },
    ])

    await queryInterface.bulkInsert('nostalgiaCharacters', [
      { characterId: 1, nostalgiaItemId: 1 },
      { characterId: 2, nostalgiaItemId: 1 },
      { characterId: 3, nostalgiaItemId: 1 },
      { characterId: 4, nostalgiaItemId: 3 },
      { characterId: 5, nostalgiaItemId: 3 },
      { characterId: 6, nostalgiaItemId: 4 },
      { characterId: 7, nostalgiaItemId: 4 },

    ])

    return queryInterface.bulkInsert('nostalgiaDecades', [
      { decadeId: 1, nostalgiaItemId: 1 },
      { decadeId: 2, nostalgiaItemId: 1 },
      { decadeId: 1, nostalgiaItemId: 2 },
      { decadeId: 2, nostalgiaItemId: 3 },
      { decadeId: 1, nostalgiaItemId: 4 },
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
