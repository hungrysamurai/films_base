import { useState, useEffect, useRef } from "react";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";

import ErrorMessage from "../ErrorMessage";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentLang } from "../../store/slices/mainSlice";
import {
  getHomePageFilterGenre,
  getHomePageMediaType,
  setHomePageFilterGenre,
} from "../../store/slices/homePageParamsSlice";
import { useGetGenresQuery } from "../../store/slices/apiSlice";

const animate = (
  control: AnimationControls,
  genresListWidth: number,
  ref: React.RefObject<HTMLLIElement>
): void => {
  const el = ref.current as HTMLLIElement;

  control.start({
    x: genresListWidth / 2 - el.offsetLeft - el.scrollWidth,
    transition: {
      stiffness: 50,
      type: "spring",
    },
  });
};

const GenresList: React.FC = () => {
  const { dispatch: cDispatch } = useGlobalContext();

  const dispatch = useAppDispatch();
  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const mediaType = useAppSelector(getHomePageMediaType);
  const lang = useAppSelector(getCurrentLang);

  const {
    data: genresFetchedList = [],
    isLoading: genresFetchLoading,
    isError: genresFetchError,
    error,
  } = useGetGenresQuery({ mediaType, lang });

  const [genresListWidth, setGenresListWidth] = useState(0);

  const control = useAnimation();
  const genresListContainerRef = useRef<HTMLUListElement>(null);
  const allGenresElementRef = useRef<HTMLLIElement>(null);
  const activeGenreElementRef = useRef<HTMLLIElement>(null);

  // Set width of genres list container
  useEffect(() => {
    if (genresListContainerRef.current) {
      setGenresListWidth(() => {
        return (genresListContainerRef.current as HTMLUListElement).scrollWidth;
      });
    }
  }, [genresFetchedList, genresListWidth]);

  // Jump animation to 'all' element when media type changed
  useEffect(() => {
    if (
      allGenresElementRef.current &&
      !activeGenreElementRef.current &&
      genresListWidth !== 0
    ) {
      animate(control, genresListWidth, allGenresElementRef);
    }
  }, [mediaType, genresListWidth]);

  useEffect(() => {
    if (activeGenreElementRef.current && genresListWidth !== 0) {
      animate(control, genresListWidth, activeGenreElementRef);
    }
  }, [activeGenreElementRef.current, genresListWidth]);

  // Set current genre
  const setActiveGenre = (id: string) => {
    dispatch(setHomePageFilterGenre(id));

    cDispatch({
      type: MoviesListReducerActionTypes.SET_FILTER_GENRE,
      payload: `${id}`,
    });
  };

  if (genresFetchLoading) {
    return (
      <div className="genres-list-container">
        <h3>{lang === "ru" ? "Загрузка списка жанров" : "Loading..."}</h3>
      </div>
    );
  }

  if (genresFetchError) {
    return (
      <div className="genres-list-container">
        <ErrorMessage
          errorMessage={error.toString()}
          componentMessage={
            lang === "en"
              ? "Fail to load genres list"
              : "Ошибка при загрузке списка жанров"
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
          type: "spring",
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
              className={filterGenre === `${genre.id}` ? "active" : ""}
              ref={
                genre.id === ""
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
