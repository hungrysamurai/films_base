import SingleMovie from "./SingleMovie";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { useLayoutEffect, useState } from "react";

const MoviesList = () => {
  const { moviesFetchedList, currentMoviesListPage, setCurrentMoviesListPage, moviesFetchLoading, newMovies } =
    useGlobalContext();

  const [moviesList, setMoviesList] = useState([]);

  useLayoutEffect(() => {
    if (currentMoviesListPage === 1) {
      setMoviesList(() => {
        return moviesFetchedList;
      });
    } else {
      setMoviesList((oldList) => {
        return [...oldList, ...moviesFetchedList]
      });
    }
  }, [moviesFetchedList]);


  // if(moviesFetchLoading){
  //   return (
  //     <h3>Loading...</h3>
  //   )
  // }
  return (
    <div className="movies-list-container">
      {moviesList.map(({ posterUrl, title, id }) => {
        if (title.length > 35) {
          title = title.slice(0, 35) + "...";
        }

        return <SingleMovie key={id} poster={posterUrl} title={title} />;
      })}
      {moviesFetchLoading ? <h3>Loading...</h3> : null}
      <button
        onClick={() => {
          if(newMovies){
            setCurrentMoviesListPage((prevPage) => prevPage + 1);
          } else {
            console.log('this is the end');
          }
        }}
      >
        Increase!
      </button>
    </div>
  );
};

export default MoviesList;
