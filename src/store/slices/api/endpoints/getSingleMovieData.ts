import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Lang, MediaType } from '../../../../types';

import { API_KEY, IMG_BASE_URL_780, apiSlice } from '../apiSlice';
import {
  SingleMovieData,
  SingleTVData,
} from '../../../../utils/classes/singleMovieData';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSingleMovieData: build.query<
      {
        data: SingleItemDetailsData;
        description: string | undefined;
        title: string | undefined;
        poster: string;
      },
      {
        mediaType: MediaType;
        lang: Lang;
        id: string;
      }
    >({
      queryFn: async (args, __, _, baseQuery) => {
        const { mediaType, lang, id } = args;

        const response = await baseQuery(
          `/${mediaType}/${id}?${API_KEY}&language=${lang}`,
        );

        if (response.error) {
          return { error: response.error };
        }

        if ((response.data as FetchRequestFailedError).success === false) {
          return {
            error: {
              status: 401,
              data: {
                message:
                  (response.data as FetchRequestFailedError).status_message ||
                  'Request failed',
                status: 401,
              },
            } as FetchBaseQueryError,
          };
        }

        const responseData = response.data as FetchedMovieData | FetchedTVData;

        let creditsData: FetchedCreditsData | null = null;

        // Get director name
        if (mediaType === 'movie') {
          try {
            const creditsResponse = await baseQuery(
              `/${mediaType}/${id}/credits?${API_KEY}&language=${lang}`,
            );

            const creditsResponseData =
              creditsResponse.data as FetchedCreditsData;

            creditsData =
              Object.keys(creditsResponseData).length !== 0
                ? creditsResponseData
                : null;
          } catch (err) {
            console.log(err);
          }
        }

        if (mediaType === MediaType.Movie) {
          return {
            data: new SingleMovieData(
              responseData,
              creditsData,
              lang,
              IMG_BASE_URL_780,
            ).getValues(),
          };
        } else if (mediaType === MediaType.TV) {
          return {
            data: new SingleTVData(
              responseData,
              creditsData,
              lang,
              IMG_BASE_URL_780,
            ).getValues(),
          };
        } else {
          return {
            error: {
              status: 500,
              data: {
                message:
                  lang === 'ru'
                    ? 'Ошибка при загрузке данных'
                    : 'Data loading error',
                status: 500,
              },
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const { useGetSingleMovieDataQuery } = extendedApi;
