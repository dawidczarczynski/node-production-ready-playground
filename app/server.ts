import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as bodyParser from 'body-parser'

import { config } from './config'
import container from './container'
import { uncaughtErrorHandler, globalErrorHandler } from '@utils'
import '@user/user.controller'

const { PORT } = config
const server = new InversifyExpressServer(container)

server
  .setConfig(app => {
    app.use(bodyParser.json())
  })
  .setErrorConfig(app => {
    app.use(globalErrorHandler)
  })
  .build()
  .listen(PORT)

process.on('uncaughtException', uncaughtErrorHandler)
process.on('unhandledRejection', uncaughtErrorHandler)
