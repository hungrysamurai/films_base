import { Lang, MediaType } from '../../../types';

import { motion } from 'framer-motion';
import { memo } from 'react';

import useListenWindowWidth from '../../../hooks/useListenWindowWidth';

import SearchHint from './SearchHint';

type SearchHintsListProps = {
  data: MoviesListItemProps[];
  lang: Lang;
  openItem: (id: string, mediaType: MediaType) => void;
};

const SearchHintsList: React.FC<SearchHintsListProps> = ({
  data,
  lang,
  openItem,
}) => {
  const currentWindowWidth = useListenWindowWidth();

  return (
    <motion.div layout layoutRoot className="search-box-hints-list">
      {data.map((item) => {
        return (
          <SearchHint
            key={item.id}
            id={item.id.toString()}
            mediaType={item.mediaType}
            posterUrl={item.posterUrl}
            title={item.title}
            releaseYear={item.releaseYear}
            rate={item.rate}
            lang={lang}
            openItem={openItem}
            currentWindowWidth={currentWindowWidth}
          />
        );
      })}
    </motion.div>
  );
};

export default memo(SearchHintsList);
