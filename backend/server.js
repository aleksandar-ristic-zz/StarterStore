const express = require('express')
const products = require('./data/products')

const app = express()
const PORT = 5000

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/product/:id', (req, res) => {
	const product = products.find(p => p._id === req.params.id)
	res.json(product)
})

app.listen(PORT, console.log(`Server running on port ${PORT}`))
