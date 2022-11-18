import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import id from '../controllers/trip/id';
import preview from '../controllers/trip/route/preview/preview';
import check from '../controllers/trip/check/check';

import reserve from '../controllers/reservation/create/reserve';
import cancel from '../controllers/reservation/cancel/cancel';
import accept from '../controllers/reservation/accept/accept';

router.post("/route/preview/", verifyToken, preview);
router.post("/check/:id/", check);
router.put("/:id/", verifyToken, id);

router.post("/reservation/create/:tripId", verifyToken, reserve);
router.post("/reservation/accept/", verifyToken, accept);
router.post("/reservation/cancel/", verifyToken, cancel);


export default router;