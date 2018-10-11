import * as Mongoose from 'mongoose'
import { injectable } from 'inversify'

import { config } from '../config'
import { IDatabase } from './database.interface'
import { DBMessages } from './database-messages.enum'
import { DBEvents } from './database-events.enum'

@injectable()
export class Database implements IDatabase {

  private _instance: Mongoose.Mongoose
  private _connection: Mongoose.Connection

  public async connect () {
    if (this._instance) return this._instance

    this._connection = Mongoose.connection
    this.registerDbEvents()

    this._instance = await Mongoose.connect(
      `mongodb://${config.DB_URI}`,
      { useNewUrlParser: true }
    )

    return this._instance
  }

  public async disconnect () {
    await this._connection.close()
  }

  private registerDbEvents () {
    this._connection
      .on(DBEvents.CONNECTED, () => console.log(`${DBMessages.CONNECTED} ${config.DB_URI}`))
      .on(DBEvents.ERROR, (error: Error) => console.log(`${DBMessages.ERROR} ${error}`))
      .on(DBEvents.DISCONNECT, () => console.log(DBMessages.DISCONNECT))
  }

}
