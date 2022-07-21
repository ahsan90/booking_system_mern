import { useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useEffect, useSelector } from "react-redux";
import { get_user } from "../../features/user/userSlice";
import ReservationItem from "./ReservationItem";
import ReactPaginate from "react-paginate";

export default function BookingHistory() {
  const { bookings } = useSelector((state) => state.reservation);
  const [pageNumber, setPageNumber] = useState(0);

  const bookingsPerPage = 10;
  const pageCount = Math.ceil(bookings.length / bookingsPerPage);
  const pagesVisited = pageNumber * bookingsPerPage;
  const displayBookings = bookings
    .slice(pagesVisited, pagesVisited + bookingsPerPage)
    .map((booking) => {
      return (
        <tr key={booking._id}>
          <ReservationItem booking={booking} />
        </tr>
      );
    });

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {bookings.length > 0 ? (
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
            <tbody>{displayBookings}</tbody>
          </Table>
        </>
      ) : (
        <h3>No Booking History Found</h3>
      )}
      {bookings.length > 0 && (
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
