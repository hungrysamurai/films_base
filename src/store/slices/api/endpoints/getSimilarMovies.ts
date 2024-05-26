import { Lang, MediaType } from '../../../../types';
import {
  MovieListItem,
  TVListItem,
} from '../../../../utils/classes/moviesListItem';
import { API_KEY, IMG_BASE_URL_300, apiSlice } from '../apiSlice';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSimilarMovies: build.query<
      MoviesListItemProps[],
      {
        lang: Lang;
        itemID: string;
        itemMediaType: MediaType;
      }
    >({
      query: ({ itemID, itemMediaType, lang }) =>
        `/${itemMediaType}/${itemID}/similar?${API_KEY}&language=${lang}`,

      transformResponse: (response: FetchedListData, _, { itemMediaType }) => {
        const output: MoviesListItemProps[] = [];

        response.results.forEach((item) => {
          if (itemMediaType === MediaType.Movie) {
            output.push(
              new MovieListItem(
                IMG_BASE_URL_300,
                item,
                itemMediaType,
              ).getValues(),
            );
          } else if (itemMediaType === MediaType.TV) {
            output.push(
              new TVListItem(IMG_BASE_URL_300, item, itemMediaType).getValues(),
            );
          }
        });

        return output;
      },
    }),
  }),
});

export const { useGetSimilarMoviesQuery } = extendedApi;
