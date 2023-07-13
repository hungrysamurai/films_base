import FormInput from "./FormInput";
import Button from "./Button";

import { 
 signInWithGoogglePopup,
 signInAuthUserWithEmailAndPassword,
 createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import { useState } from "react";
import { motion } from 'framer-motion';

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
            label={lang === 'en' ? 'Email' : 'Почта'}
          />

          <FormInput
            type="password" 
            required
            name='password'
            handleSignUpChanges={handleSignInChanges}
            value={password}
            label={lang === 'en' ? 'Password' : 'Пароль'}
          />

       <div className="buttons-container">

        <Button
        type='submit' 
        text={lang === 'en' ? 'Sign-In' : 'Войти'}/>

        <Button
        onClick={logGoogleUser}
        type='button'
        imgPath={`${baseName}assets/images/icons/icon-google.svg`}
        />
       </div>
       
      </motion.form>

 )
} 

export default SignInForm;