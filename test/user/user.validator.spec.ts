import 'reflect-metadata'
import 'mocha'
import 'chai/register-should'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)

import { validateUser } from '@user/user.validator'
import { IUser } from '@user/model/user.interface'
import { BadRequestError } from '@errors'

describe('User validator', function () {

  it('should not throw error if user is valid', function () {
    const user: IUser = { username: 'testuser', email: 'user@user.com' }

    validateUser.bind(user).should.not.throw
  })

  describe('Username field', function () {

    it('should throw error if username is missing', function () {
      const user: any = { email: 'user@user.com' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?username.*?required.*?/)
    })

    it('should throw error if username is not alphanumeric', function () {
      const user: any = { username: 'Test!@ 23', email: 'user@user.com' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?username.*?alpha-numeric.*?/)
    })

    it('should throw error if username is shorter than 3 characters', function () {
      const user: any = { username: 'Te', email: 'user@user.com' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?username.*?3 characters.*?/)
    })

    it('should throw error if username is longer than 20 characters', function () {
      const user: any = { username: '123456789012345678901', email: 'user@user.com' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?username.*?20 characters.*?/)
    })

  })

  describe('Email field', function () {

    it('should throw error if email is missing', function () {
      const user: any = { username: 'testuser' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?email.*?required.*?/)
    })

    it('should throw error if email is not valid', function () {
      const user: any = { username: 'testuser', email: 'not-valid-email' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?email.*?valid.*?/)
    })

    it('should throw error if email domain has less than 2 atoms', function () {
      const user: any = { username: 'testuser', email: 'email@email' }

      ;(() => validateUser(user)).should.throw(BadRequestError, /^.*?email.*?valid.*?/)
    })

  })

})
