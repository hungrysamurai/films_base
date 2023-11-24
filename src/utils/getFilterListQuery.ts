import { getFormattedDay } from "./getFormattedDay";
import { MediaType, MovieFilterListTerm, TVFilterListTerm } from "../types";

export const filterListQueries: FilterListQueries = {
  [MediaType.Movie]: {
    [MovieFilterListTerm.Upcoming]:
      `sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${getFormattedDay(60)}`,
    [MovieFilterListTerm.NowPlaying]:
      `sort_by=popularity.desc&with_release_type=2|3&release_date.lte=${getFormattedDay()}&release_date.gte=${getFormattedDay(-60)}`,
    [MovieFilterListTerm.Popular]: "sort_by=popularity.desc",
    [MovieFilterListTerm.TopRated]:
      "sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
  },
  [MediaType.TV]: {
    [TVFilterListTerm.Popular]: 'sort_by=popularity.desc',
    [TVFilterListTerm.OnTheAir]: `sort_by=popularity.desc&air_date.lte=${getFormattedDay(7)}&air_date.gte=${getFormattedDay()}`,
    [TVFilterListTerm.TopRated]: 'sort_by=vote_average.desc&vote_count.gte=200',
  },
};


