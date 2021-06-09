import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	)
}

Meta.defaulProps = {
	title: 'StarterStore, your place for electronics | Welcome',
	description: 'We sell best and cheapest products with fastest delivery.',
	keywords:
		'electronics, buy electronics,cheap electronics, fast electronics delivery, easy buy electronics'
}

export default Meta
