import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import { getCountryName } from "../utils/getCountryName";
import { getBudgetString } from "../utils/getBudgetString";
import { getRuntime } from "../utils/getRuntime";
import { getReleaseDate } from "../utils/getReleaseDate";

const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}original`;

export const useFetchSingleMovie = (mediaType, lang, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState({ show: false, msg: "" });
  const [imagesError, setImagesError] = useState({ show: false, msg: "" });
  const [videosError, setVideosError] = useState({ show: false, msg: "" })
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchSingleMovie = useCallback(async (mediaType, lang, id) => {

    setIsLoading(true);

        // Fetch data
    try {
      const { data } = await axios(
        `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
      );

       // Build data object
      const genresList = data.genres.reduce((string, current, i) => {
        return i === 0
          ? current.name[0].toUpperCase() + current.name.slice(1)
          : `${string}, ${current.name}`;
      }, "");

      const countriesList = data.production_countries.reduce(
        (string, current, i) => {
          return i === 0
            ? getCountryName(current.iso_3166_1, lang)
            : `${string}, ${getCountryName(current.iso_3166_1, lang)}`;
        },
        ""
      );
     
      if (mediaType === "movie") {
        const output = {
          title: data.title,
          poster: `${imagesUrlBase}${data.poster_path}`,
          data: [
            ...(data.release_date ? [{
              [`${lang === "en" ? "Release date" : "Дата выхода"}`]:
                 getReleaseDate(data.release_date, lang),
            }] : []),
            ...(genresList.length > 0 ? [{
              [`${lang === "en" ? "Genres" : "Жанр"}`]: genresList,
            }] : []),
            ...(countriesList.length > 0 ? [{
              [`${lang === "en" ? "Country" : "Страна"}`]: countriesList,
            }] : []),
           ...(data.budget ? [{
              [`${lang === "en" ? "Budget" : "Бюджет"}`]: getBudgetString(data.budget)
            }] : []),
            ...(data.revenue ? [{
              [`${lang === "en" ? "Revenue" : "Сборы"}`]: getBudgetString(
                data.revenue
              ),
            }] : []),
            ...(data.runtime ? [{
              [`${lang === "en" ? "Runtime" : "Продолжительность"}`]:
                getRuntime(data.runtime, lang),
            }] : []),
            ...(data.vote_average ? [{
              [`${lang === "en" ?  "TMDB Rating" : "Рейтинг TMDB"}`]:
                data.vote_average,
            }] : []),
          ],
          description: data.overview,
        };

        setData(() => output);
      } else {
        const output = {
          title: data.name,
          poster: `${imagesUrlBase}${data.poster_path}`,
          data: [
            ...( data.first_air_date ? [{
              [`${lang === "en" ? "Release date" : "Дата выхода"}`]:
               getReleaseDate(data.first_air_date, lang), 
            }] : []),
            ...(genresList.length > 0 ? [{
              [`${lang === "en" ? "Genres" : "Жанр"}`]: genresList,
            }] : []),
            ...(countriesList.length > 0 ? [{
              [`${lang === "en" ? "Country" : "Страна"}`]: countriesList,
            }] : []),
            ...(data.number_of_seasons ? [{
              [`${lang === "en" ? "Total Seasons" : "Всего сезонов"}`]:
                data.number_of_seasons,
            }] : []),
            ...( data.number_of_episodes ? [{
              [`${lang === "en" ? "Total episodes" : "Серий"}`]:
                data.number_of_episodes,
            }] : []),
            ...(data.vote_average ? [{
              [`${lang === "en" ? "TMDB Rating" : "Рейтинг TMDB"}`]:
                data.vote_average,
            }] : []),
          ],
          description: data.overview,
        };

        setData(() => output);
      }

    } catch (err) {
        setDataError(() => {
          return {
            show: true,
            message: err.message
          }
        })
    } 

        // Fetch images
    try {
      const {
        data: { backdrops },
      } = await axios(`${apiBase}/${mediaType}/${id}/images?${apiKey}`);

        // Build images gallery array
      const imagesPaths = [];

      if (backdrops.length > 20) {
        backdrops.splice(20);
      }

      backdrops.forEach((backdropObj) => {
        imagesPaths.push(imagesUrlBase + backdropObj.file_path);
      });

      setImages(() => imagesPaths);

    } catch(err){
        setImagesError(() => {
          return {
            show: true,
            message: err.message
          }
      })
    }

      // Fetch videos
    try{

      const {
        data: { results },
      } = await axios(
        `${apiBase}/${mediaType}/${id}/videos?${apiKey}&language=${lang}`
      );

      // Build videos array
      if (results.length !== 0) {
        const videoKeys = [];

        const trailers = results.filter(
          (item) => item.type === "Trailer" && item.site === "YouTube"
        );

        if (trailers.length !== 0) {
          trailers.forEach((trailer) => {
            videoKeys.push(trailer.key);
          });
        }

        setVideos(() => videoKeys);
      }
    } catch (err) {
      setVideosError(() => {
          return {
            show: true,
            message: err.message
          }
      })
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSingleMovie(mediaType, lang, id);
  }, [fetchSingleMovie, mediaType, lang, id]);

  return { 
    isLoading,
    dataError,
    imagesError,
    videosError,
    data,
    images,
    videos
  };
};
