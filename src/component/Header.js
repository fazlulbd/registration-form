import React from 'react'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg"> 
      <Container>
        <Navbar.Brand href="home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="signe in /sign up" id="basic-nav-dropdown">
              <NavDropdown.Item href="registration">Registration</NavDropdown.Item>
              <NavDropdown.Item href="login">Login</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header
