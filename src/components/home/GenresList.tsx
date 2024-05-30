import { memo, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import {
  getHomePageFilterGenre,
  getHomePageMediaType,
  setHomePageFilterGenre,
} from '../../store/slices/homePageParamsSlice';
import { useGetGenresQuery } from '../../store/slices/api/endpoints/getGenres';

import useDraggableList from '../../hooks/useDraggableList';

import ErrorMessage from '../ErrorMessage';

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
  const activeGenreElementRef = useRef<HTMLLIElement | null>(null);

  const { containerWidth: genresListWidth, control } = useDraggableList({
    containerRef: genresListContainerRef,
    dataTrigger: genresFetchedList,
    defaultElementRef: allGenresElementRef,
    activeElementRef: activeGenreElementRef,
    additionalTriggers: [mediaType],
  });

  // Set current genre
  const setActiveGenre = useCallback(
    (id: string, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      activeGenreElementRef.current = e.target as HTMLLIElement;
      dispatch(setHomePageFilterGenre(id));
    },
    [dispatch],
  );

  const genresElements = useMemo(
    () =>
      genresFetchedList.map((genre) => {
        const isActive = filterGenre === `${genre.id}`;
        return (
          <li
            key={genre.id}
            onClick={(e) => setActiveGenre(genre.id.toString(), e)}
            className={isActive ? 'active' : ''}
            ref={
              genre.id === ''
                ? allGenresElementRef
                : isActive
                ? activeGenreElementRef
                : null
            }
          >
            {`${genre.name[0].toUpperCase()}${genre.name.slice(1)}`}
          </li>
        );
      }),
    [genresFetchedList, filterGenre, setActiveGenre],
  );

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
        {genresElements}
      </motion.ul>
    </div>
  );
};

export default memo(GenresList);
