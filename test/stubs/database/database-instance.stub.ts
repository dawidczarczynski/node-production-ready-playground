import { DatabaseModelStub } from '@stubs/database'

export class DatabaseInstanceStub {

  private _actAsModel = false

  constructor (private _model: DatabaseModelStub) {}

  set actAsModel (value: boolean) {
    this._actAsModel = value
  }

  model () {
    const model = this._model

    if (this._actAsModel) {
      // return constructor instead of value when used as a model
      return function (data: any) {
        model.modelInstance = data

        return model
      }
    }

    return model
  }

}
