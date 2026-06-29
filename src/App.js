import { v4 as uuidv4 } from "uuid";
import { TailSpin } from "react-loader-spinner";

import "./App.css";
import { useEffect, useState } from "react";
import {
  getUser,
  createUser,
  editUser,
  deleteUser
} from "./api/UserService";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm"
import FilterPopup from "./components/FilterPopup"
import ConfirmDelete from "./components/ConfirmDelete";

function App() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [usersPerPage, setUsersPerPage] = useState(10);
const [showUserForm, setShowUserForm] = useState(false);
const [editingUser, setEditingUser] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [error, setError] = useState("");
const [showFilter, setShowFilter] = useState(false);
const [loading, setLoading] = useState(true);
const [showDeletePopup, setShowDeletePopup] = useState(false);

const [deleteUserId, setDeleteUserId] = useState(null);

const [filters, setFilters] = useState({
  firstName: "",
  lastName: "",
  email: "",
  department: "",
});

// Fetch user data when the application loads

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
     setLoading(true);
    try {
      const response = await getUser();

      const formattedUsers = response.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: "IT",
        };
      });

      setUsers(formattedUsers);
    } catch (error) {
     setError("Failed to fetch users.");
    }
    finally {
    setLoading(false);
  }
  };

  // Apply search text and filter popup criteria

const filteredUsers = users.filter((user) => {
const matchesSearch =
  user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
  user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
  user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
  user.department.toLowerCase().includes(searchInput.toLowerCase());

  const matchesFilter =
    user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
    user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.department.toLowerCase().includes(filters.department.toLowerCase());

  return matchesSearch && matchesFilter;
});

const sortedUsers = [...filteredUsers];

if (sortBy === "firstName") {
  sortedUsers.sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );
}

if (sortBy === "email") {
  sortedUsers.sort((a, b) =>
    a.email.localeCompare(b.email)
  );
}

if (sortBy === "department") {
  sortedUsers.sort((a, b) =>
    a.department.localeCompare(b.department)
  );
}

const lastUserIndex = currentPage * usersPerPage;
const firstUserIndex = lastUserIndex - usersPerPage;


// Display users for the selected page

const currentUsers = sortedUsers.slice(
  firstUserIndex,
  lastUserIndex
);

const addUser = async (newUser) => {
  try {
    await createUser(newUser);

    const user = {
      ...newUser,
      id: uuidv4(),
      isLocal: true,
    };

    const updatedUsers = [...users, user];

setUsers(updatedUsers);

const totalPages = Math.ceil(updatedUsers.length / usersPerPage);
setCurrentPage(totalPages);
  } catch (error) {
    alert("Failed to add user.");
  }
};

const updateUserData = async (updatedUser) => {
  try {
    // Update local state immediately
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    // Try API update, but ignore failures
    try {
      await editUser(updatedUser.id, updatedUser);
    } catch (err) {
      console.log("Mock API update skipped:", err);
    }
  } catch (error) {
    alert("Failed to update user.");
  }
};


// Close the form and reset edit state

const closeUserForm = () => {
  setShowUserForm(false);
  setEditingUser(null);
  setIsEditing(false);
};



const openDeletePopup = (id) => {
  setDeleteUserId(id);
  setShowDeletePopup(true);
};

// Delete the selected user after confirmation

const confirmDelete = async () => {
  try {
    // Remove locally first
    setUsers(
      users.filter((user) => user.id !== deleteUserId)
    );

    setDeleteUserId(null);
    setShowDeletePopup(false);

    // Try API delete, ignore failures
    try {
      await deleteUser(deleteUserId);
    } catch (err) {
      console.log("Mock API delete skipped:", err);
    }
  } catch (error) {
    alert("Failed to delete user.");
  }
};

if (loading) {
  return (
    <div className="loader-container">
      <TailSpin
        height={60}
        width={60}
        color="#2563eb"
      />
    </div>
  );
}

  return (
    
    <div className="app-container">
      {error && <p className="error-message">{error}</p>}
     <Header
    openAddUserModal={() => setShowUserForm(true)}
/>
      <SearchBar searchInput={searchInput}
    setSearchInput={setSearchInput}
    sortBy={sortBy}
    setSortBy={setSortBy}
     openFilter={() => setShowFilter(true)}/>

    <UserTable
  users={currentUsers}
  currentPage={currentPage}
  usersPerPage={usersPerPage}
  setEditingUser={setEditingUser}
  setIsEditing={setIsEditing}
  setShowUserForm={setShowUserForm}
  openDeletePopup={openDeletePopup}
/>

     <Pagination
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  usersPerPage={usersPerPage}
  setUsersPerPage={setUsersPerPage}
  totalUsers={sortedUsers.length}
/>
<UserForm
     showUserForm={showUserForm}
 
  closeUserForm={closeUserForm}
    addUser={addUser}
    updateUser={updateUserData}
    editingUser={editingUser}
    isEditing={isEditing}
     
/>
<FilterPopup
    showFilter={showFilter}
    setShowFilter={setShowFilter}
    filters={filters}
    setFilters={setFilters}
/>

<ConfirmDelete
  showDeletePopup={showDeletePopup}
  setShowDeletePopup={setShowDeletePopup}
  confirmDelete={confirmDelete}
/>
    </div>
  );
}

export default App;