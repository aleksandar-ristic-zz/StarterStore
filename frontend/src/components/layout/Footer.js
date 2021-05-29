import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p className="text-muted">
              Built under MIT license by Aleksandar Ristić  
            </p>
            <p className="text-muted">
              Copyright &copy; StarterStore
            </p>
          </Col>
        </Row>
      </Container>
      Footer
    </footer>
  )
}

export default Footer
