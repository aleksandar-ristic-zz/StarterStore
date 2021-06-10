import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {
	listProductDetails,
	createProductReview
} from '../actions/productActions'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)

	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const { loading, error, product } = useSelector(state => state.productDetails)

	const { success: successProductReview, error: errorProductReview } =
		useSelector(state => state.productCreateReview)

	const { userInfo } = useSelector(state => state.userLogin)

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted!')
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}

		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match, successProductReview])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	const submitHandler = e => {
		e.preventDefault()
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment
			})
		)
	}

	return (
		<>
			<Link className='btn btn-outline-info btn-sm my-3' to='/'>
				<i className='fas fa-arrow-left'></i> Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
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
									<span className='text-light'>Description:</span>{' '}
									<p className='fw-light text-muted'>{product.description}</p>
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col className='text-light'>Price:</Col>
											<Col>
												<strong className='text-primary'>
													${product.price}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col className='text-light'>Status:</Col>
											<Col>
												{product.countInStock > 0 ? (
													<i className='fas fa-check text-info'></i>
												) : (
													<i className='fas fa-times text-danger'></i>
												)}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col className='text-light'>Quantity:</Col>
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
					<Row>
						<Col md={6} className='py-3'>
							<h2>Reviews</h2>
							{errorProductReview && (
								<Message variant='danger'>{errorProductReview}</Message>
							)}
							{product.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup>
								{product.reviews.map(review => (
									<ListGroup.Item key={review._id}>
										<strong className='text-light'>{review.name}</strong>
										<Rating value={review.rating}></Rating>
										<p className='text-muted'>
											{review.createdAt.substring(0, 10)}
										</p>
										<p className='text-light'>{review.comment}</p>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
						<Col md={6} className='py-3'>
							<h2 className='text-light'>Write Your Own Review</h2>
							<ListGroup>
								<ListGroup.Item>
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label className='text-light'>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={e => setRating(e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group>
												<Form.Label className='text-light mt-2'>
													Comment
												</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={e => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button className='mt-2' type='submit' variant='info'>
												SUBMIT
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>sign in</Link> to write a review.
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
