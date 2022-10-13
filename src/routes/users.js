import express from 'express';
const router = express.Router();

import users from '../controllers/users';

router.get("/", users);

export default router;