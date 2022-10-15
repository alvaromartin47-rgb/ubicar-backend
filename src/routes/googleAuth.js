import express from 'express';
const router = express.Router();

import googleAuth from '../controllers/googleAuth';
import googleAuthSuccess from '../controllers/googleAuthSuccess';

router.get("/", googleAuth);
router.get("/success/", googleAuthSuccess);

export default router;