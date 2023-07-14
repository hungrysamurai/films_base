import UserListIconAdd from "../moviePage/UserListsWidget/UserListIconAdd";
import UserListIconRemove from "../moviePage/UserListsWidget/UserListIconRemove";

import { useRef } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";

import { addToUserList, removeFromUserList } from "../../utils/firebase/firebase.utils";

const UserListsWidgetModal = ({hideModal, title, userLists, currentMovieData}) => {

  const {id: currentItemID, mediaType: currentItemMediaType} = currentMovieData;

  const modalInnerRef = useRef(null);
  useOutsideClick(modalInnerRef, hideModal);

 return (
     <div className="user-lists-widget-inner" ref={modalInnerRef}>
       <h3>Добавить {`«${title}»`} в список...</h3>
       <div className="user-lists-widget-container">
         <ul className="user-lists-widget">

          {userLists.map(({data: listItems, title: listTitle}, listIndex) => {

           const itemInCurrentList = listItems.some(item => {
            return item.id === currentItemID
           });

           return (
            <li className="user-list-item" key={listIndex}>
             <div className="user-list-title">
             <span>{listTitle}</span>
             </div>

              {itemInCurrentList ? 
               <button onClick={() => removeFromUserList(listIndex, currentItemID, currentItemMediaType)}>
                 <UserListIconRemove/>
               </button> :

                 <button onClick={() => addToUserList(listIndex, currentItemID, currentItemMediaType)}>
                 <UserListIconAdd/>
                </button>
              }
            </li>
           )
          })}
        
         </ul>
       </div>
     </div>
)
}

export default UserListsWidgetModal;