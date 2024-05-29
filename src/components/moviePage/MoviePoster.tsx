import { motion } from 'framer-motion';
import { memo, useState } from 'react';

type MoviePosterProps = {
  image: string;
};

const MoviePoster: React.FC<MoviePosterProps> = ({ image }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
  };

  return (
    <div className="movie-poster-container">
      <motion.img
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        initial={{
          opacity: 0,
        }}
        transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
        onLoad={imageLoaded}
        src={image}
        alt="poster"
      />

      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: imageLoading ? 1 : 0,
        }}
        transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
        className="img-loading-container"
      ></motion.div>
    </div>
  );
};

export default memo(MoviePoster);
