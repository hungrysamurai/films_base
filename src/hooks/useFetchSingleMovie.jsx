import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import SingleMovieData from "../utils/classes/singleMovieData";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}original`;

export const useFetchSingleMovie = (mediaType, lang, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState({ show: false, message: "" });

  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState({ show: false, message: "" });

  const [videos, setVideos] = useState([]);
  const [videosError, setVideosError] = useState({ show: false, message: "" });

  const fetchSingleMovie = useCallback(async (mediaType, lang, id) => {
    setIsLoading(true);

    // Clean states before fetch
    setVideos(() => []);
    setData(() => []);
    setImages(() => []);

    // Fetch data
    try {
      const { data } = await axios(
        `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
      );

      setData(() => new SingleMovieData(data, lang, imagesUrlBase, mediaType));
    } catch (err) {
      setDataError(() => {
        return {
          show: true,
          message: err.message,
        };
      });
    }

    // Fetch images
    try {
      const {
        data: { backdrops },
      } = await axios(`${apiBase}/${mediaType}/${id}/images?${apiKey}`);

      // Build images gallery array
      const imagesPaths = [];

      if (backdrops.length > 20) {
        backdrops.splice(20);
      }

      backdrops.forEach((backdropObj) => {
        imagesPaths.push(imagesUrlBase + backdropObj.file_path);
      });

      setImages(() => imagesPaths);
    } catch (err) {
      setImagesError(() => {
        return {
          show: true,
          message: err.message,
        };
      });
    }

    // Fetch videos
    try {
      const {
        data: { results },
      } = await axios(
        `${apiBase}/${mediaType}/${id}/videos?${apiKey}&language=${lang}`
      );

      // Build videos array
      if (results.length !== 0) {
        const videoKeys = [];

        const trailers = results.filter(
          (item) => item.type === "Trailer" && item.site === "YouTube"
        );

        if (trailers.length !== 0) {
          trailers.forEach((trailer) => {
            videoKeys.push(trailer.key);
          });
        }

        setVideos(() => videoKeys);
      }
    } catch (err) {
      setVideosError(() => {
        return {
          show: true,
          message: err.message,
        };
      });
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSingleMovie(mediaType, lang, id);
  }, [mediaType, lang, id, fetchSingleMovie]);

  return {
    isLoading,
    dataError,
    imagesError,
    videosError,
    data,
    images,
    videos,
  };
};
