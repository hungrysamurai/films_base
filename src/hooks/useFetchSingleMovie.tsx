import { useState, useCallback, useEffect } from "react";

import axios, { AxiosResponse, AxiosError } from "axios";
import {
  SingleMovieData,
  SingleTVData,
} from "../utils/classes/singleMovieData";
import { Lang, MediaType } from "../types";

const apiBase: string =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_PROXY_DATA_URL_DEV
    : import.meta.env.VITE_PROXY_DATA_URL_PROD;
// const apiBase = import.meta.env.VITE_TMDB_API_BASE;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const imagesUrlBase: string =
  import.meta.env.MODE === "development"
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w780`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w780`;
// const imagesUrlBase = `${import.meta.env.VITE_IMAGES_BASE_URL}w780`;

export const useFetchSingleMovie = (
  mediaType: MediaType,
  lang: Lang,
  id: string
) => {
  const [data, setData] = useState<SingleMovieData | {}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState<FetchDataError>({
    show: false,
    message: "",
  });

  const [images, setImages] = useState<Array<string>>([]);
  const [imagesError, setImagesError] = useState({ show: false, message: "" });

  const [videos, setVideos] = useState<Array<string>>([]);
  const [videosError, setVideosError] = useState({ show: false, message: "" });

  const fetchSingleMovie = useCallback(
    async (mediaType: MediaType, lang: Lang, id: string) => {
      setIsLoading(true);

      // Clean states before fetch
      setData(() => {});
      setImages(() => []);
      setVideos(() => []);

      // Fetch data
      try {
        const { data }: AxiosResponse<FetchedMovieData | FetchedTVData> =
          await axios(
            `${apiBase}/${mediaType}/${id}?${apiKey}&language=${lang}`
          );

        let creditsData: FetchedCreditsData | null;

        // Get director name
        if (mediaType === "movie") {
          try {
            const { data }: AxiosResponse<FetchedCreditsData> = await axios(
              `${apiBase}/${mediaType}/${id}/credits?${apiKey}&language=${lang}`
            );

            creditsData = Object.keys(data).length !== 0 ? data : null;
          } catch (err) {
            console.log(err);
          }
        }

        setData(() => {
          if (mediaType === MediaType.Movie) {
            return new SingleMovieData(data, creditsData, lang, imagesUrlBase);
          } else if (mediaType === MediaType.TV) {
            return new SingleTVData(data, creditsData, lang, imagesUrlBase);
          }
        });
      } catch (err) {
        setDataError(() => {
          return {
            show: true,
            message: (err as AxiosError).message,
          };
        });
      }

      // Fetch images
      try {
        const {
          data: { backdrops },
        }: AxiosResponse<FetchedItemImageData> = await axios(
          `${apiBase}/${mediaType}/${id}/images?${apiKey}`
        );

        if (backdrops) {
          // Build images gallery array
          const imagesPaths: Array<string> = [];

          if (backdrops.length > 20) {
            backdrops.splice(20);
          }

          backdrops.forEach((backdropObj) => {
            imagesPaths.push(imagesUrlBase + backdropObj.file_path);
          });

          setImages(() => imagesPaths);
        }
      } catch (err) {
        setImagesError(() => {
          return {
            show: true,
            message: (err as AxiosError).message,
          };
        });
      }

      // Fetch videos
      try {
        const {
          data: { results },
        }: AxiosResponse<FetchedItemVideosData> = await axios(
          `${apiBase}/${mediaType}/${id}/videos?${apiKey}&language=${lang}`
        );

        if (results) {
          // Build videos array
          if (results.length !== 0) {
            const videoKeys: string[] = [];

            const trailers = results.filter(
              (item) => item.type === "Trailer" && item.site === "YouTube"
            );

            if (trailers.length !== 0) {
              trailers.forEach((trailer) => {
                videoKeys.push(trailer.key as string);
              });
            }

            setVideos(() => videoKeys);
          }
        }
      } catch (err) {
        setVideosError(() => {
          return {
            show: true,
            message: (err as AxiosError).message,
          };
        });
      }

      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    fetchSingleMovie(mediaType, lang, id);
  }, [mediaType, lang, id, fetchSingleMovie]);

  return {
    isLoading,
    dataError,
    imagesError,
    videosError,
    data,
    images,
    videos,
  };
};
