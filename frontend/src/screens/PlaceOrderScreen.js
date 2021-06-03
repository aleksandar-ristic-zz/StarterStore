import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch()

	let {
		shippingAddress,
		cartItems,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice
	} = useSelector(state => state.cart)

	//* Calculate Prices
	const SHIPPING_MIN = 200

	const addDecimals = num => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	shippingPrice = addDecimals(itemsPrice < SHIPPING_MIN ? 20 : 0)
	taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
	totalPrice = addDecimals(
		Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
	)

	const { order, success, error } = useSelector(state => state.orderCreate)

	useEffect(() => {
		if (success) {
			history.pushState(`/order/${order._id}`)
			// eslint-disable-next-line
		}
	}, [history, success])

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice
			})
		)
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{`${shippingAddress.address}, ${shippingAddress.postalCode}
								${shippingAddress.city}, ${shippingAddress.country}`}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.lenght === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>
										Shipping<span className='text-muted'>*</span>{' '}
									</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Button
										type='button'
										className='btn-block'
										disabled={cartItems === 0}
										onClick={placeOrderHandler}
									>
										ORDER NOW
									</Button>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
					<p className='text-muted'>
						*Shipping is free for orders over ${SHIPPING_MIN}
					</p>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
