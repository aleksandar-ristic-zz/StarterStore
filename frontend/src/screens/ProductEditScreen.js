import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
//import { PRODUCT_UPDATE_RESET } from '../constants/userConstants'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')

	const dispatch = useDispatch()
	const { loading, error, product } = useSelector(state => state.productDetails)

	useEffect(() => {
		if (!product.name || product._id !== productId) {
			dispatch(listProductDetails(productId))
		} else {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}
	}, [dispatch, product, productId, history])

	const submitHandler = e => {
		e.preventDefault()

		//! UPDATE PRODUCT
	}

	return (
		<>
			<Link
				className='btn btn-outline-info btn-sm my-3'
				to='/admin/productlist'
			>
				<i className='fas fa-arrow-left'></i> Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter product name'
								value={name}
								onChange={e => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price in $'
								value={price}
								onChange={e => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={e => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={e => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter product quantity'
								value={countInStock}
								onChange={e => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={category}
								onChange={e => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={e => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button className='mt-2' type='submit' variant='primary'>
							UPDATE PRODUCT
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
