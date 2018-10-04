import { config } from './config'
import server from './app'

const { PORT } = config

server.listen(PORT, (error: Error) =>
  error
    ? console.log(error)
    : console.log(`Server is listening at port ${PORT}`)
)
