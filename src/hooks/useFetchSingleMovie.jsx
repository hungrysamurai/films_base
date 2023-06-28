import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import { getCountryName } from "../utils/getCountryName";
import { getBudgetString } from "../utils/getBudgetString";
import { getRuntime } from "../utils/getRuntime";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}original`;

export const useFetchSingleMovie = (mediaType, lang, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const [images, setImages] =  useState([]);

  const fetchSingleMovie = useCallback(async (mediaType, lang, id) => {
    setIsLoading(true);

    try {
      const { data } = await axios(
        `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
      );

       const {data: {backdrops}} = await axios(
        `${apiBase}/${mediaType}/${id}/images?${apiKey}`
       );


        // Build data object
      const genresList = data.genres.reduce((string, current, i) => {
       return  i === 0 ? 
       current.name[0].toUpperCase() + current.name.slice(1) : 
       `${string}, ${current.name}`
      }, '');
      
      const countriesList = data.production_countries.reduce((string, current, i) => {
       return  i === 0 ? 
       getCountryName(current.iso_3166_1, lang) : 
       `${string}, ${getCountryName(current.iso_3166_1, lang)}`;
      }, '');

      if(mediaType === 'movie'){
      const output = {
         title: data.title,
         poster: `${imagesUrlBase}${data.poster_path}`,
         data: [
          {
           [`${lang === 'en' ? 'Release date' : 'Дата выхода'}`]: data.release_date
          },
          {
           [`${lang === 'en' ? 'Genres' : 'Жанр'}`]
          : genresList,
          },
          {
           [`${lang === 'en' ? 'Country' : 'Страна'}`]: countriesList
          },
          {
           [`${lang === 'en' ? 'Budget' : 'Бюджет'}`]: getBudgetString(data.budget)
          },
          {
           [`${lang === 'en' ? 'Revenue' : 'Сборы'}`]: getBudgetString(data.revenue)
          },
          {
           [`${lang === 'en' ? 'Runtime' : 'Продолжительность'}`]: getRuntime(data.runtime, lang)
          },
         ],
         description: data.overview
        }

        setData(() => output);
      } else {
       
       const output = {
         title: data.name,
         poster: `${imagesUrlBase}${data.poster_path}`,
         data: [
          {
           [`${lang === 'en' ? 'Release date' : 'Дата выхода'}`]: data.first_air_date
          },
          {
           [`${lang === 'en' ? 'Genres' : 'Жанр'}`]
          : genresList,
          },
          {
           [`${lang === 'en' ? 'Country' : 'Страна'}`]: countriesList
          },
          {
           [`${lang === 'en' ? 'Total Seasons' : 'Всего сезонов'}`]: data.number_of_seasons
          },
          {
           [`${lang === 'en' ? 'Total episodes' : 'Серий'}`]: 
           data.number_of_episodes
          },
         ],
         description: data.overview
        }

        setData(() => output);
      }

      // Build images gallery object
      const imagesPaths = [];

      if (backdrops.length > 20){
        backdrops.splice(20)
      }

      backdrops.forEach(backdropObj => {
        imagesPaths.push(imagesUrlBase + backdropObj.file_path)
      })
      
      setImages(() => imagesPaths)

      setIsLoading(false);
    } catch (err) {
      setError({
        show: true,
        message: err.message,
      });
      setIsLoading(false);
      throw new Error(err.message);
    }
  }, []);

  useEffect(() => {
    fetchSingleMovie(mediaType, lang, id);
  }, [fetchSingleMovie, mediaType, lang, id]);

  return { isLoading, error, data, images };
};