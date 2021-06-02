import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const { loading, error, userInfo } = useSelector(state => state.userLogin)

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = e => {
		e.preventDefault()

		dispatch(login(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button className='mt-2' type='submit' variant='primary'>
					SIGN IN
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						{' '}
						Register Here
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen
