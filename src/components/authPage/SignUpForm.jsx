import FormInput from "./FormInput";
import Button from "./Button";

import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { motion } from 'framer-motion';

import { useGlobalContext } from "../../contexts/GlobalContext";

const defaultSignUpFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const { setCurrentTitle, lang } = useGlobalContext();

  const [signUpFormFields, setSignUpFormFields] = useState(defaultSignUpFormFields);

  const { displayName, email, password, confirmPassword } = signUpFormFields;

   const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );

      await createUserDocumentFromAuth(user, displayName);
      setCurrentTitle(displayName);
      
    } catch (err) {
      console.log('error from handleSignUpSubmit:');
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use!");
      }
    }
  }


  const handleSignUpChanges = (e) => {
    const { name, value } = e.target;

    setSignUpFormFields({
      ...signUpFormFields,
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
      x: -20,
      opacity:0,
     }}
     onSubmit={handleSignUpSubmit}
     >
          <FormInput
            type='text'
            name='displayName'
            handleSignUpChanges={handleSignUpChanges}
            label={lang === 'en' ? 'Username' : 'Логин'}
            value={displayName}
            required
          />

          <FormInput
            type="email" 
            required
            name='email'
            handleSignUpChanges={handleSignUpChanges}
            value={email}
            label={lang === 'en' ? 'Email' : 'Почта'}
          />

          <FormInput
            type="password" 
            required
            name='password'
            handleSignUpChanges={handleSignUpChanges}
            value={password}
            label={lang === 'en' ? 'Password' : 'Пароль'}
          />

          <FormInput
            type="password" 
            required
            name='confirmPassword'
            handleSignUpChanges={handleSignUpChanges}
            value={confirmPassword}
            label={lang === 'en' ? 'Confirm Password' : 'Подтвердите пароль'}
          />
       
       <div className="buttons-container">
        <Button
        type='submit'
        text={lang === 'en' ? 'Sign-Up' : 'Зарегистрироваться'}
        />
       </div>
      </motion.form>
 )
} 

export default SignUpForm;