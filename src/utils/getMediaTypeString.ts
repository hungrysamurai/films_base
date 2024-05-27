import { Lang, MediaType } from "../types";

const getMediaTypeString = (mediaType: MediaType, lang: Lang) => {
 if (lang === Lang.Ru) {
  if (mediaType === MediaType.Movie) {
   return 'Фильм'
  } else {
   return 'Сериал'
  }
 } else {
  if (mediaType === MediaType.Movie) {
   return 'Movie'
  } else {
   return 'TV Show'
  }
 }
}

export default getMediaTypeString