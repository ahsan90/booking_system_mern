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
import ROLES from "../helper/allowedRoles";
import { resetUser } from "../features/user/userSlice";
import { resetProfile } from "../features/profile/profileSlice";
import { resetReservation } from "../features/reservation/reservationSlice";
//import Button from 'react-bootstrap/Button'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(resetAuth());
    dispatch(resetUser())
    dispatch(resetProfile())
    dispatch(resetReservation())
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ marginBottom: "" }}>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nab_item">
              Booking System
            </Link>
          </Navbar.Brand>
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
                  {loggedInUser.role === ROLES.Admin && (
                    <Nav.Link>
                      <Link to="/admin" className="nab_item">
                        <GrDashboard /> Admin Pannel
                      </Link>
                    </Nav.Link>
                  )}
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
