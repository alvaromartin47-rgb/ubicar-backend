import express from 'express'

import googleAuth from '../controllers/auth/google/signin/googleAuth'
import googleAuthSuccess from '../controllers/auth/google/signin/success/googleAuthSuccess'
const router = express.Router()

router.get('/google/signin/', googleAuth)
router.get('/google/signin/success/', googleAuthSuccess)

export default router
