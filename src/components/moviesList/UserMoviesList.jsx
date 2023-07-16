import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { motion, AnimatePresence } from "framer-motion";

import { useFetchUserMoviesList } from "../../hooks/useFetchUserMoviesList";

import { useGlobalContext } from "../../contexts/GlobalContext";

const UserMoviesList = ({ currentUserList, listIndex }) => {
  const { lang } = useGlobalContext();

  const {
    data: moviesFetchList,
    isLoading: moviesFetchLoading,
    error: moviesFetchError,
  } = useFetchUserMoviesList(lang, currentUserList);

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
                removeItemButton={true}
                listIndex={listIndex}
              />
              ;
            </AnimatePresence>
          );
        })}
      </motion.div>
    </>
  );
};

export default UserMoviesList;
