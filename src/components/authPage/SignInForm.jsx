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
import { useGlobalContext } from "../../contexts/GlobalContext";


const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const { baseName, lang } = useGlobalContext();

  const [signInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);
  const { email, password } = signInFormFields;
  
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
       await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
    } catch (err) {
        console.log('handleSignInSubmit error:');
        console.log(err);
    }
 }

 const logGoogleUser = async () => {
  const { user } = await signInWithGoogglePopup();
  await createUserDocumentFromAuth(user);
}

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

        <button
        onClick={logGoogleUser}
        type="button"
        >
         <span><img src="/assets/images/icons/icon-google.svg" alt="google sign-in" /></span>
        </button>
        
       </div>
       
      </motion.form>

 )
} 

export default SignInForm;