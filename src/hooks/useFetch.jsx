import { useState, useCallback } from "react";
import axios from "axios";


 const apiBase = 'https://api.themoviedb.org/3';
 const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const useFetch = () => {
    const [genresFetchLoading, setGenresFetchLoading] = useState(false);
    const [genresFetchError, setGenresFetchError] = useState(
  { show: false, 
    msg: '',
  }
 );
    const [data, setData] = useState(null);

    
  const fetchMoviesList = useCallback(async (url) => {

      setLoading(true);

      try {
          const response = await fetch(url);

          if (!response.ok) {
              throw new Error(`Could not fetch ${url}, status: ${response.status}`);
          }

          const data = await response.json();

          setLoading(false);
          setData(data)
      } catch(e) {
          setLoading(false);
          setError(e.message);
          throw e;
      }
  }, []);

    const fetchGenresList = useCallback(async (mediaType,lang) => {


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


    return {genresFetchLoading, genresFetchError,fetchGenresList}
}