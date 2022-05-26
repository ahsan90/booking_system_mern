import { useState, useEffect } from "react";
import { Row, Card, Col, Table, Button, Modal } from "react-bootstrap";
import { FaEdit, FaUser } from "react-icons/fa";
import moment from "moment";
import ClientProfileForm from "../client_components/ClientProfileForm";
import ClientCreateUpdateForm from "../client_components/ClientCreateUpdateForm";
import { BiTrash } from "react-icons/bi";
import CustomSpinner from "../CustomSpinner";
import { useSelector, useDispatch } from "react-redux";
import {get_allProfiles, get_profile, reset} from '../../features/profile/profileSlice'

function UserProfileInformation({ singleUserDetails }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //console.log(singleUserDetails?.profile?._id);

  const dispatch = useDispatch()
  let { profile, profiles, isError, message } = useSelector((state) => state.profile)
  useEffect(() => {
    if (singleUserDetails?.profile?._id) {
      dispatch(get_profile(singleUserDetails?.profile?._id));
    }
    return () => {
      dispatch(reset())
    }
  }, [singleUserDetails, dispatch])
  
  useEffect(() => {
    handleClose()
  },[profile])
  //console.log(profile)
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
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2>
                    <FaUser /> Update Profile
                  </h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ClientCreateUpdateForm profile={profile} />
              </Modal.Body>
            </Modal>
            <Card>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{profile?.name}</td>
                    <td>{profile?.email}</td>
                    <td>{profile?.phone}</td>
                    <td>
                      {moment(profile?.createdAt).format(
                        "LLL"
                      )}
                    </td>
                    <td>
                      {moment(profile?.updatedAt).format(
                        "LLL"
                      )}
                    </td>
                    <td>
                      <button className="btn btn-warning" onClick={handleShow}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-danger">
                        <BiTrash />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </>
        ) : (
          <p>
            <div className="mb-3 justify-content-center">
              No profile information found{" "}
              <Button variant="success" onClick={handleShow}>
                + Create A New User
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                style={{ minWidth: "80%" }}
              >
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
              </Modal>
            </div>
          </p>
        )}
      </Row>
    </>
  );
}

export default UserProfileInformation;
