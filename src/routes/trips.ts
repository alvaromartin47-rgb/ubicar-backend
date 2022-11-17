import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import search from '../controllers/trips/search/search';

router.post("/search/", search);

export default router;