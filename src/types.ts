import { operations } from "./tmdb_types";
import { MoviesListReducerAction } from "./reducers/moviesListReducer";
import { MovieListItem, TVListItem } from "./utils/classes/moviesListItem";
import { ReactElement } from "react";

export enum ColorTheme {
  Dark = "dark",
  Light = "light",
}

export enum Lang {
  Ru = "ru",
  En = "en",
}

export enum MediaType {
  Movie = "movie",
  TV = "tv",
}

export enum MovieFilterListTerm {
  Upcoming = "upcoming",
  NowPlaying = "now_playing",
  Popular = "popular",
  TopRated = "top_rated",
}

export enum TVFilterListTerm {
  OnTheAir = "on_the_air",
  Popular = "popular",
  TopRated = "top_rated",
}

export enum MoviesListMode {
  Home = "home",
  Search = "search",
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

declare global {
  type FilterListQueries = {
    [key in MediaType]: {
      [key in MovieFilterListTerm | TVFilterListTerm]?: string;
    };
  };

  type FetchedListItemMovie = ArrayElement<
    operations["discover-movie"]["responses"][200]["content"]["application/json"]["results"]
  >;

  type FetchedListItemTV = ArrayElement<
    operations["discover-tv"]["responses"][200]["content"]["application/json"]["results"]
  >;

  type FetchedListData = Required<
    operations["discover-tv"]["responses"][200]["content"]["application/json"]
  >;

  type FetchedListInitialData = [
    MovieListItem[] | TVListItem[],
    number[],
    number?
  ];

  type FetchedMovieData =
    operations["movie-details"]["responses"][200]["content"]["application/json"];

  type FetchedTVData =
    operations["tv-series-details"]["responses"][200]["content"]["application/json"];

  type FetchedCreditsData =
    operations["movie-credits"]["responses"][200]["content"]["application/json"];

  type FetchedItemImageData =
    operations["movie-images"]["responses"][200]["content"]["application/json"];

  type FetchedItemVideosData =
    operations["movie-videos"]["responses"][200]["content"]["application/json"];

  type FetchDataError = {
    message: string;
    show: boolean;
  };

  type SingleItemDetailsDataItem = {
    [key: string]: string | undefined;
  };

  type SingleItemDetailsData = SingleItemDetailsDataItem[];

  type MoviesListState = {
    lang: Lang;
    mediaType: MediaType;
    filterList: MovieFilterListTerm | TVFilterListTerm;
    filterGenre: string;
    page: number;
    totalPages: number;
    moviesList: MovieListItem[] | TVListItem[];
    uniqueIds: number[];
    moviesListMode: MoviesListMode;
    searchQuery: string;
    selectedMovie: string;
  };

  interface IGlobalContext {
    baseName: string;
    currentTitle: string;
    dispatch: React.Dispatch<MoviesListReducerAction>;
    filterGenre: string;
    filterList: MovieFilterListTerm | TVFilterListTerm;
    lang: Lang;
    mediaType: MediaType;
    moviesFetchError: FetchDataError;
    moviesFetchLoading: boolean;
    moviesList: MovieListItem[] | TVListItem[];
    moviesListMode: MoviesListMode;
    page: number;
    searchQuery: string;
    selectedMovie: string;
    setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
    totalPages: number;
  }

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
}
