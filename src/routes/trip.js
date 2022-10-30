import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import preview from '../controllers/trip/route/preview/preview';
import check from '../controllers/trip/check/check';
import id from '../controllers/trip/id';

router.post("/route/preview/", preview);
router.post("/check/:id/", check);
router.put("/:id/", id);

export default router;