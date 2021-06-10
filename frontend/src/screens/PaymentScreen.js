import React, { useState } from 'react'

import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
	const { shippingAddress } = useSelector(state => state.cart)

	if (!shippingAddress) {
		history.push('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const dispatch = useDispatch()

	const submitHandler = e => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1 className='mb-4'>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label className='text-info h4'>Please select one:</Form.Label>
				</Form.Group>
				<Col>
					<Form.Check
						className='my-2'
						type='radio'
						label='Paypal or Credit Card'
						id='PayPal'
						name='paymentMethod'
						value='Paypal'
						checked
						onChange={e => setPaymentMethod(e.target.value)}
					></Form.Check>
					<Form.Check
						type='radio'
						label='Stripe'
						id='Stripe'
						name='paymentMethod'
						value='Stripe'
						title='Will be coming soon...'
						disabled
						onChange={e => setPaymentMethod(e.target.value)}
					></Form.Check>
				</Col>

				<Button className='mt-2' type='submit' variant='primary'>
					CONTINUE
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
