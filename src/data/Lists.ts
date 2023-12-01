import { MovieFilterListTerm, TVFilterListTerm, Lang } from "../types"

export const movieLists: FilterLists = {
 [Lang.Ru]: [
  { [MovieFilterListTerm.Upcoming]: 'Скоро' },
  { [MovieFilterListTerm.NowPlaying]: 'Сейчас в кинотеатрах' },
  { [MovieFilterListTerm.Popular]: 'Популярные' },
  { [MovieFilterListTerm.TopRated]: 'По рейтингу' },
 ],
 [Lang.En]: [
  { [MovieFilterListTerm.Upcoming]: 'Upcoming' },
  { [MovieFilterListTerm.NowPlaying]: 'Now playing' },
  { [MovieFilterListTerm.Popular]: 'Popular' },
  { [MovieFilterListTerm.TopRated]: 'Top rated' },
 ]
}

export const tvLists: FilterLists = {
 [Lang.Ru]: [
  { [TVFilterListTerm.OnTheAir]: 'Сейчас в эфире' },
  { [TVFilterListTerm.Popular]: 'Популярные' },
  { [TVFilterListTerm.TopRated]: 'По рейтингу' },
 ],
 [Lang.En]: [
  { [TVFilterListTerm.OnTheAir]: 'Now playing' },
  { [TVFilterListTerm.Popular]: 'Popular' },
  { [TVFilterListTerm.TopRated]: 'Top rated' },
 ]
}