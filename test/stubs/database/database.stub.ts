import { IDatabase } from '@database'
import { DatabaseInstanceStub } from '@stubs/database'

export class DatabaseStub implements IDatabase {

  constructor (private _instance: DatabaseInstanceStub) {}

  connect () {
    return Promise.resolve((this._instance as any))
  }

  disconnect () {
    return Promise.resolve()
  }

}
