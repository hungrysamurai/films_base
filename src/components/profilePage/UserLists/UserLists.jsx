import UserListItem from "./UserListItem";
import UserListIcon from "../icons/UserListIcon";
import AddNewListIcon from "../icons/AddNewListIcon";

const UserLists = () => {
  return (
    <div className="user-lists-container">
      <div className="user-lists-header">
        <UserListIcon />
        <h3>Мои списки</h3>
      </div>
      <div className="user-lists">
        <UserListItem title="Боевики обязательно глянуть" active={false} />
        <UserListItem title="Всякие фильмы" active={true} />
        <UserListItem title="Подборочка на НГ" active={false} />
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
