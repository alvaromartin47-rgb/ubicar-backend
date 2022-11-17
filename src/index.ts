import dotenv from 'dotenv'

import server from './server'
import './services/db/db'

dotenv.config()

server.listen(process.env.PORT, () => {
  const PORT = process.env.PORT
  console.log(`Server listening on port ${PORT}`)
})
