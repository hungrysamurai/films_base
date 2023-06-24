import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";

import { motion, useAnimation } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";

const GenresList = () => {
  const {
    genresFetchLoading,
    genresFetchError,
    genresFetchedList,
    filterGenre,
    dispatch,
    lang,
  } = useGlobalContext();

  const [genresList, setGenresList] = useState([]);
  const [genresListWidth, setGenresListWidth] = useState(0);

  const control = useAnimation();

  const genresListContainerRef = useRef(null);
  const firstGenreListEl = useRef(null);

  useEffect(() => {
    setGenresList(genresFetchedList);
  }, [genresFetchedList]);

  useLayoutEffect(() => {
    if (genresListContainerRef.current) {
      setGenresListWidth(() => {
        return genresListContainerRef.current.offsetWidth;
      });
    }

    if (firstGenreListEl.current) {
      control.start({
        x: genresListWidth / 2,
      });
    }
  }, [genresList, genresListWidth, control]);

  const setAndAnimateActiveGenre = (el, id) => {
    dispatch({ type: "SET_FILTER_GENRE", payload: `${id}` });

    control.start({
      x: genresListWidth / 2 - el.offsetLeft - el.offsetWidth,
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
        <h3 className="error-message">
          Ошибка при загрузке списка жанров:{" "}
          <span>{genresFetchError.message}</span>
        </h3>
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
      >
        {genresList.map((genre) => {
          return (
            <li
              key={genre.id}
              onClick={(e) => setAndAnimateActiveGenre(e.target, genre.id)}
              className={filterGenre === `${genre.id}` ? "active" : ""}
              ref={genre.id === "all" ? firstGenreListEl : null}
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
