import { useRef, useState, MutableRefObject } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { motion } from "framer-motion";

import EditListSubmitIcon from "./icons/EditSubmitIcon";
import EditListCancelIcon from "./icons/EditCancelIcon";

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
    hideCustomInput
  );

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(customInputValue);
        }}
        ref={formElementRef}
      >
        <input
          type="text"
          value={customInputValue}
          onChange={(e) => setCustomInputValue(() => e.target.value)}
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

export default CustomInput;
