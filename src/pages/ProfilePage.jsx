import { useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { useGlobalContext } from "../contexts/GlobalContext";

const ProfilePage = () => {

const { currentUser } = useUserContext();
const {setCurrentTitle} = useGlobalContext();

useEffect(() => {
  setCurrentTitle(currentUser.displayName);
},[currentUser, setCurrentTitle])
 
 return (
  <section className="section-profile">
   <span>Hello</span>
   <br />
    <span onClick={signOutUser}>
              SIGN OUT
            </span>
   <p>This is profile page</p>
  </section>
 )
}

export default ProfilePage;