import { useEffect, useState } from "react";
import "./admin.css";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import {
  get_allRoles,
  get_allUsers,
  resetUser,
} from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import UsersListing from "../../components/user_components/UserList";
import ReservationList from "../../components/reservation_components/ReservationList";
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
  useEffect(() => {
    dispatch(get_allRoles());
  }, []);
/* 
  useEffect(() => {
    //dispatch(get_allRoles());
  }, []);

  useEffect(() => {
    //dispatch(get_allUsers());
    //dispatch(get_all_bookings());
    //(get_allProfiles());
      return () => {
      //dispatch(resetUser());
      //dispatch(resetReservation());
      //dispatch(resetProfile());
    }; 
  }, []);
 */
  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Pannel</h1>
      <Row>
        <Col xs={12} md={12} className="">
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
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
  );
}

export default AdminDashboard;
