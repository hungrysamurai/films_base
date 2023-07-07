import { useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

import { signOutUser } from "../utils/firebase/firebase.utils";

import UserListItem from "../components/profilePage/UserListItem";
import UserListIcon from "../components/profilePage/icons/UserListIcon";

import MoviesList from '../components/moviesList/MoviesList'
const ProfilePage = () => {

const { currentUser } = useUserContext();
const { setCurrentTitle, moviesListMode, dispatch } = useGlobalContext();

useEffect(() => {
  setCurrentTitle(currentUser.displayName);

  if (moviesListMode !== "userList") {
    dispatch({ type: "SET_USER_MODE" });
  }
},[currentUser, setCurrentTitle, dispatch, moviesListMode]);


 
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

        <MoviesList/>

    </div>

  </section>
 )
}

export default ProfilePage;