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
import { useNavigate } from "react-router-dom";
import ROLES from "../../helper/util";

function AdminDashboard() {
  const [key, setKey] = useState("users");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
    if (loggedInUser && loggedInUser.role !== ROLES.Admin) {
      navigate("/unauthorized");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
      dispatch(get_allUsers());
      dispatch(get_all_bookings());
      dispatch(get_allProfiles());
      dispatch(get_allRoles());
    return () => {
      dispatch(resetUser());
      dispatch(resetReservation());
      dispatch(resetProfile());
    };
  }, [ dispatch]);

  return (
    <>
      <div className="admin-dashboard">
        <h1>Welcome to Admin Pannel</h1>
        <div>
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
                <Tab eventKey="clients" title="Manage Clients">
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
