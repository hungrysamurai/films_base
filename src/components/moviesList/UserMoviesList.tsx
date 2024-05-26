import { motion, AnimatePresence } from 'framer-motion';

import SingleMovie from './SingleMovie';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import { useGetUserMoviesListQuery } from '../../store/slices/api/endpoints/getUserMoviesList';
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
    data = [],
    isLoading,
    isError,
  } = useGetUserMoviesListQuery({
    lang,
    currentUserList,
  });

  if (isError) {
    return (
      <ErrorMessage
        errorMessage={`${
          lang === 'ru' ? 'Этот список пуст' : 'This list is empty'
        }`}
        showImage={true}
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <motion.div layout layoutRoot className="movies-list-container">
        {data.map(({ posterUrl, title, id, mediaType }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + '...';
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
