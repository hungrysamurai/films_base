import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";

import { motion, useAnimation } from "framer-motion";
import { useGlobalContext } from "../../contexts/GlobalContext";

const GenresList = () => {
  const { getGenresList, filterGenre, setFilterGenre} = useGlobalContext();

  const [genresList, setGenresList] = useState([]);
  const [genresListWidth, setGenresListWidth] = useState(0);

  const control = useAnimation();

  const genresListContainerRef = useRef(null);
  const firstGenreListEl = useRef(null);


  useEffect(() => {
    getGenresList()
    .then(genres => {
      setGenresList(genres); 
    });
  }, [getGenresList]);

  useLayoutEffect(() => {
    if(genresListContainerRef.current) {
        setGenresListWidth(() => {
          return genresListContainerRef.current.offsetWidth
    });
    }
  
    if(firstGenreListEl.current){
    control.start({
      x: genresListWidth / 2
    });
    }
    
  }, [genresList, genresListWidth, control]);


  const setAndAnimateActiveGenre = (el, id) => {
    setFilterGenre(`${id}`);

    control.start({
      x: genresListWidth / 2 - el.offsetLeft - el.offsetWidth,
    });
    
  };

  return (
    <div className="genres-list-container" >
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

             ref={genre.id === 'all' ? firstGenreListEl : null}>
              {`${genre.name[0].toUpperCase()}${genre.name.slice(1)}`}
              </li>
          );
        })}
      </motion.ul>

    </div>
  );
};

export default GenresList;
