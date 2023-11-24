import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import {MovieListItem, TVListItem} from "../utils/classes/moviesListItem";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchUserMoviesList = (lang, currentUserList) => {
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
        const output = [];
        for (let { id, mediaType } of currentUserList) {
          try {
            const movie = await axios(
              `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
            );
            const { data } = movie;
            output.push(new MovieListItem(imagesUrlBase, data, mediaType));
          } catch (err) {
            console.log(err);
          }
        }

        if (output.length === 0) {
          throw new Error(
            `${lang === "ru" ? "Этот список пуст" : "This list is empty"}`
          );
        }

        setData(() => output);

        setIsLoading(false);
      } catch (err) {
        setError({
          show: true,
          message: err.message,
        });
        setIsLoading(false);
      }
    },
    [currentUserList]
  );
  useEffect(() => {
    fetchMoviesList(lang);
  }, [fetchMoviesList, lang]);

  return { data, isLoading, error };
};
