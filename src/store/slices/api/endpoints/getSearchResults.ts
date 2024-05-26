import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Lang, MediaType } from '../../../../types';
import { API_KEY, IMG_BASE_URL_300, apiSlice } from '../apiSlice';
import {
  MovieListItem,
  TVListItem,
} from '../../../../utils/classes/moviesListItem';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSearchResults: build.query<
      {
        itemsList: MoviesListItemProps[];
        totalPages: number;
        lastFetchedPage: number;
      },
      { lang: Lang; currentPage: number; searchQuery: string }
    >({
      queryFn: async (args, __, _, baseQuery) => {
        const { lang, searchQuery, currentPage } = args;

        const response = await baseQuery(
          `/search/multi?${API_KEY}&query=${searchQuery}&page=${currentPage}&language=${lang}`,
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

        const responseData = response.data as FetchedSearchQueryData;

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

        if (responseData.results) {
          responseData.results.forEach((item) => {
            if (item.media_type === MediaType.Movie) {
              output.push(
                new MovieListItem(
                  IMG_BASE_URL_300,
                  item,
                  item.media_type,
                ).getValues(),
              );
            } else if (item.media_type === MediaType.TV) {
              output.push(
                new TVListItem(
                  IMG_BASE_URL_300,
                  item,
                  item.media_type,
                ).getValues(),
              );
            }
          });
        }

        return {
          data: {
            itemsList: output,
            totalPages: responseData.total_pages || 0,
            lastFetchedPage: responseData.page || 1,
          },
        };
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { lang, searchQuery } = queryArgs;
        return `${endpointName}-${searchQuery}-${lang}`;
      },

      merge: (currentCache, newItems) => {
        const existingPairs = new Set(
          currentCache.itemsList.map((item) => `${item.id}-${item.mediaType}`),
        );
        const deduplicatedItems = newItems.itemsList.filter(
          (item) => !existingPairs.has(`${item.id}-${item.mediaType}`),
        );
        currentCache.itemsList.push(...deduplicatedItems);

        if (currentCache.lastFetchedPage < newItems.lastFetchedPage) {
          currentCache.lastFetchedPage = newItems.lastFetchedPage;
        } else {
          currentCache.lastFetchedPage = currentCache.lastFetchedPage;
        }
      },

      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.currentPage !== previousArg?.currentPage ||
          currentArg?.searchQuery !== previousArg?.searchQuery ||
          currentArg?.lang !== previousArg?.lang
        );
      },
    }),
  }),
});

export const { useGetSearchResultsQuery } = extendedApi;
