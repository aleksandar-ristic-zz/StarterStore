import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.userLogin)

	useEffect(() => {})

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<header>
			<Navbar bg='secondary' variant='secondary' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>
							<Image src='./images/logo.svg' />
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mla'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>
											<i className='far fa-user'></i> Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										<i className='fas fa-sign-out-alt text-danger'></i> Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>
											<i className='fas fa-users'></i> Users
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>
											<i className='fas fa-store text-warning'></i> Products
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>
											<i className='fas fa-gifts text-info'></i> Orders
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
