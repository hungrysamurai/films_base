import {
  Lang,
  MediaType,
  MovieFilterListTerm,
  TVFilterListTerm,
  MoviesListMode,
} from "../types";

import { useState, useCallback, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { MovieListItem, TVListItem } from "../utils/classes/moviesListItem";
import { filterListQueries } from "../utils/getFilterListQuery";
import {
  MoviesListReducerAction,
  MoviesListReducerActionTypes,
} from "../reducers/moviesListReducer";

const apiBase: string = import.meta.env.VITE_TMDB_API_BASE;
const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase: string = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchMoviesList = (
  mediaType: MediaType,
  lang: Lang,
  filterList: MovieFilterListTerm | TVFilterListTerm,
  filterGenre: string,
  page: number,
  searchQuery: string,
  moviesListMode: MoviesListMode,
  dispatch: React.Dispatch<MoviesListReducerAction>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchDataError>({
    show: false,
    message: "",
  });

  const fetchMoviesList = useCallback(
    async (
      mediaType: MediaType,
      lang: Lang,
      filterList: MovieFilterListTerm | TVFilterListTerm,
      filterGenre: string,
      currentPage: number,
      searchQuery: string
    ) => {
      setIsLoading(true);
      setError({
        show: false,
        message: "",
      });

      try {
        let response: AxiosResponse<FetchedListData>;

        if (moviesListMode === "home") {
          response = await axios(
            `${apiBase}/discover/${mediaType}?&page=${currentPage}&language=${lang}&with_genres=${filterGenre}&${filterListQueries[mediaType][filterList]}&${apiKey}`
          );
        } else {
          response = await axios(
            `${apiBase}/search/${mediaType}?${apiKey}&query=${searchQuery}&page=${currentPage}&language=${lang}`
          );
        }

        const { data: fetchedData } = response;

        if (fetchedData.total_results === 0) {
          throw new Error(
            lang === "ru"
              ? "Нет результатов, удовлетворяющих заданным условиям"
              : "No matching results"
          );
        }

        const output: MovieListItem[] | TVListItem[] = [];
        const ids: number[] = [];

        fetchedData.results.forEach(
          (item: FetchedListItemMovie | FetchedListItemTV) => {
            if (mediaType === MediaType.Movie) {
              output.push(new MovieListItem(imagesUrlBase, item, mediaType));
            } else if (mediaType === MediaType.TV) {
              output.push(new TVListItem(imagesUrlBase, item, mediaType));
            }
            if (currentPage === 1) {
              ids.push(item.id as number);
            }
          }
        );

        if (currentPage === 1) {
          // If amount of pages is more than 500 - set to 500 (API restrictions)
          const pagesNum =
            fetchedData.total_pages > 500 ? 500 : fetchedData.total_pages;

          const initialData: FetchedListInitialData = [output, ids, pagesNum];
          dispatch({
            type: MoviesListReducerActionTypes.INITIAL_LOAD_MOVIES,
            payload: initialData,
          });
        } else {
          const initialData: FetchedListInitialData = [output, ids];
          dispatch({
            type: MoviesListReducerActionTypes.APPEND_MOVIES,
            payload: initialData,
          });
        }

        setIsLoading(false);
      } catch (err) {
        setError({
          show: true,
          message: (err as AxiosError).message,
        });
        setIsLoading(false);
      }
    },
    [dispatch, moviesListMode]
  );

  useEffect(() => {
    fetchMoviesList(
      mediaType,
      lang,
      filterList,
      filterGenre,
      page,
      searchQuery
    );
  }, [
    mediaType,
    lang,
    filterList,
    filterGenre,
    page,
    fetchMoviesList,
    searchQuery,
  ]);

  return { isLoading, error };
};
