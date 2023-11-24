export default class MoviesListItem {
  constructor(imagesUrlBase, fetchedItem, movieMediaType) {
    this.posterUrl = fetchedItem.poster_path
      ? imagesUrlBase + fetchedItem.poster_path
      : `${import.meta.env.BASE_URL}assets/images/no-poster.jpg`;
    this.title = fetchedItem.title ? fetchedItem.title : fetchedItem.name;
    this.id = fetchedItem.id;
    this.mediaType = movieMediaType;
  }
}
