import { Container } from 'inversify'
import { UserService } from './user/user.service'

const container = new Container()
container.bind<UserService>(UserService).toSelf()

export default container
