import PropTypes from 'prop-types';

import { motion, AnimatePresence } from "framer-motion";
import { useFetchUserMoviesList } from "../../hooks/useFetchUserMoviesList";
import { useGlobalContext } from "../../contexts/GlobalContext";

import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

const UserMoviesList = ({ currentUserList, listIndex }) => {
  const { lang } = useGlobalContext();
  const {
    data: moviesFetchList,
    isLoading: moviesFetchLoading,
    error: moviesFetchError,
  } = useFetchUserMoviesList(lang, currentUserList);

  if (moviesFetchError.show) {
    return (
      <ErrorMessage errorMessage={moviesFetchError.message} showImage={true} />
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
                id={`${id}`}
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

UserMoviesList.propTypes = {
  currentUserList: PropTypes.array,
  listIndex: PropTypes.number
}

export default UserMoviesList;
