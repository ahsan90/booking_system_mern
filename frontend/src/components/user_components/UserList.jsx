import { useState, useEffect } from "react";
import { GoTrashcan } from "react-icons/go";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { InputGroup } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate } from "react-router-dom";
import { get_allProfiles } from "../../features/profile/profileSlice";
import CustomSpinner from "../../components/CustomSpinner";

import Card from "react-bootstrap/Card";
import UserForm from "./UserForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserComponent from "./userComponent";
import { get_allUsers, search_users } from "../../features/user/userSlice";
import axios from "axios";

function UsersListing() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchQuery, setSearchQuery] = useState({
    searchText: "",
  });
  const [singleSelections, setSingleSelections] = useState(null);

  useEffect(() => {
    handleClose();
  }, [users]);

  //let { searchText } = searchQuery;
  const handleSearchUsers = (e) => {
    if (e.length > 0) {
      setSearchQuery(() => ({
        searchText: e[0].username,
      }));
    } else {
      dispatch(get_allUsers());
    }
    setSingleSelections(e);
  };

  useEffect(() => {
    if (searchQuery.searchText.length > 0) {
      setTimeout(() => {
        dispatch(search_users(searchQuery.searchText));
      }, 200);
    }
    setSearchQuery(() => ({
      searchText: "",
    }));
  }, [searchQuery.searchText, dispatch]);
  /* if (isLoading) {
    return <CustomSpinner />;
  } */

  return (
    <>
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

      <div className="clientListHead mb-3">
        <h4>Users Listings</h4>
        <InputGroup className="client_search">
          <Typeahead
            clearButton
            id="basic-typeahead-single"
            labelKey={(option) =>
              option ? `${option.username} | ${option.email}` : "nothing"
            }
            onChange={handleSearchUsers}
            options={users}
            placeholder="Search Users..."
            selected={singleSelections}
          />
        </InputGroup>
      </div>
      <hr></hr>
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
