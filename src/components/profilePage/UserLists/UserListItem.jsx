import EditListIcon from "../icons/EditListIcon";
import DeleteListIcon from "../icons/DeleteListIcon";
import EditListSubmit from "../icons/EditListSubmit";
import EditListCancel from "../icons/EditListCancel";

import useOutsideClick from "../../../hooks/useOutsideClick";

import { useState, useRef, useEffect } from "react";

import { AnimatePresence, motion } from 'framer-motion';

const UserListItem = ({
  title,
  active,
  dispatch,
  editUserListTitle,
  deleteUserList,
  listIndex,
}) => {

  const [editTitleInput, setEditTitleInput] = useState({
    show: false,
    value: title,
  });

  useEffect(() => {
    setEditTitleInput((prev) => ({...prev, value: title}))
  },[title]);

  const editTitleInputContainerRef = useRef(null);

  const changeListTitle = () => {
    setEditTitleInput(() => {
      return {
        value: title,
        show: true,
      };
    });
  };

  const cancelEditListTitle = () => {
  setEditTitleInput(() => {
    return {
      value: title,
      show: false,
    };
  });
};

  useOutsideClick(editTitleInputContainerRef, cancelEditListTitle);

  const submitEditListTitle = (e) => {
    e.preventDefault();

    const newListTitle = editTitleInput.value;

    if (newListTitle === '' || newListTitle.length < 3 || newListTitle.length > 100 || newListTitle === title){
      return;
    }

    editUserListTitle(listIndex, newListTitle);
    cancelEditListTitle()
  };

  if (editTitleInput.show) {
    return (
      <div
      className="user-list-edit-container"
      ref={editTitleInputContainerRef}>

      <div  className="edit-title-input">
          <form onSubmit={submitEditListTitle}>
            <input
              type="text"
              value={editTitleInput.value}
              onChange={(e) =>
                setEditTitleInput((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              autoFocus
            />
            </form>
          </div>

          <motion.div 
          initial={{
            y: '-2rem',
            opacity:0
          }}
          animate={{
            y:'-50%',
            opacity: 1
          }}
          className="user-list-edit-icons-container">
          <button
            className="edit-submit-icon"
            onClick={submitEditListTitle}
              >
                <EditListSubmit />
                </button>
                <button
                type='button'
                className="edit-cancel-icon"
                onClick={cancelEditListTitle}
              >
                <EditListCancel />
              </button>
          </motion.div>
      </div>
    )
  }


  return (
    <div
      className={`user-list-container ${active && "active"}`}
      onClick={() => {
         dispatch({ type: "SET_CURRENT_LIST_INDEX", payload: listIndex });
      }}>
        
      <div className="user-list-title">
          <h3>{title}</h3>
      </div>

      <AnimatePresence>
      {active && 
        <motion.div 
         initial={{
            y: '2rem',
            opacity:0
          }}
          animate={{
            y:'-50%',
            opacity: 1
          }}
         className="user-list-icons-container">
          
          <button 
          className="edit-list-icon" 
          onClick={changeListTitle}>
            <EditListIcon />
          </button>
          <button
            className="delete-list-icon"
            onClick={() => deleteUserList(listIndex)}
          >
            <DeleteListIcon />
          </button>
        </motion.div>
      }
      </AnimatePresence>
        
    </div>
  );
};

export default UserListItem;
