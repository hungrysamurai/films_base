import UserListItem from "./UserListItem";
import UserListIcon from "../icons/UserListIcon";
import AddNewListIcon from "../icons/AddNewListIcon";

import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import useOutsideClick from "../../../hooks/useOutsideClick";

import { useState, useRef } from "react";
import EditListSubmit from "../icons/EditListSubmit";

const UserLists = ({ userLists, currentListIndex, dispatch, createNewUserList, deleteUserList, editUserListTitle }) => {

  const [newListInput, setNewListInput] = useState({
    show: false,
    value: ''
  });

  const newListInputRef = useRef(null);
  
  const animationControl = useAnimation();

  const showNewUserListInput = () => {
    setNewListInput((prev) => {
      return {
        ...prev,
        show: true
      }
    });

    animationControl.start({
      y:'2rem',
    }); 
  }

  const hideNewUserListInput = (e) => {
    if(e.target !== newListInputRef.current && newListInput.show){
        setNewListInput((prev) => {
          return {
            ...prev,
            show: false
          }
        });
        
      animationControl.start({
        y:0,
      });
    }
  }

  const submitNewUserList = (e) => {
    e.preventDefault();

    const newListTitle = newListInput.value;

    if (newListTitle === '' || newListTitle.length < 3 || newListTitle.length > 100){
      return;
    }

      setNewListInput(() => {
      return {
        show: false,
        value: ''
      }
    });

    createNewUserList(newListTitle);
  }
  return (
    <div className="user-lists-container" onClick={hideNewUserListInput}>
      <div className="user-lists-header">
        <UserListIcon />
        <h3>Мои списки</h3>
      </div>
      <div className="user-lists">
        {userLists.map(({ title},i) => {
          return (
            <UserListItem
              key={i}
              title={title}
              active={currentListIndex === i ? true : false}
              dispatch={dispatch}
              editUserListTitle={editUserListTitle}
              deleteUserList={deleteUserList}
              listIndex={i}
            />
          );
        })}
      </div>

      <AnimatePresence>

      {newListInput.show && 
      <motion.div 
      className="new-list-input-container"
      initial={{
        opacity:0,
        y:-50
      }}
      animate={{
        opacity:1,
        y:0
      }}
      >
        <form onSubmit={submitNewUserList}>
          <input 
          type="text" 
          placeholder="Название списка..." 
          ref={newListInputRef}
          value={newListInput.value}
          onChange={e => setNewListInput((prev) => ({...prev, value: e.target.value}))}/>
          <button type='submit'>
            <EditListSubmit/>
          </button>
        </form>
      </motion.div>
      }

    </AnimatePresence>

      <div className="add-user-list-button">
        <motion.button 
        onClick={showNewUserListInput}
        animate={animationControl}
        initial={{
          y: 0
        }}
        >
          <AddNewListIcon active={newListInput.show}/>
        </motion.button>
      </div>
    </div>
  );
};

export default UserLists;
