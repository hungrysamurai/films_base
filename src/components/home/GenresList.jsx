import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const GenresList = () => {
  const [genresList, setGenresList] = useState([]);
  const [genresListWidth, setGenresListWidth] = useState(0);
  const [activeGenre, setActiveGenre] = useState(99);

  const control = useAnimation();
  const genresListContainerRef = useRef(null);

  const fetchGenres = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=582f9e2d6f3a1dc803b350bf76f168f2&language=ru"
    );
    const data = await response.json();
    setGenresList(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useLayoutEffect(() => {
    setGenresListWidth(genresListContainerRef.current.offsetWidth);
  }, [genresList]);

  const getGenre = (e, id) => {
    console.log(e.target.offsetLeft, e.target.offsetWidth);
    setActiveGenre(id);
    control.start({
      x: genresListWidth / 2 - e.target.offsetLeft - e.target.offsetWidth,
    });
  };

  return (
    <motion.div
      className="genres-list-container"
      animate={{
        y: 0,
        opacity: 1,
      }}
      initial={{
        y: -30,
        opacity: 0,
      }}
    >
      <motion.ul
        ref={genresListContainerRef}
        drag="x"
        dragConstraints={{
          left: (genresListWidth / 2) * -1,
          right: genresListWidth / 2,
        }}
        animate={control}
        initial={{
          x: 394,
        }}
      >
        {genresList.map((genre) => {
          return (
            <li
              key={genre.id}
              onClick={(e) => getGenre(e, genre.id)}
              className={activeGenre === genre.id ? "active" : ""}
            >{`${genre.name[0].toUpperCase()}${genre.name.slice(1)}`}</li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default GenresList;
