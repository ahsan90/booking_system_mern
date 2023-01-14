import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { get_user } from "../../features/user/userSlice";
import ReservationItem from "./ReservationItem";
import ReactPaginate from "react-paginate";
import {
	get_bookings_by_user,
	resetReservation,
} from "../../features/reservation/reservationSlice";
import { useParams } from "react-router-dom";
import CustomSpinner from "../CustomSpinner";

export default function BookingHistory() {
	const { bookings, isLoading } = useSelector((state) => state.reservation);
	const dispatch = useDispatch();
	const { id } = useParams();
	const [pageNumber, setPageNumber] = useState(0);

	const bookingsPerPage = 10;
	const pageCount = Math.ceil(bookings.length / bookingsPerPage);
	const pagesVisited = pageNumber * bookingsPerPage;

	useEffect(() => {
		if (id) dispatch(get_bookings_by_user(id));
		return () => {
			dispatch(resetReservation());
		};
	}, [id, dispatch]);

	const handlePageClick = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<div>
			{isLoading && <CustomSpinner />}
			{bookings?.length > 0 && isLoading === false ? (
				<>
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
			) : isLoading ? (
				""
			) : (
				<h3>No Booking History Found</h3>
			)}
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
		</div>
	);
}
