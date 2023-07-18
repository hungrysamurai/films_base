import PropTypes from 'prop-types';

import { removeFromUserList } from "../../utils/firebase/firebase.utils";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useListenWindowWidth from "../../hooks/useListenWindowWidth";

import DeleteMovieIcon from "./icons/DeleteMovieIcon";

const SingleMovie = ({
  title,
  poster,
  id,
  mediaType,
  isDrag,
  removeItemButton,
  listIndex,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const currentWindowWidth = useListenWindowWidth();

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
        scale: currentWindowWidth === 'desktop' ? 1.05 : 1,
        zIndex: 999,
      }}
      onHoverStart={() =>
        removeItemButton ? setShowDeleteButton(() => true) : null
      }
      onHoverEnd={() =>
        removeItemButton ? setShowDeleteButton(() => false) : null
      }
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

      {/* If it is user movies list  */}
      {removeItemButton &&
        !imageLoading &&
        (showDeleteButton || currentWindowWidth === "mobile") && (
          <button
            className="remove-item-button"
            onClick={() => {
              removeFromUserList(listIndex, id, mediaType);
            }}
          >
            <DeleteMovieIcon />
          </button>
        )}
    </motion.div>
  );
};

SingleMovie.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  id: PropTypes.string,
  mediaType: PropTypes.string,
  isDrag: PropTypes.bool,
  removeItemButton: PropTypes.bool,
  listIndex: PropTypes.number,
}

export default SingleMovie;
