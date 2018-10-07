import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as bodyParser from 'body-parser'

import { config } from './config'
import { uncaughtErrorHandler } from './utils'
import container from './container'
import './user/user.controller'

const { PORT } = config
const server = new InversifyExpressServer(container)

server.setConfig(app => {
  app.use(bodyParser.json())
})

server
  .build()
  .listen(PORT)

process.on('uncaughtException', uncaughtErrorHandler)
process.on('unhandledRejection', uncaughtErrorHandler)
