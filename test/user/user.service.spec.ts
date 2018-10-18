import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import { IUser } from '@user/model/user.interface'
import { UserService } from '@user/user.service'
import { UserRepositoryStub } from '@stubs/user/user-repository.stub'
import { NotFoundError, BadRequestError, InternalError } from '@errors'
import { dummyUser as user } from '@stubs/user/user.mock'

describe('User Service', function () {

  let service: UserService
  let repository: UserRepositoryStub
  let dummyUser: IUser

  beforeEach(function () {
    repository = new UserRepositoryStub()
    service = new UserService(repository)
    dummyUser = user
  })

  describe('Get user', function () {

    it('should return a user', function (done) {
      const id = 'some-user-id1234'

      const userById = service.getUser(id)

      userById.should.eventually.contain(dummyUser).and.notify(done)
    })

    it('should throw an error when user is not found', function (done) {
      repository.returnEmptyUser = true
      const id = 'some-user-id1234'

      const userById = service.getUser(id)

      userById.should.be.rejectedWith(NotFoundError, 'User not found').and.notify(done)
    })

  })

  describe('Save user', function () {

    it('should throw an error when user already exists', function (done) {
      repository.throwDuplicatedKeyError = true

      const createdUser = service.createUser(dummyUser)

      createdUser.should.be.rejectedWith(BadRequestError, 'User already exists').and.notify(done)
    })

    it('should throw an internal error', function (done) {
      repository.throwOtherError = true

      const createdUser = service.createUser(dummyUser)

      createdUser.should.be.rejectedWith(InternalError).and.notify(done)
    })

    it('should return created user', function (done) {
      const createdUser = service.createUser(dummyUser)

      createdUser.should.eventually.contain(dummyUser).and.notify(done)
    })

  })
})
