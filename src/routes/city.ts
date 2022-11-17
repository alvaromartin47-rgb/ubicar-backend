import express from 'express';
const router = express.Router();

import verifyToken from './verifyToken';
import autocomplete from '../controllers/city/autocomplete/autocomplete';

router.get("/autocomplete/", autocomplete);

export default router;