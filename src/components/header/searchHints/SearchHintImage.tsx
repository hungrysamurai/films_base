import { motion } from 'framer-motion';
import { memo, useState } from 'react';

type SearchHintImageProps = {
  posterUrl: string;
};

const SearchHintImage: React.FC<SearchHintImageProps> = ({ posterUrl }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
  };

  return (
    <div className="search-hint-image">
      <motion.img
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{ opacity: { delay: 0.3, duration: 0.3 } }}
        onLoad={imageLoaded}
        src={posterUrl}
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
  );
};

export default memo(SearchHintImage);
