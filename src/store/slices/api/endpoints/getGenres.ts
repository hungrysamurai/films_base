import { Lang, MediaType } from '../../../../types';
import { API_KEY, apiSlice } from '../apiSlice';

const extendedApi = apiSlice.injectEndpoints({
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
    }),
  }),
});

export const { useGetGenresQuery } = extendedApi;
