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

declare global {
 type FilterListQueries = {
  [key in MediaType]: {
   [key in MovieFilterListTerm | TVFilterListTerm]?: string
  }
 }
}





