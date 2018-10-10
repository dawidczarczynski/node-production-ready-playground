import { Container } from 'inversify'
import { userContainer } from './user/ioc/user.container'
import { databaseContainer } from './database/database.container'

const container = new Container()
container.load(databaseContainer, userContainer)

export default container
