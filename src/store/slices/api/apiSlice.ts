import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Same origin in every environment: nginx (or the vite dev proxy) forwards /api to Node
const API_BASE = '/api/tmdb_proxy/data';
const FILE_BASE = '/api/tmdb_proxy/file/';
export const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
export const IMG_BASE_URL_300 = `${FILE_BASE}w300`;
export const IMG_BASE_URL_780 = `${FILE_BASE}w780`;
export const IMG_BASE_URL_1280 = `${FILE_BASE}w1280`;
export const IMG_BASE_URL_92 = `${FILE_BASE}w92`;

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
});

export const apiSlice = createApi({
  baseQuery,
  keepUnusedDataFor: 600,
  endpoints: () => ({}),
});
