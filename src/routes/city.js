import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import preview from '../controllers/city/autocomplete/autocomplete';

router.get("/autocomplete/", preview);

export default router;