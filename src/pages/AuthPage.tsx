import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

import AuthModeToggler from "../components/authPage/AuthModeToggler";
import SignUpForm from "../components/authPage/SignUpForm";
import SignInForm from "../components/authPage/SignInForm";
import { Lang } from "../types";

export enum FormMode {
  SignIn = "sign-in",
  SignUp = "sign-up",
}

const AuthPage: React.FC = () => {
  const { setCurrentTitle, lang } = useGlobalContext();
  const [formMode, setFormMode] = useState<FormMode>(FormMode.SignIn);

  useEffect(() => {
    setCurrentTitle(() => {
      return lang === Lang.En ? "Account" : "Авторизация";
    });
  }, [setCurrentTitle, lang]);

  return (
    <section className="section-auth">
      <AuthModeToggler activeMode={formMode} setActiveMode={setFormMode} />

      <div className="form-container">
        {formMode === FormMode.SignUp ? <SignUpForm /> : <SignInForm />}
      </div>
    </section>
  );
};

export default AuthPage;
