import express from 'express';
const router = express.Router();

import getProfile from '../controllers/user/profile/getProfile';
import updateProfile from '../controllers/user/profile/updateProfile';
import createFakeUser from '../controllers/user/fake/createFakeUser';
import verifyToken from "./verifyToken";

router.get("/profile/", verifyToken, getProfile);
router.put("/profile/", verifyToken, updateProfile);
router.post("/fake/", createFakeUser);

export default router;