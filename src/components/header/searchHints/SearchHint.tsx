import { Lang, MediaType } from '../../../types';

import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

import getMediaTypeString from '../../../utils/getMediaTypeString';

import SearchHintImage from './SearchHintImage';

type SearchHintProps = {
  id: string;
  mediaType: MediaType;
  posterUrl: string;
  title: string;
  releaseYear?: string;
  rate?: string;
  lang: Lang;
  openItem: (id: string, mediaType: MediaType) => void;
  currentWindowWidth: 'desktop' | 'mobile' | undefined;
};

const SearchHint: React.FC<SearchHintProps> = ({
  id,
  mediaType,
  posterUrl,
  title,
  releaseYear,
  rate,
  lang,
  openItem,
  currentWindowWidth,
}) => {
  return (
    <AnimatePresence key={id}>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        whileHover={{
          scale: currentWindowWidth === 'desktop' ? 1.05 : 1,
          zIndex: 2,
        }}
        className="search-hint-container"
        onClick={() => openItem(id.toString(), mediaType)}
      >
        <SearchHintImage posterUrl={posterUrl} />

        <div className="search-hint-data">
          <h4 className="search-hint-data-title">{title}</h4>

          {releaseYear && (
            <span className="search-hint-data-year">{releaseYear}</span>
          )}

          {rate && <span className="search-hint-data-rate">{rate}</span>}

          <span className="search-hint-data-media-type">
            {getMediaTypeString(mediaType, lang)}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(SearchHint);
