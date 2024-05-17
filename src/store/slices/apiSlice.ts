import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { Lang, MediaType } from '../../types';

const API_BASE: string =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_PROXY_DATA_URL_DEV
    : import.meta.env.VITE_PROXY_DATA_URL_PROD;
const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  //   credentials: "same-origin",
  //   prepareHeaders: (headers) => {
  //     const accessToken =
  //       "";

  //     headers.set("Authorization", `Bearer ${accessToken}`);
  //     headers.set("accept", "application/json");

  //     return headers;
  //   },
});

export const apiSlice = createApi({
  baseQuery,

  endpoints: (build) => ({

    getGenres: build.query<
      GenreData[],
      { mediaType: MediaType; lang: Lang }
    >({

      query: ({ mediaType, lang }) =>
        `/genre/${mediaType}/list?${API_KEY}&language=${lang}`,

      transformResponse: (response: { genres: GenreData[] }, _, { lang }) => {
        const genresList = response.genres;

        const all: GenreData = {
          id: '',
          name: lang === 'ru' ? 'Все' : 'All',
        };

        genresList.unshift(all);

        return genresList;
      },

      transformErrorResponse: (errorResponse): APIError => {
        return {
          message: `Request failed with status code ${errorResponse.status}`,
          errorResponse
        }
      }
    }),
  }),
});

export const { useGetGenresQuery } = apiSlice;
