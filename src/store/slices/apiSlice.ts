import {
  fetchBaseQuery,
  createApi,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  Lang,
  MediaType,
  MovieFilterListTerm,
  TVFilterListTerm,
} from '../../types';
import { filterListQueries } from '../../data/filterListQueries';
import { MovieListItem, TVListItem } from '../../utils/classes/moviesListItem';
import { AppDispatch } from '../store';
import { setHomePageTotalPages } from './homePageParamsSlice';

const API_BASE: string =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_PROXY_DATA_URL_DEV
    : import.meta.env.VITE_PROXY_DATA_URL_PROD;
const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE_URL: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w300`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w300`;

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
    getGenres: build.query<GenreData[], { mediaType: MediaType; lang: Lang }>({
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

      // transformErrorResponse: (errorResponse): APIError => {
      //   return {
      //     message: `Request failed with status code ${errorResponse.status}`,
      //     errorResponse,
      //   };
      // },
    }),

    getMoviesList: build.query<
      MoviesListItemProps[],
      {
        mediaType: MediaType;
        filterList: MovieFilterListTerm | TVFilterListTerm;
        filterGenre: string;
        lang: Lang;
        currentPage: number;
      }
    >({
      queryFn: async (args, queryApi, _, baseQuery) => {
        const dispatch = queryApi.dispatch as AppDispatch;

        const { mediaType, filterList, filterGenre, lang, currentPage } = args;
        const genresParam =
          filterGenre !== '' ? `&with_genres=${filterGenre}` : '';

        const response = await baseQuery(
          `/discover/${mediaType}?page=${currentPage}&language=${lang}${genresParam}&${filterListQueries[mediaType][filterList]}&${API_KEY}`,
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
              },
            } as FetchBaseQueryError,
          };
        }

        const responseData = response.data as FetchedListData;

        if (responseData.total_results === 0) {
          return {
            error: {
              status: 500,
              data: {
                message:
                  lang === 'ru'
                    ? 'Нет результатов, удовлетворяющих заданным условиям'
                    : 'No matching results',
              },
            } as FetchBaseQueryError,
          };
        }

        const output: MoviesListItemProps[] = [];

        responseData.results.forEach(
          (item: FetchedListItemMovie | FetchedListItemTV) => {
            if (mediaType === MediaType.Movie) {
              output.push(
                new MovieListItem(IMG_BASE_URL, item, mediaType).getValues(),
              );
            } else if (mediaType === MediaType.TV) {
              output.push(
                new TVListItem(IMG_BASE_URL, item, mediaType).getValues(),
              );
            }
          },
        );

        if (currentPage === 1) {
          dispatch(
            setHomePageTotalPages(
              responseData.total_pages > 500 ? 500 : responseData.total_pages,
            ),
          );
        }

        return { data: output };
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { mediaType, filterList, filterGenre, lang } = queryArgs;
        return `${endpointName}-${mediaType}-${filterList}-${filterGenre}-${lang}`;
      },

      merge: (currentCache, newItems) => {
        const existingIds = new Set(currentCache.map((item) => item.id));
        const deduplicatedItems = newItems.filter(
          (item) => !existingIds.has(item.id),
        );
        currentCache.push(...deduplicatedItems);
      },

      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.currentPage !== previousArg?.currentPage ||
          currentArg?.mediaType !== previousArg?.mediaType ||
          currentArg?.filterList !== previousArg?.filterList ||
          currentArg?.filterGenre !== previousArg?.filterGenre ||
          currentArg?.lang !== previousArg?.lang
        );
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesListQuery } = apiSlice;
