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
} from '../../../types';
import { filterListQueries } from '../../../data/filterListQueries';
import { MovieListItem, TVListItem } from '../../../utils/classes/moviesListItem';
import { SingleMovieData, SingleTVData } from '../../../utils/classes/singleMovieData';

const API_BASE: string =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_PROXY_DATA_URL_DEV
    : import.meta.env.VITE_PROXY_DATA_URL_PROD;
const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE_URL_300: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w300`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w300`;
const IMG_BASE_URL_780: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w780`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w780`;

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
    }),

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
                status: 401
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
                status: 500
              },
            } as FetchBaseQueryError,
          };
        }

        const output: MoviesListItemProps[] = [];

        responseData.results.forEach(
          (item: FetchedListItemMovie | FetchedListItemTV) => {
            if (mediaType === MediaType.Movie) {
              output.push(
                new MovieListItem(IMG_BASE_URL_300, item, mediaType).getValues(),
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

    getSearchResults: build.query<
      { itemsList: MoviesListItemProps[]; totalPages: number; lastFetchedPage: number },
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
                status: 401
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
                status: 500
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
                new TVListItem(IMG_BASE_URL_300, item, item.media_type).getValues(),
              );
            }
          });
        }

        return {
          data: {
            itemsList: output,
            totalPages: responseData.total_pages || 0,
            lastFetchedPage: responseData.page || 1
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

    getSimilarMovies: build.query<
      MoviesListItemProps[],
      {
        lang: Lang,
        itemID: string,
        itemMediaType: MediaType
      }>({
        query: ({ itemID, itemMediaType, lang }) =>
          `/${itemMediaType}/${itemID}/similar?${API_KEY}&language=${lang}`,

        transformResponse: (response: FetchedListData, _, { itemMediaType }) => {

          const output: MoviesListItemProps[] = [];

          response.results.forEach((item) => {
            if (itemMediaType === MediaType.Movie) {
              output.push(new MovieListItem(IMG_BASE_URL_300, item, itemMediaType).getValues());
            } else if (itemMediaType === MediaType.TV) {
              output.push(new TVListItem(IMG_BASE_URL_300, item, itemMediaType).getValues());
            }
          });

          return output;
        },
      }),

    getSingleMovieData: build.query<
      {
        data: SingleItemDetailsData;
        description: string | undefined;
        title: string | undefined;
        poster: string;
      },
      {
        mediaType: MediaType,
        lang: Lang,
        id: string
      }
    >({
      queryFn: async (args, __, _, baseQuery) => {
        const { mediaType, lang, id } = args;

        const response = await baseQuery(
          `/${mediaType}/${id}?${API_KEY}&language=${lang}`,
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
                status: 401
              },
            } as FetchBaseQueryError,
          };
        }

        const responseData = response.data as FetchedMovieData | FetchedTVData;

        let creditsData: FetchedCreditsData | null = null;

        // Get director name
        if (mediaType === 'movie') {
          try {
            const creditsResponse = await baseQuery(
              `/${mediaType}/${id}/credits?${API_KEY}&language=${lang}`,
            );

            const creditsResponseData = creditsResponse.data as FetchedCreditsData;

            creditsData = Object.keys(creditsResponseData).length !== 0 ? creditsResponseData : null;

          } catch (err) {
            console.log(err);
          }
        }

        if (mediaType === MediaType.Movie) {
          return { data: new SingleMovieData(responseData, creditsData, lang, IMG_BASE_URL_780).getValues() };
        } else if (mediaType === MediaType.TV) {
          return { data: new SingleTVData(responseData, creditsData, lang, IMG_BASE_URL_780).getValues() };
        } else {
          return {
            error: {
              status: 500,
              data: {
                message:
                  lang === 'ru'
                    ? 'Ошибка при загрузке данных'
                    : 'Data loading error',
                status: 500
              },
            } as FetchBaseQueryError,
          }
        }
      }
    }),

    getSingleMovieImages: build.query<
      string[],
      {
        mediaType: MediaType,
        id: string
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
      }
    }),

    getSingleMovieVideos: build.query<
      string[],
      {
        mediaType: MediaType,
        lang: Lang,
        id: string
      }
    >({
      query: ({ mediaType, lang, id }) => `/${mediaType}/${id}/videos?${API_KEY}&language=${lang}`,

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
      }
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesListQuery,
  useGetSearchResultsQuery,
  useGetSimilarMoviesQuery,
  useGetSingleMovieDataQuery,
  useGetSingleMovieImagesQuery,
  useGetSingleMovieVideosQuery
} = apiSlice;
