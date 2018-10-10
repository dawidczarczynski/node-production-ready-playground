import { injectable } from 'inversify'
import { Schema, Document, Types } from 'mongoose'

import { Database } from '../database/database'
import { DBErrors } from '../database/database-errors.enum'
import { BadRequestError } from '../errors'

@injectable()
export abstract class GenericRepository<T extends Document> {

  constructor (
    private _db: Database,
    private _schema: Schema,
    private _model: string
  ) {}

  public async model () {
    const instance = await this._db.connect()

    return instance
      .model<T>(this._model, this._schema)
  }

  public async findOne (id: string): Promise<T> {
    const model = await this.model()

    /**
     * Check if requested id meets mongodb expectations
     */
    try {
      Types.ObjectId(id)
    } catch (ex) {
      throw new BadRequestError(DBErrors.INVALID_IDENTIFICATOR)
    }

    return model.findById(id)
  }

  public async getAll (): Promise<T[]> {
    const model = await this.model()

    return model.find()
  }

}
