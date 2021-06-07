import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { Table, Button, Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import {
	listProducts,
	deleteProduct,
	createProduct
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch()

	const { loading, error, products } = useSelector(state => state.productList)

	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete
	} = useSelector(state => state.productDelete)

	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct
	} = useSelector(state => state.productCreate)

	const { userInfo } = useSelector(state => state.userLogin)

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })

		if (!userInfo.isAdmin) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts())
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct
	])

	const deleteHandler = (id, name) => {
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			dispatch(deleteProduct(id))
		}
	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingDelete && <Loader />}
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
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th className='text-center'>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td className='text-center'>
									<LinkContainer
										to={`/admin/product/${product._id}/edit`}
										className='mx-1'
									>
										<Button variant='outline-info' className='btn-sm'>
											<i className='far fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='outline-primary'
										className='btn-sm mx-1'
										onClick={() => deleteHandler(product._id, product.name)}
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

export default ProductListScreen
