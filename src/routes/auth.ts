import express from 'express';
const router = express.Router();

import googleAuth from '../controllers/auth/google/signin/googleAuth';
import googleAuthSuccess from '../controllers/auth/google/signin/success/googleAuthSuccess';

router.get("/google/signin/", googleAuth);
router.get("/google/signin/success/", googleAuthSuccess);

export default router;