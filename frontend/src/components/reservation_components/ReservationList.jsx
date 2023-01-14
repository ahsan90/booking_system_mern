import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import {
	Row,
	Card,
	Form,
	Button,
	Table,
	InputGroup,
	Modal,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	get_all_bookings,
	resetReservation,
	search_bookings,
} from "../../features/reservation/reservationSlice";
import ReservationItem from "./ReservationItem";
import ReactPaginate from "react-paginate";
import NewBookingForm from "./NewBookingForm";
import {
	get_allUsers,
	resetUser,
	search_users,
	search_user_by_username_email,
} from "../../features/user/userSlice";

function ReservationList() {
	const dispatch = useDispatch();
	const { booking, bookings } = useSelector((state) => state.reservation);
	let {
		user,
		singleUserDetails,
		message,
		isLoading,
		isError: errorTexting,
	} = useSelector((state) => state.user);
	const [searchQuery, setSearchQuery] = useState({
		bookingSearchText: "",
		userSearchText: "",
	});
	const [pageNumber, setPageNumber] = useState(0);
	const [showNewBooking, setShowNewBooking] = useState(false);
	const [showBookingForm, setShowBookingForm] = useState(false);
	const [errorText, setErrorText] = useState("");

	const bookingsPerPage = 9;
	const pageCount = Math.ceil(bookings.length / bookingsPerPage);
	const pagesVisited = pageNumber * bookingsPerPage;
	/* const [displayBookings, setDisplayBookings] = useState({
    bookingListings: null,
  }); */

	let searchPlaceHolder = `Search Reservation By Booking Reference...`;
	const { bookingSearchText, userSearchText } = searchQuery;

	const clearUserSearch = () => {
		setSearchQuery(() => ({ bookingSearchText: "", userSearchText: "" }));
		dispatch(resetUser());
	};

	const clearBookingSearch = () => {
		setSearchQuery(() => ({ bookingSearchText: "", userSearchText: "" }));
		dispatch(get_all_bookings());
	};

	const handlePageClick = ({ selected }) => {
		setPageNumber(selected);
	};

	const addBooking = () => {
		setShowNewBooking(true);
	};

	const handleClose = () => {
		setSearchQuery(() => ({ userSearchText: "", searchText: "" }));
		setShowNewBooking(false);
		setShowBookingForm(false);
		dispatch(resetUser());
		dispatch(get_all_bookings());
	};

	const debounceBookingSearchHandler = useCallback(
		debounce((text) => {
			dispatch(search_bookings(text));
		}, 1000),
		[]
	);

	const handleBookingSearch = (e) => {
		setSearchQuery((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		const text = e.target.value + "";
		debounceBookingSearchHandler(text);
	};

	const debounceUserSearchHandler = useCallback(
		debounce((text) => {
			dispatch(search_user_by_username_email(text));
		}, 1500),
		[]
	);

	const handleSearchProfileByEmailUsername = (e) => {
		setSearchQuery((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));

		const text = e.target.value + "";
		debounceUserSearchHandler(text);
	};

	return (
		<>
			<Modal
				show={showNewBooking}
				size="lg"
				onHide={handleClose}
				style={{ width: "100%" }}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add A New Booking</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="">
						<Form.Control
							type="text"
							name="userSearchText"
							value={userSearchText}
							onChange={handleSearchProfileByEmailUsername}
							placeholder="Enter Registered Email/Username"
							aria-describedby="basic-addon1"
							style={{ display: "inline-block", width: "90%" }}
							autoComplete="off"
						/>
						{userSearchText.length > 0 && (
							<InputGroup.Text
								className="clear_booking_search"
								onClick={clearUserSearch}
							>
								X
							</InputGroup.Text>
						)}
					</InputGroup>
					{singleUserDetails && <NewBookingForm />}
					{message?.error !== undefined && (
						<p style={{ color: "red" }}>{message?.error}</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
						style={{ display: "block" }}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			<Button onClick={addBooking}>+Add Booking</Button>
			<Row className="mt-3">
				<Card style={{ width: "100%" }}>
					<Card.Body>
						<div className="clientListHead mb-3">
							<h4>
								All Reservation Listings- (
								<span className="text-danger">total: {bookings?.length}</span>)
							</h4>
							<InputGroup className="client_search">
								<Form.Control
									type="text"
									name="bookingSearchText"
									value={bookingSearchText}
									onChange={handleBookingSearch}
									placeholder={searchPlaceHolder}
									aria-describedby="basic-addon1"
								/>
								{bookingSearchText?.length > 0 && (
									<InputGroup.Text
										className="clear_booking_search"
										onClick={clearBookingSearch}
									>
										X
									</InputGroup.Text>
								)}
							</InputGroup>
						</div>
						{bookings?.length > 0 ? (
							<>
								<Card.Title></Card.Title>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>Booking Reference</th>
											<th>Reservation Date</th>
											<th>Booking Creation Date</th>
											<th>Last Updated</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{bookings
											?.slice(pagesVisited, pagesVisited + bookingsPerPage)
											.map((booking) => {
												return (
													<tr key={booking._id}>
														<ReservationItem booking={booking} />
													</tr>
												);
											})}
									</tbody>
								</Table>
							</>
						) : (
							<>
								<Card.Text>No Reservation Found!</Card.Text>
							</>
						)}
					</Card.Body>
				</Card>
			</Row>
			{bookings?.length > bookingsPerPage && (
				<div className="mt-3">
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

export default ReservationList;
