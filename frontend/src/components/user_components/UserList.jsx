import { useState, useEffect } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { InputGroup, Pagination } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserComponent from "./userComponent";
import {
  get_allUsers,
  search_users,
} from "../../features/user/userSlice";
import ReactPaginate from "react-paginate";

function UsersListing() {
  const dispatch = useDispatch();
  const { user, users, isLoading } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchQuery, setSearchQuery] = useState({
    searchText: "",
  });
  const [singleSelections, setSingleSelections] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    handleClose();
  }, [user]);

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

  const usersPerPage = 8;
  const pageCount = Math.ceil(users?.length / usersPerPage);
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = users?.slice(pagesVisited, pagesVisited + usersPerPage).map((userData) => {
      return (
        <div className="col-md-6 col-lg-3 mb-4" key={userData._id}>
          <UserComponent userData={userData} />
        </div>
      );
    });

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  /* if (isLoading) {
    return <CustomSpinner />;
  } */

  return (
    <>
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

      <div className="mb-3 justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          + Create A New User
        </Button>
      </div>

      <div className="clientListHead mb-3">
        <h4>
          Users Listings{" "}(
          <span className="text-danger">total: {users?.length}</span>)
        </h4>
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
      <div
        className="container-fluid justify-content-center"
        style={{ alignItem: "center" }}
      >
        <div className="row">{displayUsers}</div>
      </div>
      {users?.length > usersPerPage && (
        <div style={{ alignItem: "center" }}>
          <ReactPaginate
            previousLabel={"<<Previous"}
            nextLabel={"Next>>"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}

export default UsersListing;
