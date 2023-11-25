import { useState, useCallback, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { MovieListItem, TVListItem } from "../utils/classes/moviesListItem";
import { Lang, MediaType } from "../types";

const apiBase: string = import.meta.env.VITE_TMDB_API_BASE;
const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase: string = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchSimilarMoviesList = (
  lang: Lang,
  itemID: string,
  itemMediaType: MediaType
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
        const response: AxiosResponse<FetchedListData> = await axios(
          `${apiBase}/${itemMediaType}/${itemID}/similar?${apiKey}&language=${lang}`
        );

        const { data: fetchedData } = response;
        const output: MovieListItem[] | TVListItem[] = [];

        fetchedData.results.forEach((item) => {
          if (itemMediaType === MediaType.Movie) {
            output.push(new MovieListItem(imagesUrlBase, item, itemMediaType));
          } else if (itemMediaType === MediaType.TV) {
            output.push(new TVListItem(imagesUrlBase, item, itemMediaType));
          }
        });

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
    [itemID, itemMediaType]
  );
  useEffect(() => {
    fetchMoviesList(lang);
  }, [fetchMoviesList, lang]);

  return { data, isLoading, error };
};
