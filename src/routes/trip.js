import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import preview from '../controllers/trip/route/preview/preview';
import check from '../controllers/trip/check/check';
import id from '../controllers/trip/id';
import reserve from '../controllers/trip/reserve/reserve';
import accept from '../controllers/trip/accept/accept';

router.post("/route/preview/", preview);
router.post("/check/:id/", check);
router.put("/:id/", verifyToken, id);
router.put("/reserve/:id", verifyToken, reserve);
router.put("/accept/:id", accept);

export default router;