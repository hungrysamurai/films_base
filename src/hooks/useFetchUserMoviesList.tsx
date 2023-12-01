import { useState, useCallback, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { MovieListItem, TVListItem } from "../utils/classes/moviesListItem";
import { Lang, MediaType } from "../types";

const apiBase: string = import.meta.env.VITE_TMDB_API_BASE;
const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase: string = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchUserMoviesList = (
  lang: Lang,
  currentUserList: UserItemsLists
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchDataError>({
    show: false,
    message: "",
  });
  const [data, setData] = useState<MovieListItem[] | TVListItem[]>([]);

  const fetchMoviesList = useCallback(
    async (lang: Lang) => {
      setIsLoading(true);

      setError({
        show: false,
        message: "",
      });

      try {
        const output: MovieListItem[] | TVListItem[] = [];

        for (let { id, mediaType } of currentUserList) {
          try {
            const movie: AxiosResponse<FetchedMovieData | FetchedTVData> =
              await axios(
                `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
              );

            const { data } = movie;
            if (mediaType === MediaType.Movie) {
              output.push(new MovieListItem(imagesUrlBase, data, mediaType));
            } else if (mediaType === MediaType.TV) {
              output.push(new TVListItem(imagesUrlBase, data, mediaType));
            }
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
          message: (err as AxiosError).message,
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
