import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { motion, AnimatePresence } from "framer-motion";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect, useLayoutEffect, useState,useCallback, useRef } from "react";

const MoviesList = () => {
  const {
    moviesFetchLoading,
    moviesFetchError,
    dispatch,
    moviesList,
    page,
    totalPages
  } = useGlobalContext();

  const [currentList, setCurrentList] = useState([]);

  const loadMore = useCallback(() => {
    if(page < totalPages){
        if (
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 50
        ) {

          dispatch({ type: "INCREASE_PAGE" });
        }
    }

  },[dispatch, page, totalPages])

  useLayoutEffect(() => {
    setCurrentList(moviesList);
  }, [moviesList]);

 useEffect(() => {
    if (moviesFetchError.show) {
      return;
    }
    
    if(totalPages > 1){
      window.addEventListener("scroll", loadMore);
    }

    return () => window.removeEventListener("scroll", loadMore);
  }, [moviesFetchError, totalPages, loadMore]);


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
