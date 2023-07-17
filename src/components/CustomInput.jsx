import { useRef, useState } from "react";
import { motion } from 'framer-motion';

import EditListSubmit from '../components/profilePage/icons/EditListSubmit'
import EditListCancel from '../components/profilePage/icons/EditListCancel';

import useOutsideClick from '../hooks/useOutsideClick';

const CustomInput = ({inputVisibility, initialValue, submit, hideCustomInput}) => {

  const [customInputValue, setCustomInputValue] = useState(initialValue);

  const formElementRef =  useRef(null);
  useOutsideClick(formElementRef, hideCustomInput);

  return (
   <motion.div
    className="new-user-input-container"
    initial={{
      opacity: 0,
      y: -50,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: 50,
    }}>

     <form onSubmit={submit} ref={formElementRef}>
        <input
          type="text"
          value={customInputValue}
          onChange={(e) =>
            setCustomInputValue(() => e.target.value)
          }
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