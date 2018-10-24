import { Container } from 'inversify'

import { dbContainer } from '@database/ioc/database.container'
import { userContainer } from '@user/ioc/user.container'

const container = new Container({
  defaultScope: 'Singleton'
})
container.load(dbContainer, userContainer)

export default container
