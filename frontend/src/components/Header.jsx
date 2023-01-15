import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import { AiOutlineApi } from "react-icons/ai"
import { FiDatabase } from "react-icons/fi";
import { MdApi } from "react-icons/md";
import { GrUserSettings, GrDashboard } from "react-icons/gr";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, resetAuth } from "../features/auth/authSlice";
import ROLES from "../helper/allowedRoles";
import {
  resetUser,
  seed_data,
  reset_data,
  get_allUsers,
} from "../features/user/userSlice";
import {
  get_allProfiles,
  resetProfile,
} from "../features/profile/profileSlice";
import {
  get_all_bookings,
  resetReservation,
} from "../features/reservation/reservationSlice";
import decode from "jwt-decode";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import CustomSpinner from "./CustomSpinner";
//import Button from 'react-bootstrap/Button'

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);
  const { isLoading, users, isSeeded, isReset, message } = useSelector(
    (state) => state.user
  );
  const [loginExpired, setLoginExpired] = useState(false);
  const token = loggedInUser ? loggedInUser?.token : null;

  useEffect(() => {
    if (isSeeded) {
      
      toast.success(message?.message);
      dispatch(get_allUsers());
      dispatch(get_all_bookings());
      dispatch(get_allProfiles());
    }
    if (isReset) {
      dispatch(logout());
      dispatch(resetAuth());
      dispatch(resetUser());
      dispatch(resetProfile());
      dispatch(resetReservation());
      toast.success(message?.message);
      navigate("/login");
    }

    if (token !== null) {
      const decodedToken = decode(token);
      const isExpired = decodedToken.exp * 1000 < new Date().getTime();
      if (isExpired) {
        //const decodedToken = decode(token);
        dispatch(resetAuth());
        dispatch(resetUser());
        dispatch(resetProfile());
        dispatch(resetReservation());
        toast.error(
          "Your login session expired! Please Login again to continue..."
        );
        dispatch(logout());
        setLoginExpired(true);
        navigate("/login");
      }
      if (!isExpired) {
        setLoginExpired(false);
      }
    }

    /* if (!token) {
      dispatch(resetAuth());
      dispatch(resetUser());
      dispatch(resetProfile());
      dispatch(resetReservation());
      navigate("/login");
    } */
  }, [token, isSeeded, isReset, loginExpired, dispatch, navigate]);

  const onLogout = () => {
    dispatch(resetAuth());
    dispatch(resetUser());
    dispatch(resetProfile());
    dispatch(resetReservation());
    dispatch(logout());
    //setLoginSessionExpired(false);
    navigate("/login");
  };

  const handleSeedData = () => {
    dispatch(seed_data());
  };

  const handleResetData = (e) => {
    if (
      window.confirm(
        "Are you sure (this will wipe out the data and reset with built-in user/profile. You will be logged out...!)?"
      )
    ) {
      dispatch(reset_data());
    }
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
                <NavLink to="/" className={({ isActive }) =>
                  isActive ? "nav-link active text-center" : "nav-link text-center"
                }
                  aria-current="page">
                  <FaHome /> Home
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/about" className={({ isActive }) =>
                  isActive ? "nav-link active text-center" : "nav-link text-center"
                }
                  aria-current="page">
                  About
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/api_docs" className={({ isActive }) =>
                  isActive ? "nav-link nab_item active text-center" : "nav-link text-center"
                }
                  aria-current="page">
                  <AiOutlineApi /> API_Docs
                </NavLink>
              </Nav.Link>
              {!loggedInUser && (
                <Nav.Link>
                  <NavLink to="/register" className={({ isActive }) =>
                    isActive ? "nav-link active text-center" : "nav-link text-center"
                  }
                    aria-current="page">
                    <FaUser /> Register
                  </NavLink>
                </Nav.Link>
              )}

              {loggedInUser && (
                <>
                  {loggedInUser.role === ROLES.Admin && (
                    <Nav.Link>
                      <NavLink to="/admin/users" className={({ isActive }) =>
                        isActive ? "nav-link active text-center" : "nav-link text-center"
                      }
                        aria-current="page">
                        <GrDashboard /> Admin Pannel
                      </NavLink>
                    </Nav.Link>
                  )}

                  <NavDropdown
                    title={loggedInUser?.username}
                    id="basic-nav-dropdown"
                    style={{textAlign: 'center', marginTop: '7px'}}
                    aria-current="page"
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-center" : "nav-link text-center"
                    }
                  >
                    {loggedInUser?.role === ROLES.Client && (
                      <NavDropdown.Item>
                        <NavLink
                          to={`/users/profile/${loggedInUser._id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <GrDashboard /> Dashboard
                        </NavLink>
                      </NavDropdown.Item>
                    )}

                    {loggedInUser?.role === ROLES.Admin && (
                      <>
                        <NavDropdown.Item>
                          <Link
                            to={`/users/profile/${loggedInUser._id}`}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <FaUser /> Profile
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleResetData}>
                          <BiReset /> Reset Data
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleSeedData}>
                          <FiDatabase /> Seed Dummy Data
                        </NavDropdown.Item>
                      </>
                    )}

                    <NavDropdown.Divider />
                    {loggedInUser?.role === ROLES.Admin && (
                      <NavDropdown.Item>
                        <Link
                          to="/api_docs"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <MdApi /> API_Docs
                        </Link>
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item onClick={onLogout}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!loggedInUser && (
                <>
                  <Nav.Link>
                    <NavLink to="/login" className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                      aria-current="page">
                      <FaSignInAlt /> Login
                    </NavLink>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
}

export default Header;
