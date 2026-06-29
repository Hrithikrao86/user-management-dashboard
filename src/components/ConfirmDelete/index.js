import "./index.css";

const ConfirmDelete = ({
  showDeletePopup,
  setShowDeletePopup,
  confirmDelete,

}) => {
  if (!showDeletePopup) {
    return null;
  }
  const handleCancel = () => {
    setShowDeletePopup(false);
  
}

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete this user?
        </p>

        <div className="modal-buttons">

          <button
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={confirmDelete}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmDelete;