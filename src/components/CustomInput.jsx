import { useRef, useState } from "react";
import { motion } from 'framer-motion';

import EditListSubmit from '../components/profilePage/icons/EditListSubmit'
import EditListCancel from '../components/profilePage/icons/EditListCancel';

import useOutsideClick from '../hooks/useOutsideClick';

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
            <EditListSubmit />
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={hideCustomInput}
          >
            <EditListCancel />
          </button>
        </div>

      </form>

   </motion.div>

 )
}

export default CustomInput;