import { operations } from "./tmdb_types"

export enum ColorTheme {
 Dark = 'dark',
 Light = 'light'
}

export enum Lang {
 Ru = 'ru',
 En = 'en'
}

export enum MediaType {
 Movie = 'movie',
 TV = 'tv'
}

export enum MovieFilterListTerm {
 Upcoming = 'upcoming',
 NowPlaying = 'now_playing',
 Popular = 'popular',
 TopRated = 'top_rated'
}

export enum TVFilterListTerm {
 OnTheAir = 'on_the_air',
 Popular = 'popular',
 TopRated = 'top_rated'
}

type ArrayElement<A> =
 A extends readonly (infer T)[] ? T : never

declare global {
 type FilterListQueries = {
  [key in MediaType]: {
   [key in MovieFilterListTerm | TVFilterListTerm]?: string
  }
 }

 type FetchedListItemMovie = ArrayElement<operations["discover-movie"]["responses"][200]["content"]["application/json"]["results"]>

 type FetchedListItemTV = ArrayElement<operations["discover-tv"]["responses"][200]["content"]["application/json"]["results"]>

 type FetchedListData = Required<operations["discover-tv"]["responses"][200]["content"]["application/json"]>

}




