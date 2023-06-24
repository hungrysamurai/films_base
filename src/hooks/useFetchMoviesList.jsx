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
  page,
  dispatch
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });
  const [loadedItemsIds, setLoadedItemsIds] = useState([]);

  const fetchMoviesList = useCallback(
    async (mediaType, lang, filterList, filterGenre, currentPage) => {
      setIsLoading(true);
      setError({
        show: false,
        message: "",
      });

      try {
        const response = await axios(
          `${apiBase}/${mediaType}/${filterList}?${apiKey}&page=${currentPage}&language=${lang}&with_genres=${filterGenre}`
        );
        // Check if there more movies
        if (response.data.total_pages === currentPage) {
          // if no more pages
          dispatch({ type: "SET_LAST_PAGE", payload: true });
        } else {
          dispatch({ type: "SET_LAST_PAGE", payload: false });
        }

        if (response.data.total_results === 0) {
          throw new Error(
            lang === "ru"
              ? "Нет результатов, удовлетворяющих заданным условиям"
              : "No matching results"
          );
        }

        const output = [];

        response.data.results.forEach((item) => {
          const outputObj = {
            posterUrl: item.poster_path
              ? imagesUrlBase + item.poster_path
              : "./assets/images/no-poster.jpg",
            title: item.title ? item.title : item.name,
            id: item.id,
          };

          if (currentPage === 1) {
            setLoadedItemsIds((arr) => {
              return [...arr, item.id];
            });
          }

          output.push(outputObj);
        });
        console.log(loadedItemsIds);
        if (currentPage === 1) {
          dispatch({ type: "INITIAL_LOAD_MOVIES", payload: output });
        } else {
          dispatch({ type: "APPEND_MOVIES", payload: output });
        }

        setIsLoading(false);
      } catch (err) {
        setError({
          show: true,
          message: err.message,
        });
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchMoviesList(mediaType, lang, filterList, filterGenre, page);
  }, [mediaType, lang, filterList, filterGenre, page, fetchMoviesList]);

  return { isLoading, error };
};
