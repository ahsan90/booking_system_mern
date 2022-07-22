import { useEffect, useState } from "react";
import "./admin.css";
import { Table, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import {
  get_allRoles,
  get_allUsers,
  resetUser,
} from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import UsersListing from "../../components/user_components/UserList";
import ReservationList from "../../components/reservation_components/ReservationList";
import {
  get_all_bookings,
  resetReservation,
} from "../../features/reservation/reservationSlice";
import {
  get_allProfiles,
  resetProfile,
} from "../../features/profile/profileSlice";
import ClientList from "../../components/client_components/ClientList";
import CustomSpinner from "../../components/CustomSpinner";
import Spinner from "react-bootstrap/Spinner";

function AdminDashboard() {
  const [key, setKey] = useState("users");
  const dispatch = useDispatch();
  const { isSeeding } = useSelector((state) => state.user);

  /*   useEffect(() => {
    if (loggedInUser.role !== ROLES.Admin) {
      navigate("/unauthorized");
    }
  }, [loggedInUser, navigate]); */

  useEffect(() => {
    dispatch(get_allRoles());
  }, []);

  useEffect(() => {
    dispatch(get_allUsers());
    //dispatch(get_all_bookings());
    dispatch(get_allProfiles());
    return () => {
      dispatch(resetUser());
      //dispatch(resetReservation());
      dispatch(resetProfile());
    };
  }, [dispatch]);

  return (
    <>
      <div className="admin-dashboard">
        {isSeeding === true && (
          <div className="seed_data_loading" style={{ opacity: 1 }}>
            <p className="">Loading Seed Data....</p>
            <Spinner animation="border" role="status" variant="dark" style={{ opacity: 1 }}>
              <span className="visually-hidden">Loading....</span>
            </Spinner>
          </div>
        )}

        <div style={{ opacity: isSeeding ? 0.5 : 1 }}>
          <h1>Welcome to Admin Pannel</h1>
          <Row>
            <Col xs={12} md={12} className="">
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="users" title="Manage Users">
                  <UsersListing />
                </Tab>
                <Tab eventKey="clients" title="Manage Users Profiles">
                  <ClientList />
                </Tab>
                <Tab eventKey="bookings" title="Manage Bookings">
                  <ReservationList />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
