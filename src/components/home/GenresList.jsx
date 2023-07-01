import { useState, useEffect, useRef } from "react";

import { motion, useAnimation } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";

import ErrorMessage from '../ErrorMessage';

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

  useEffect(() => {
    if (genresListContainerRef.current) {
      setGenresListWidth(() => {
        return genresListContainerRef.current.scrollWidth;
      });
    }

  }, [genresList, genresListWidth, control]);

  const setAndAnimateActiveGenre = (el, id) => {
    dispatch({ type: "SET_FILTER_GENRE", payload: `${id}` });

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
        errorMessage={genresFetchError.message} componentMessage='Ошибка при загрузке списка жанров' 
        showImage={false}/>

        {/* <h3 className="error-message">
          Ошибка при загрузке списка жанров:{" "}
          <span>{genresFetchError.message}</span>
        </h3> */}
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
