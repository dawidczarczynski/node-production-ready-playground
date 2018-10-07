import * as Mongoose from 'mongoose'
import { config } from '../config'
import { DBMessages } from './db-messages.enum'
import { DBEvents } from './db-events.enum'

class Database {

  private static _instance: Mongoose.Mongoose
  private static _connection: Mongoose.Connection

  public static async connect () {
    if (this._instance) return this._instance

    this._connection = Mongoose.connection

    this._instance = await Mongoose.connect(
      config.DB_URI,
      { useNewUrlParser: true }
    )

    this.registerDbEvents()

    return this._instance
  }

  public static async disconnect () {
    await this._connection.close()
  }

  private static registerDbEvents () {
    this._connection
      .on(DBEvents.CONNECTED, () => console.log(DBMessages.CONNECTED))
      .on(DBEvents.ERROR, (error: Error) => console.log(`${DBMessages.ERROR} ${error}`))
      .on(DBEvents.DISCONNECT, () => console.log(DBMessages.DISCONNECT))
  }

}

Database.connect()

export default Database
