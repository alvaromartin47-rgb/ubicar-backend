import express from 'express'

import verifyToken from './verifyToken'
import transports from '../controllers/driver/transports/transports.js'
const router = express.Router()

router.get('/transports/', verifyToken, transports)

export default router
