import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MoviesList from "../components/moviesList/MoviesList";
import { MoviesListReducerActionTypes } from "../reducers/moviesListReducer";
import { useAppDispatch } from "../store/hooks";
import { setMainTitle } from "../store/slices/mainSlice";

const SearchResults: React.FC = () => {
  const { dispatch: cDispatch, moviesListMode } = useGlobalContext();
  const { query } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMainTitle(query as string));

    cDispatch({
      type: MoviesListReducerActionTypes.SET_SEARCH_MODE,
      payload: query as string,
    });
  }, [query, cDispatch, moviesListMode]);

  return (
    <section className="section-search-results">
      <MoviesList />
    </section>
  );
};

export default SearchResults;
