import { Lang, MediaType } from '../../../../types';
import { API_KEY, apiSlice } from '../apiSlice';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSingleMovieVideos: build.query<
      string[],
      {
        mediaType: MediaType;
        lang: Lang;
        id: string;
      }
    >({
      query: ({ mediaType, lang, id }) =>
        `/${mediaType}/${id}/videos?${API_KEY}&language=${lang}`,

      transformResponse: (response: FetchedItemVideosData) => {
        const { results } = response;

        const videoKeys: string[] = [];

        if (results) {
          const trailers = results.filter(
            (item) => item.type === 'Trailer' && item.site === 'YouTube',
          );

          if (trailers.length !== 0) {
            trailers.forEach((trailer) => {
              videoKeys.push(trailer.key as string);
            });
          }
        }

        return videoKeys;
      },
    }),
  }),
});

export const { useGetSingleMovieVideosQuery } = extendedApi;
