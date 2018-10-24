import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'

import { App } from '@app'
import { config } from '@config'
import { uncaughtErrorHandler } from '@utils'
import container from '@container'

const { PORT, API_ROOT } = config

const server = new InversifyExpressServer(container, null, { rootPath: API_ROOT })

server
  .setConfig(App.successConfig)
  .setErrorConfig(App.errorConfig)
  .build()
  .listen(PORT)

process.on('uncaughtException', uncaughtErrorHandler)
process.on('unhandledRejection', uncaughtErrorHandler)
