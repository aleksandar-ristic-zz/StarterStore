import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userUpdateProfile } from '../actions/userActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const { loading, error, user } = useSelector(state => state.userDetails)

	const { userInfo } = useSelector(state => state.userLogin)

	const { success } = useSelector(state => state.userUpdateProfile)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [history, userInfo, dispatch, setName, setEmail, user])

	const submitHandler = e => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(userUpdateProfile({ id: user._id, name, email, password }))
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && (
					<Message variant='success'>Profile updated successfully</Message>
				)}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Your Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Your Name'
							value={name}
							onChange={e => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Repeat password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button className='mt-2' type='submit' variant='primary'>
						UPDATE
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
