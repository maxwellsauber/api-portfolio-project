/* eslint-disable max-len */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  after, afterEach, before, beforeEach, describe, it,
} from 'mocha'
import models from '../../models'
import {
  nostalgiaList, matchingNostalgiaItem, nostalgiaPostBody, nostalgiaPatchBody, matchingDecade, matchingCategory, deleteItem,
} from '../mocks/nostalgiaItems'
import {
  getAllNostalgiaItems, getNostalgiaItemsByIdentifierWithAllLinkedData, createNewNostalgiaItem, updateNostalgiaItem, deleteNostalgiaItem, patchNostalgiaItem,
} from '../../controllers/nostalgiaItems'
import { getNostalgiaItemsByDecade } from '../../controllers/decades'
import { getNostalgiaItemsByCategory } from '../../controllers/categories'

chai.use(sinonChai)

describe('Controllers', () => {
  let response
  let sandbox

  let stubbedNostalgiaItemsFindOrCreate

  let stubbedTagsFindOrCreate
  let stubbedCategoriesFindOrCreate
  let stubbedCharactersFindOrCreate
  let stubbeDecadesFindOrCreate

  let stubbedNostalgiaTagsFindOrCreate
  let stubbedNostalgiaCategoiesFindOrCreate
  let stubbedNostalgiaCharactersFindOrCreate
  let stubbedNostalgiaDecadesFindOrCreate

  let stubbedFindAll
  let stubbedFindOne
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend

  let stubbedFindAllDecades
  let stubbedFindAlCategories

  let stubbedNostalgiaItemsUpdate

  let stubbedNostalgiaItemsDestroy
  let stubbedNostalgiaTagsDestroy
  let stubbedNostalgiaCategoriesDestroy
  let stubbedNostalgiaCharactersDestroy
  let stubbedNostalgiaDecadesDestroy

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedNostalgiaItemsFindOrCreate = sandbox.stub(models.nostalgiaItems, 'findOrCreate')
    stubbedTagsFindOrCreate = sandbox.stub(models.tags, 'findOrCreate')
    stubbedCategoriesFindOrCreate = sandbox.stub(models.categories, 'findOrCreate')
    stubbedCharactersFindOrCreate = sandbox.stub(models.characters, 'findOrCreate')
    stubbeDecadesFindOrCreate = sandbox.stub(models.decades, 'findOrCreate')

    stubbedNostalgiaTagsFindOrCreate = sandbox.stub(models.nostalgiaTags, 'findOrCreate')
    stubbedNostalgiaCategoiesFindOrCreate = sandbox.stub(models.nostalgiaCategories, 'findOrCreate')
    stubbedNostalgiaCharactersFindOrCreate = sandbox.stub(models.nostalgiaCharacters, 'findOrCreate')
    stubbedNostalgiaDecadesFindOrCreate = sandbox.stub(models.nostalgiaDecades, 'findOrCreate')

    stubbedFindAll = sandbox.stub(models.nostalgiaItems, 'findAll')
    stubbedFindOne = sandbox.stub(models.nostalgiaItems, 'findOne')
    stubbedSend = sandbox.stub()
    stubbedStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()

    stubbedFindAllDecades = sandbox.stub(models.decades, 'findAll')
    stubbedFindAlCategories = sandbox.stub(models.categories, 'findAll')

    stubbedNostalgiaItemsUpdate = sandbox.stub(models.nostalgiaItems, 'update')

    stubbedNostalgiaItemsDestroy = sandbox.stub(models.nostalgiaItems, 'destroy')
    stubbedNostalgiaTagsDestroy = sandbox.stub(models.nostalgiaTags, 'destroy')
    stubbedNostalgiaCategoriesDestroy = sandbox.stub(models.nostalgiaCategories, 'destroy')
    stubbedNostalgiaCharactersDestroy = sandbox.stub(models.nostalgiaCharacters, 'destroy')
    stubbedNostalgiaDecadesDestroy = sandbox.stub(models.nostalgiaDecades, 'destroy')

    response = {
      send: stubbedSend,
      status: stubbedStatus,
      sendStatus: stubbedStatusDotSend,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })
  describe('getAllNostalgiaItems', () => {
    it('retrieves a list of nostalgiaItems from the database and calls response.send() with the list.', async () => {
      stubbedFindAll.returns(nostalgiaList)

      await getAllNostalgiaItems({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(nostalgiaList)
    })

    it('returns a 500 status when an error occurs retrieving all nostalgiaItems', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllNostalgiaItems({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500 Errors on a half shell')
    })
  })
  describe('getNostalgiaItemsByIdentifierWithAllLinkedData', () => {
    it('retrieves the nostalgia item associated with the provided identifier and all liked data from the database and calls response.send() with it', async () => {
      const request = { params: { identifier: 'back-to-the-future' } }

      stubbedFindAll.returns(matchingNostalgiaItem)

      await getNostalgiaItemsByIdentifierWithAllLinkedData(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        include: [
          { model: models.categories },
          { model: models.characters },
          { model: models.tags },
          { model: models.decades },
        ],
        where: {
          slug: { [models.Op.like]: `%${request.params.identifier.toLowerCase()}%` },
        },
      })

      expect(stubbedSend).to.have.been.calledWith(matchingNostalgiaItem)
    })

    it('returns a 404 status when no nostalgia item is found is found', async () => {
      const request = { params: { identifier: 'not-found' } }

      stubbedFindAll.returns([])

      await getNostalgiaItemsByIdentifierWithAllLinkedData(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith(`"${request.params.identifier}" - Not Found`)
    })

    it('returns a 500 status when an error occurs retrieving a nostalgia item by identifier', async () => {
      stubbedFindOne.throws('ERROR!')

      await getNostalgiaItemsByIdentifierWithAllLinkedData({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500 Error! We HAVE to go back!')
    })
  })
  describe('createNewNostalgiaItem', () => {
    it('accepts new nostalgia item details and saves them as a new item in the database, returning the saved record with a 201 status', async () => {
      const request = { body: nostalgiaPostBody }

      stubbedNostalgiaItemsFindOrCreate.returns([{
        id: 66,
        name: 'Star Wars',
        description: 'Wars in Space',
        slug: 'star-wars',
      }, true])
      stubbedTagsFindOrCreate.returns([{
        id: 66,
        tag: ['science-fiction'],
      }, true])
      stubbeDecadesFindOrCreate.returns([{
        id: 66,
        tag: '1970',
      }], true)
      stubbedCharactersFindOrCreate.onFirstCall().returns([{
        id: 66,
        characters: 'Luke Skywalker',
      }, true])
      stubbedCharactersFindOrCreate.onSecondCall().returns([{
        id: 3000,
        characters: 'Darth Vader',
      }, true])
      stubbedCategoriesFindOrCreate.returns([{
        id: 66,
        category: 'movie',
      }, true])
      stubbedNostalgiaTagsFindOrCreate.returns([{
        tagId: 66,
        nostalgiaItemId: 66,
      }, true])
      stubbedNostalgiaCategoiesFindOrCreate.returns([{
        categoryId: 66,
        nostalgiaItemId: 66,
      }, true])
      stubbedNostalgiaCharactersFindOrCreate.onFirstCall().returns([{
        characterId: 66,
        nostalgiaItemId: 66,
      }, true])
      stubbedNostalgiaCharactersFindOrCreate.onSecondCall().returns([{
        characterId: 66,
        nostalgiaItemId: 3000,
      }, true])
      stubbedNostalgiaDecadesFindOrCreate.returns([{
        decadeId: 66,
        nostalgiaItemId: 66,
      }, true])

      await createNewNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith('New item created with ID:66')
    })

    it('returns a 400 status when not all required fields are provided (Example: missing required "category")', async () => {
      const { name, decade } = nostalgiaPostBody
      const request = { body: { name, decade } }

      await createNewNostalgiaItem(request, response)

      expect(stubbedNostalgiaItemsFindOrCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('404 - Required attributes:  "categories","characters","decades","description","name","slug","tags"')
    })

    it('returns a 500 status when an error occurs saving a new nostalgia item', async () => {
      const request = { body: nostalgiaPostBody }

      stubbedNostalgiaItemsFindOrCreate.throws('ERROR!')

      await createNewNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500 Error - Unable to create nostalgia item')
    })
  })
  describe('patchNostalgiaItem', () => {
    it('updates an individual attribute of a existing nostalgia item details and saves them as a new item in the database, returning the saved record with a 201 status', async () => {
      const request = { body: nostalgiaPatchBody, params: { id: '3' } }

      stubbedFindOne.returns(matchingNostalgiaItem)

      await patchNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Successfully patched the nostalgia item')
    })
    it('returns a 400 status when not all required fields are provided (Example: missing required "category")', async () => {
      const request = { body: [], params: { id: '9' } }

      stubbedFindOne.returns(matchingNostalgiaItem)

      await patchNostalgiaItem(request, response)

      expect(stubbedNostalgiaItemsUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('404 - Must provide "name", "description", or "slug"')
    })

    it('returns a 500 status when an error occurs saving a new nostalgia item', async () => {
      stubbedNostalgiaItemsFindOrCreate.throws('ERROR!')

      await patchNostalgiaItem({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown error while patching item')
    })
  })
  describe('updateNostalgiaItem', () => {
    it('updates an existing nostalgia item details and saves them as a new item in the database, returning the saved record with a 201 status', async () => {
      const request = { body: nostalgiaPostBody, params: { id: '1' } }

      stubbedNostalgiaItemsFindOrCreate.returns([{
        id: 66,
        name: 'Star Wars',
        description: 'Wars in Space',
        slug: 'star-wars',
      }, true])
      stubbedTagsFindOrCreate.returns([{
        id: 66,
        tag: ['science-fiction'],
      }, true])
      stubbeDecadesFindOrCreate.returns([{
        id: 66,
        tag: '1970',
      }], true)
      stubbedCharactersFindOrCreate.onFirstCall().returns([{
        id: 66,
        characters: 'Luke Skywalker',
      }, true])
      stubbedCharactersFindOrCreate.onSecondCall().returns([{
        id: 3000,
        characters: 'Darth Vader',
      }, true])
      stubbedCategoriesFindOrCreate.returns([{
        id: 66,
        category: 'movie',
      }, true])
      stubbedNostalgiaTagsFindOrCreate.returns([{
        tagId: 66,
        nostalgiaItemId: 66,
      }, true])
      stubbedNostalgiaCategoiesFindOrCreate.returns([{
        categoryId: 66,
        nostalgiaItemId: 66,
      }, true])
      stubbedNostalgiaCharactersFindOrCreate.onFirstCall().returns([{
        characterId: 66,
        nostalgiaItemId: 66,
      }, true])
      stubbedNostalgiaCharactersFindOrCreate.onSecondCall().returns([{
        characterId: 66,
        nostalgiaItemId: 3000,
      }, true])
      stubbedNostalgiaDecadesFindOrCreate.returns([{
        decadeId: 66,
        nostalgiaItemId: 66,
      }, true])

      await updateNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Thanks for the UPDATE for item ID:1')
    })
    it('returns a 400 status when not all required fields are provided (Example: missing required "category")', async () => {
      const { name, decade } = nostalgiaPostBody
      const request = { body: { name, decade }, params: { id: '1' } }

      await updateNostalgiaItem(request, response)

      expect(stubbedNostalgiaItemsFindOrCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('404 - Required attributes:  "categories","characters","decades","description","name","slug","tags"')
    })

    it('returns a 500 status when an error occurs saving a new nostalgia item', async () => {
      const request = { body: nostalgiaPostBody, params: { id: '1' } }

      stubbedNostalgiaItemsFindOrCreate.throws('ERROR!')

      await updateNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500 Error - Unable to update nostalgia item')
    })
  })
  describe('getNostalgiaItemsByDecade', () => {
    it('retrieves the nostalgia item associated with the provided decade and linked data from the database and calls response.send() with it', async () => {
      const request = { params: { decade: '1990' } }

      stubbedFindAllDecades.returns(matchingDecade)

      await getNostalgiaItemsByDecade(request, response)

      expect(stubbedFindAllDecades).to.have.been.calledWith({
        include: [
          { model: models.nostalgiaItems },
        ],
        where: {
          decade: { [models.Op.like]: `%${request.params.decade.toLowerCase()}%` },
        },
      })

      expect(stubbedSend).to.have.been.calledWith(matchingDecade)
    })

    it('returns a 404 status when no nostalgia item is found by decade', async () => {
      const request = { params: { decade: 'not-found' } }

      stubbedFindAllDecades.returns([])

      await getNostalgiaItemsByDecade(request, response)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith(`"${request.params.decade}" - Not Found`)
    })

    it('returns a 500 status when an error occurs retrieving a nostalgia item by decade', async () => {
      stubbedFindOne.throws('ERROR!')

      await getNostalgiaItemsByDecade({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500')
    })
  })
  describe('getNostalgiaItemsByCategory', () => {
    it('retrieves the nostalgia item associated with the provided category and liked data from the database and calls response.send() with it', async () => {
      const request = { params: { category: 'toy' } }

      stubbedFindAlCategories.returns(matchingCategory)

      await getNostalgiaItemsByCategory(request, response)

      expect(stubbedFindAlCategories).to.have.been.calledWith({
        include: [
          { model: models.nostalgiaItems },
        ],
        where: {
          category: { [models.Op.like]: `%${request.params.category.toLowerCase()}%` },
        },
      })

      expect(stubbedSend).to.have.been.calledWith(matchingCategory)
    })

    it('returns a 404 status when no nostalgia item is found by category', async () => {
      const request = { params: { category: 'not-found' } }

      stubbedFindAlCategories.returns([])

      await getNostalgiaItemsByCategory(request, response)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith(`"${request.params.category}" - Not Found`)
    })

    it('returns a 500 status when an error occurs retrieving a nostalgia item by category', async () => {
      stubbedFindOne.throws('ERROR!')

      await getNostalgiaItemsByCategory({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500')
    })
  })
  describe('deleteNostalgiaItem', () => {
    it('responds with a success message when a nostalgia item is deleted', async () => {
      const request = { params: { slug: 'back-to-the-future' } }

      stubbedFindOne.returns(deleteItem)

      await deleteNostalgiaItem(request, response)


      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: request.params.slug } })

      expect(stubbedNostalgiaCategoriesDestroy).to.have.been.calledWith({ where: { nostalgiaItemId: 3 } })
      expect(stubbedNostalgiaCharactersDestroy).to.have.been.calledWith({ where: { nostalgiaItemId: 3 } })
      expect(stubbedNostalgiaDecadesDestroy).to.have.been.calledWith({ where: { nostalgiaItemId: 3 } })
      expect(stubbedNostalgiaTagsDestroy).to.have.been.calledWith({ where: { nostalgiaItemId: 3 } })
      expect(stubbedNostalgiaItemsDestroy).to.have.been.calledWith({ where: { id: 3 } })

      expect(response.send).to.have.been.calledWith(`Successfully deleted the nostalgia item with slug ${request.params.slug}`)
    })
    it('responds with a 404 when no nostalgia can be found with the slug passed in', async () => {
      stubbedFindOne.returns(null)

      const request = { params: { slug: 'not-found-item' } }

      await deleteNostalgiaItem(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found-item' } })

      expect(response.status).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown nostalgia item not-found-item.')
    })
    it('returns a 500 error when the database calls fails', async () => {
      stubbedFindOne.throws('ERROR!')

      const request = { params: { slug: 'not-found-item' } }

      await deleteNostalgiaItem(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found-item' } })
      expect(response.status).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown error while deleting item')
    })
  })
})
