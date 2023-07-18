import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import MoviesList from "../components/moviesList/MoviesList";

const Home = () => {
  const { moviesListMode, searchQuery, dispatch, setCurrentTitle } = useGlobalContext();

  useEffect(() => {
    if (moviesListMode !== "home") {
      dispatch({ type: "SET_HOME_MODE" });
    }
    setCurrentTitle(() => "");
  }, [searchQuery, dispatch, moviesListMode, setCurrentTitle]);

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />
      <MoviesList />
    </section>
  );
};

export default Home;
