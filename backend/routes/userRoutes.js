import express from 'express'
const router = express.Router()

import {
	authUser,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserProfile,
	deleteUser,
	updateUser,
	getUserById
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.put(protect, admin, updateUser)
	.get(protect, admin, getUserById)

export default router
