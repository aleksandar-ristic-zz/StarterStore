//! You have to add .js at the end of module path in backend !
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/database.js'
import products from './data/products.js'

dotenv.config()
connectDB()

const app = express()

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/product/:id', (req, res) => {
	const product = products.find(p => p._id === req.params.id)
	res.json(product)
})

const PORT = process.env.PORT

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
