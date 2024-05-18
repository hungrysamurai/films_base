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
  getHomePageTotalPages,
  increaseHomePageCurrentPage,
  setHomePageLastActiveItem,
} from '../store/slices/homePageParamsSlice';
import { useGetMoviesListQuery } from '../store/slices/apiSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const mediaType = useAppSelector(getHomePageMediaType);
  const filterList = useAppSelector(getHomePageFilterList);
  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const lang = useAppSelector(getCurrentLang);
  const currentPage = useAppSelector(getHomePageCurrentPage);
  const totalPages = useAppSelector(getHomePageTotalPages);
  const lastActiveItem = useAppSelector(getHomePageLastActiveItem);

  const {
    data = [],
    isLoading,
    isError,
  } = useGetMoviesListQuery({
    mediaType,
    filterList,
    filterGenre,
    lang,
    currentPage,
  });

  const increasePageCount = () => {
    dispatch(increaseHomePageCurrentPage());
  };

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />

      <MoviesList
        increasePageCount={increasePageCount}
        currentPage={currentPage}
        totalPages={totalPages}
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setHomePageLastActiveItem}
        moviesList={data}
        isError={isError}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Home;
