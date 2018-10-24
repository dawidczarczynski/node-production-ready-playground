import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as swagger from 'swagger-express-ts'

import { config } from '@config'
import { globalErrorHandler } from '@utils'

type ExpressApp = express.Application

export class App {

  constructor () {
    throw Error('App class should not be instantiated!')
  }

  public static successConfig (app: ExpressApp) {
    const { API_ROOT, SWAGGER_PATH } = config

    app.use(bodyParser.json())

    // Swagger setup
    app.use(SWAGGER_PATH, express.static('swagger'))
    app.use(`${SWAGGER_PATH}/assets`, express.static('node_modules/swagger-ui-dist'))
    app.use(swagger.express({
      definition : {
        info : {
          title : 'Wishlist API',
          version : '1.0'
        },
        basePath: API_ROOT,
        externalDocs : {
          url : 'My url'
        }  // Models can be defined here
      }
    }))
  }

  public static errorConfig (app: ExpressApp) {
    app.use(globalErrorHandler)
  }

}
