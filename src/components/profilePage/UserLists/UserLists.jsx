import UserListItem from "./UserListItem";
import UserListIcon from "../icons/UserListIcon";
import AddNewListIcon from "../icons/AddNewListIcon";

const UserLists = ({ userLists, currentListIndex, setCurrentListIndex }) => {
  return (
    <div className="user-lists-container">
      <div className="user-lists-header">
        <UserListIcon />
        <h3>Мои списки</h3>
      </div>
      <div className="user-lists">
        {userLists.map(({ title, id }) => {
          return (
            <UserListItem
              key={id}
              title={title}
              active={currentListIndex === id ? true : false}
              id={id}
              setCurrentListIndex={setCurrentListIndex}
            />
          );
        })}
      </div>

      <div className="add-user-list-button">
        <button>
          <AddNewListIcon />
        </button>
      </div>
    </div>
  );
};

export default UserLists;
