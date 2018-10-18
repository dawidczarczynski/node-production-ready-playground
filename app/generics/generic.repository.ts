import { injectable } from 'inversify'
import { Schema, Document, Types, Model } from 'mongoose'

import { IDatabase, DBErrors } from '@database'
import { DbDuplicatedKeyError, DbInternalError, DbInvalidIdentificator } from '@errors'

@injectable()
export abstract class GenericRepository<T extends Document> {

  constructor (
    private _db: IDatabase,
    private _schema: Schema,
    private _model: string
  ) {}

  private async model (): Promise<Model<T>> {
    const instance = await this._db.connect()

    return instance
      .model<T>(this._model, this._schema)
  }

  public async findById (id: string): Promise<T> {
    const model = await this.model()

    /**
     * Check if requested id meets mongodb expectations
     */
    try {
      Types.ObjectId(id)
    } catch (ex) {
      throw new DbInvalidIdentificator(DBErrors.INVALID_IDENTIFICATOR)
    }

    return model.findById(id)
  }

  public async find (): Promise<T[]> {
    const model = await this.model()

    return model.find()
  }

  protected async _add<U> (data: U): Promise<T> {
    const Model = await this.model()
    const entity = new Model(data)

    try {
      return await entity.save()
    } catch (ex) {
      /**
       * Catch key duplication error
       */
      const duplicatedKeyError = ex.code === 11000
      if (duplicatedKeyError) throw new DbDuplicatedKeyError(DBErrors.DUPLICATED_KEY)

      throw new DbInternalError(DBErrors.UNKNOW_ERROR)
    }
  }

  protected async findOne (query: any): Promise<T> {
    const model = await this.model()

    return model.findOne(query)
  }

}
