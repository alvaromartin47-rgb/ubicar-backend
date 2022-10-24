import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import preview from '../controllers/trip/route/preview/preview';
import id from '../controllers/trip/id';

router.post("/route/preview/", preview);
router.put("/:id/", id);

export default router;