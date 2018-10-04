import * as express from 'express'

type Express = express.Express

class App {

  private readonly _server: Express

  constructor () {
    this._server = express()
    this.mountRoute()
  }

  public get server (): Express {
    return this._server
  }

  private mountRoute (): void {
    const router = express.Router()

    router
      .get('/', (req, res) => res.json({ message: 'OK' }))

    this._server.use(router)
  }

}

const app = new App()

export default app.server
