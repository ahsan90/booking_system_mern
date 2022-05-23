import {useState, useEffect} from 'react'
import { Row, Card, Col, Table, Button, Modal } from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'
import moment from 'moment'
import ClientProfileForm from '../client_components/ClientProfileForm';

function UserProfileInformation({ singleUserDetails }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row>
        <Col xs={12}>
          <Card
            className=""
            style={{
              minWidth: "250px",
              textAlign: "center",
              backgroundColor: "#e6e2de",
              boxShadow: "3px 3px black",
            }}
          >
            <Card.Body className="text-dark">
              <img className="" src={singleUserDetails?.avatar} alt="" />
              <Card.Text className="mt-2">
                <b>Username:</b> {singleUserDetails?.username}
              </Card.Text>
              <Card.Text>
                <b>Email:</b> {singleUserDetails?.email}
              </Card.Text>
              <Card.Text>
                <b>Role:</b> {singleUserDetails?.role?.roletype}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <h2>Profile Information</h2>
        {singleUserDetails?.profile ? (
          <Card>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Created At</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{singleUserDetails.profile.name}</td>
                  <td>{singleUserDetails.profile.phone}</td>
                  <td>
                    {moment(singleUserDetails.profile.createdAt).format("LLL")}
                  </td>
                  <td>
                    {moment(singleUserDetails.profile.updatedAt).format("LLL")}
                  </td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        ) : (
          <p>
            <div className="mb-3 justify-content-center">
              No profile information found{" "}
              <Button variant="success" onClick={handleShow}>
                + Create A New User
              </Button>
              <Modal show={show} onHide={handleClose} style={{minWidth: '80%'}}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h1>
                      <FaUser /> Create Profile
                    </h1>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ClientProfileForm />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </div>
          </p>
        )}
      </Row>
    </>
  );
}

export default UserProfileInformation