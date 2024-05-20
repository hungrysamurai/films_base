import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentLang, setMainTitle } from '../store/slices/mainSlice';
import { useGetSearchResultsQuery } from '../store/slices/apiSlice';
import MoviesList from '../components/moviesList/MoviesList';
import {
  getSearchPageCurrentPage,
  getSearchPageLastActiveItem,
  getSearchPageSearchQuery,
  increaseSearchPageCurrentPage,
  setSearchPageLastActiveItem,
  setSearchPageSearchQuery,
} from '../store/slices/searchPageParamsSlice';

const SearchResults: React.FC = () => {
  const { query: paramsQuery } = useParams();

  const dispatch = useAppDispatch();

  const lang = useAppSelector(getCurrentLang);

  const searchQuery = useAppSelector(getSearchPageSearchQuery);
  const currentPage = useAppSelector(getSearchPageCurrentPage);
  const lastActiveItem = useAppSelector(getSearchPageLastActiveItem);

  // Initially check
  useEffect(() => {
    if (paramsQuery && !searchQuery) {
      dispatch(setSearchPageSearchQuery(paramsQuery));
    }
  }, []);

  useEffect(() => {
    dispatch(setMainTitle(searchQuery));
  }, [searchQuery]);

  const increasePageCount = useCallback(() => {
    dispatch(increaseSearchPageCurrentPage());
  }, [dispatch]);

  const setLastActiveSearchItem = (id: string) => {
    dispatch(setSearchPageLastActiveItem(id));
  };

  const { data, isError, isFetching } = useGetSearchResultsQuery({
    lang,
    searchQuery,
    currentPage,
  });

  return (
    <section className="section-search-results">
      <MoviesList
        increasePageCount={increasePageCount}
        currentPage={currentPage}
        totalPages={data && data.totalPages ? data?.totalPages : 0}
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setLastActiveSearchItem}
        moviesList={data ? data.itemsList : []}
        isError={isError}
        isFetching={isFetching}
      />
    </section>
  );
};

export default SearchResults;
