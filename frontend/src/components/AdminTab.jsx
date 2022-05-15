import { useState } from "react";
import { Table, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import UsersListing from "./user_components/UserList";

function AdminTab(prop) {
    const [key, setKey] = useState("users");
  return (
    <div>
      <h1>Welcome to Admin Pannel</h1>
      <div>
        <Row>
          <Col xs={12} md={12} className="">
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
              <Tab eventKey="users" title="Manage Users">
                <UsersListing />
              </Tab>
              <Tab eventKey="clients" title="Manage Clients">
                Manage Profile here!
              </Tab>
              <Tab eventKey="bookings" title="Manage Booking">
                Manage Bookings!
              </Tab>
              <Tab eventKey="reservations" title="Reservations">
                Reservations here!
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AdminTab;
