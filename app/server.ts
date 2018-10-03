import * as express from 'express';

const app = express();

app.listen(4200, () => {
  console.log('Server is listening at port 4200');
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('OK!');
  })
})