import { FiSearch } from "react-icons/fi";
import "./index.css"

const SearchBar = (props) => {
  const {
    searchInput,
    setSearchInput,
    sortBy,
    setSortBy,
    openFilter
  } = props;


   return (
   <div className="search-container">
 <div className="search-box">
  {/* Search users by name, email or department */}
  <FiSearch className="search-icon" />

  <input
    className="search-input"
    type="text"
    placeholder="Search users..."
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
  />
</div>
{/* Sort users */}

  <select
    className="sort-select"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="">Sort By</option>
    <option value="firstName">First Name</option>
    <option value="email">Email</option>
    <option value="department">Department</option>
  </select>

  <button
    className="filter-btn"
    onClick={openFilter}
  >
    Filter
  </button>
</div>
  );
};

export default SearchBar;