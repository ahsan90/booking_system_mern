import { useState, useEffect } from "react";
import { GoTrashcan } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  get_allRoles,
  get_allUsers,
  resetUser,
} from "../../features/user/userSlice";
import { get_allProfiles } from "../../features/profile/profileSlice";
import CustomSpinner from "../../components/CustomSpinner";

import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import UserForm from "../../components/UserForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserComponent from "../../components/userComponent";

function UsersListing() {
  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  const { users, roles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_allUsers());
    dispatch(get_allRoles());
    dispatch(get_allProfiles());
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

  useEffect(() => {
    handleClose();
  }, [users]);
  /* if (isLoading) {
    return <CustomSpinner />;
  } */
  return (
    <>
      <h1>Users Listing</h1>
      <div className="mb-3 justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          + Create A New User
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>
                <FaUser /> Create an user
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <div className="container-fluid justify-content-center">
        <div className="row">
          {users.map((userData) => (
            <div className="col-md-6 col-lg-3 mb-4" key={userData._id}>
              <UserComponent userData={userData} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UsersListing;
