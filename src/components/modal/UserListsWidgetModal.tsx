import { Lang } from '../../types';

import { useRef, MutableRefObject, memo } from 'react';

import {
  addToUserList,
  removeFromUserList,
} from '../../utils/firebase/firebase.utils';

import { useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';

import useOutsideClick from '../../hooks/useOutsideClick';

import UserListIconAdd from '../moviePage/UserListsWidget/icons/UserListIconAdd';
import UserListIconRemove from '../moviePage/UserListsWidget/icons/UserListIconRemove';

type UserListsWidgetModalProps = {
  hideModal: () => void;
  title: string;
  userLists: UserList[];
  currentMovieData: UserListItem;
};

const UserListsWidgetModal: React.FC<UserListsWidgetModalProps> = ({
  hideModal,
  title,
  userLists,
  currentMovieData,
}) => {
  const lang = useAppSelector(getCurrentLang);

  const { id: currentItemID, mediaType: currentItemMediaType } =
    currentMovieData;

  const modalInnerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalInnerRef as MutableRefObject<HTMLDivElement>, hideModal);

  return (
    <div className="user-lists-widget-inner" ref={modalInnerRef}>
      {lang === Lang.En ? (
        <h3>Add {`«${title}»`} to list...</h3>
      ) : (
        <h3>Добавить {`«${title}»`} в список...</h3>
      )}

      <div className="user-lists-widget-container">
        <ul className="user-lists-widget">
          {userLists.map(({ data: listItems, title: listTitle }, listIndex) => {
            const itemInCurrentList = listItems.some((item) => {
              return item.id === currentItemID;
            });

            return (
              <li className="user-list-item" key={listIndex}>
                <div className="user-list-title">
                  <span>{listTitle}</span>
                </div>

                {itemInCurrentList ? (
                  <button
                    onClick={() =>
                      removeFromUserList(
                        listIndex,
                        currentItemID,
                        currentItemMediaType,
                      )
                    }
                  >
                    <UserListIconRemove />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      addToUserList(
                        listIndex,
                        currentItemID,
                        currentItemMediaType,
                      )
                    }
                  >
                    <UserListIconAdd />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(UserListsWidgetModal);
