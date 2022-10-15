import express from 'express';
const router = express.Router();

import userProfile from '../controllers/userProfile';
import verifyToken from "./verifyToken";

router.get("/profile/", verifyToken, userProfile);

export default router;