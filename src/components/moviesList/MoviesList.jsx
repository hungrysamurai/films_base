import SingleMovie from "./SingleMovie";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect, useState } from "react";

const MoviesList = () => {
  const { moviesFetchedList, currentMoviesListPage, setCurrentMoviesListPage } =
    useGlobalContext();

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (currentMoviesListPage === 1) {
      setMoviesList(moviesFetchedList);
    } else {
      setMoviesList((oldList) => [...oldList, ...moviesFetchedList]);
    }
  }, [moviesFetchedList]);

  return (
    <div className="movies-list-container">
      {moviesList.map(({ posterUrl, title, id }) => {
        if (title.length > 35) {
          title = title.slice(0, 35) + "...";
        }

        return <SingleMovie key={id} poster={posterUrl} title={title} />;
      })}

      <button
        onClick={() => {
          setCurrentMoviesListPage((prevPage) => prevPage + 1);
        }}
      >
        Increase!
      </button>
    </div>
  );
};

export default MoviesList;
