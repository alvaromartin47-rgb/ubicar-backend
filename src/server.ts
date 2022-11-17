import express from 'express'
import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import routes from './routes'
import dotenv from 'dotenv'

const app = express()

app.use(helmet())
app.disable('x-powered-by')

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use(
  express.static(
    path.join(
      __dirname, './views'
    )))

;(process.env.PORT != null) || dotenv.config()

routes(app)

export default app
