import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import reserve from '../controllers/payment/reserve/reserve';
import capture from '../controllers/payment/capture/capture';
import preference from '../controllers/payment/preference/preference';
import cancel from '../controllers/payment/cancel/cancel';

router.post("/reserve/:tripId", verifyToken, reserve);
router.post("/capture/", capture);
router.post("/preference/", preference);
router.post("/cancel/", cancel);

export default router;