import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const useFetchGenres = (mediaType, lang) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });

  const fetchGenresList = useCallback(async (mediaType, lang) => {
    setIsLoading(true);

    try {
      const { data } = await axios(
        `${apiBase}/genre/${mediaType}/list?${apiKey}&language=${lang}`
      );

      const all = { id: "all", name: lang === "ru" ? "Все" : "All" };

      setData(() => [all, ...data.genres]);

      setIsLoading(false);
    } catch (err) {
      
      setError({
        show: true,
        message: err.message,
      });

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('genres effect fires!');
    fetchGenresList(mediaType, lang);
  }, [mediaType, lang, fetchGenresList]);

  return { isLoading, error, data };
};
