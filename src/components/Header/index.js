import "./index.css";

const Header = (props) => {
    const { openAddUserModal }=props
  return (
    <div className="header">
      <h1>User Management Dashboard</h1>

      <button onClick={openAddUserModal}>
        + Add User
      </button>
    </div>
  );
};

export default Header;