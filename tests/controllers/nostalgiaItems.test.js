/* eslint-disable max-len */
/* const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { nostalgiaList } = require('../mocks/nostalgiaItems')
const { getAllNostalgiaItems } = require('../../controllers/nostalgiaItems.js')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - nostalgiaItems', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindAll
  let stubbedFindOne
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    // stubbedCreate = sandbox.stub(models.villains, 'create')
    stubbedFindAll = sandbox.stub(models.villains, 'findAll')
    // stubbedFindOne = sandbox.stub(models.villains, 'findOne')

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
    it('retrieves a list of villains from the database and calls response.send() with the list.', async () => {
      stubbedFindAll.returns(nostalgiaList)

      await getAllNostalgiaItems({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      //expect(stubbedFindAll).to.have.been.calledWith({ attributes: villainAttributes })
      expect(stubbedSend).to.have.been.calledWith(nostalgiaList)
    })

    it('returns a 500 status when an error occurs retrieving all nostalgiaItems', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllNostalgiaItems({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('He\'s a 500 Error! They\'re all the same')
    })
  })
})
*/
