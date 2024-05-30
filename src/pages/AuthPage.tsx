import { Lang } from '../types';

import { useState, useEffect } from 'react';

import { getCurrentLang, setMainTitle } from '../store/slices/mainSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import AuthModeToggler from '../components/authPage/AuthModeToggler';
import SignUpForm from '../components/authPage/SignUpForm';
import SignInForm from '../components/authPage/SignInForm';

export enum FormMode {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getCurrentLang);
  const [formMode, setFormMode] = useState<FormMode>(FormMode.SignIn);

  useEffect(() => {
    dispatch(setMainTitle(lang === Lang.En ? 'Account' : 'Авторизация'));
  }, [lang]);

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
