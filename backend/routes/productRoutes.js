import express from 'express'
const router = express.Router()

import {
	getProducts,
	getProductDetails
} from '../controllers/productController.js'

router.route('/').get(getProducts)

router.route('/:id').get(getProductDetails)

export default router
