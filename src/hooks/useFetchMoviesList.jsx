import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w500`;

export const useFetchMoviesList = (
  mediaType,
  lang,
  filterList,
  filterGenre
) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [pageIndex, setPageIndex] = useState(1);
  const [newMovies, setNewMovies] = useState(true);

  const fetchMoviesList = useCallback(
    async (mediaType, lang, filterList, filterGenre, currentPage) => {
      setIsLoading();
      try {
        console.log(`fetched ${apiBase}/${mediaType}/${filterList}?${apiKey}&page=${currentPage}&language=${lang}&with_genres=${filterGenre}`);
        const response = await axios(
          `${apiBase}/${mediaType}/${filterList}?${apiKey}&page=${currentPage}&language=${lang}&with_genres=${filterGenre}`
        );
        
        // Check if there more movies 
        if(response.data.total_pages === currentPage){
        setNewMovies(false);
        return;
        } else {
          setNewMovies(true);
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
    
        setData(output);
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
    console.log(mediaType, lang, filterList, filterGenre, pageIndex);
    fetchMoviesList(mediaType, lang, filterList, filterGenre, pageIndex);
    
  }, [mediaType, lang, filterList, filterGenre, pageIndex, fetchMoviesList]);

  return { isLoading, error, data, pageIndex, setPageIndex, newMovies };
};
