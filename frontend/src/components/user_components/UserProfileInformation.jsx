import React from 'react'
import { Row, Card, Col, Table } from 'react-bootstrap'
import moment from 'moment'

function UserProfileInformation({singleUserDetails}) {
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
            No profile information found for this user{" "}
            <button className="btn btn-success">Create Profile</button>
          </p>
        )}
      </Row>
    </>
  );
}

export default UserProfileInformation