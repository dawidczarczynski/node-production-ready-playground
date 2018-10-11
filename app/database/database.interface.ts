import { Mongoose } from 'mongoose'

export interface IDatabase {

  connect (): Promise<Mongoose>
  disconnect (): Promise<void>

}
