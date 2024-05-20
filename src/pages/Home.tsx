import GenresList from '../components/home/GenresList';
import ListsContainer from '../components/home/ListsContainer';
import MoviesList from '../components/moviesList/MoviesList';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentLang } from '../store/slices/mainSlice';
import {
  getHomePageCurrentPage,
  getHomePageFilterGenre,
  getHomePageFilterList,
  getHomePageLastActiveItem,
  getHomePageMediaType,
  increaseHomePageCurrentPage,
  setHomePageCurrentPage,
  setHomePageLastActiveItem,
} from '../store/slices/homePageParamsSlice';
import { apiSlice, useGetMoviesListQuery } from '../store/slices/apiSlice';

import { useCallback, useEffect, useMemo } from 'react';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const mediaType = useAppSelector(getHomePageMediaType);
  const filterList = useAppSelector(getHomePageFilterList);
  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const lang = useAppSelector(getCurrentLang);
  const currentPage = useAppSelector(getHomePageCurrentPage);
  const lastActiveItem = useAppSelector(getHomePageLastActiveItem);

  // Get cache for current endpoint & args
  const getCurrentCachedData = useMemo(
    () =>
      apiSlice.endpoints.getMoviesList.select({
        mediaType,
        filterList,
        filterGenre,
        lang,
        currentPage,
      }),
    [mediaType, filterList, filterGenre, lang, currentPage],
  );

  const { data: cachedData } = useAppSelector(getCurrentCachedData);

  // If cache contains some data = set currentPage to currentPage in cache
  useEffect(() => {
    if (cachedData && cachedData.lastFetchedPage) {
      if (cachedData.lastFetchedPage > currentPage) {
        dispatch(setHomePageCurrentPage(cachedData.lastFetchedPage));
      }
    }
  }, [cachedData]);

  const { data, isError, isFetching } = useGetMoviesListQuery({
    mediaType,
    filterList,
    filterGenre,
    lang,
    currentPage,
  });

  const increasePageCount = useCallback(() => {
    dispatch(increaseHomePageCurrentPage());
  }, [dispatch]);

  const setLastActiveItem = useCallback(
    (id: string) => {
      dispatch(setHomePageLastActiveItem(id));
    },
    [dispatch],
  );

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />

      <MoviesList
        increasePageCount={increasePageCount}
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 0}
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setLastActiveItem}
        moviesList={data?.itemsList ?? []}
        isError={isError}
        isFetching={isFetching}
      />
    </section>
  );
};

export default Home;
