import { useState ,useEffect} from "react";
import "./index.css";

const UserForm = (props) => {
    const { 
    showUserForm,

  closeUserForm,
  addUser,
  updateUser,
  editingUser,
  isEditing}=props
  
  useEffect(() => {
  if (isEditing && editingUser) {
    setFormData(editingUser);
  }
}, [editingUser, isEditing]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  if (!showUserForm) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = () => {

  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.department
  ) {
    alert("Please fill all fields");
    return;
  }

if (isEditing) {
  updateUser(formData);
} else {
  addUser(formData);
}

  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

closeUserForm();
};

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add User</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <div className="modal-buttons">
        <button onClick={closeUserForm}>
            Cancel
          </button>

          <button onClick={handleSubmit}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserForm;