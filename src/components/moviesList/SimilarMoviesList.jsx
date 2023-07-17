import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { motion, AnimatePresence, useAnimation } from "framer-motion";

import { useFetchSimilarMoviesList } from "../../hooks/useFetchSimilarMoviesList";

import { useGlobalContext } from "../../contexts/GlobalContext";
import { useState, useEffect, useRef } from "react";

const SimilarMoviesList = ({ itemID, itemMediaType }) => {
  const { lang } = useGlobalContext();

  const [elementWidth, setElementWidth] = useState(0);

  const [isDrag, setIsDrag] = useState(false);
  const moviesListRef = useRef(null);
  const animationControl = useAnimation();

  const {
    data: moviesFetchList,
    isLoading: moviesFetchLoading,
    error: moviesFetchError,
  } = useFetchSimilarMoviesList(lang, itemID, itemMediaType);

  useEffect(() => {
    if (moviesListRef.current) {
      setElementWidth(() => {
        return moviesListRef.current.scrollWidth;
      });

      animationControl.start({
        x: 0,
      });
    }
  }, [moviesFetchList, animationControl, elementWidth]);

  if (moviesFetchError.show) {
    return (
      <ErrorMessage
        errorMessage={moviesFetchError.message}
        componentMessage="Ошибка при загрузке списка"
        showImage={true}
      />
    );
  }

  if (moviesFetchLoading) {
    return <Loader />;
  }

  return (
    <div className="similar-movies-list-wrapper">
      {moviesFetchList.length > 0 && (
        <h2>{lang === "en" ? "Similar" : "Похожие"}</h2>
      )}
      <motion.div
        layout
        layoutRoot
        className="movies-list-container similar"
        drag="x"
        dragConstraints={{
          left: (elementWidth / 1.2) * -1,
          right: elementWidth / 1.2,
        }}
        animate={animationControl}
        initial={{
          x: "50%",
        }}
        ref={moviesListRef}
        onDrag={() => setIsDrag(() => true)}
        onDragEnd={() => setIsDrag(() => false)}
      >
        {moviesFetchList.map(({ posterUrl, title, id, mediaType }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + "...";
          }

          return (
            <AnimatePresence key={id}>
              <SingleMovie
                poster={posterUrl}
                title={title}
                id={id}
                mediaType={mediaType}
                isDrag={isDrag}
              />
              ;
            </AnimatePresence>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SimilarMoviesList;
