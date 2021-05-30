import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ({ match }) => {
	const product = products.find(p => p._id.toString() === match.params.id)

	return (
		<>
			<Link className='btn btn-outline-info my-3' to='/'>
				Go Back
			</Link>
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
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item className='text-white'>
							Price: <span className='h4'>${product.price}</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<span className='lead'>Description:</span>{' '}
							<p className='text-weight-light'>{product.description}</p>
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

							<ListGroup.Item>
								<Row>
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen
