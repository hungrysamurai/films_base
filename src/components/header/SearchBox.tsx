import { Lang, MediaType } from '../../types';

import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import { setSearchPageSearchQuery } from '../../store/slices/searchPageParamsSlice';
import { useGetSearchHintsItemsQuery } from '../../store/slices/api/endpoints/getSearchHintsItems';

import useOutsideClick from '../../hooks/useOutsideClick';
import useDebounce from '../../hooks/useDebounce';

import getBaseURL from '../../utils/getBaseURL';

import SearchIcon from './icons/SearchIcon';
import SearchHintsList from './searchHints/SearchHintsList';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getCurrentLang);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [hintsVisible, setHintsVisible] = useState(false);

  const debouncedInput = useDebounce(searchTerm, 200);
  const searchBoxContainerRef = useRef<HTMLDivElement>(null);

  const hideHints = useCallback(() => {
    setHintsVisible(false);
  }, []);

  useOutsideClick(
    searchBoxContainerRef as MutableRefObject<HTMLDivElement>,
    hideHints,
  );

  const { data = [], isLoading } = useGetSearchHintsItemsQuery(
    useMemo(
      () => ({
        lang,
        searchInput: debouncedInput,
      }),
      [lang, debouncedInput],
    ),
  );

  const openItem = useCallback(
    (id: string, mediaType: MediaType) => {
      navigate(getBaseURL(`${mediaType}/${id}`));
      setHintsVisible(false);
      setSearchTerm('');
    },
    [navigate],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [],
  );

  const search = useCallback(() => {
    if (searchTerm) {
      dispatch(setSearchPageSearchQuery(searchTerm));
      navigate(getBaseURL(`search/${searchTerm}`));
      setSearchTerm('');
    }
  }, [dispatch, navigate, searchTerm]);

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
