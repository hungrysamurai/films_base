import PropTypes from 'prop-types';

import { useRef, useState } from "react";
import useOutsideClick from '../hooks/useOutsideClick';
import { motion } from 'framer-motion';

import EditListSubmitIcon from "./icons/EditSubmitIcon";
import EditListCancelIcon from "./icons/EditCancelIcon";

const CustomInput = ({ 
 initialValue, 
 submit, 
 hideCustomInput, 
 customClass,
 placeholder
}) => {

  const [customInputValue, setCustomInputValue] = useState(initialValue);

  const formElementRef =  useRef(null);
  useOutsideClick(formElementRef, hideCustomInput);

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
    }}>

     <form 
     onSubmit={(e) => {
      e.preventDefault();
      submit(customInputValue)
     }} 
     ref={formElementRef}>

        <input
          type="text"
          value={customInputValue}
          onChange={(e) =>
            setCustomInputValue(() => e.target.value)
          }
          placeholder={placeholder && placeholder}
          autoFocus
        />

        <div className="input-buttons-container">
          <button className="submit-button" type="submit">
            <EditListSubmitIcon  />
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
 )
}

CustomInput.propTypes = {
  initialValue: PropTypes.string, 
  submit: PropTypes.func, 
  hideCustomInput: PropTypes.func, 
  customClass: PropTypes.string,
  placeholder: PropTypes.string
}

export default CustomInput;