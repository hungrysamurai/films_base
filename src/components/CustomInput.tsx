import { useRef, useState, MutableRefObject, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

import useOutsideClick from '../hooks/useOutsideClick';

import EditListSubmitIcon from './icons/EditSubmitIcon';
import EditListCancelIcon from './icons/EditCancelIcon';

type CustomInputProps = {
  initialValue: string;
  submit: (value: string) => void;
  hideCustomInput: () => void;
  customClass: string;
  placeholder?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  initialValue,
  submit,
  hideCustomInput,
  customClass,
  placeholder,
}) => {
  const [customInputValue, setCustomInputValue] = useState(initialValue);

  const formElementRef = useRef<HTMLFormElement>(null);

  useOutsideClick(
    formElementRef as MutableRefObject<HTMLFormElement>,
    hideCustomInput,
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submit(customInputValue);
    },
    [customInputValue, submit],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputValue(e.target.value);
  }, []);

  return (
    <motion.div
      className={`custom-input-container ${customClass}`}
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
    >
      <form onSubmit={handleSubmit} ref={formElementRef}>
        <input
          type="text"
          value={customInputValue}
          onChange={handleChange}
          placeholder={placeholder && placeholder}
          autoFocus
        />

        <div className="input-buttons-container">
          <button className="submit-button" type="submit">
            <EditListSubmitIcon />
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={hideCustomInput}
          >
            <EditListCancelIcon />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default memo(CustomInput);
