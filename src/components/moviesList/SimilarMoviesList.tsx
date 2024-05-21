import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import SingleMovie from './SingleMovie';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { MediaType } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import { useGetSimilarMoviesQuery } from '../../store/slices/api/apiSlice';
import useDraggableContainer from '../../hooks/useDraggableContainer';

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
    useDraggableContainer({
      containerRef: moviesListRef,
      dataTrigger: itemsList,
      startAnimation: { x: 0 },
      additionalTriggers: [],
    });

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
        initial={{
          x: '50%',
        }}
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
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default SimilarMoviesList;
