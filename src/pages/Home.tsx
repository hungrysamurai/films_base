import { useCallback, useEffect, useMemo } from 'react';

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
import {
  extendedApi,
  useGetMoviesListQuery,
} from '../store/slices/api/endpoints/getMoviesList';

import Loader from '../components/Loader';
import GenresList from '../components/home/GenresList';
import ListsContainer from '../components/home/ListsContainer';
import MoviesList from '../components/moviesList/MoviesList';

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
      extendedApi.endpoints.getMoviesList.select({
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
  }, [cachedData, currentPage, dispatch]);

  const { data, isError, isLoading, isFetching } = useGetMoviesListQuery({
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
        isLoading={isLoading}
      />

      {!isLoading && isFetching && <Loader fixedPosition={true} />}
    </section>
  );
};

export default Home;
