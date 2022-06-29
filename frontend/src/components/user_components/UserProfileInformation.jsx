import { useState, useEffect } from "react";
import { Row, Card, Col, Table, Button, Modal, Spinner } from "react-bootstrap";
import { FaEdit, FaUser } from "react-icons/fa";
import moment from "moment";
import ClientProfileForm from "../client_components/ClientProfileForm";
import ClientCreateUpdateForm from "../client_components/ClientCreateUpdateForm";
import { BiTrash } from "react-icons/bi";
import CustomSpinner from "../CustomSpinner";
import { useSelector, useDispatch } from "react-redux";
import { delete_profile } from "../../features/profile/profileSlice";
import { get_user, resetUser } from "../../features/user/userSlice";
import { useParams } from "react-router-dom";

function UserProfileInformation() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //console.log(singleUserDetails?.profile?._id);

  const dispatch = useDispatch();
  let { profile } = useSelector((state) => state.profile);
  const { singleUserDetails } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    handleCloseEdit();
    handleClose();
    dispatch(get_user(id));
  }, [profile, id, dispatch]);

  const onDelete = (profileId) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      dispatch(delete_profile(profileId));
    }
  };

  return (
    <>
      {singleUserDetails ? (
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
                <Modal show={showEdit} onHide={handleCloseEdit}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h2>
                        <FaUser /> Update Profile
                      </h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ClientCreateUpdateForm
                      profile={singleUserDetails?.profile}
                    />
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
                        <td>{singleUserDetails?.profile?.name}</td>
                        <td>{singleUserDetails?.profile?.email}</td>
                        <td>{singleUserDetails?.profile?.phone}</td>
                        <td>
                          {moment(singleUserDetails?.profile?.createdAt).format(
                            "LLL"
                          )}
                        </td>
                        <td>
                          {moment(singleUserDetails?.profile?.updatedAt).format(
                            "LLL"
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={handleShowEdit}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              onDelete(singleUserDetails?.profile?._id)
                            }
                          >
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
                    + Create profile information
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
      ) : (
        <>
          <CustomSpinner />
        </>
      )}
    </>
  );
}

export default UserProfileInformation;
