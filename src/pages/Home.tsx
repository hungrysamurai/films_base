import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import MoviesList from "../components/moviesList/MoviesList";
import { MoviesListMode } from "../types";
import { MoviesListReducerActionTypes } from "../reducers/moviesListReducer";
import { useAppDispatch } from "../store/hooks";
import { setMainTitle } from "../store/slices/mainSlice";

const Home: React.FC = () => {
  const {
    moviesListMode,
    searchQuery,
    dispatch: cDispatch,
  } = useGlobalContext();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (moviesListMode !== MoviesListMode.Home) {
      cDispatch({ type: MoviesListReducerActionTypes.SET_HOME_MODE });
    }

    dispatch(setMainTitle(""));
  }, [searchQuery, cDispatch, moviesListMode]);

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />
      <MoviesList />
    </section>
  );
};

export default Home;
