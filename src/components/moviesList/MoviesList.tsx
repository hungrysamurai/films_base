import { useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SingleMovie from './SingleMovie';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

import { useAppDispatch } from '../../store/hooks';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

type MoviesListProps = {
  increasePageCount: () => void;
  moviesList: MoviesListItemProps[];
  currentPage: number;
  totalPages: number;
  lastActiveItem: string;
  setLastActiveItem: ActionCreatorWithPayload<string>;
  isError: boolean;
  isFetching: boolean;
};

const MoviesList: React.FC<MoviesListProps> = ({
  increasePageCount,
  moviesList,
  currentPage,
  totalPages,
  lastActiveItem,
  setLastActiveItem,
  isError,
  isFetching,
}) => {
  const dispatch = useAppDispatch();

  // Scroll to element
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }
  }, []);

  useInfiniteScroll(currentPage, totalPages, increasePageCount, isError);

  if (isError) {
    return (
      <ErrorMessage
        errorMessage={'Request Failed'}
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
            title = title.slice(0, 35) + '...';
          }

          return (
            <AnimatePresence key={id}>
              {/* div for restore scroll */}
              <div
                onClick={() => dispatch(setLastActiveItem(id.toString()))}
                ref={`${id}` === lastActiveItem ? scrollRef : null}
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

      {isFetching && <Loader />}
    </>
  );
};

export default MoviesList;
