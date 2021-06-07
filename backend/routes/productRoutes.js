import express from 'express'
const router = express.Router()

import {
	getProducts,
	getProductDetails,
	deleteProduct,
	updateProduct,
	createProduct
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)

router
	.route('/:id')
	.get(getProductDetails)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default router
