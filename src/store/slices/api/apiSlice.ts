import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const API_BASE: string =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_PROXY_DATA_URL_DEV
    : import.meta.env.VITE_PROXY_DATA_URL_PROD;
export const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
export const IMG_BASE_URL_300: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w300`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w300`;
export const IMG_BASE_URL_780: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w780`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w780`;
export const IMG_BASE_URL_1280: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w1280`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w1280`;
export const IMG_BASE_URL_92: string =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_PROXY_DATA_FILE_URL_DEV}w92`
    : `${import.meta.env.VITE_PROXY_DATA_FILE_URL_PROD}w92`;

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
});

export const apiSlice = createApi({
  baseQuery,
  keepUnusedDataFor: 600,
  endpoints: () => ({}),
});
