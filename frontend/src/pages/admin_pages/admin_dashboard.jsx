import { useEffect, useState } from "react";
import "./admin.css";
import { Table, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { get_allUsers, resetUser } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import UsersListing from "../../components/user_components/UserList";
import ReservationList from "../../components/revervation_components/ReservationList";
import { get_all_bookings, resetReservation } from "../../features/reservation/reservationSlice";

function AdminDashboard() {
  const [key, setKey] = useState("users");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.reservation);
  useEffect(() => {
    dispatch(get_allUsers());
    dispatch(get_all_bookings())
    return () => {
      dispatch(resetUser());
      dispatch(resetReservation())
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
                  Manage Profile here!
                </Tab>
                <Tab eventKey="bookings" title="Manage Bookings">
                  <ReservationList />
                </Tab>
                <Tab eventKey="reservations" title="Reservations">
                  Reservations here!
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
