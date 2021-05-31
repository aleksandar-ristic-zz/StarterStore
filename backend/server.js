//! You have to add .js at the end of module path in backend !
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

const PORT = process.env.PORT || 5000
const app = express()

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
