import { MediaType } from '../../types';

class FetchedListItem<T extends FetchedListItemMovie | FetchedListItemTV> {
  posterUrl: string;
  id: number;
  mediaType: MediaType;
  title!: string;
  constructor(
    imagesUrlBase: string,
    fetchedItem: T,
    movieMediaType: MediaType,
  ) {
    this.posterUrl = fetchedItem.poster_path
      ? imagesUrlBase + fetchedItem.poster_path
      : `${import.meta.env.BASE_URL}assets/images/no-poster.jpg`;
    this.id = fetchedItem.id as number;
    this.mediaType = movieMediaType;
  }

  getValues() {
    return {
      id: this.id,
      posterUrl: this.posterUrl,
      mediaType: this.mediaType,
      title: this.title,
    };
  }
}

export class MovieListItem extends FetchedListItem<FetchedListItemMovie> {
  constructor(
    imagesUrlBase: string,
    fetchedItem: FetchedListItemMovie,
    movieMediaType: MediaType,
  ) {
    super(imagesUrlBase, fetchedItem, movieMediaType);
    this.title = fetchedItem.title as string;
  }
}

export class TVListItem extends FetchedListItem<FetchedListItemTV> {
  constructor(
    imagesUrlBase: string,
    fetchedItem: FetchedListItemTV,
    movieMediaType: MediaType,
  ) {
    super(imagesUrlBase, fetchedItem, movieMediaType);
    this.title = fetchedItem.name as string;
  }
}
