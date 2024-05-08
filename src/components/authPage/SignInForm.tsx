import { Lang } from "../../types";
import { FormEvent, ChangeEvent } from "react";

import {
  signInWithGoogglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";

import FormInput from "./FormInput";
import Button from "./Button";
import getBaseURL from "../../utils/getBaseURL";

type SignInFormFields = {
  email: string;
  password: string;
};

const defaultSignInFormFields: SignInFormFields = {
  email: "",
  password: "",
};

const SignInForm: React.FC = () => {
  const { lang } = useGlobalContext();

  const [signInFormFields, setSignInFormFields] = useState<SignInFormFields>(
    defaultSignInFormFields
  );
  const { email, password } = signInFormFields;

  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (err) {
      alert(
        lang === Lang.En
          ? "No user found with provided email!"
          : "Пользователь не найден!!"
      );
      console.log("handleSignInSubmit error:");
      console.log(err);
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGoogglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSignInChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignInFormFields({
      ...signInFormFields,
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
        x: 20,
        opacity: 0,
      }}
      onSubmit={handleSignInSubmit}
    >
      <FormInput
        type="email"
        required
        name="email"
        handleSignUpChanges={handleSignInChanges}
        value={email}
        label={lang === Lang.En ? "Email" : "Почта"}
      />

      <FormInput
        type="password"
        required
        name="password"
        handleSignUpChanges={handleSignInChanges}
        value={password}
        label={lang === Lang.En ? "Password" : "Пароль"}
      />

      <div className="buttons-container">
        <Button type="submit" text={lang === Lang.En ? "Sign-In" : "Войти"} />

        <Button
          onClick={logGoogleUser}
          type="button"
          imgPath={getBaseURL("assets/images/icons/icon-google.svg")}
        />
      </div>
    </motion.form>
  );
};

export default SignInForm;
