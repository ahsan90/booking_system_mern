import { useEffect, useState } from "react";
import { Modal, Table, Card, Button, InputGroup, Form } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import ClientCreateUpdateForm from "./ClientCreateUpdateForm";
import moment from "moment";
import {
  delete_profile,
  get_allProfiles,
  search_profiles,
} from "../../features/profile/profileSlice";
import { Link } from "react-router-dom";
import { get_allUsers } from "../../features/user/userSlice";

export default function ClientList() {
  const [userProfile, setUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    searchText: "",
  });
  const [singleSelections, setSingleSelections] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showClientForm, setShowClientForm] = useState(false);
  const handleShowClientForm = () => setShowClientForm(true);
  const handleCloseClientForm = () => setShowClientForm(false);

  const dispatch = useDispatch();
  let { profile, profiles } = useSelector((state) => state.profile);

  const onDelete = (profileId) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      dispatch(delete_profile(profileId));
    }
  };

  useEffect(() => {
    if (profile) {
      //dispatch(get_allProfiles());
      //dispatch(get_allUsers());
      handleClose();
      handleCloseClientForm();
    }
  }, [profile, dispatch]);

  const onEdit = (profileObj) => {
    setUserProfile(profileObj);
    handleShow();
  };

  const addClient = () => {
    handleShowClientForm();
  };
  let { searchText } = searchQuery;
  const handleSearchProfiles = (e) => {
    if (e.length > 0) {
      setSearchQuery((prevState) => ({
        ...prevState,
        searchText: e[0].email,
      }));
    } else {
      dispatch(get_allProfiles());
    }
    setSingleSelections(e);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      setTimeout(() => {
        dispatch(search_profiles(searchText));
      }, 200);
    }
    setSearchQuery(() => ({
      searchText: "",
    }));
  }, [searchText, dispatch]);

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
          <ClientCreateUpdateForm profile={userProfile} />
        </Modal.Body>
      </Modal>
      <div className="clientListHead mb-3">
        <Button onClick={() => addClient()}>+Add Client</Button>
        <InputGroup className="client_search">
          <InputGroup.Text id="basic-addon1">
            <FaSearch />
          </InputGroup.Text>
          <Typeahead
            clearButton
            id="basic-typeahead-single"
            labelKey={(option) =>
              `${option.name} | ${option.phone} | ${option.email}`
            }
            onChange={handleSearchProfiles}
            options={profiles}
            placeholder="Search Clients..."
            selected={singleSelections}
          />
        </InputGroup>
      </div>

      <Modal show={showClientForm} onHide={handleCloseClientForm}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>
              <FaUser /> Add Client
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientCreateUpdateForm isFromAdminDashboard={true} />
        </Modal.Body>
      </Modal>

      <Card>
        {profiles.length > 0 ? (
          <>
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
                        to={`/users/profile/${profileData?.user?.toString()}`}
                      >
                        <AiOutlineEye />
                      </Link>
                      <button
                        className="btn btn-warning"
                        onClick={() => onEdit(profileData)}
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
          </>
        ) : (
          <>
            <p>No Records Found!</p>
          </>
        )}
      </Card>
    </div>
  );
}
