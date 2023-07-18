import PropTypes from 'prop-types';

import { useState } from 'react';
import { motion } from 'framer-motion';

const YoutubeEmbed = ({videoKey}) => {
const [iframeLoading, setIframeLoading] = useState(true);

const iframeLoaded = () => {
  setIframeLoading(() => false)
}

 return(
   <div className="movie-video-container">
      <motion.iframe
        animate={{
          opacity: iframeLoading ? 0 : 1
        }}
        initial={{
          opacity: 0
        }}
        src={`https://www.youtube.com/embed/${videoKey}`} title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        onLoad={() => iframeLoaded()}
        allowFullScreen>
      </motion.iframe>

      <motion.div
      className="video-loading-container"
      animate={{
        opacity: iframeLoading ? 1 : 0
      }}
      initial={{
        opacity: 1
      }}
      ></motion.div>
    </div>
 )
}

YoutubeEmbed.propTypes = {
  videoKey: PropTypes.string
}

export default YoutubeEmbed