import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w300`;

export const useFetchCustomMoviesList = (
  lang,
  moviesListMode,
  currentUserList,
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
       let response;

       if (moviesListMode === "userList") {    
          response = {
            data: {
              results: [],
              total_pages: 1,
            },
            total_results: currentUserList.length,
          };
    
          for (let { id, mediaType } of currentUserList) {
            try{
            const movie = await axios(
              `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
              );
              movie.data.mediaType = mediaType;
              response.data.results.push(movie.data);
            } catch (err){
              console.log(err);
            }
          }
          
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
              : "/assets/images/no-poster.jpg",
            title: item.title ? item.title : item.name,
            id: item.id,
            mediaType: item.mediaType
          };

          output.push(outputObj);
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
    }, [moviesListMode, currentUserList]
)
  useEffect(() => {
    fetchMoviesList(lang);
  }, [fetchMoviesList, lang]);

  return { data, isLoading, error };
};
