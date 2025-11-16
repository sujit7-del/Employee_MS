import express from 'express'
import { login, verify } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddlware.js'
import { emailVerification, OTPVerification, resetPassword } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddleware, verify)
router.post("/email-verification", emailVerification);
router.post("/OTP-verification", OTPVerification);
router.post("/reset-password", resetPassword);

export default router;