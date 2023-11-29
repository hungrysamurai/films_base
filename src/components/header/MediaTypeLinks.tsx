import { useGlobalContext } from "../../contexts/GlobalContext";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";
import { Lang, MediaType } from "../../types";

const MediaTypeLinks: React.FC = () => {
  const { lang, mediaType, dispatch } = useGlobalContext();

  return (
    <div className="media-type-links">
      <button
        className={mediaType === MediaType.Movie ? "active" : ""}
        onClick={() => {
          dispatch({
            type: MoviesListReducerActionTypes.SET_MEDIA_TYPE,
            payload: MediaType.Movie,
          });
        }}
      >
        {lang === Lang.En ? "Movies" : "Фильмы"}
      </button>

      <button
        className={mediaType === MediaType.TV ? "active" : ""}
        onClick={() => {
          dispatch({
            type: MoviesListReducerActionTypes.SET_MEDIA_TYPE,
            payload: MediaType.TV,
          });
        }}
      >
        {lang === Lang.En ? "TV Shows" : "Сериалы"}
      </button>
    </div>
  );
};

export default MediaTypeLinks;
