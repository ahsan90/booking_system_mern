import { useState } from 'react';
import ReactPaginate from 'react-paginate'

export default function Paginate(props) {

  const {users} = props

  const [items, setItems] = useState([])

  //console.log(users)

  const handlePageClick = (data) => {
    console.log(data.selected)
    let currentPage = data.selected + 1
  }
  return (
    <>
      <ReactPaginate
        previousLabel={"<<Previous"}
        nextLabel={"Next>>"}
        breakLabel={"..."}
        pageCount={25}
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
    </>
  );
}
