import { Lang } from "../../types";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { useState, FormEvent, ChangeEvent } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

import { motion } from "framer-motion";

import FormInput from "./FormInput.tsx";
import Button from "./Button";

type SignUpFormFields = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultSignUpFormFields: SignUpFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm: React.FC = () => {
  const { setCurrentTitle, lang } = useGlobalContext();

  const [signUpFormFields, setSignUpFormFields] = useState<SignUpFormFields>(
    defaultSignUpFormFields
  );

  const { displayName, email, password, confirmPassword } = signUpFormFields;

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    if (password !== confirmPassword) {
      alert(
        lang === Lang.En ? "Passwords don't match!" : "Пароли не совпадают!"
      );
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, displayName);
      setCurrentTitle(displayName);
    } catch (err) {
      console.log("error from handleSignUpSubmit:");
      console.log(err);

      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert(
          lang === Lang.En
            ? "Email already in use!"
            : "Эта почта уже используется!"
        );
      }
    }
  };

  const handleSignUpChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpFormFields({
      ...signUpFormFields,
      [name]: value,
    });
  };

  return (
    <motion.form
      animate={{
        x: 0,
        opacity: 1,
      }}
      initial={{
        x: -20,
        opacity: 0,
      }}
      onSubmit={handleSignUpSubmit}
    >
      <FormInput
        type="text"
        name="displayName"
        handleSignUpChanges={handleSignUpChanges}
        label={lang === Lang.En ? "Username" : "Логин"}
        value={displayName}
        required
      />

      <FormInput
        type="email"
        required
        name="email"
        handleSignUpChanges={handleSignUpChanges}
        value={email}
        label={lang === Lang.En ? "Email" : "Почта"}
      />

      <FormInput
        type="password"
        required
        name="password"
        handleSignUpChanges={handleSignUpChanges}
        value={password}
        label={lang === Lang.En ? "Password" : "Пароль"}
      />

      <FormInput
        type="password"
        required
        name="confirmPassword"
        handleSignUpChanges={handleSignUpChanges}
        value={confirmPassword}
        label={lang === Lang.En ? "Confirm Password" : "Подтвердите пароль"}
      />

      <div className="buttons-container">
        <Button
          type="submit"
          text={lang === Lang.En ? "Sign-Up" : "Зарегистрироваться"}
        />
      </div>
    </motion.form>
  );
};

export default SignUpForm;
