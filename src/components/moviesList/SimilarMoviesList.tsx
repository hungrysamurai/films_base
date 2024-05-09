import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useFetchSimilarMoviesList } from "../../hooks/useFetchSimilarMoviesList";

import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { MediaType } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { getCurrentLang } from "../../store/slices/mainSlice";

type SimilarMoviesListProps = {
  itemID: string;
  itemMediaType: MediaType;
};

const SimilarMoviesList: React.FC<SimilarMoviesListProps> = ({
  itemID,
  itemMediaType,
}) => {
  const lang = useAppSelector(getCurrentLang);

  const [elementWidth, setElementWidth] = useState(0);

  const [isDrag, setIsDrag] = useState(false);
  const moviesListRef = useRef<HTMLDivElement>(null);
  const animationControl = useAnimation();

  const {
    data: moviesFetchList,
    isLoading: moviesFetchLoading,
    error: moviesFetchError,
  } = useFetchSimilarMoviesList(lang, itemID, itemMediaType);

  useEffect(() => {
    if (moviesListRef.current) {
      setElementWidth(() => {
        return (moviesListRef.current as HTMLDivElement).scrollWidth;
      });

      animationControl.start({
        x: 0,
      });
    }
  }, [moviesFetchList, animationControl]);

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
            <SingleMovie
              key={id}
              poster={posterUrl}
              title={title}
              id={`${id}`}
              mediaType={mediaType}
              isDrag={isDrag}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default SimilarMoviesList;
