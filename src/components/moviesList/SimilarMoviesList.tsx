import { useState, useRef, memo } from 'react';
import { motion } from 'framer-motion';

import SingleMovie from './SingleMovie';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { MediaType } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import { useGetSimilarMoviesQuery } from '../../store/slices/api/endpoints/getSimilarMovies';
import useDraggableList from '../../hooks/useDraggableList';
import useListenWindowWidth from '../../hooks/useListenWindowWidth';

type SimilarMoviesListProps = {
  itemID: string;
  itemMediaType: MediaType;
};

const SimilarMoviesList: React.FC<SimilarMoviesListProps> = ({
  itemID,
  itemMediaType,
}) => {
  const lang = useAppSelector(getCurrentLang);

  const [isDrag, setIsDrag] = useState(false);

  const moviesListRef = useRef<HTMLDivElement>(null);

  const {
    data: itemsList = [],
    isLoading,
    isError,
  } = useGetSimilarMoviesQuery({
    lang,
    itemID,
    itemMediaType,
  });

  const { control: animationControl, containerWidth: elementWidth } =
    useDraggableList({
      containerRef: moviesListRef,
      dataTrigger: itemsList,
    });

  const currentWindowWidth = useListenWindowWidth();

  if (isError) {
    return (
      <ErrorMessage
        errorMessage={'Request failed!'}
        componentMessage="Ошибка при загрузке списка"
        showImage={true}
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="similar-movies-list-wrapper">
      {itemsList.length > 0 && <h2>{lang === 'en' ? 'Similar' : 'Похожие'}</h2>}
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
        ref={moviesListRef}
        onDrag={() => setIsDrag(() => true)}
        onDragEnd={() => setIsDrag(() => false)}
      >
        {itemsList.map(({ posterUrl, title, id, mediaType }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + '...';
          }

          return (
            <SingleMovie
              key={id}
              poster={posterUrl}
              title={title}
              id={`${id}`}
              mediaType={mediaType}
              isDrag={isDrag}
              currentWindowWidth={currentWindowWidth}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default memo(SimilarMoviesList);
