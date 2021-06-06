import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()
	const { loading, error, user } = useSelector(state => state.userDetails)

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId))
		} else {
			setName(user.name)
			setEmail(user.email)
			setIsAdmin(user.isAdmin)
		}
	}, [dispatch, user, userId])

	const submitHandler = e => {
		e.preventDefault()
	}

	return (
		<>
			<Link className='btn btn-outline-info btn-sm my-3' to='/admin/userlist'>
				<i className='fas fa-arrow-left'></i> Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Your Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Your Name'
								value={name}
								onChange={e => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group className='pt-2' controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={e => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button className='mt-2' type='submit' variant='primary'>
							UPDATE USER
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default UserEditScreen
