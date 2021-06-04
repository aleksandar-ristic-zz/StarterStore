import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Alert
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
	const SHIPPING_MIN = 200
	const orderId = match.params.id
	const dispatch = useDispatch()

	const { loading, error, order } = useSelector(state => state.orderDetails)

	if (!loading) {
		// Calculate prices
		const addDecimals = num => {
			return (Math.round(num * 100) / 100).toFixed(2)
		}

		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		)
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId))
	}, [dispatch, orderId])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>

			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name:</strong> {order.user.name}
							</p>
							<p>
								<strong>Email:</strong>{' '}
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address: </strong>
								{`${order.shippingAddress.address}, ${order.shippingAddress.postalCode}
								${order.shippingAddress.city}, ${order.shippingAddress.country}`}
							</p>
							{order.isDelivered ? (
								<Alert variant='info'>Delivered on {order.deliveredAt}</Alert>
							) : (
								<Alert variant='primary'>Not delivered</Alert>
							)}

							<hr />
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Alert variant='info'>Paid on {order.paidAt}</Alert>
							) : (
								<Alert variant='primary'>Not paid</Alert>
							)}

							<hr />
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.lenght === 0 ? (
								<Message>Your order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
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
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>
										Shipping<span className='text-muted'>*</span>
									</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
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

export default OrderScreen
