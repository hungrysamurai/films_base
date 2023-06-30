import { motion } from "framer-motion";
import { useGlobalContext } from "../contexts/GlobalContext";
const ErrorMessage = ({ errorMessage, componentMessage }) => {

  const { baseName } = useGlobalContext();
  return (
    <div className="error-message-container">
      <motion.img
        animate={{
          y: [15, 0, 15],
        }}
        transition={{
          repeat: "loop",
          // repeatType: "reverse",
          duration: 4,
        }}
        src={`${baseName}assets/images/void.png`}
        alt="error"
      />
      <h3>{errorMessage}</h3>
    </div>
  );
};

export default ErrorMessage;
