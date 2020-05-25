/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { nostalgiaList, matchingNostalgiaItem, nostalgiaPostBody } = require('../mocks/nostalgiaItems')
const { getAllNostalgiaItems, getNostalgiaItemsByIdentifierWithAllLinkedData, createNewNostalgiaItem } = require('../../controllers/nostalgiaItems.js')
// const { getNostalgiaItemsByDecade } = require('../../controllers/decades.js')
// const { getNostalgiaItemsByCategory } = require('../../controllers/categories.js')
// REMAINING CONROLERS TO WRITE - PUT PATCH DELETE

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - nostalgiaItems', () => {
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
          { model: models.decades }
        ],
        where: {
          slug: { [models.Op.like]: `%${request.params.identifier.toLowerCase()}%` }
        }
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
        tag: ['science-fiction']
      }, true])
      stubbeDecadesFindOrCreate.returns([{
        id: 66,
        tag: '1970'
      }], true)
      stubbedCharactersFindOrCreate.onFirstCall().returns([{
        id: 66,
        characters: 'Luke Skywalker'
      }, true])
      stubbedCharactersFindOrCreate.onSecondCall().returns([{
        id: 3000,
        characters: 'Darth Vader'
      }, true])
      stubbedCategoriesFindOrCreate.returns([{
        id: 66,
        category: 'movie'
      }, true])
      stubbedNostalgiaTagsFindOrCreate.returns([{
        tagId: 66,
        nostalgiaItemId: 66
      }, true])
      stubbedNostalgiaCategoiesFindOrCreate.returns([{
        categoryId: 66,
        nostalgiaItemId: 66
      }, true])
      stubbedNostalgiaCharactersFindOrCreate.onFirstCall().returns([{
        characterId: 66,
        nostalgiaItemId: 66
      }, true])
      stubbedNostalgiaCharactersFindOrCreate.onSecondCall().returns([{
        characterId: 66,
        nostalgiaItemId: 3000
      }, true])
      stubbedNostalgiaDecadesFindOrCreate.returns([{
        decadeId: 66,
        nostalgiaItemId: 66
      }, true])

      await createNewNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith('We remember star-wars! How could you forget!?')
    })

    it('returns a 400 status when not all required fields are provided (Example: missing required "category")', async () => {
      const { name, decade } = nostalgiaPostBody
      const request = { body: { name, decade } }

      await createNewNostalgiaItem(request, response)

      expect(stubbedNostalgiaItemsFindOrCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('404 - Required attributes:  "categories","characters","decades","description","name","slug","tags"')
    })

    it('returns a 500 status when an error occurs saving a new villain', async () => {
      const request = { body: nostalgiaPostBody }

      stubbedNostalgiaItemsFindOrCreate.throws('ERROR!')

      await createNewNostalgiaItem(request, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('500 Error - Unable to create nostalgia item')
    })
  })
  // describe('getNostalgiaItemsByDecade', () => {})
  // describe('getNostalgiaItemsByCategory', () => {})
  // describe('deleteNostalgiaItem', () => {})
})
