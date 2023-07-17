import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import MoviesListItem from "../utils/classes/moviesListItem";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w500`;

export const useFetchSimilarMoviesList = (
  lang,
  itemID, 
  itemMediaType
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
        
          const response = await axios(
            `${apiBase}/${itemMediaType}/${itemID}/similar?${apiKey}&language=${lang}`
          );

          const output = [];

          response.data.results.forEach((item) => {
            output.push(
              new MoviesListItem(imagesUrlBase, item, itemMediaType)
            );
          });

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
    [itemID, itemMediaType]
  );
  useEffect(() => {
    fetchMoviesList(lang);
  }, [fetchMoviesList, lang]);

  return { data, isLoading, error };
};
