import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { motion, AnimatePresence } from "framer-motion";

import { useFetchCustomMoviesList } from "../../hooks/useFetchCustomMoviesList";

import { useGlobalContext } from "../../contexts/GlobalContext";

const CustomMoviesList = ({
  listMode,
  currentUserList,
  movieId,
  movieMediaType,
}) => {
  const { lang } = useGlobalContext();

  const {
    data: moviesFetchList,
    isLoading: moviesFetchLoading,
    error: moviesFetchError,
  } = useFetchCustomMoviesList(lang, listMode, {
    currentUserList,
    movieId,
    movieMediaType,
  });

  if (moviesFetchError.show) {
    return (
      <ErrorMessage
        errorMessage={moviesFetchError.message}
        componentMessage="Ошибка при загрузке списка"
        showImage={true}
      />
    );
  }

  if (moviesFetchLoading) {
    return <Loader />;
  }

  return (
    <>
      <motion.div layout layoutRoot className="movies-list-container">
        {moviesFetchList.map(({ posterUrl, title, id, mediaType }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + "...";
          }

          return (
            <AnimatePresence key={id}>
              <SingleMovie
                poster={posterUrl}
                title={title}
                id={id}
                mediaType={mediaType}
              />
              ;
            </AnimatePresence>
          );
        })}
      </motion.div>
    </>
  );
};

export default CustomMoviesList;
