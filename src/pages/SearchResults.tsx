import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentLang, setMainTitle } from '../store/slices/mainSlice';

import MoviesList from '../components/moviesList/MoviesList';

import {
  getSearchPageCurrentPage,
  getSearchPageLastActiveItem,
  getSearchPageSearchQuery,
  increaseSearchPageCurrentPage,
  setSearchPageCurrentPage,
  setSearchPageLastActiveItem,
  setSearchPageSearchQuery,
} from '../store/slices/searchPageParamsSlice';
import {
  extendedApi,
  useGetSearchResultsQuery,
} from '../store/slices/api/endpoints/getSearchResults';
import Loader from '../components/Loader';

const SearchResults: React.FC = () => {
  const { query: paramsQuery } = useParams();

  const dispatch = useAppDispatch();

  const lang = useAppSelector(getCurrentLang);

  const searchQuery = useAppSelector(getSearchPageSearchQuery);
  const currentPage = useAppSelector(getSearchPageCurrentPage);
  const lastActiveItem = useAppSelector(getSearchPageLastActiveItem);

  const getCurrentCachedData = useMemo(
    () =>
      extendedApi.endpoints.getSearchResults.select({
        lang,
        searchQuery,
        currentPage,
      }),
    [lang, searchQuery, currentPage],
  );

  const { data: cachedData } = useAppSelector(getCurrentCachedData);

  useEffect(() => {
    if (cachedData && cachedData.lastFetchedPage) {
      if (cachedData.lastFetchedPage > currentPage) {
        dispatch(setSearchPageCurrentPage(cachedData.lastFetchedPage));
      }
    }
  }, [cachedData]);

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

  const setLastActiveSearchItem = useCallback(
    (id: string) => {
      dispatch(setSearchPageLastActiveItem(id));
    },
    [dispatch],
  );

  const { data, isError, isLoading, isFetching } = useGetSearchResultsQuery({
    lang,
    searchQuery,
    currentPage,
  });

  return (
    <section className="section-search-results">
      <MoviesList
        increasePageCount={increasePageCount}
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 0}
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setLastActiveSearchItem}
        moviesList={data?.itemsList ?? []}
        isError={isError}
        isLoading={isLoading}
      />

      {!isLoading && isFetching && <Loader fixedPosition={true} />}
    </section>
  );
};

export default SearchResults;
