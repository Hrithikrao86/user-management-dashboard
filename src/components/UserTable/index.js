import "./index.css"

const UserTable=(props)=>{

  const {
  users,
  currentPage,
  usersPerPage,
  setEditingUser,
  setIsEditing,
  setShowUserForm,
  openDeletePopup,
} = props;

  // Open the edit form with selected user data

  const handleEdit = (user) => {
  setEditingUser(user);
  setIsEditing(true);
  setShowUserForm(true);
};

// Display users in a tabular format

  return (
   <table className="user-table">
    <thead>
  <tr>
    <th>S.No</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Department</th>
    <th>Actions</th>
  </tr>
</thead>

      <tbody>
  {users.length === 0 ? (
    <tr>
   <td colSpan="6" className="no-users">
    No users found.
</td>
    </tr>
  ) : (
    users.map((user, index) => (
      <tr key={user.id}>
        <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.department}</td>
        <td>
         <button
className="edit-btn"
onClick={() => handleEdit(user)}
>
Edit
</button>

<button
className="delete-btn"
  onClick={() => openDeletePopup(user.id)}
>
Delete
</button>
        </td>
      </tr>
    ))
  )}
</tbody>
    </table>
  );
}

export default UserTable;