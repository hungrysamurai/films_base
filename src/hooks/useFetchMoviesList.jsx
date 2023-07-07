import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchMoviesList = (
  mediaType,
  lang,
  filterList,
  filterGenre,
  page,
  searchQuery,
  moviesListMode,
  dispatch
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });

  const fetchMoviesList = useCallback(
    async (mediaType, lang, filterList, filterGenre, currentPage, searchQuery) => {
  
      setIsLoading(true);
      setError({
        show: false,
        message: "",
      });
      
      try {
        let response;

        if (moviesListMode === "home") {
          response = await axios(
            `${apiBase}/${mediaType}/${filterList}?${apiKey}&page=${currentPage}&language=${lang}&with_genres=${filterGenre}`
          );
        } else if (moviesListMode === "search") {
          response = await axios(
            `${apiBase}/search/${mediaType}?${apiKey}&query=${searchQuery}&page=${currentPage}&language=${lang}`
          );
        } 

        if (response.data.total_results === 0) {
          throw new Error(
            lang === "ru"
              ? "Нет результатов, удовлетворяющих заданным условиям"
              : "No matching results"
          );
        }

        const output = [];
        const ids = [];

        response.data.results.forEach((item) => {
          const outputObj = {
            posterUrl: item.poster_path
              ? imagesUrlBase + item.poster_path
              : "/assets/images/no-poster.jpg",
            title: item.title ? item.title : item.name,
            id: item.id,
            mediaType: mediaType
          };

          if (currentPage === 1) {
            ids.push(item.id);
          }

          output.push(outputObj);
        });

        if (currentPage === 1) {
          // If amount of pages is more than 500 - set to 500 (API restrictions)
          const pagesNum =
            response.data.total_pages > 500 ? 500 : response.data.total_pages;

          const initialData = [output, ids, pagesNum];
          dispatch({ type: "INITIAL_LOAD_MOVIES", payload: initialData });
        } else {
          const initialData = [output, ids];
          dispatch({ type: "APPEND_MOVIES", payload: initialData });
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
