import { Container } from 'inversify'
import { userContainer } from '@user/ioc/user.container'

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton'
})
container.load(userContainer)

export default container
