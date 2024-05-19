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
  setHomePageLastActiveItem,
} from '../store/slices/homePageParamsSlice';
import { useGetMoviesListQuery } from '../store/slices/apiSlice';
import { useCallback } from 'react';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const mediaType = useAppSelector(getHomePageMediaType);
  const filterList = useAppSelector(getHomePageFilterList);
  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const lang = useAppSelector(getCurrentLang);
  const currentPage = useAppSelector(getHomePageCurrentPage);

  const lastActiveItem = useAppSelector(getHomePageLastActiveItem);

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

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />

      <MoviesList
        increasePageCount={increasePageCount}
        currentPage={currentPage}
        totalPages={data && data.totalPages ? data?.totalPages : 0}
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setHomePageLastActiveItem}
        moviesList={data ? data.itemsList : []}
        isError={isError}
        isFetching={isFetching}
      />
    </section>
  );
};

export default Home;
