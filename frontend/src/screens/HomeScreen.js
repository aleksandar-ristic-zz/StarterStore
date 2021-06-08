import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword

	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const { loading, products, error, page, pages } = useSelector(
		state => state.productList
	)

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
