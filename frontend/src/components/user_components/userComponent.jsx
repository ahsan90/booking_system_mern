import { useState, useEffect } from "react";
import { GoTrashcan } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_user } from "../../features/user/userSlice";
import Spinner from "../CustomSpinner";
//import "./admin.css";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import UserForm from "./UserForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserEditForm from "./userEditForm";
import { get_allProfiles } from "../../features/profile/profileSlice";

function UserComponent({ userData }) {
  //let loggedInUser = JSON.parse(localStorage.getItem("user"));
  const { users, roles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(delete_user(id));
      dispatch(get_allProfiles());
    }
  };

  useEffect(() => {
    handleClose();
  }, [users]);

  /*   if (isLoading) {
    return <Spinner />;
  } */
  return (
    <>
      <div className="container-fluid justify-content-center">
        <div className="row">
          <Card className="user-listing-card">
            <Card.Body className="text-dark">
              <img className="avatar" src={userData.avatar} alt="" />
              <Card.Text>Username: {userData.username}</Card.Text>
              <Card.Text>Email: {userData.email}</Card.Text>
              <Card.Link>
                <button onClick={handleShow} className="btn btn-warning">
                  <BiEditAlt />
                </button>
              </Card.Link>
              <Card.Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(userData._id)}
                >
                  <GoTrashcan />
                </button>
              </Card.Link>
              <Card.Link>
                <Link
                  className="btn btn-outline-success"
                  to={`/users/profile/${userData._id}`}
                >
                  <GrView />
                </Link>
              </Card.Link>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>
                  <FaUser /> Edit User
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UserEditForm passedUser={userData} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default UserComponent;
