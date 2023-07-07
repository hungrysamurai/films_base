import { useEffect, useMemo } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import { signOutUser } from "../utils/firebase/firebase.utils";

import UserListItem from "../components/profilePage/UserListItem";
import UserListIcon from "../components/profilePage/icons/UserListIcon";

import CustomMoviesList from "../components/moviesList/CustomMoviesList";


const ProfilePage = () => {
  const tempData = useMemo(() => {
    return [
            { id: 238, mediaType: 'movie' },
            { id: 129, mediaType: 'movie' },
            { id: 155, mediaType: 'movie' },
            { id: 94605, mediaType: 'tv' },
            { id: 772071, mediaType: 'movie' },
            { id: 39102, mediaType: 'movie' }
          ]
  },[])

const { currentUser } = useUserContext();
const { setCurrentTitle } = useGlobalContext();

useEffect(() => {
  setCurrentTitle(currentUser.displayName);
},[currentUser, setCurrentTitle]);

 return (
  <section className="section-profile">

    <div className="user-lists-container">

      <div className="user-lists-header">
        <UserListIcon/>
        <h3>Мои списки</h3>
      </div>
      <div className="user-lists">
        <UserListItem title='Боевики обязательно глянуть' active={false}/>
        <UserListItem title='Всякие фильмы' active={true}/>
        <UserListItem title='Подборочка на НГ' active={false}/>
      </div>
    </div>
    <div className="user-movies-list-container">
      <div className="user-movies-list-title">
        <h2>Новый Год список🎅</h2>
      </div>
        <CustomMoviesList 
        data={tempData}  
        listMode='userList' />
    </div>

  </section>
 )
}

export default ProfilePage;