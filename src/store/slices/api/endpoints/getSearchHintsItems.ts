import { Lang, MediaType } from '../../../../types';
import {
  MovieListItem,
  TVListItem,
} from '../../../../utils/classes/moviesListItem';
import { API_KEY, IMG_BASE_URL_92, apiSlice } from '../apiSlice';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSearchHintsItems: build.query<
      MoviesListItemProps[],
      { lang: Lang; searchInput: string }
    >({
      query: ({ lang, searchInput }) =>
        `/search/multi?${API_KEY}&query=${searchInput}&page=1&language=${lang}`,

      transformResponse: (response: FetchedSearchQueryData) => {
        const output: MoviesListItemProps[] = [];

        if (response.results?.length) {
          response.results.forEach((item) => {
            if (item.media_type === MediaType.Movie) {
              output.push(
                new MovieListItem(
                  IMG_BASE_URL_92,
                  item,
                  item.media_type,
                  true,
                ).getValues(),
              );
            } else if (item.media_type === MediaType.TV) {
              output.push(
                new TVListItem(
                  IMG_BASE_URL_92,
                  item,
                  item.media_type,
                  true,
                ).getValues(),
              );
            }
          });
        }

        const sorted = output.sort((a, b) => {
          return Number(b.rate) - Number(a.rate);
        });

        if (sorted.length < 10) {
          return sorted;
        } else {
          return sorted.splice(0, 10);
        }
      },
    }),
  }),
});

export const { useGetSearchHintsItemsQuery } = extendedApi;
