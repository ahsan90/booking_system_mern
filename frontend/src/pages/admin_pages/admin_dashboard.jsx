import { useEffect, useState } from "react";
import "./admin.css";
import { Table, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { get_allUsers, resetUser } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import UsersListing from "../../components/user_components/UserList";
import ReservationList from "../../components/reservation_components/ReservationList";
import { get_all_bookings, resetReservation } from "../../features/reservation/reservationSlice";
import { get_allProfiles, resetProfile } from "../../features/profile/profileSlice";
import ClientList from "../../components/client_components/ClientList";

function AdminDashboard() {
  const [key, setKey] = useState("users");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.reservation);
  useEffect(() => {
    dispatch(get_allUsers());
    dispatch(get_all_bookings())
    dispatch(get_allProfiles())
    return () => {
      dispatch(resetUser());
      dispatch(resetReservation())
      dispatch(resetProfile())
    };
  }, [dispatch]);
  //console.log(bookings)
  return (
    <>
      <div>
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
                  <ClientList/>
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
