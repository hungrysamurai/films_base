import { motion, AnimatePresence } from "framer-motion";
import { useFetchUserMoviesList } from "../../hooks/useFetchUserMoviesList";

import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { useAppSelector } from "../../store/hooks";
import { getCurrentLang } from "../../store/slices/mainSlice";

type UserMoviesListProps = {
  currentUserList: UserListItem[];
  listIndex: number;
};

const UserMoviesList: React.FC<UserMoviesListProps> = ({
  currentUserList,
  listIndex,
}) => {
  const lang = useAppSelector(getCurrentLang);

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

export default UserMoviesList;
