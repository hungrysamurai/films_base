import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MoviesList from "../components/moviesList/MoviesList";
import { MoviesListReducerActionTypes } from "../reducers/moviesListReducer";

const SearchResults: React.FC = () => {
  const { setCurrentTitle, dispatch, moviesListMode } = useGlobalContext();
  const { query } = useParams();

  useEffect(() => {
    setCurrentTitle(query as string);
    dispatch({
      type: MoviesListReducerActionTypes.SET_SEARCH_MODE,
      payload: query as string,
    });
  }, [query, setCurrentTitle, dispatch, moviesListMode]);

  return (
    <section className="section-search-results">
      <MoviesList />
    </section>
  );
};

export default SearchResults;
