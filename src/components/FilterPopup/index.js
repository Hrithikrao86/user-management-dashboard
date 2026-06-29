import "./index.css";

const FilterPopup = ({
  showFilter,
  setShowFilter,
  filters,
  setFilters,
}) => {
  if (!showFilter) {
    return null;
  }

  // Update filter values

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Clear all filter fields

  const handleReset = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });

    setShowFilter(false);
  };

  // Apply filters and close popup

  const handleApply = () => {
    setShowFilter(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="popup-header">
          <h2>Filter Users</h2>

          <button
            className="close-btn"
            onClick={() => setShowFilter(false)}
          >
            ✕
          </button>
        </div>

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={filters.firstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={filters.lastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
        />

        <label>Department</label>
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={filters.department}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="apply-btn"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterPopup;