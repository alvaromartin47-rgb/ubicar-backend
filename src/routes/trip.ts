import express from 'express'

import verifyToken from './verifyToken'
import id from '../controllers/trip/id'
import preview from '../controllers/trip/route/preview/preview'
import check from '../controllers/trip/check/check'
import findById from '../controllers/trip/findById'

import reserve from '../controllers/reservation/create/reserve'
// import cancel from '../controllers/reservation/cancel/cancel'
import accept from '../controllers/reservation/accept/accept'
const router = express.Router()

router.post('/route/preview/', verifyToken, preview)
router.post('/check/:id/', check)
router.put('/:id/', verifyToken, id)
router.get('/:id/', verifyToken, findById)

router.post('/reservation/create/:tripId', verifyToken, reserve)
router.post('/reservation/accept/', verifyToken, accept)
// router.post('/reservation/cancel/', verifyToken, cancel)

export default router
