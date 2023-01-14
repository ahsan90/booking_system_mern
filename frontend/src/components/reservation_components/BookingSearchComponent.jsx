import { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	get_bookings_by_user,
	search_bookings_by_user,
} from "../../features/reservation/reservationSlice";

export default function BookingSearchComponent() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState({
		searchText: "",
	});
	const { searchText } = searchQuery;

	const handleSearch = (e) => {
		setSearchQuery((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const clearSearch = () => {
		setSearchQuery(() => ({
			searchText: "",
		}));
	};

	useEffect(() => {
		if (searchText.length > 2) {
			dispatch(search_bookings_by_user({ userId: id, searchText }));
		} else dispatch(get_bookings_by_user(id));
	}, [searchText, dispatch]);

	return (
		<>
			<div className="clientListHead mb-3">
				<h4>All Reservation Listings</h4>
				<InputGroup className="client_search">
					<Form.Control
						type="text"
						name="searchText"
						value={searchText}
						onChange={handleSearch}
						placeholder="Search By Booking Reference..."
						aria-describedby="basic-addon1"
					/>
					{searchText.length > 0 && (
						<InputGroup.Text
							className="clear_booking_search"
							onClick={clearSearch}
						>
							X
						</InputGroup.Text>
					)}
				</InputGroup>
			</div>
		</>
	);
}
