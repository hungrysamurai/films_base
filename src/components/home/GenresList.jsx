import { useState, useEffect, useRef, useLayoutEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";

const GenresList = () => {
  const {mediaType,lang, getGenresList} = useGlobalContext();

  const [genresList, setGenresList] = useState([]);
  const [genresListWidth, setGenresListWidth] = useState(0);
  const [activeGenre, setActiveGenre] = useState(99);

  const control = useAnimation();
  const genresListContainerRef = useRef(null);

  useEffect(() => {
    getGenresList()
    .then(genres => setGenresList(genres))
  }, [mediaType,lang, getGenresList]);

  useLayoutEffect(() => {
    if(genresListContainerRef.current.querySelectorAll('[data-genre]').length !==0){

       const defaultEl = Array.from(genresListContainerRef.current.querySelectorAll('[data-genre]')).filter(el => el.dataset.genre === '99')[0];
       
       getGenre(defaultEl, 99)
    }
     
    setGenresListWidth(genresListContainerRef.current.offsetWidth);

  }, [genresList]);


  const getGenre = (el, id) => {
    setActiveGenre(id);

    control.start({
      x: genresListWidth / 2 - el.offsetLeft - el.offsetWidth,
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
              onClick={(e) => getGenre(e.target, genre.id)}
              className={activeGenre === genre.id ? "active" : ""}
              data-genre={genre.id}
            >{`${genre.name[0].toUpperCase()}${genre.name.slice(1)}`}</li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default GenresList;
