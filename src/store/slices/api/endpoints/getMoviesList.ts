import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { filterListQueries } from '../../../../data/filterListQueries';
import {
  Lang,
  MediaType,
  MovieFilterListTerm,
  TVFilterListTerm,
} from '../../../../types';
import { API_KEY, IMG_BASE_URL_300, apiSlice } from '../apiSlice';
import {
  MovieListItem,
  TVListItem,
} from '../../../../utils/classes/moviesListItem';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMoviesList: build.query<
      {
        itemsList: MoviesListItemProps[];
        totalPages: number;
        lastFetchedPage: number;
      },
      {
        mediaType: MediaType;
        filterList: MovieFilterListTerm | TVFilterListTerm;
        filterGenre: string;
        lang: Lang;
        currentPage: number;
      }
    >({
      queryFn: async (args, __, _, baseQuery) => {
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
                status: 401,
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
                status: 500,
              },
            } as FetchBaseQueryError,
          };
        }

        const output: MoviesListItemProps[] = [];

        responseData.results.forEach(
          (item: FetchedListItemMovie | FetchedListItemTV) => {
            if (mediaType === MediaType.Movie) {
              output.push(
                new MovieListItem(
                  IMG_BASE_URL_300,
                  item,
                  mediaType,
                ).getValues(),
              );
            } else if (mediaType === MediaType.TV) {
              output.push(
                new TVListItem(IMG_BASE_URL_300, item, mediaType).getValues(),
              );
            }
          },
        );

        return {
          data: {
            itemsList: output,
            totalPages: responseData.total_pages,
            lastFetchedPage: responseData.page,
          },
        };
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { mediaType, filterList, filterGenre, lang } = queryArgs;
        return `${endpointName}-${mediaType}-${filterList}-${filterGenre}-${lang}`;
      },

      merge: (currentCache, newItems) => {
        const existingIds = new Set(
          currentCache.itemsList.map((item) => item.id),
        );
        const deduplicatedItems = newItems.itemsList.filter(
          (item) => !existingIds.has(item.id),
        );
        currentCache.itemsList.push(...deduplicatedItems);

        // Dont update cache lastFetchedPage value if new query with old args have lastFetchedPage less than current
        if (currentCache.lastFetchedPage < newItems.lastFetchedPage) {
          currentCache.lastFetchedPage = newItems.lastFetchedPage;
        } else {
          currentCache.lastFetchedPage = currentCache.lastFetchedPage;
        }
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

export const { useGetMoviesListQuery } = extendedApi;
