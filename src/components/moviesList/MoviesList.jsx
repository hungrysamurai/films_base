import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { motion, AnimatePresence } from "framer-motion";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";

const MoviesList = () => {
  const {
    moviesFetchLoading,
    moviesFetchError,
    dispatch,
    moviesList,
    lastPage,
    totalPages
  } = useGlobalContext();

  const [currentList, setCurrentList] = useState([]);
  const [newMovies, setNewMovies] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const mounted = useRef(false);

  useLayoutEffect(() => {
    setCurrentList(moviesList);
  }, [moviesList]);

    // scroll trigger
  const event = useCallback(() => {
    if(lastPage || nextPage > totalPages){
      return;
    }

    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 100
    ) {
      setNextPage((prev) => prev + 1);
    }

  },[lastPage, nextPage, totalPages]);

  // get next portion of movies
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (!lastPage) {
      dispatch({ type: "INCREASE_PAGE" });
    }
  }, [newMovies, dispatch, lastPage, event]);

  // scroll event listener
  useEffect(() => {
    
    if (moviesFetchError.show) {
      return;
    }

    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
    
  }, [moviesFetchError]);


  if (moviesFetchError.show) {
    return <ErrorMessage message={moviesFetchError.message} />;
  }

  return (
    <>
      <motion.div 
      layout 
      layoutRoot    
      className="movies-list-container">
        {currentList.map(({ posterUrl, title, id }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + "...";
          }

          return (
            <AnimatePresence key={id}>
              <SingleMovie poster={posterUrl} title={title} id={id} />;
            </AnimatePresence>
          );
        })}
      </motion.div>

      {moviesFetchLoading && <Loader />}
    </>
  );
};

export default MoviesList;
