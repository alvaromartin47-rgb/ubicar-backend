import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import id from '../controllers/transports/id';

router.put("/:id/", id);

export default router;