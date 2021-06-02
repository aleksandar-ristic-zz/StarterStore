import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
	const [show, setShow] = useState(true)

	return (
		<Alert show={show} className='alert-dismissible' variant={variant}>
			<button
				className='btn-close btn-set'
				onClick={() => setShow(false)}
			></button>
			{children}
		</Alert>
	)
}

Message.defaultProps = {
	variant: 'info'
}

export default Message
