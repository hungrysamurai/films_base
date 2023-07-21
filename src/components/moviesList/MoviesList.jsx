import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

const MoviesList = () => {
  const {
    moviesFetchLoading,
    moviesFetchError,
    dispatch,
    moviesList,
    page,
    totalPages,
  } = useGlobalContext();

  const scrollHandler = useCallback(() => {

    if (page < totalPages) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        const nextPage = page + 1;
        dispatch({ type: "INCREASE_PAGE", payload: nextPage });
      }
    }
  }, [dispatch, page, totalPages]);

  useEffect(() => {
    if (moviesFetchError.show) {
      return;
    }

    if (totalPages > 1) {
      window.addEventListener("scroll", scrollHandler);
    }

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [moviesFetchError, totalPages, scrollHandler]);

  if (moviesFetchError.show) {
    return (
      <ErrorMessage
        errorMessage={moviesFetchError.message}
        componentMessage="Ошибка при загрузке списка"
        showImage={true}
      />
    );
  }

  return (
    <>
      <motion.div layout layoutRoot className="movies-list-container">
        {moviesList.map(({ posterUrl, title, id, mediaType }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + "...";
          }
          
          return (
            <AnimatePresence key={id}>
              <SingleMovie poster={posterUrl} title={title} id={`${id}`} mediaType={mediaType}/>;
            </AnimatePresence>
          );
        })}
      </motion.div>

      {moviesFetchLoading && <Loader />}
    </>
  );
};

export default MoviesList;
