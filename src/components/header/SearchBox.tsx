import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchIcon from './icons/SearchIcon';
import { Lang, MediaType } from '../../types';
import getBaseURL from '../../utils/getBaseURL';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import { setSearchPageSearchQuery } from '../../store/slices/searchPageParamsSlice';
import useDebounce from '../../hooks/useDebounce';

import { useGetSearchHintsItemsQuery } from '../../store/slices/api/endpoints/getSearchHintsItems';
import SearchHintsList from './SearchHintsList';
import useOutsideClick from '../../hooks/useOutsideClick';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getCurrentLang);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [hintsVisible, setHintsVisible] = useState(false);

  const debouncedInput = useDebounce(searchTerm, 200);

  const searchBoxContainerRef = useRef<HTMLDivElement>(null);

  const hideHints = () => {
    setHintsVisible(false);
  };

  useOutsideClick(
    searchBoxContainerRef as MutableRefObject<HTMLDivElement>,
    hideHints,
  );

  const { data = [], isLoading } = useGetSearchHintsItemsQuery({
    lang,
    searchInput: debouncedInput,
  });

  const openItem = (id: string, mediaType: MediaType) => {
    navigate(getBaseURL(`${mediaType}/${id}`));
    setHintsVisible(false);
    setSearchTerm('');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const search = () => {
    if (searchTerm) {
      dispatch(setSearchPageSearchQuery(searchTerm));
      navigate(getBaseURL(`search/${searchTerm}`));
      setSearchTerm('');
    }
  };

  return (
    <div className="search-box-container" ref={searchBoxContainerRef}>
      <form
        className={`search-box-form ${hintsVisible ? 'show-hints' : ''}`}
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <button className="search-button">
          <SearchIcon />
        </button>
        <input
          type="text"
          className="search-box-input"
          placeholder={`${lang === Lang.Ru ? 'Поиск' : 'Search'}`}
          value={searchTerm}
          onChange={handleInput}
          onFocus={() => setHintsVisible(true)}
        />
      </form>
      {/* focus && */}
      {hintsVisible && data.length !== 0 && !isLoading && (
        <>
          <SearchHintsList data={data} lang={lang} openItem={openItem} />
          <div className="search-hints-overlay"></div>
        </>
      )}
    </div>
  );
};

export default SearchBox;
