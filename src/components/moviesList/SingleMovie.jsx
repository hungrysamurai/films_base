import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

const SingleMovie = ({ title, poster, id, mediaType, isDrag }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const { baseName } = useGlobalContext();
  const imageLoaded = () => {
    setImageLoading(false);
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{
        scale: 1.05,
        zIndex: 999,
      }}
      className="movie-container"
    >
      <Link
        style={{ pointerEvents: isDrag ? "none" : "" }}
        to={`${baseName}${mediaType}/${id}`}
        draggable="false"
      >
        <div className="movie-poster-container">
          <motion.img
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: imageLoading ? 0 : 1,
            }}
            transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
            onLoad={imageLoaded}
            src={poster}
            alt={title}
          />

          <motion.div
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: imageLoading ? 0.5 : 0,
            }}
            transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
            className="img-loading-container"
          ></motion.div>
        </div>

        <div className="movie-title-container">
          <h3>{title}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default SingleMovie;
