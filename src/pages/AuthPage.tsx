import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

import AuthModeToggler from "../components/authPage/AuthModeToggler";
import SignUpForm from "../components/authPage/SignUpForm";
import SignInForm from "../components/authPage/SignInForm";

const AuthPage = () => {
  const { setCurrentTitle, lang } = useGlobalContext();
  const [formMode, setFormMode] = useState('sign-in');

  useEffect(() => {
    setCurrentTitle(() => {
      return lang === 'en' ? 'Account' : 'Авторизация'
    })
  },[setCurrentTitle, lang]);

 return (
    <section className="section-auth">
      <AuthModeToggler activeMode={formMode} setActiveMode={setFormMode}/>
     
     <div className="form-container">

      {formMode === 'sign-up' ?
          <SignUpForm/> :
          <SignInForm/>
      }

     </div>
    </section>
  );
  
};

export default AuthPage;
