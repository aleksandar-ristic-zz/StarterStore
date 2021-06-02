import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const { loading, error, userInfo } = useSelector(state => state.userRegister)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = e => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(register(name, email, password))
			setMessage('Account registered successfully')
		}
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{!error && message && (
				<Message
					variant={message.startsWith('Passwords') ? 'danger' : 'success'}
				>
					{message}
				</Message>
			)}
			{loading && <Loader />}
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
					SIGN UP
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have account?
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						{' '}
						Login Here
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
