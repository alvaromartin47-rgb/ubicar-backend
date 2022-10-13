import express from 'express';
const router = express.Router();

import getCards from '../controllers/getCards';
import addCard from '../controllers/addCard';
import verifyToken from './verifyToken';

router.get("/", verifyToken, getCards);
router.post("/", verifyToken, addCard);

export default router;