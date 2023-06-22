import { useState, useCallback } from "react";
import axios from "axios";


 const apiBase = 'https://api.themoviedb.org/3';
 const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const useFetch = () => { 

  const [genresFetchError, setGenresFetchError] = useState(
  { show: false, 
    msg: '',
  }
 );

  const fetchGenresList = useCallback(async (mediaType,lang) => {
console.log('fires');
      try {

  const {data} = await axios(
      `${apiBase}/genre/${mediaType}/list?${apiKey}&language=${lang}`
    );
    
    return data.genres;

      } catch (err) {

         setGenresFetchError({
          show: true,
          message: err.message,
        });

        throw new Error(err.message);
      }
  },[]);

  const fetchMoviesList = useCallback(async (mediaType, filterList,page, lang, genre) => {

  },[])

    return {fetchGenresList, genresFetchError,}
}