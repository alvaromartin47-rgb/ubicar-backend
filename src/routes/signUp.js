import express from 'express';
const router = express.Router();

import signUp from '../controllers/signUp';

router.post("/", signUp);

export default router;