import { useUserContext } from "../contexts/UserContext";
import { signOutUser } from "../utils/firebase/firebase.utils";

const ProfilePage = () => {

 const {currentUser: {displayName}} = useUserContext();

 return (
  <section className="section-profile">
   <span>Hello, {displayName}</span>
   <br />
    <span onClick={signOutUser}>
              SIGN OUT
            </span>
   <p>This is profile page</p>
  </section>
 )
}

export default ProfilePage;