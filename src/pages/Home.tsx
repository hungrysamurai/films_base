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
import {
  selectCachedLastFetchedPage,
  useGetMoviesListQuery,
} from '../store/slices/apiSlice';

import { useCallback, useEffect } from 'react';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const mediaType = useAppSelector(getHomePageMediaType);
  const filterList = useAppSelector(getHomePageFilterList);
  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const lang = useAppSelector(getCurrentLang);
  const currentPage = useAppSelector(getHomePageCurrentPage);

  const lastActiveItem = useAppSelector(getHomePageLastActiveItem);

  // Use the memoized selector to access cached data
  const lastFetchedPage = useAppSelector((state) =>
    selectCachedLastFetchedPage(state, {
      mediaType,
      filterList,
      filterGenre,
      lang,
      currentPage,
    }),
  );

  const { data, isError, isFetching } = useGetMoviesListQuery({
    mediaType,
    filterList,
    filterGenre,
    lang,
    currentPage,
  });

  useEffect(() => {
    if (lastFetchedPage) {
      if (lastFetchedPage > currentPage) {
        dispatch(setHomePageCurrentPage(lastFetchedPage));
      }
    }
  }, [lastFetchedPage]);

  const increasePageCount = useCallback(() => {
    dispatch(increaseHomePageCurrentPage());
  }, [dispatch]);

  const setLastActiveItem = (id: string) => {
    dispatch(setHomePageLastActiveItem(id));
  };

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />

      <MoviesList
        increasePageCount={increasePageCount}
        currentPage={currentPage}
        totalPages={data && data.totalPages ? data?.totalPages : 0}
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setLastActiveItem}
        moviesList={data ? data.itemsList : []}
        isError={isError}
        isFetching={isFetching}
      />
    </section>
  );
};

export default Home;
