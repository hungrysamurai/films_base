import { MediaType } from '../../../../types';
import { API_KEY, IMG_BASE_URL_780, apiSlice } from '../apiSlice';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSingleMovieImages: build.query<
      string[],
      {
        mediaType: MediaType;
        id: string;
      }
    >({
      query: ({ mediaType, id }) => `/${mediaType}/${id}/images?${API_KEY}`,

      transformResponse: (response: FetchedItemImageData) => {
        const { backdrops } = response;

        const imagesPaths: Array<string> = [];
        if (backdrops) {
          if (backdrops.length > 20) {
            backdrops.splice(20);
          }

          backdrops.forEach((backdropObj) => {
            imagesPaths.push(IMG_BASE_URL_780 + backdropObj.file_path);
          });
        }

        return imagesPaths;
      },
    }),
  }),
});

export const { useGetSingleMovieImagesQuery } = extendedApi;
