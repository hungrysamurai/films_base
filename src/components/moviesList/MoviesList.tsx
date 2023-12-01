import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";

const MoviesList: React.FC = () => {
  const {
    moviesFetchLoading,
    moviesFetchError,
    dispatch,
    moviesList,
    page,
    totalPages,
    selectedMovie,
  } = useGlobalContext();

  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, []);

  const setScrollTargetOnCurrent = (id: string) => {
    dispatch({
      type: MoviesListReducerActionTypes.SET_MOVIE_TO_SCROLL,
      payload: id,
    });
  };

  const scrollHandler = useCallback(() => {
    if (page < totalPages) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 100
      ) {
        const nextPage = page + 1;
        dispatch({
          type: MoviesListReducerActionTypes.INCREASE_PAGE,
          payload: nextPage,
        });
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
              {/* div for restore scroll */}
              <div
                onClick={() => {
                  setScrollTargetOnCurrent(`${id}`);
                }}
                ref={`${id}` === selectedMovie ? scrollRef : null}
                className="scroll-wrapper"
              >
                <SingleMovie
                  poster={posterUrl}
                  title={title}
                  id={`${id}`}
                  mediaType={mediaType}
                />
              </div>
            </AnimatePresence>
          );
        })}
      </motion.div>

      {moviesFetchLoading && <Loader />}
    </>
  );
};

export default MoviesList;
