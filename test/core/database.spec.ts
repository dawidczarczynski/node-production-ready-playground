import 'reflect-metadata'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)

import * as Mongoose from 'mongoose'
import { Database } from '@database'
import { config } from '@config'

describe('Database class', function () {

  let connectStub: sinon.SinonStub
  let connectionStub: sinon.SinonStub
  let database: Database

  beforeEach(function () {
    connectionStub = sinon.stub(Mongoose, 'connection')
    connectStub = sinon.stub(Mongoose, 'connect')
    database = new Database()
  })

  it('should create an database connection', function () {
    config.DB_URI = 'test'
    database.connect()

    connectStub.should.have.been.calledWithMatch('mongodb://test')
  })

  it('should create only one database connection', async function () {
    connectStub.returns('test connection')

    await database.connect()
    await database.connect()

    connectStub.should.have.been.calledOnce
  })

  afterEach(function () {
    connectStub.restore()
    connectionStub.restore()
  })

})
