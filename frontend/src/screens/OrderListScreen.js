import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { Table, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const { loading, error, orders } = useSelector(state => state.orderList)

	const { userInfo } = useSelector(state => state.userLogin)

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo])

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th className='text-center'>PAID</th>
							<th className='text-center'>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td className='text-center'>
									{order.isPaid ? (
										<span className='text-info'>
											order.paiAt.substring(0, 10)
										</span>
									) : (
										<i className='fas fa-times text-primary'></i>
									)}
								</td>
								<td className='text-center'>
									{order.isDelivered ? (
										<span className='text-info'>
											order.deliveredAt.substring(0, 10)
										</span>
									) : (
										<i className='fas fa-times text-primary'></i>
									)}
								</td>
								<td className='text-center'>
									<LinkContainer to={`/order/${order._id}`} className='mx-1'>
										<Button variant='outline-info' className='btn-sm'>
											<i className='fas fa-eye'></i>
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default OrderListScreen
