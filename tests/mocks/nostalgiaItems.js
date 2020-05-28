const nostalgiaList = [
  {
    id: 1,
    name: 'Teenage Mutant Ninja Turtles',
    description: 'Pizza-eating turtles protect their city under the guidance of a rat',
    slug: 'teenage-mutant-ninja-turtles'
  },
  {
    id: 2,
    name: 'Nerf Football',
    description: 'A vibrant squishy football',
    slug: 'nerf-football'
  },
  {
    id: 3,
    name: 'Back to the Future',
    description: 'A creepy old man tricks a boy to go back in time so he can kiss his mother',
    slug: 'back-to-the-future'
  },
  {
    id: 4,
    name: 'Ren and Stimpy',
    description: 'An angry dog and stupid cat endure bizzare adventures',
    slug: 'ren-and-stimpy'
  }
]

const matchingNostalgiaItem = [
  {
    id: 3,
    name: 'Back to the Future',
    description: 'A creepy old man tricks a boy to go back in time so he can kiss his mother',
    slug: 'back-to-the-future',
    categories: [
      {
        id: 3,
        category: 'movie',
        nostalgiaCategories: {
          categoryId: 3,
          nostalgiaItemId: 3,
          createdAt: '2020-05-24T0:1:56.000Z',
          updatedAt: '2020-05-24T0:1:56.000Z'
        }
      }
    ],
    characters: [
      {
        id: 4,
        character: 'Marty McFly',
        nostalgiaCharacters: {
          characterId: 4,
          nostalgiaItemId: 3,
          createdAt: '2020-05-24T0:1:56.000Z',
          updatedAt: '2020-05-24T0:1:56.000Z'
        }
      },
      {
        id: 5,
        character: 'Doc Brown',
        nostalgiaCharacters: {
          characterId: 5,
          nostalgiaItemId: 3,
          createdAt: '2020-05-24T0:1:56.000Z',
          updatedAt: '2020-05-24T0:1:56.000Z'
        }
      }
    ],
    tags: [
      {
        id: 1,
        tag: 'action',
        nostalgiaTags: {
          tagId: 1,
          nostalgiaItemId: 3,
          createdAt: '2020-05-24T0:1:56.000Z',
          updatedAt: '2020-05-24T0:1:56.000Z'
        }
      },
      {
        id: 5,
        tag: 'time travel',
        nostalgiaTags: {
          tagId: 5,
          nostalgiaItemId: 3,
          createdAt: '2020-05-24T0:1:56.000Z',
          updatedAt: '2020-05-24T0:1:56.000Z'
        }
      }
    ],
    decades: [
      {
        id: 2,
        decade: '1980',
        nostalgiaDecades: {
          decadeId: 2,
          nostalgiaItemId: 3,
          createdAt: '2020-05-24T0:1:56.000Z',
          updatedAt: '2020-05-24T0:1:56.000Z'
        }
      }
    ]
  }
]

const deleteItem =
{
  id: 3,
  name: 'Back to the Future',
  description: 'A creepy old man tricks a boy to go back in time so he can kiss his mother',
  slug: 'back-to-the-future',
  categories: [
    {
      id: 3,
      category: 'movie',
      nostalgiaCategories: {
        categoryId: 3,
        nostalgiaItemId: 3,
        createdAt: '2020-05-24T0:1:56.000Z',
        updatedAt: '2020-05-24T0:1:56.000Z'
      }
    }
  ],
  characters: [
    {
      id: 4,
      character: 'Marty McFly',
      nostalgiaCharacters: {
        characterId: 4,
        nostalgiaItemId: 3,
        createdAt: '2020-05-24T0:1:56.000Z',
        updatedAt: '2020-05-24T0:1:56.000Z'
      }
    },
    {
      id: 5,
      character: 'Doc Brown',
      nostalgiaCharacters: {
        characterId: 5,
        nostalgiaItemId: 3,
        createdAt: '2020-05-24T0:1:56.000Z',
        updatedAt: '2020-05-24T0:1:56.000Z'
      }
    }
  ],
  tags: [
    {
      id: 1,
      tag: 'action',
      nostalgiaTags: {
        tagId: 1,
        nostalgiaItemId: 3,
        createdAt: '2020-05-24T0:1:56.000Z',
        updatedAt: '2020-05-24T0:1:56.000Z'
      }
    },
    {
      id: 5,
      tag: 'time travel',
      nostalgiaTags: {
        tagId: 5,
        nostalgiaItemId: 3,
        createdAt: '2020-05-24T0:1:56.000Z',
        updatedAt: '2020-05-24T0:1:56.000Z'
      }
    }
  ],
  decades: [
    {
      id: 2,
      decade: '1980',
      nostalgiaDecades: {
        decadeId: 2,
        nostalgiaItemId: 3,
        createdAt: '2020-05-24T0:1:56.000Z',
        updatedAt: '2020-05-24T0:1:56.000Z'
      }
    }
  ]
}

const nostalgiaPostBody =
{
  name: 'Star Wars',
  description: 'Wars in Space',
  slug: 'star-wars',
  tags: ['science-fiction'],
  decades: ['1970'],
  characters: ['Luke Skywalker', 'Darth Vader'],
  categories: ['movie']
}

const matchingDecade = [
  {
    id: 1,
    decade: '1990',
    nostalgiaItems: [
      {
        id: 4,
        name: 'Ren and Stimpy',
        description: 'An angry dog and stupid cat endure bizzare adventures',
        slug: 'ren-and-stimpy',
        nostalgiaDecades: {
          decadeId: 1,
          nostalgiaItemId: 4,
          createdAt: '2020-05-24T23:17:19.000Z',
          updatedAt: '2020-05-24T23:17:19.000Z'
        }
      }
    ]
  }
]

const matchingCategory = [
  {
    id: 2,
    category: 'toy',
    nostalgiaItems: [
      {
        id: 1,
        name: 'Teenage Mutant Ninja Turtles',
        description: 'Pizza-eating turtles protect their city under the guidance of a rat',
        slug: 'teenage-mutant-ninja-turtles',
        nostalgiaCategories: {
          categoryId: 2,
          nostalgiaItemId: 1,
          createdAt: '2020-05-26T13:58:48.000Z',
          updatedAt: '2020-05-26T13:58:48.000Z'
        }
      },
      {
        id: 2,
        name: 'Nerf Football',
        description: 'A vibrant squishy football',
        slug: 'nerf-football',
        nostalgiaCategories: {
          categoryId: 2,
          nostalgiaItemId: 2,
          createdAt: '2020-05-26T13:58:48.000Z',
          updatedAt: '2020-05-26T13:58:48.000Z'
        }
      }
    ]
  }
]

module.exports = {
  nostalgiaList, matchingNostalgiaItem, nostalgiaPostBody, matchingDecade, matchingCategory, deleteItem
}

