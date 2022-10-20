import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import preview from '../controllers/trip/route/preview/preview';

router.post("/route/preview/", preview);

export default router;