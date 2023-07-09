import EditListIcon from "../icons/EditListIcon";
import DeleteListIcon from "../icons/DeleteListIcon";

const UserListItem = ({ title, active, id, setCurrentListIndex }) => {
  return (
    <div
      className={`user-list-container ${active && "active"}`}
      onClick={() => setCurrentListIndex(id)}
    >
      <div className="user-list-title">
        <h3>{title}</h3>
      </div>

      <div className="user-list-icons-container">
        <div className="edit-list-icon">
          <EditListIcon />
        </div>
        <div className="delete-list-icon">
          <DeleteListIcon />
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
