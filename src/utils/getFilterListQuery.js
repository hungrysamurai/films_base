import { getFormattedDay } from "./getFormattedDay";

const filterListQueries = {
  movie: {
    upcoming:
      `sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${getFormattedDay(60)}`,
    now_playing:
      `sort_by=popularity.desc&with_release_type=2|3&release_date.lte=${getFormattedDay()}&release_date.gte=${getFormattedDay(-60)}`,
    popular: "sort_by=popularity.desc",
    top_rated:
      "sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
  },
  tv: {
    popular: 'sort_by=popularity.desc',
    on_the_air: `sort_by=popularity.desc&air_date.lte=${getFormattedDay(7)}&air_date.gte=${getFormattedDay()}`,
    top_rated: 'sort_by=vote_average.desc&vote_count.gte=200',
  },
};

export const getFilterListQuery = (mediaType, filterList) => {
  return filterListQueries[mediaType][filterList]
}

