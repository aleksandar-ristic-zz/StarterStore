import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'

import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
	const dispatch = useDispatch()

	const { loading, error, products } = useSelector(
		state => state.productTopRated
	)

	useEffect(() => {
		dispatch(listTopProducts())
	}, [dispatch])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-secondary mb-4'>
			{products.map(product => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h5 className='text-primary'>{product.name}</h5>
							<h3 className='text-primary'>${product.price}</h3>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
