import { useEffect } from "react";
import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import MoviesList from "../components/moviesList/MoviesList";
import { useGlobalContext } from "../contexts/GlobalContext";

const Home = () => {
  const { searchQuery, dispatch } = useGlobalContext();

  useEffect(() => {
    if (searchQuery) {
      dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
    }
  }, [searchQuery, dispatch]);

  return (
    <section className="section-home">
      <ListsContainer />
      <GenresList />
      <MoviesList />
    </section>
  );
};

export default Home;
