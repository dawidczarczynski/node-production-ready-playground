import 'reflect-metadata'
import 'mocha'
import 'chai/register-should'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { Document, Schema } from 'mongoose'
import { IDatabase } from '@database'
import { DbInvalidIdentificator, DbDuplicatedKeyError, DbInternalError } from '@errors'
import { GenericRepository } from '@generics/generic.repository'
import { DatabaseStub, DatabaseInstanceStub, DatabaseModelStub } from '@stubs/database'

/** Testing Class */
interface ITest extends Document {}

class TestRepository extends GenericRepository<ITest> {
  constructor (db: IDatabase) {
    super(db, new Schema() , 'TestModel')
  }
}

describe('Generic Repository', function () {

  let repository: TestRepository
  let databaseModel: DatabaseModelStub
  let databaseInstance: DatabaseInstanceStub
  let databaseInterface: IDatabase

  beforeEach(function () {
    databaseModel = new DatabaseModelStub()
    databaseInstance = new DatabaseInstanceStub(databaseModel)
    databaseInterface = new DatabaseStub(databaseInstance)

    repository = new TestRepository(databaseInterface)
  })

  it('should create an instance of database model', function (done) {
    // Private method test
    const model = repository['model']()

    model.should.eventually.be.equal(databaseModel).and.notify(done)
  })

  describe('Find one method', function () {

    it('should return an object if identificator is correct', function (done) {
      const validId = '507f1f77bcf86cd799439011'
      const model = { test: 'Test', test1: 'Test1' }
      databaseModel.modelInstance = model

      const oneItem = repository.findById(validId)

      oneItem.should.eventually.be.equal(model).and.notify(done)
    })

    it('should throw exception if identificator is in wrong format', function (done) {
      const invalidId = 'some-random%invalid_id'

      const oneItem = repository.findById(invalidId)

      oneItem.should.be.rejectedWith(DbInvalidIdentificator, 'Invalid format of identificator').and.notify(done)
    })

  })

  describe('Add method', function () {

    beforeEach(function () {
      databaseInstance.actAsModel = true
    })

    it('should throw exception if model is not unique', function (done) {
      const model = { test: 'Test', test1: 'Test1' }
      databaseModel.duplicatedKey = true

      const savedItem = repository.add(model)

      savedItem.should.be.rejectedWith(DbDuplicatedKeyError, 'Some keys are not unique').and.notify(done)
    })

    it('should throw exception if any unknown database error occurs', function (done) {
      const model = { test: 'Test', test1: 'Test1' }
      databaseModel.dbError = true

      const savedItem = repository.add(model)

      savedItem.should.be.rejectedWith(DbInternalError, 'Database error occured').and.notify(done)
    })

    it('should save model', function (done) {
      const model = { test: 'Test', test1: 'Test1' }

      const savedItem = repository.add(model)

      savedItem.should.eventually.be.equal(model).and.notify(done)
    })

  })

  describe('Find method', function () {

    it('should return array of objects', function (done) {
      const items = repository.find()

      items.should.eventually.be.an('array').that.does.have.length(1).and.notify(done)
    })

  })

})
