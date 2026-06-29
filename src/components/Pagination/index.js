import "./index.css"

const Pagination = (props) => {
  const {
    currentPage,
    setCurrentPage,
    usersPerPage,
    setUsersPerPage,
    totalUsers,
  } = props;

  // Calculate total number of pages
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="pagination-container">
  <button
    className="page-btn"
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  <span className="page-text">
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="page-btn"
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
{/* Select number of users displayed per page */}

  <select
    className="page-select"
    value={usersPerPage}
    onChange={(e) => {
      setUsersPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select>
</div>
  );
};

export default Pagination;