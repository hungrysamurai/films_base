import { useRef } from 'react';
import { motion } from 'framer-motion';

import ErrorMessage from '../ErrorMessage';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import {
  getHomePageFilterGenre,
  getHomePageMediaType,
  setHomePageFilterGenre,
} from '../../store/slices/homePageParamsSlice';
import { useGetGenresQuery } from '../../store/slices/api/apiSlice';
import useDraggableList from '../../hooks/useDraggableList';

const GenresList: React.FC = () => {
  const dispatch = useAppDispatch();

  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const mediaType = useAppSelector(getHomePageMediaType);
  const lang = useAppSelector(getCurrentLang);

  const {
    data: genresFetchedList = [],
    isLoading,
    isError,
  } = useGetGenresQuery({ mediaType, lang });

  const genresListContainerRef = useRef<HTMLUListElement>(null);
  const allGenresElementRef = useRef<HTMLLIElement>(null);
  const activeGenreElementRef = useRef<HTMLLIElement>(null);

  const { containerWidth: genresListWidth, control } = useDraggableList({
    containerRef: genresListContainerRef,
    dataTrigger: genresFetchedList,
    defaultElementRef: allGenresElementRef,
    activeElementRef: activeGenreElementRef,
    additionalTriggers: [mediaType],
  });

  // Set current genre
  const setActiveGenre = (id: string) => {
    dispatch(setHomePageFilterGenre(id));
  };

  if (isLoading) {
    return (
      <div className="genres-list-container">
        <h3>{lang === 'ru' ? 'Загрузка списка жанров' : 'Loading...'}</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="genres-list-container">
        <ErrorMessage
          errorMessage={'Request failed'}
          componentMessage={
            lang === 'en'
              ? 'Fail to load genres list'
              : 'Ошибка при загрузке списка жанров'
          }
          showImage={false}
        />
      </div>
    );
  }

  return (
    <div className="genres-list-container">
      <motion.ul
        ref={genresListContainerRef}
        drag="x"
        dragConstraints={{
          left: (genresListWidth / 2) * -1,
          right: genresListWidth / 2,
        }}
        animate={control}
        transition={{
          stiffness: 100,
          type: 'spring',
        }}
        initial={{
          x: activeGenreElementRef.current?.offsetLeft,
        }}
      >
        {genresFetchedList.map((genre) => {
          return (
            <li
              key={genre.id}
              onClick={() => setActiveGenre(genre.id.toString())}
              className={filterGenre === `${genre.id}` ? 'active' : ''}
              ref={
                genre.id === ''
                  ? allGenresElementRef
                  : filterGenre === genre.id.toString()
                  ? activeGenreElementRef
                  : null
              }
            >
              {`${genre.name[0].toUpperCase()}${genre.name.slice(1)}`}
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default GenresList;
