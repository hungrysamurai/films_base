import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useFetchGenres } from "../../hooks/useFetchGenres";

import ErrorMessage from "../ErrorMessage";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentLang } from "../../store/slices/mainSlice";
import {
  getHomePageFilterGenre,
  setHomePageFilterGenre,
} from "../../store/slices/homePageParamsSlice";

const GenresList: React.FC = () => {
  const {
    filterGenre: cFilterGenre,
    mediaType: cMediaType,
    dispatch: cDispatch,
  } = useGlobalContext();

  const dispatch = useAppDispatch();
  const filterGenre = useAppSelector(getHomePageFilterGenre);
  const lang = useAppSelector(getCurrentLang);

  const {
    isLoading: genresFetchLoading,
    error: genresFetchError,
    data: genresFetchedList,
  } = useFetchGenres(cMediaType, lang);

  const [genresListWidth, setGenresListWidth] = useState(0);

  const control = useAnimation();
  const genresListContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (genresListContainerRef.current) {
      setGenresListWidth(() => {
        return (genresListContainerRef.current as HTMLUListElement).scrollWidth;
      });
    }
  }, [genresFetchedList, genresListWidth, control]);

  const setAndAnimateActiveGenre = (el: HTMLLIElement, id: string) => {
    dispatch(setHomePageFilterGenre(id));

    cDispatch({
      type: MoviesListReducerActionTypes.SET_FILTER_GENRE,
      payload: `${id}`,
    });

    control.start({
      x: genresListWidth / 2 - el.offsetLeft - el.scrollWidth,
      transition: {
        stiffness: 50,
        type: "spring",
      },
    });
  };

  if (genresFetchLoading) {
    return (
      <div className="genres-list-container">
        <h3>{lang === "ru" ? "Загрузка списка жанров" : "Loading..."}</h3>
      </div>
    );
  }

  if (genresFetchError.show) {
    return (
      <div className="genres-list-container">
        <ErrorMessage
          errorMessage={genresFetchError.message}
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
          x: "50%",
        }}
      >
        {genresFetchedList.map((genre) => {
          return (
            <li
              key={genre.id}
              onClick={(e) =>
                setAndAnimateActiveGenre(
                  e.target as HTMLLIElement,
                  genre.id.toString()
                )
              }
              className={cFilterGenre === `${genre.id}` ? "active" : ""}
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
