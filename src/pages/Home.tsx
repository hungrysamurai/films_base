import { useEffect, useReducer } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import MoviesList from "../components/moviesList/MoviesList";
import { MediaType, MovieFilterListTerm, MoviesListMode } from "../types";
import { MoviesListReducerActionTypes } from "../reducers/moviesListReducer";
import { useAppDispatch } from "../store/hooks";
import { setMainTitle } from "../store/slices/mainSlice";

import { useGetCurrentMediaType } from "../components/PageWrapper";
import homePageParamsReducer, {
  HomePageParamsActionTypes,
} from "../reducers/homePageParamsReducer";

const initialState: HomePageParamsState = {
  mediaType: MediaType.Movie,
  filterList: MovieFilterListTerm.TopRated,
  filterGenre: "",
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { currentMediaType } = useGetCurrentMediaType();

  const [homePageParams, homePageParamsDispatch] = useReducer(
    homePageParamsReducer,
    initialState
  );
  console.log(homePageParams);

  useEffect(() => {
    homePageParamsDispatch({
      type: HomePageParamsActionTypes.SET_HOME_PAGE_MEDIA_TYPE,
      payload: currentMediaType,
    });
  }, [currentMediaType]);

  // /////////////////////////////////
  const {
    moviesListMode,
    searchQuery,
    dispatch: cDispatch,
  } = useGlobalContext();

  useEffect(() => {
    if (moviesListMode !== MoviesListMode.Home) {
      cDispatch({ type: MoviesListReducerActionTypes.SET_HOME_MODE });
    }

    dispatch(setMainTitle(""));
  }, [searchQuery, cDispatch, moviesListMode]);
  // /////////////////////////////////

  return (
    <section className="section-home">
      <ListsContainer
        dispatch={homePageParamsDispatch}
        homePageParams={homePageParams}
      />
      <GenresList dispatch={homePageParamsDispatch} />

      <MoviesList />
    </section>
  );
};

export default Home;
