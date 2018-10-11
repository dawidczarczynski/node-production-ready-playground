export class DatabaseModelStub {

  private _modelInstance: any
  private _duplicatedKey = false
  private _dbError = false

  set modelInstance (value: any) {
    this._modelInstance = value
  }

  set duplicatedKey (value: boolean) {
    this._duplicatedKey = value
  }

  set dbError (value: boolean) {
    this._dbError = value
  }

  findById () {
    return Promise.resolve(this._modelInstance)
  }

  find () {
    return Promise.resolve([ this._modelInstance ])
  }

  save () {
    if (this._duplicatedKey) {
      throw { code: 11000 }
    }

    if (this._dbError) {
      throw new Error('Some internal db error')
    }

    return Promise.resolve(this._modelInstance)
  }

}
