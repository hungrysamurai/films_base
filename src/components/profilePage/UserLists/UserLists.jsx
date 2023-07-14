import UserListItem from "./UserListItem";
import UserListIcon from "../icons/UserListIcon";
import AddNewListIcon from "../icons/AddNewListIcon";

import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import useOutsideClick from "../../../hooks/useOutsideClick";

import { useState, useRef } from "react";
import EditListSubmit from "../icons/EditListSubmit";

import { createNewUserList } from "../../../utils/firebase/firebase.utils";

const UserLists = ({ userLists, currentListIndex, dispatch}) => {

  const [newListInput, setNewListInput] = useState({
    show: false,
    value: ''
  });

  const newListFormRef = useRef(null);
  
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

  const hideNewUserListInput = () => {
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

  useOutsideClick(newListFormRef, hideNewUserListInput);


  return (
    <div className="user-lists-container">

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
        <form onSubmit={submitNewUserList} ref={newListFormRef}>

          <input 
          type="text" 
          placeholder="Название списка..." 
          value={newListInput.value}
          onChange={e => setNewListInput((prev) => ({...prev, value: e.target.value}))}
          autoFocus/>

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
