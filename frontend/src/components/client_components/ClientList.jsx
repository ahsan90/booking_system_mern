import { useState } from "react";
import { Modal, Table, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { ClientCreateUpdateForm } from "./ClientCreateUpdateForm";
import moment from "moment";
import { delete_profile } from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";

export default function ClientList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //console.log(profileData._id);

  const dispatch = useDispatch();
  let { profiles } = useSelector((state) => state.profile);
  const onDelete = (profileId) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      dispatch(delete_profile(profileId));
    }
  };
  //console.log(profiles)
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>
              <FaUser /> Update Profile
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <ClientCreateUpdateForm profile={profile} /> */}
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
            {profiles.map((profileData) => (
              <tr key={profileData._id}>
                <td>{profileData.name}</td>
                <td>{profileData.email}</td>
                <td>{profileData.phone}</td>
                <td>{moment(profileData.createdAt).format("LLL")}</td>
                <td>{moment(profileData.updatedAt).format("LLL")}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    style={{ marginRight: "3px" }}
                    to={`/users/profile/${profileData.user.toString()}`}
                  >
                    <AiOutlineEye />
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={handleShow}
                    style={{ marginRight: "3px" }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(profileData._id)}
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
