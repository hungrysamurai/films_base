import { Lang } from '../../types';
import { FormMode } from '../../pages/AuthPage';

import { getCurrentLang } from '../../store/slices/mainSlice';
import { useAppSelector } from '../../store/hooks';
import { memo } from 'react';

type AuthModeTogglerProps = {
  activeMode: FormMode;
  setActiveMode: React.Dispatch<React.SetStateAction<FormMode>>;
};

const AuthModeToggler: React.FC<AuthModeTogglerProps> = ({
  activeMode,
  setActiveMode,
}) => {
  const lang = useAppSelector(getCurrentLang);

  return (
    <div className="auth-mode-container">
      <div
        className={`sign-in ${activeMode === FormMode.SignIn ? 'active' : ''}`}
        onClick={() => setActiveMode(FormMode.SignIn)}
      >
        <h3>{lang === Lang.En ? 'Sign-In' : 'Вход'}</h3>
      </div>
      <div className="divider">
        <h3>|</h3>
      </div>
      <div
        className={`sign-up ${activeMode === FormMode.SignUp ? 'active' : ''}`}
        onClick={() => setActiveMode(FormMode.SignUp)}
      >
        <h3>{lang === Lang.En ? 'Sign-Up' : 'Регистрация'}</h3>
      </div>
    </div>
  );
};

export default memo(AuthModeToggler);
