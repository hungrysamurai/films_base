import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MoviesList from "../components/moviesList/MoviesList";

const SearchResults = () => {
  const { setCurrentTitle, dispatch, moviesListMode } = useGlobalContext();
  const { query } = useParams();

  useEffect(() => {
    setCurrentTitle(query);
    dispatch({ type: "SET_SEARCH_MODE", payload: query });
  }, [query, setCurrentTitle, dispatch, moviesListMode]);

  return (
    <section className="section-search-results">
      <MoviesList />
    </section>
  );
};

export default SearchResults;
