import { createNewUserList } from '../../../utils/firebase/firebase.utils';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import CustomInput from '../../CustomInput';
import ErrorMessage from '../../ErrorMessage';
import UserListItem from './UserListItem';
import UserListIcon from '../icons/UserListIcon';
import AddNewListIcon from '../icons/AddNewListIcon';
import { Lang } from '../../../types';
import { useAppSelector } from '../../../store/hooks';
import { getCurrentLang } from '../../../store/slices/mainSlice';

type UserListsProps = {
  userLists: UserList[];
  currentListIndex: number;
  hideModal?: Function;
};

const UserLists: React.FC<UserListsProps> = ({
  userLists,
  currentListIndex,
  hideModal,
}) => {
  const lang = useAppSelector(getCurrentLang);

  const [newListInputShow, setNewListInputShow] = useState(false);

  const showNewUserListInput = () => {
    setNewListInputShow(() => true);
  };

  const hideNewUserListInput = () => {
    setNewListInputShow(() => false);
  };

  const submitNewUserList = (inputValue: string) => {
    if (inputValue === '' || inputValue.length < 3 || inputValue.length > 100) {
      return;
    }

    setNewListInputShow(() => false);
    createNewUserList(inputValue);
  };

  return (
    <div className="user-lists-container">
      <div className="user-lists-header">
        <UserListIcon />
        <h3>Мои списки</h3>
      </div>

      {!userLists.length && (
        <ErrorMessage
          errorMessage={
            lang === Lang.En
              ? 'No list found. Add new list 👇'
              : 'Не найдено ни одного списка. Добавить список 👇'
          }
          showImage={true}
        />
      )}

      <div className="user-lists">
        {userLists.map(({ title }, i) => {
          return (
            <UserListItem
              key={i}
              title={title}
              active={currentListIndex === i ? true : false}
              listIndex={i}
              hideModal={hideModal}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {newListInputShow ? (
          <CustomInput
            initialValue=""
            submit={submitNewUserList}
            hideCustomInput={hideNewUserListInput}
            customClass={'user-list-item-input'}
            placeholder={
              lang === 'en' ? 'New list title...' : 'Название списка...'
            }
          />
        ) : (
          <div className="add-user-list-button">
            <motion.button
              onClick={showNewUserListInput}
              animate={{
                opacity: 1,
              }}
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <AddNewListIcon />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserLists;
