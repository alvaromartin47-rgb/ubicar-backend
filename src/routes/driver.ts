import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import transports from '../controllers/driver/transports/transports.js';

router.get("/transports/", transports);

export default router;