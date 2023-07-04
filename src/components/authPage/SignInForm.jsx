import FormInput from "./FormInput";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {

  const [signInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);

  const { email, password } = signInFormFields;

   const handleSignInSubmit = async (e) => {
    e.preventDefault();
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
        <button type='submit'>
         <span><img src="/assets/images/icons/icon-google.svg" alt="google sign-in" /></span>
        </button>
        
       </div>
       
      </motion.form>

 )
} 

export default SignInForm;