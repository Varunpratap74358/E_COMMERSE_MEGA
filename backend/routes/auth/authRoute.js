import express from 'express'
import { authMiddleware, getUser, login, logout, registerUser } from '../../controllers/auth/authController.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',login)
router.get('/logout',logout)
router.get('/check-auth',authMiddleware,getUser)

export default router