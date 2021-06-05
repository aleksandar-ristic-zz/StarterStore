import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { Table, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const { loading, error, users } = useSelector(state => state.userList)

	const { userInfo } = useSelector(state => state.userLogin)

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			history.push('/login')
		}
	}, [dispatch])

	const deleteHandler = () => {
		console.log('Mamma mia, deleted!')
	}

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th className='text-center'>ADMIN</th>
							<th className='text-center'>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td className='text-center'>
									{user.isAdmin ? (
										<i className='fas fa-check text-info'></i>
									) : (
										<i className='fas fa-times text-primary'></i>
									)}
								</td>
								<td className='text-center'>
									<LinkContainer to={`/user/${user._id}/edit`} className='mx-1'>
										<Button variant='outline-info' className='btn-sm'>
											<i className='far fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='outline-primary'
										className='btn-sm mx-1'
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default UserListScreen
