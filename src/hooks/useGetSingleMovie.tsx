import { useEffect, useState } from 'react';
import {
  useGetSingleMovieDataQuery,
  useGetSingleMovieImagesQuery,
  useGetSingleMovieVideosQuery,
} from '../store/slices/api/apiSlice';
import { Lang, MediaType } from '../types';

interface UseGetSingleMovieParams {
  mediaType: MediaType;
  lang: Lang;
  id: string;
}

function useGetSingleMovie({ mediaType, lang, id }: UseGetSingleMovieParams) {
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    isFetching,
  } = useGetSingleMovieDataQuery({ mediaType, lang, id });

  const {
    data: images = [],
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useGetSingleMovieImagesQuery({
    mediaType,
    id,
  });

  const {
    data: videos = [],
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useGetSingleMovieVideosQuery({ mediaType, lang, id });

  useEffect(() => {
    if (!isDataLoading && !isImagesLoading && !isVideosLoading && !isFetching) {
      setIsLoading(() => false);
    } else {
      setIsLoading(() => true);
    }
  }, [isDataLoading, isImagesLoading, isFetching, isVideosLoading]);

  return {
    data,
    images,
    videos,
    isLoading,
    isDataError,
    isImagesError,
    isVideosError,
  };
}

export default useGetSingleMovie;
