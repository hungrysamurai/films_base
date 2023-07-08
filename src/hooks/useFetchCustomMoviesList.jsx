import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import MoviesListItem from "../utils/classes/moviesListItem";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchCustomMoviesList = (
  lang,
  moviesListMode,
  { currentUserList, movieId, movieMediaType }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });
  const [data, setData] = useState([]);

  const fetchMoviesList = useCallback(
    async (lang) => {
      setIsLoading(true);

      setError({
        show: false,
        message: "",
      });

      try {
        if (moviesListMode === "userList") {
          const output = [];

          for (let { id, mediaType } of currentUserList) {
            try {
              const movie = await axios(
                `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
              );
              const { data } = movie;
              output.push(new MoviesListItem(imagesUrlBase, data, mediaType));
            } catch (err) {
              console.log(err);
            }
          }
          setData(() => output);
        } else if (moviesListMode === "similar") {
          const response = await axios(
            `${apiBase}/${movieMediaType}/${movieId}/similar?${apiKey}&language=${lang}`
          );

          const output = [];

          response.data.results.forEach((item) => {
            output.push(
              new MoviesListItem(imagesUrlBase, item, movieMediaType)
            );
          });

          setData(() => output);
        }

        // if (response.data.total_results === 0) {
        //   throw new Error(
        //     lang === "ru"
        //       ? "Нет результатов, удовлетворяющих заданным условиям"
        //       : "No matching results"
        //   );
        // }
        setIsLoading(false);
      } catch (err) {
        setError({
          show: true,
          message: err.message,
        });
        setIsLoading(false);
      }
    },
    [moviesListMode, currentUserList, movieId, movieMediaType]
  );
  useEffect(() => {
    fetchMoviesList(lang);
  }, [fetchMoviesList, lang]);

  return { data, isLoading, error };
};
