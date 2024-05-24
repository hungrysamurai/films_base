import { operations } from './tmdb_types';
import { MovieListItem, TVListItem } from './utils/classes/moviesListItem';
import { ReactElement } from 'react';

import { SingleMovieData, SingleTVData } from './utils/classes/singleMovieData';

export enum ColorTheme {
  Dark = 'dark',
  Light = 'light',
}

export enum Lang {
  Ru = 'ru',
  En = 'en',
}

export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}

export enum MovieFilterListTerm {
  Upcoming = 'upcoming',
  NowPlaying = 'now_playing',
  Popular = 'popular',
  TopRated = 'top_rated',
}

export enum TVFilterListTerm {
  OnTheAir = 'on_the_air',
  Popular = 'popular',
  TopRated = 'top_rated',
}

export enum ModalMode {
  Gallery = 'gallery',
  Box = 'box',
  Overlay = 'overlay',
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

type OnlyProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type InstanceProperties<T> = Pick<T, OnlyProperties<T>>;

declare global {
  type FilterListQueries = {
    [key in MediaType]: {
      [key in MovieFilterListTerm | TVFilterListTerm]?: string;
    };
  };

  type FetchedListItemMovie = ArrayElement<
    operations['discover-movie']['responses'][200]['content']['application/json']['results']
  >;

  type FetchedListItemTV = ArrayElement<
    operations['discover-tv']['responses'][200]['content']['application/json']['results']
  >;

  type FetchedListData = Required<
    operations['discover-tv']['responses'][200]['content']['application/json']
  >;

  type FetchedMovieData =
    operations['movie-details']['responses'][200]['content']['application/json'];

  type FetchedTVData =
    operations['tv-series-details']['responses'][200]['content']['application/json'];

  type FetchedCreditsData =
    operations['movie-credits']['responses'][200]['content']['application/json'];

  type FetchedItemImageData =
    operations['movie-images']['responses'][200]['content']['application/json'];

  type FetchedItemVideosData =
    operations['movie-videos']['responses'][200]['content']['application/json'];

  type FetchedSearchQueryData =
    operations['search-multi']['responses'][200]['content']['application/json'];

  type FetchRequestFailedError = {
    status_code: number;
    status_message: string;
    success: false;
  };

  type GenreData = {
    id: '' | number;
    name: string;
  };

  type SingleItemDetailsDataItem = {
    [key: string]: string | undefined;
  };

  type SingleItemDetailsData = SingleItemDetailsDataItem[];

  type UserListItem = {
    id: string;
    mediaType: MediaType;
  };

  type UserItemsLists = UserListItem[];

  type UserList = {
    title: string;
    data: UserItemsLists;
  };

  type ReactChildrenType = { children?: ReactElement | ReactElement[] };

  type FilterList =
    | { [MovieFilterListTerm.NowPlaying]: string }
    | { [MovieFilterListTerm.Upcoming]: string }
    | { [MovieFilterListTerm.Popular]: string }
    | { [MovieFilterListTerm.TopRated]: string }
    | { [TVFilterListTerm.OnTheAir]: string }
    | { [TVFilterListTerm.OnTheAir]: string }
    | { [TVFilterListTerm.Popular]: string }
    | { [TVFilterListTerm.TopRated]: string };

  type FilterLists = {
    [key in Lang]: FilterList[];
  };

  type MoviesListItemProps = InstanceProperties<TVListItem | MovieListItem>;

  type SingleItemDataProps = InstanceProperties<SingleMovieData | SingleTVData>
}
