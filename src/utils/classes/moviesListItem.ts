import { MediaType } from '../../types';

class FetchedListItem<T extends FetchedListItemMovie | FetchedListItemTV> {
  posterUrl: string;
  id: number;
  mediaType: MediaType;
  title!: string;

  // Search prompt item values
  releaseYear: string | undefined = undefined;
  rate: string | undefined = undefined;

  constructor(
    imagesUrlBase: string,
    fetchedItem: T,
    movieMediaType: MediaType,
    searchPromptItem?: boolean,
  ) {
    this.posterUrl = fetchedItem.poster_path
      ? imagesUrlBase + fetchedItem.poster_path
      : `${import.meta.env.BASE_URL}assets/images/no-poster.jpg`;
    this.id = fetchedItem.id as number;
    this.mediaType = movieMediaType;

    if (searchPromptItem) {
      this.rate = fetchedItem.vote_average?.toString();
    }
  }

  getValues() {
    return {
      id: this.id,
      posterUrl: this.posterUrl,
      mediaType: this.mediaType,
      title: this.title,
      rate: this.rate,
      releaseYear: this.releaseYear,
    };
  }

  getReleaseYear(releaseDate: string | undefined) {
    if (!releaseDate) return undefined;
    return new Date(releaseDate).getFullYear().toString();
  }
}

export class MovieListItem extends FetchedListItem<FetchedListItemMovie> {
  constructor(
    imagesUrlBase: string,
    fetchedItem: FetchedListItemMovie,
    movieMediaType: MediaType,
    searchPromptItem?: boolean,
  ) {
    super(imagesUrlBase, fetchedItem, movieMediaType, searchPromptItem);
    this.title = fetchedItem.title as string;

    if (searchPromptItem) {
      this.releaseYear = this.getReleaseYear(fetchedItem.release_date);
    }
  }
}

export class TVListItem extends FetchedListItem<FetchedListItemTV> {
  constructor(
    imagesUrlBase: string,
    fetchedItem: FetchedListItemTV,
    movieMediaType: MediaType,
    searchPromptItem?: boolean,
  ) {
    super(imagesUrlBase, fetchedItem, movieMediaType, searchPromptItem);
    this.title = fetchedItem.name as string;

    if (searchPromptItem) {
      this.releaseYear = this.getReleaseYear(fetchedItem.first_air_date);
    }
  }
}
