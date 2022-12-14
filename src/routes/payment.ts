import express from 'express'

import verifyToken from './verifyToken'
import preference from '../controllers/reservation/preference/preference'
const router = express.Router()

router.post('/preference/', verifyToken, preference)

export default router
