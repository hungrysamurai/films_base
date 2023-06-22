import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w500`;

export const useFetchMoviesList = (
  mediaType,
  lang,
  filterList,
  filterGenre,
  currentPage
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMoviesList = useCallback(
    async (mediaType, lang, filterList, filterGenre, currentPage) => {
      setIsLoading(true);
      try {
        const response = await axios(
          `${apiBase}/${mediaType}/${filterList}?${apiKey}&page=${currentPage}&language=${lang}&with_genres=${filterGenre}`
        );
        console.log(currentPage);
        const output = [];

        response.data.results.forEach((item) => {
          const outputObj = {
            posterUrl: item.poster_path
              ? imagesUrlBase + item.poster_path
              : "./assets/images/no-poster.jpg",
            title: item.title ? item.title : item.name,
            id: item.id,
          };

          output.push(outputObj);
        });
        console.log("fetched some movies");
        setData(output);
        setIsLoading(false);
      } catch (err) {
        setError({
          show: true,
          message: err.message,
        });
        setIsLoading(false);
        throw new Error(err.message);
      }
    },
    []
  );

  useEffect(() => {
    fetchMoviesList(mediaType, lang, filterList, filterGenre, currentPage);
  }, [mediaType, lang, filterList, filterGenre, fetchMoviesList, currentPage]);

  return { isLoading, error, data };
};
