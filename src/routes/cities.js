import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import id from '../controllers/cities/id';

router.get("/:id/", id);

export default router;