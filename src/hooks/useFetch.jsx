import { useState, useCallback } from "react";
import axios from "axios";


 const apiBase = 'https://api.themoviedb.org/3';
 const apiKey = 'api_key=582f9e2d6f3a1dc803b350bf76f168f2';

export const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    
  const fetchData = useCallback(async (url) => {

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

    const {data} = await axios(
      `${apiBase}/genre/${mediaType}/list?${apiKey}&language=${lang}`
    );

    return data.genres;
  },[]);


    return {loading, error, data,fetchGenresList}
}