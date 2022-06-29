import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { GrUserSettings, GrDashboard } from "react-icons/gr";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, resetAuth } from "../features/auth/authSlice";

import { Link } from "react-router-dom";
//import Button from 'react-bootstrap/Button'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetAuth());
    navigate("/login");
  };

  return (
    <div style={{ marginBottom: "60px" }}>
      <Navbar bg="dark" expand="lg" fixed='top' variant="dark">
        <Container>
          <Navbar.Brand href="/">Booking System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container justify-content-end">
              <Nav.Link>
                <Link to="/" className="nab_item">
                  <FaHome /> Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/about" className="nab_item">
                  About
                </Link>
              </Nav.Link>
              {!loggedInUser && (
                <Nav.Link>
                  <Link to="/register" className="nab_item">
                    <FaUser /> Register
                  </Link>
                </Nav.Link>
              )}

              {loggedInUser && (
                <>
                  <Nav.Link>
                    <Link to="/admin" className="nab_item">
                      <GrDashboard /> Admin Pannel
                    </Link>
                  </Nav.Link>
                  <NavDropdown
                    title={loggedInUser.username}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link
                        to={`/users/profile/${loggedInUser._id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <GrUserSettings /> Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Link
                        to={`/users/profile/${loggedInUser._id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <GrDashboard /> Dashboard
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onLogout}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!loggedInUser && (
                <>
                  <Nav.Link>
                    <Link to="/login" className="nab_item">
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
