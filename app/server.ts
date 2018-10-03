import * as express from 'express'
import { config } from './config'

const app = express()

app.listen(config.PORT, () => {
  console.log(`Server is listening at port ${config.PORT}`)
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('OK!')
  })
})
