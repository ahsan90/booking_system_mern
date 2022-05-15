import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { GrUserSettings, GrDashboard } from "react-icons/gr";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

import { Link } from "react-router-dom";
//import Button from 'react-bootstrap/Button'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Booking System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container justify-content-end">
              <Nav.Link>
                <Link to="/">
                  <FaHome /> Home
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/about">About</Link>
              </Nav.Link>
              {user && (
                <>
                  <Nav.Link>
                    <Link to="/admin">
                      <GrDashboard /> Admin Pannel
                    </Link>
                  </Nav.Link>
                  <NavDropdown title={user.username} id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <GrUserSettings /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/">
                      <GrDashboard /> Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onLogout}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!user && (
                <>
                  <Nav.Link>
                    <Link to="/login">
                      <FaSignInAlt /> Login
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
