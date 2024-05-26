import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Lang, MediaType } from '../../../../types';
import {
  MovieListItem,
  TVListItem,
} from '../../../../utils/classes/moviesListItem';
import { API_KEY, IMG_BASE_URL_300, apiSlice } from '../apiSlice';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserMoviesList: build.query<
      MoviesListItemProps[],
      {
        lang: Lang;
        currentUserList: UserListItem[];
      }
    >({
      queryFn: async (args, __, _, baseQuery) => {
        const { lang, currentUserList } = args;

        const output: MoviesListItemProps[] = [];

        for (let { id, mediaType } of currentUserList) {
          const response = await baseQuery(
            `/${mediaType}/${id}?${API_KEY}&language=${lang}`,
          );

          if (response.error) {
            continue;
          }

          if ((response.data as FetchRequestFailedError).success === false) {
            continue;
          }

          const movieData = response.data as FetchedMovieData | FetchedTVData;

          if (mediaType === MediaType.Movie) {
            output.push(
              new MovieListItem(
                IMG_BASE_URL_300,
                movieData,
                mediaType,
              ).getValues(),
            );
          } else if (mediaType === MediaType.TV) {
            output.push(
              new TVListItem(
                IMG_BASE_URL_300,
                movieData,
                mediaType,
              ).getValues(),
            );
          }
        }

        if (output.length === 0) {
          return {
            error: {
              status: 400,
              data: {
                message: `${
                  lang === 'ru' ? 'Этот список пуст' : 'This list is empty'
                }`,
                status: 400,
              },
            } as FetchBaseQueryError,
          };
        }

        return { data: output };
      },
    }),
  }),
});

export const { useGetUserMoviesListQuery } = extendedApi;
