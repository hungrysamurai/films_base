import {
  UserListReducerAction,
  UserListReducerActionTypes,
} from "../../../reducers/userListsReducer";

import {
  removeUserList,
  editUserListTitle,
} from "../../../utils/firebase/firebase.utils";

import useOutsideClick from "../../../hooks/useOutsideClick";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import EditListIcon from "../icons/EditListIcon";
import DeleteListIcon from "../icons/DeleteListIcon";
import CustomInput from "../../CustomInput";

type UserListItemProps = {
  title: string;
  active: boolean;
  listIndex: number;
  dispatch: React.Dispatch<UserListReducerAction>;
  hideModal?: Function;
};

const UserListItem: React.FC<UserListItemProps> = ({
  title,
  active,
  dispatch,
  listIndex,
  hideModal,
}) => {
  const [editTitleInputShow, setEditTitleInputShow] = useState(false);
  // const editTitleInputContainerRef = useRef(null);

  const hideEditTitleInput = () => {
    setEditTitleInputShow(() => false);
  };

  // console.log(editTitleInputContainerRef);
  // useOutsideClick(editTitleInputContainerRef, hideEditTitleInput);

  const submitEditListTitle = (inputValue: string) => {
    if (
      inputValue === "" ||
      inputValue.length < 3 ||
      inputValue.length > 100 ||
      inputValue === title
    ) {
      return;
    }

    editUserListTitle(listIndex, inputValue);
    hideEditTitleInput();
  };

  return (
    <>
      {editTitleInputShow ? (
        <CustomInput
          initialValue={title}
          submit={submitEditListTitle}
          hideCustomInput={hideEditTitleInput}
          customClass={"user-list-item-input"}
        />
      ) : (
        <div
          className={`user-list-container ${active && "active"}`}
          onClick={() => {
            dispatch({
              type: UserListReducerActionTypes.SET_CURRENT_LIST_INDEX,
              payload: listIndex,
            });

            if (hideModal) {
              setTimeout(() => {
                hideModal();
              }, 250);
            }
          }}
        >
          <div className="user-list-title">
            <h3>{title}</h3>
          </div>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{
                  y: "2rem",
                  opacity: 0,
                }}
                animate={{
                  y: "-50%",
                  opacity: 1,
                }}
                className="user-list-icons-container"
              >
                <button
                  className="edit-list-icon"
                  onClick={() => setEditTitleInputShow(() => true)}
                >
                  <EditListIcon />
                </button>
                <button
                  className="delete-list-icon"
                  onClick={() => removeUserList(listIndex)}
                >
                  <DeleteListIcon />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default UserListItem;
