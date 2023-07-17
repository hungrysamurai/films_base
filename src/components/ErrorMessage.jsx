import { motion } from "framer-motion";
import { useGlobalContext } from "../contexts/GlobalContext";

const ErrorMessage = ({
  errorMessage,
  componentMessage,
  showImage,
  fullHeight,
}) => {
  const { baseName } = useGlobalContext();

  return (
    <div
      className={`error-message-container ${fullHeight ? "full-height" : ""}`}
    >
      {showImage && (
        <motion.img
          animate={{
            y: [15, 0, 15],
          }}
          transition={{
            repeat: "loop",
            duration: 4,
          }}
          src={`${baseName}assets/images/void.png`}
          alt="error"
        />
      )}

      <h3>
        {componentMessage && `${componentMessage}:`} <span>{errorMessage}</span>
      </h3>
    </div>
  );
};

export default ErrorMessage;
