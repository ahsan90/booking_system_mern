import {FaSignInAlt, FaSignOutAlt, FaUser, FaHome} from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <div>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Booking System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="container justify-content-end">
                    <Nav.Link href="/"><FaHome/> Home</Nav.Link>
                    <Nav.Link href="/login"><FaSignInAlt /> Login</Nav.Link>
                    <Nav.Link href="/logout"><FaSignOutAlt/> Logout</Nav.Link>
                    <Nav.Link href="/create_user"><FaUser/> Create User</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header