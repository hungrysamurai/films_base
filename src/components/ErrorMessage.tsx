import { motion } from "framer-motion";
import getBaseURL from "../utils/getBaseURL";

type ErrorMessageProps = {
  errorMessage: string;
  componentMessage?: string;
  showImage: boolean;
  fullHeight?: boolean;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  componentMessage,
  showImage,
  fullHeight,
}) => {
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
            repeat: Infinity,
            duration: 4,
          }}
          src={getBaseURL("assets/images/void.png")}
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
