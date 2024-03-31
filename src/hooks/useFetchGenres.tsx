import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Lang, MediaType } from "../types";

const apiBase: string = import.meta.env.VITE_TMDB_API_BASE;
const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;

export const useFetchGenres = (mediaType: MediaType, lang: Lang) => {
  const [data, setData] = useState<GenreData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchDataError>({
    show: false,
    message: "",
  });

  const fetchGenresList = useCallback(
    async (mediaType: MediaType, lang: Lang) => {
      setIsLoading(true);

      try {
        const { data }: AxiosResponse<FetchedGenresMovieList> = await axios(
          `${apiBase}/genre/${mediaType}/list?${apiKey}&language=${lang}`
        );
        const genres: GenreData[] = [];

        const all: GenreData = {
          id: "",
          name: lang === "ru" ? "Все" : "All",
        };

        genres.push(all);
        if (data.genres) {
          data.genres.forEach((g) => genres.push(g as GenreData));
        }

        setData(() => genres);

        setIsLoading(false);
      } catch (err) {
        setError({
          show: true,
          message: (err as AxiosError).message,
        });

        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchGenresList(mediaType, lang);
  }, [mediaType, lang, fetchGenresList]);

  return { isLoading, error, data };
};
