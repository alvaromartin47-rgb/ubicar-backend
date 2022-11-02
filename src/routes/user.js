import express from 'express';
const router = express.Router();

import userProfile from '../controllers/user/profile/profile';
import createFakeUser from '../controllers/user/fake/createFakeUser';
import verifyToken from "./verifyToken";

router.get("/profile/", verifyToken, userProfile);
router.post("/fake/", createFakeUser);

export default router;