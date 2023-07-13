import UserListIconAdd from "../moviePage/UserListsWidget/UserListIconAdd";
import UserListIconRemove from "../moviePage/UserListsWidget/UserListIconRemove";

import { useRef } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";

const UserListsWidgetModal = ({hideModal, title, userLists, currentMovieData, addToUserList, removeFromUserList}) => {
  const {id: currentItemID, mediaType: currentItemMediaType} = currentMovieData;

  const modalInnerRef = useRef(null);
  useOutsideClick(modalInnerRef, hideModal);

 return (
     <div className="user-lists-widget-inner" ref={modalInnerRef}>
       <h3>Добавить {`«${title}»`} в список...</h3>
       <div className="user-lists-container">
         <ul className="user-lists">

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
               <button onClick={() => removeFromUserList(listIndex)}>
                 <UserListIconRemove/>
               </button> :

                 <button onClick={() => addToUserList(listIndex)}>
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