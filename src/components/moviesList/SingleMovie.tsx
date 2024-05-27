import { removeFromUserList } from '../../utils/firebase/firebase.utils';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useListenWindowWidth from '../../hooks/useListenWindowWidth';

import DeleteMovieIcon from './icons/DeleteMovieIcon';
import { MediaType } from '../../types';
import getBaseURL from '../../utils/getBaseURL';

type SingleMovieProps = {
  title: string;
  poster: string;
  id: string;
  mediaType: MediaType;
  isDrag?: boolean;
  removeItemButton?: boolean;
  listIndex?: number;
};

const SingleMovie: React.FC<SingleMovieProps> = ({
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
        zIndex: 2,
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
        style={{
          pointerEvents: isDrag
            ? ('none' as React.CSSProperties['pointerEvents'])
            : ('' as React.CSSProperties['pointerEvents']),
        }}
        to={getBaseURL(`${mediaType}/${id}`)}
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
        (showDeleteButton || currentWindowWidth === 'mobile') && (
          <button
            className="remove-item-button"
            onClick={() => {
              removeFromUserList(listIndex as number, id, mediaType);
            }}
          >
            <DeleteMovieIcon />
          </button>
        )}
    </motion.div>
  );
};

export default SingleMovie;
