import { motion } from "framer-motion";

const ErrorMessage = ({ message }) => {
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
        src="./assets/images/void.png"
        alt="error"
      />
      <h3>{message}</h3>
    </div>
  );
};

export default ErrorMessage;
