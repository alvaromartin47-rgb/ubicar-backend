import express from 'express';
const router = express.Router();

import userProfile from '../controllers/userProfile';

router.get("/profile/", userProfile);

export default router;