import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w500`;

export const useFetchMoviesList = (
  mediaType,
  lang,
  filterList,
  filterGenre,
  page,
  dispatch
) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMoviesList = useCallback(
    async (mediaType, lang, filterList, filterGenre, currentPage) => {

      setIsLoading(true);

      try {

        const response = await axios(
          `${apiBase}/${mediaType}/${filterList}?${apiKey}&page=${currentPage}&language=${lang}&with_genres=${filterGenre}`
        );
        
        // Check if there more movies 
        if(response.data.total_pages === currentPage){
          // if no more pages
        dispatch({type: 'SET_LAST_PAGE', payload: true});
        return;
        } else {
         dispatch({type: 'SET_LAST_PAGE', payload: false});
        }

        if(response.data.total_results === 0){
          console.log('here');
            throw new Error('no resulte')
        }

        const output = [];

        response.data.results.forEach((item) => {
          const outputObj = {
            posterUrl: item.poster_path
              ? imagesUrlBase + item.poster_path
              : "./assets/images/no-poster.jpg",
            title: item.title ? item.title : item.name,
            id: item.id,
          };

          output.push(outputObj);
        });
    
        if(currentPage === 1){
          dispatch({type: 'INITIAL_LOAD_MOVIES', payload: output})
        } else {
          console.log('fires!');
          dispatch({type: 'APPEND_MOVIES', payload: output})
        }
        
        setIsLoading(false);

      } catch (err) {
        console.log(err.message);
        setError({
          show: true,
          message: err.message,
        });
        setIsLoading(false);
        throw new Error(err.message);
      }
    },
    []
  );

  useEffect(() => {
    fetchMoviesList(mediaType, lang, filterList, filterGenre, page);
  }, [mediaType, lang, filterList, filterGenre, page, fetchMoviesList]);

  return { isLoading, error };
};
