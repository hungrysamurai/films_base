import getMediaTypeString from '../../utils/getMediaTypeString';
import { Lang, MediaType } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

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
  return (
    <motion.div layout layoutRoot className="search-box-hints-list">
      {data.map((item) => {
        return (
          <AnimatePresence key={item.id}>
            <div
              key={item.id}
              className="search-hint-container"
              onClick={() => openItem(item.id.toString(), item.mediaType)}
            >
              {/* <Link to={getBaseURL(`${item.mediaType}/${item.id}`)}> */}
              <div className="search-hint-image">
                <img src={item.posterUrl} />
              </div>
              <div className="search-hint-data">
                <h4 className="search-hint-data-title">{item.title}</h4>
                <span className="search-hint-data-year">
                  {item.releaseYear}
                </span>
                <span className="search-hint-data-rate">{item.rate}</span>
                <span className="search-hint-data-media-type">
                  {getMediaTypeString(item.mediaType, lang)}
                </span>
              </div>
              {/* </Link> */}
            </div>
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
};

export default SearchHintsList;
