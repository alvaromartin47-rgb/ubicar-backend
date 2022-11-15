import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import preference from '../controllers/reservation/preference/preference';

router.post("/preference/", verifyToken, preference);

export default router;