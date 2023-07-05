import FormInput from "./FormInput";

import { 
 signInWithGoogglePopup,
 signInAuthUserWithEmailAndPassword,
 createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import { useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";


const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {

  const { dispatch } = useUserContext();

  const navigate = useNavigate();

  const [signInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);
  const { email, password } = signInFormFields;
  

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

  try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      
      dispatch({type: 'LOGIN', payload: user});

      resetFormFields();
      navigate('/profile')
  } catch (err) {
   console.log(err);
  }
 }


 const logGoogleUser = async () => {
  const { user } = await signInWithGoogglePopup();

  const userDocRef = await createUserDocumentFromAuth(user);
  resetFormFields();
  navigate('/profile');
}

  const resetFormFields = () => {
    setSignInFormFields(defaultSignInFormFields);
  };

  const handleSignInChanges = (e) => {
    const { name, value } = e.target;

    setSignInFormFields({
      ...signInFormFields,
      [name]: value,
    });
  };
 return (

     <motion.form 
     animate={{
      x:0,
      opacity: 1
     }}
     initial={{
      x: 20,
      opacity:0,
     }}
     onSubmit={handleSignInSubmit}>

          <FormInput
            type="email" 
            required
            name='email'
            handleSignUpChanges={handleSignInChanges}
            value={email}
            label='Почта'
          />

          <FormInput
            type="password" 
            required
            name='password'
            handleSignUpChanges={handleSignInChanges}
            value={password}
            label='Пароль'
          />

       <div className="buttons-container">

        <button type='submit'>
          <span>Войти</span>
        </button>
        <button type='submit'
        onClick={logGoogleUser}
        >
         <span><img src="/assets/images/icons/icon-google.svg" alt="google sign-in" /></span>
        </button>
        
       </div>
       
      </motion.form>

 )
} 

export default SignInForm;