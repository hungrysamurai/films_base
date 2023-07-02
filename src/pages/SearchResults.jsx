import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import MoviesList from "../components/moviesList/MoviesList";
import { useEffect } from "react";

const SearchResults = () => {
  const { setCurrentTitle, dispatch } = useGlobalContext();
  const { query } = useParams();

  useEffect(() => {
    setCurrentTitle(query);
    dispatch({ type: "SET_SEARCH_QUERY", payload: ["search", query] });
  }, [query, setCurrentTitle, dispatch]);

  return (
    <section className="section-search-results">
      <MoviesList />
    </section>
  );
};

export default SearchResults;
