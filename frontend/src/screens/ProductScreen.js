import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)

	const dispatch = useDispatch()

	const { loading, error, product } = useSelector(state => state.productDetails)

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])
	console.log(product.rating)
	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	return (
		<>
			<Link className='btn btn-outline-info my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2 className='text-light'>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item className='text-secondary'>
								{product.rating && (
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								)}
							</ListGroup.Item>
							<ListGroup.Item className='text-white'>
								Price: <span className='h4'>${product.price}</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>Description:</span>{' '}
								<p className='fw-light'>{product.description}</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong className='text-primary'>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity:</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={e => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map(x => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Row>
										<Button
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add To Cart
										</Button>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
